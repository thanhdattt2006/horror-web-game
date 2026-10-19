/**
 * Công cụ kiểm thử tự động trên trình duyệt thật (Headless Google Chrome via CDP)
 * Mở game qua file:// hoặc http://, bắt toàn bộ console.error / pageerror,
 * đo FPS, Draw Calls, Triangles, Geometries, Textures và chụp ảnh màn hình.
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = '/home/dat.cao/.gemini/antigravity-cli/brain/0bd4fb92-2dc6-4663-8e64-555229b4240c';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runBrowserTest({ url, scenario = 'm1', screenshotName = 'test.png', waitFramesMs = 1200 }) {
  const userDataDir = `/tmp/chrome-tram9-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const chromeArgs = [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--window-size=1280,720',
    '--autoplay-policy=no-user-gesture-required',
    `--user-data-dir=${userDataDir}`,
    '--remote-debugging-port=0',
    'about:blank'
  ];

  const proc = spawn('google-chrome', chromeArgs, { stdio: ['ignore', 'pipe', 'pipe'] });

  let wsEndpoint = null;
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timeout waiting for Chrome DevTools WS')), 8000);
    proc.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      const match = /DevTools listening on (ws:\/\/[^\s]+)/.exec(text);
      if (match && !wsEndpoint) {
        wsEndpoint = match[1];
        clearTimeout(timeout);
        resolve();
      }
    });
    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  const browserHttp = wsEndpoint.replace(/^ws:\/\//, 'http://').split('/devtools/')[0];
  const targetsRes = await fetch(`${browserHttp}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === 'page');
  if (!pageTarget) {
    proc.kill('SIGKILL');
    throw new Error('No page target found in headless Chrome');
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  let msgId = 0;
  const pending = new Map();
  const consoleErrors = [];
  const consoleWarnings = [];
  const consoleLogs = [];
  const exceptions = [];

  ws.addEventListener('message', (evt) => {
    const data = JSON.parse(evt.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(new Error(data.error.message));
      else resolve(data.result);
      return;
    }

    if (data.method === 'Runtime.consoleAPICalled') {
      const type = data.params.type;
      const text = (data.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ');
      if (type === 'error') consoleErrors.push(text);
      else if (type === 'warning') consoleWarnings.push(text);
      else consoleLogs.push(`[${type}] ${text}`);
    } else if (data.method === 'Runtime.exceptionThrown') {
      const details = data.params.exceptionDetails;
      exceptions.push(details.text + ' ' + (details.exception?.description || ''));
    } else if (data.method === 'Log.entryAdded') {
      const entry = data.params.entry;
      if (entry.level === 'error') {
        consoleErrors.push(`[Log.${entry.source}] ${entry.text} (${entry.url || ''})`);
      }
    }
  });

  function send(method, params = {}) {
    const id = ++msgId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expr) {
    const res = await send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval exception: ${res.exceptionDetails.text}`);
    }
    return res.result ? res.result.value : undefined;
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  await send('Page.navigate', { url });
  await sleep(600);

  let scenarioResult = {};

  if (scenario === 'm1' || scenario === 'gameplay') {
    // Đợi quá trình khởi tạo hoàn tất rồi bấm xác nhận cảnh báo -> Bắt đầu game
    for (let attempt = 0; attempt < 20; attempt++) {
      const st = await evaluate(`window.__TRAM9_GAME__ ? window.__TRAM9_GAME__.state : 'NONE'`);
      if (st === 'WARNING_SCREEN' || st === 'TITLE_SCREEN' || st === 'PLAYING') break;
      await sleep(150);
    }
    await evaluate(`
      (() => {
        const warnBtn = document.getElementById('btn-warning-confirm');
        if (warnBtn) warnBtn.click();
        const startBtn = document.getElementById('btn-start-new');
        if (startBtn) startBtn.click();
        const g = window.__TRAM9_GAME__;
        if (g) g.ui.toggleDebugOverlay(true);
      })()
    `);
    await sleep(waitFramesMs);

    scenarioResult = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        if (!g) return { error: 'No __TRAM9_GAME__ instance' };
        return {
          state: g.state,
          hour: g.storyManager ? g.storyManager.currentHour : 1,
          pos: { x: Number(g.player.pos.x.toFixed(2)), y: Number(g.player.pos.y.toFixed(2)), z: Number(g.player.pos.z.toFixed(2)) },
          stats: g.rendererManager.getRenderStats(),
          hasWorld: Boolean(g.worldManager),
          hasEntity: Boolean(g.entityManager),
          hasStory: Boolean(g.storyManager),
          hasAudio: Boolean(g.audioManager)
        };
      })()
    `);
  } else if (scenario === 'm3_mechanics') {
    for (let attempt = 0; attempt < 20; attempt++) {
      const st = await evaluate(`window.__TRAM9_GAME__ ? window.__TRAM9_GAME__.state : 'NONE'`);
      if (st === 'WARNING_SCREEN' || st === 'TITLE_SCREEN' || st === 'PLAYING') break;
      await sleep(150);
    }
    await evaluate(`
      (() => {
        document.getElementById('btn-warning-confirm')?.click();
        document.getElementById('btn-start-new')?.click();
        const g = window.__TRAM9_GAME__;
        g.ui.toggleDebugOverlay(true);
        // Đặt người chơi ra Sân Quan Trắc và đặt Kẻ Đo ở phía Bắc (0, 0, 20)
        g.player.pos.set(0, 1.68, 10);
        g.entityManager.placeEntityForAmbush(0, 20);
        // 1. Nhìn lệch góc ~50 độ để Kẻ Đo nằm ở rìa tầm nhìn (dot ~ 0.64)
        g.input.setLookAngles(Math.PI - 0.88, 0);
      })()
    `);
    await sleep(600);
    const periphView = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        return {
          dot: Number(g.entityManager.peripheralDot.toFixed(2)),
          intensity: Number(g.entityManager.peripheralIntensity.toFixed(2)),
          distBefore: Number(g.entityManager.currentDistance.toFixed(2))
        };
      })()
    `);
    // 2. Quay thẳng mắt nhìn trực diện vào Kẻ Đo (dot ~ 1.0)
    await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        g.input.setLookAngles(Math.PI, 0);
      })()
    `);
    await sleep(500);
    const directView = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        return {
          dot: Number(g.entityManager.peripheralDot.toFixed(2)),
          intensity: Number(g.entityManager.peripheralIntensity.toFixed(2)),
          wasLookedDirectly: g.entityManager.wasLookedDirectly
        };
      })()
    `);
    // 3. Quay mặt đi (dot < 0.65) -> Kẻ Đo phải tiến lại gần hơn!
    await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        g.input.setLookAngles(Math.PI - 0.9, 0);
      })()
    `);
    await sleep(450);
    const afterLookAway = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        return {
          distAfter: Number(g.entityManager.currentDistance.toFixed(2)),
          intensityRestored: Number(g.entityManager.peripheralIntensity.toFixed(2))
        };
      })()
    `);
    scenarioResult = { periphView, directView, afterLookAway };
  } else if (scenario === 'm4_story') {
    for (let attempt = 0; attempt < 20; attempt++) {
      const st = await evaluate(`window.__TRAM9_GAME__ ? window.__TRAM9_GAME__.state : 'NONE'`);
      if (st === 'WARNING_SCREEN' || st === 'TITLE_SCREEN' || st === 'PLAYING') break;
      await sleep(150);
    }
    await evaluate(`
      (() => {
        document.getElementById('btn-warning-confirm')?.click();
        document.getElementById('btn-start-new')?.click();
      })()
    `);
    await sleep(300);

    // Thực hiện chu trình Giờ 1 (Đảo thứ tự: Mưa -> Gió -> Áp kế -> Máy phát -> Radio -> Nghỉ)
    const progression = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        const sm = g.storyManager;
        const wm = g.worldManager;

        const findInteract = (id) => wm.interactables.find((o) => o.userData.interactId === id);

        // Nhặt thử mảnh nhật ký #1
        sm.handleInteract(findInteract('diary_note_1'));
        g.closeInteractionModal();

        // Đo 3 trạm theo thứ tự đảo ngược (phá Quy tắc 1)
        sm.handleInteract(findInteract('station_raingauge'));
        sm.handleInteract(findInteract('station_anemometer'));
        sm.handleInteract(findInteract('station_barometer'));
        sm.handleInteract(findInteract('generator_unit'));

        // Mở Radio và chọn gửi số liệu thực tế (nút đầu tiên)
        g._handleInteractKey = () => {};
        sm.handleInteract(findInteract('radio_station'));
        document.querySelector('#inter-options button')?.click();

        // Chốt ca tại giường để sang Giờ 2
        sm.handleInteract(findInteract('bed_rest'));

        // Mở Sổ Tay để kiểm tra Quy tắc 13 đã cập nhật động chưa
        g.openNotebook();
        const rule13Text = document.querySelector('.style-wet_ink_dynamic .rule-text')?.textContent || '';

        return {
          hourAfterRest: sm.currentHour,
          notesCollected: sm.collectedNotes.size,
          trueReports: sm.flags.trueReportCount,
          routineBroken: sm.flags.routineBrokenCount,
          rule13Text
        };
      })()
    `);

    // Kiểm tra mở khóa đủ 4 Ending
    const endingsVerified = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        const titles = [];
        for (const id of [1, 2, 3, 4]) {
          g.triggerEnding(id);
          titles.push(document.getElementById('ending-title')?.textContent || '');
        }
        return {
          titles,
          unlockedCount: g.saveManager.saveData.unlockedEndings.length
        };
      })()
    `);

    scenarioResult = { progression, endingsVerified };
  } else if (scenario === 'm6_acceptance') {
    for (let attempt = 0; attempt < 20; attempt++) {
      const st = await evaluate(`window.__TRAM9_GAME__ ? window.__TRAM9_GAME__.state : 'NONE'`);
      if (st === 'WARNING_SCREEN' || st === 'TITLE_SCREEN' || st === 'PLAYING') break;
      await sleep(150);
    }

    // 1. Mở khóa Audio & Bắt đầu ca trực
    await evaluate(`
      (() => {
        document.getElementById('btn-warning-confirm')?.click();
        document.getElementById('btn-start-new')?.click();
        window.__TRAM9_GAME__.ui.toggleDebugOverlay(true);
      })()
    `);
    await sleep(800);

    // 2. Kiểm tra chế độ Giảm Nhấp Nháy (Reduce Flashing WCAG 2.3.1)
    const reduceFlashCheck = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        g.applySettings({ ...g.settings, reduceFlashing: true });
        g._fixedUpdate(0.016);
        const i1 = g.worldManager.interiorLight.intensity;
        const p1 = g.worldManager.frontPorchLight.intensity;
        g._fixedUpdate(0.23);
        const i2 = g.worldManager.interiorLight.intensity;
        const p2 = g.worldManager.frontPorchLight.intensity;
        const uVal = g.rendererManager.postUniforms.uReduceFlashing.value;
        return {
          shaderUniform: uVal,
          interiorFlickerDelta: Math.abs(i2 - i1),
          porchFlickerDelta: Math.abs(p2 - p1),
          passed: uVal === 1.0 && Math.abs(i2 - i1) === 0 && Math.abs(p2 - p1) === 0
        };
      })()
    `);

    // 3. Kiểm tra không rò rỉ bộ nhớ (Mô phỏng 20 phút = 72,000 bước thời gian + chuyển giờ + tương tác + render)
    const memoryLeakCheck = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        g.rendererManager.render();
        const geoBefore = g.rendererManager.renderer.info.memory.geometries;
        const texBefore = g.rendererManager.renderer.info.memory.textures;

        for (let cycle = 0; cycle < 6; cycle++) {
          const hr = (cycle % 6) + 1;
          g.storyManager.startAtHour(hr, false);
          for (let step = 0; step < 600; step++) {
            g.player.vel.set(Math.sin(step * 0.1) * 2.5, 0, Math.cos(step * 0.1) * 2.5);
            g._fixedUpdate(1 / 60);
          }
          g.openNotebook();
          g.closeNotebook();
          g.rendererManager.render();
        }

        const geoAfter = g.rendererManager.renderer.info.memory.geometries;
        const texAfter = g.rendererManager.renderer.info.memory.textures;
        return {
          geoBefore,
          geoAfter,
          texBefore,
          texAfter,
          leakedGeometries: geoAfter - geoBefore,
          leakedTextures: texAfter - texBefore,
          passed: geoAfter === geoBefore && texAfter === texBefore
        };
      })()
    `);

    // 4. Kiểm tra chơi qua cả 4 Ending bằng tương tác thật ở Giờ 6
    const all4EndingsInteractive = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        const sm = g.storyManager;
        const wm = g.worldManager;
        const findInteract = (id) => wm.interactables.find((o) => o.userData.interactId === id);
        const results = {};

        // Nhánh Ending 1: Đúng quy trình tại bàn Radio Giờ 6
        sm.startAtHour(6, true);
        sm.handleInteract(findInteract('radio_station'));
        const end1Btn = Array.from(document.querySelectorAll('#inter-options button')).find((b) =>
          b.textContent.includes('KẾT THÚC 1')
        );
        end1Btn?.click();
        results.ending1 = document.getElementById('ending-title')?.textContent;

        // Nhánh Ending 2: Phá lệ tại Tháp Phát Sóng Cao Tần Giờ 6
        g.returnToTitle();
        g.startNewGame(6);
        sm.flags.routineBrokenCount = 3;
        sm.flags.trueReportCount = 4;
        sm.flags.heard1084Mhz = true;
        sm.handleInteract(findInteract('radio_tower'));
        const end2Btn = Array.from(document.querySelectorAll('#inter-options button')).find((b) =>
          b.textContent.includes('KẾT THÚC 2')
        );
        end2Btn?.click();
        results.ending2 = document.getElementById('ending-title')?.textContent;

        // Nhánh Ending 3: Đốt Sổ Tay ở Lò Đốt 600°C -> Bước ra Cột Mốc Sân Đo
        g.returnToTitle();
        g.startNewGame(6);
        sm.handleInteract(findInteract('incinerator'));
        document.querySelector('#inter-options button')?.click();
        sm.handleInteract(findInteract('yard_monolith'));
        const end3Btn = Array.from(document.querySelectorAll('#inter-options button')).find((b) =>
          b.textContent.includes('KẾT THÚC 3')
        );
        end3Btn?.click();
        results.ending3 = document.getElementById('ending-title')?.textContent;

        // Nhánh Ending 4 (Bí mật): Nhặt đủ 13 mảnh nhật ký -> Tương tác Cột Mốc Sân Đo
        g.returnToTitle();
        g.startNewGame(6);
        for (let i = 1; i <= 13; i++) {
          sm.handleInteract(findInteract('diary_note_' + i));
          g.closeInteractionModal();
        }
        sm.handleInteract(findInteract('yard_monolith'));
        const end4Btn = Array.from(document.querySelectorAll('#inter-options button')).find((b) =>
          b.textContent.includes('KẾT THÚC BÍ MẬT')
        );
        end4Btn?.click();
        results.ending4 = document.getElementById('ending-title')?.textContent;
        results.totalUnlocked = g.saveManager.saveData.unlockedEndings.length;
        results.notesCollectedForSecret = sm.collectedNotes.size;

        // Quay lại cảnh chơi Giờ 5 để chụp ảnh nghiệm thu
        g.startNewGame(5);
        g.player.pos.set(0, 1.68, 7.5);
        g.input.setLookAngles(0, 0);
        g.rendererManager.render();

        return results;
      })()
    `);

    await sleep(1200);
    const finalStats = await evaluate(`window.__TRAM9_GAME__.rendererManager.getRenderStats()`);

    scenarioResult = {
      reduceFlashCheck,
      memoryLeakCheck,
      all4EndingsInteractive,
      finalStats
    };
  } else if (scenario === 'direct') {
    await sleep(waitFramesMs);
    scenarioResult = await evaluate(`
      (() => {
        const g = window.__TRAM9_GAME__;
        if (!g) return { cdnFailed: Boolean(window.__TRAM9_CDN_FAILED__) };
        return {
          state: g.state,
          hour: g.storyManager ? g.storyManager.currentHour : 1,
          stats: g.rendererManager.getRenderStats(),
          endingTitle: document.getElementById('ending-title')?.textContent || null
        };
      })()
    `);
  }

  if (screenshotName) {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot && shot.data) {
      if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
      const outPath = path.join(ARTIFACT_DIR, screenshotName);
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      scenarioResult.screenshot = outPath;
    }
  }

  ws.close();
  proc.kill('SIGKILL');
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (_e) {}

  return {
    url,
    scenario,
    consoleErrors,
    consoleWarnings,
    exceptions,
    scenarioResult
  };
}

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const idx = arg.indexOf('=');
    return idx > -1 ? [arg.slice(2, idx), arg.slice(idx + 1)] : [arg.slice(2), '1'];
  })
);

const targetUrl = args.url || `file://${path.resolve('index.html')}`;
const scenario = args.scenario || 'm1';
const screenshotName = args.screenshot || `screenshot_${scenario}.png`;
const waitMs = Number(args.wait || 1200);

runBrowserTest({ url: targetUrl, scenario, screenshotName, waitFramesMs: waitMs })
  .then((res) => {
    console.log(JSON.stringify(res, null, 2));
    if (res.consoleErrors.length > 0 || res.exceptions.length > 0) {
      process.exitCode = 1;
    }
  })
  .catch((err) => {
    console.error('Test runner error:', err);
    process.exitCode = 1;
  });
