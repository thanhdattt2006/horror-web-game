/**
 * Module giao diện người dùng (UI Manager)
 * Quản lý: Màn Cảnh báo, Màn Tiêu đề, HUD, Phụ đề (Subtitles/Audio Captions),
 * Sổ Tay Trực Ca (13 Quy tắc + 13 Mảnh nhật ký), Bảng tương tác Radio/Máy phát,
 * Pause Menu, Settings, Credits, Màn Kết Thúc (4 Endings) và Debug Overlay (F3).
 */

import { GAME_CONFIG, NOTEBOOK_RULES, DIARY_FRAGMENTS, ENDINGS_META, I18N } from './config.js';

export class UIManager {
  constructor(saveManager, callbacks = {}) {
    this.saveManager = saveManager;
    this.callbacks = callbacks;
    this.settings = saveManager.settings;

    this.activeModal = 'loading';
    this.notebookTab = 'rules';
    this.debugVisible = false;
    this.subtitleTimer = 0;

    this.root = document.getElementById('ui-root');
    this._buildDOM();
    this.applySettingsToUI(this.settings);
  }

  _t(key) {
    const lang = this.settings.language || 'vi';
    return (I18N[lang] && I18N[lang][key]) || I18N.vi[key] || key;
  }

  _buildDOM() {
    this.root.innerHTML = `
      <!-- Thông báo lịch sự trên thiết bị di động -->
      <div id="mobile-notice" class="modal-backdrop hidden">
        <div class="modal-card warning-card">
          <h2>THIẾT BỊ DI ĐỘNG ĐƯỢC PHÁT HIỆN</h2>
          <p><strong>TRẠM 9 — Sổ Tay Trực Ca</strong> được thiết kế tối ưu cho máy tính để bàn (Bàn phím WASD + Chuột Pointer Lock + Tai nghe âm thanh không gian 3D).</p>
          <p>Vui lòng mở trò chơi trên máy tính (Desktop/Laptop) để có trải nghiệm đầy đủ và ổn định nhất.</p>
          <div class="modal-actions">
            <button id="btn-mobile-dismiss" class="btn-secondary">Vẫn tiếp tục xem giao diện</button>
          </div>
        </div>
      </div>

      <!-- Màn hình Loading ban đầu -->
      <div id="screen-loading" class="modal-backdrop">
        <div class="modal-card loading-card">
          <div class="station-emblem">ĐÀI KHÍ TƯỢNG CAO NGUYÊN — TRẠM SỐ 09</div>
          <h1>TRẠM 9</h1>
          <p class="subtitle-tag">SỔ TAY TRỰC CA (1998)</p>
          <div class="loading-bar-wrap">
            <div id="loading-bar-fill" class="loading-bar-fill" style="width: 15%"></div>
          </div>
          <p id="loading-status-text" class="status-line">Đang khởi tạo hệ thống quan trắc...</p>
        </div>
      </div>

      <!-- Màn hình Cảnh báo An toàn & Tai nghe -->
      <div id="screen-warning" class="modal-backdrop hidden">
        <div class="modal-card warning-card">
          <div class="badge-tag">HỒI BÁO AN TOÀN — WCAG 2.3.1</div>
          <h2 id="warn-title">${this._t('warningTitle')}</h2>
          <p id="warn-body">${this._t('warningBody')}</p>
          <ul class="warning-list">
            <li><strong>Âm thanh không gian 3D:</strong> Đeo tai nghe để phân biệt hướng tiếng bước chân thứ hai.</li>
            <li><strong>Không gian tâm lý:</strong> Trò chơi sử dụng sự tĩnh lặng, sương mù và sự sai lệch trong thói quen.</li>
            <li><strong>An toàn thị giác:</strong> Tần số chớp đèn luôn dưới 2.5 lần/giây. Bạn có thể tắt hẳn chớp đèn bên dưới.</li>
          </ul>
          <label class="checkbox-row" for="chk-warn-reduce-flash">
            <input type="checkbox" id="chk-warn-reduce-flash" />
            <span id="lbl-warn-reduce-flash">${this._t('reduceFlashToggle')}</span>
          </label>
          <div class="modal-actions">
            <button id="btn-warning-confirm" class="btn-primary">${this._t('warningConfirm')}</button>
          </div>
        </div>
      </div>

      <!-- Màn hình Tiêu đề (Title Screen) -->
      <div id="screen-title" class="modal-backdrop hidden">
        <div class="title-layout">
          <div class="title-header">
            <div class="station-code">BỘ ĐO LƯỜNG KHÍ QUYỂN • ĐỈNH MÙ SƯƠNG (1.840M)</div>
            <h1 class="main-logo" id="ui-game-title">${this._t('gameTitle')}</h1>
            <div class="sub-logo" id="ui-game-subtitle">${this._t('gameSubtitle')}</div>
          </div>
          <div class="title-menu">
            <button id="btn-start-new" class="btn-primary">${this._t('startNewGame')}</button>
            <button id="btn-continue" class="btn-secondary hidden">${this._t('continueGame')}</button>
            <button id="btn-open-settings" class="btn-secondary">${this._t('settingsBtn')}</button>
            <button id="btn-open-credits" class="btn-secondary">${this._t('creditsBtn')}</button>
          </div>
          <div class="title-footer">
            <div id="title-endings-unlocked" class="endings-counter">Kết thúc đã mở: 0 / 4</div>
            <div class="controls-mini" id="ui-controls-hint">${this._t('controlsHint')}</div>
          </div>
        </div>
      </div>

      <!-- HUD Trong Game -->
      <div id="hud-layer" class="hud-layer hidden">
        <div class="hud-top-left">
          <div id="hud-hour-badge" class="hud-hour-badge">00:00 — GIỜ TRỰC THỨ NHẤT</div>
          <div id="hud-objective" class="hud-objective">Nhiệm vụ: Đọc Sổ Tay (Tab) và đo 3 chỉ số ngoài sân.</div>
          <div id="hud-Checklist" class="hud-checklist"></div>
        </div>

        <div class="hud-top-right">
          <div id="hud-flashlight" class="hud-pill">ĐÈN PIN (F): BẬT</div>
          <div id="hud-notes-count" class="hud-pill">NHẬT KÝ: 0 / 13</div>
          <div class="hud-pill">SỔ TAY: [TAB]</div>
        </div>

        <div id="hud-crosshair" class="hud-crosshair"></div>
        <div id="hud-interact-prompt" class="hud-interact hidden">[E] Tương tác</div>

        <div id="hud-notification" class="hud-notification hidden"></div>

        <!-- Phụ đề thoại & Chú thích âm thanh -->
        <div id="hud-subtitle-box" class="hud-subtitle-box hidden">
          <span id="hud-subtitle-text"></span>
        </div>
      </div>

      <!-- Sổ Tay Trực Ca (Tab) -->
      <div id="modal-notebook" class="modal-backdrop hidden">
        <div class="modal-card notebook-card">
          <div class="notebook-header">
            <div>
              <h2>SỔ TAY TRỰC CA — TRẠM 9</h2>
              <p class="notebook-meta">Người giữ sổ: Trần Văn Lương (Mã nhân sự: QTV-09-14)</p>
            </div>
            <div class="notebook-tabs">
              <button id="btn-tab-rules" class="tab-btn active">13 QUY TẮC TRỰC CA</button>
              <button id="btn-tab-notes" class="tab-btn">MẢNH NHẬT KÝ RỜI (<span id="nb-note-badge">0/13</span>)</button>
              <button id="btn-close-notebook" class="btn-small">ĐÓNG [TAB]</button>
            </div>
          </div>
          <div id="notebook-body-rules" class="notebook-body"></div>
          <div id="notebook-body-notes" class="notebook-body hidden"></div>
        </div>
      </div>

      <!-- Hộp thoại Tương tác Chuyên biệt (Radio / Máy phát / Dị thường / Kết thúc) -->
      <div id="modal-interaction" class="modal-backdrop hidden">
        <div class="modal-card interaction-card">
          <div id="inter-badge" class="badge-tag">THIẾT BỊ TRẠM 9</div>
          <h2 id="inter-title">BÀN ĐIỀU KHIỂN</h2>
          <div id="inter-desc" class="inter-desc"></div>
          <div id="inter-options" class="inter-options"></div>
          <div class="modal-actions">
            <button id="btn-inter-close" class="btn-secondary">Đóng [Esc]</button>
          </div>
        </div>
      </div>

      <!-- Chuyển tiếp Giờ Trực -->
      <div id="screen-hour-transition" class="modal-backdrop hidden">
        <div class="transition-box">
          <div id="trans-hour-code" class="trans-code">01:00 — CA ĐÊM</div>
          <h2 id="trans-hour-title">GIỜ TRỰC THỨ HAI</h2>
          <p id="trans-hour-sub">Đã lưu Checkpoint tự động.</p>
        </div>
      </div>

      <!-- Pause Menu -->
      <div id="modal-pause" class="modal-backdrop hidden">
        <div class="modal-card pause-card">
          <h2 id="ui-pause-title">${this._t('pauseTitle')}</h2>
          <p class="pause-sub">Trò chơi đã tạm dừng. Nhấn Tiếp tục để khóa lại con trỏ chuột.</p>
          <div class="modal-actions vertical">
            <button id="btn-pause-resume" class="btn-primary">${this._t('resumeBtn')}</button>
            <button id="btn-pause-notebook" class="btn-secondary">MỞ SỔ TAY TRỰC CA</button>
            <button id="btn-pause-settings" class="btn-secondary">${this._t('settingsBtn')}</button>
            <button id="btn-pause-title" class="btn-danger">${this._t('returnTitleBtn')}</button>
          </div>
        </div>
      </div>

      <!-- Settings Modal -->
      <div id="modal-settings" class="modal-backdrop hidden">
        <div class="modal-card settings-card">
          <h2>CÀI ĐẶT HỆ THỐNG & TRỢ NĂNG</h2>
          <div class="settings-grid">
            <div class="setting-row">
              <label for="set-quality">Chất lượng đồ họa</label>
              <select id="set-quality">
                <option value="low">Thấp (Low - Ưu tiên FPS)</option>
                <option value="medium">Trung bình (Medium - Khuyên dùng)</option>
                <option value="high">Cao (High - Đầy đủ hiệu ứng)</option>
              </select>
            </div>
            <div class="setting-row">
              <label for="set-fov">Góc nhìn (FOV): <span id="val-fov">72</span>°</label>
              <input type="range" id="set-fov" min="60" max="95" step="1" value="72" />
            </div>
            <div class="setting-row">
              <label for="set-sens">Độ nhạy chuột: <span id="val-sens">1.0</span></label>
              <input type="range" id="set-sens" min="0.2" max="2.5" step="0.1" value="1.0" />
            </div>
            <div class="setting-row">
              <label for="set-invert-y">Đảo ngược trục nhìn dọc (Invert Y)</label>
              <input type="checkbox" id="set-invert-y" />
            </div>
            <div class="setting-row">
              <label for="set-headbob">Nhịp bước chân camera (Head Bob)</label>
              <input type="checkbox" id="set-headbob" checked />
            </div>
            <div class="setting-row">
              <label for="set-reduce-flash">Chế độ giảm nhấp nháy (WCAG 2.3.1)</label>
              <input type="checkbox" id="set-reduce-flash" />
            </div>
            <div class="setting-row">
              <label for="set-sub-size">Cỡ chữ phụ đề</label>
              <select id="set-sub-size">
                <option value="small">Nhỏ</option>
                <option value="medium">Vừa</option>
                <option value="large">Lớn (Dễ đọc)</option>
              </select>
            </div>
            <div class="setting-row">
              <label for="set-bgm">Âm lượng Không khí & Drone: <span id="val-bgm">70</span>%</label>
              <input type="range" id="set-bgm" min="0" max="1" step="0.05" value="0.7" />
            </div>
            <div class="setting-row">
              <label for="set-sfx">Âm lượng Hiệu ứng & Bước chân: <span id="val-sfx">85</span>%</label>
              <input type="range" id="set-sfx" min="0" max="1" step="0.05" value="0.85" />
            </div>
            <div class="setting-row">
              <label for="set-voice">Âm lượng Radio & Thoại: <span id="val-voice">90</span>%</label>
              <input type="range" id="set-voice" min="0" max="1" step="0.05" value="0.9" />
            </div>
            <div class="setting-row">
              <label for="set-lang">Ngôn ngữ giao diện</label>
              <select id="set-lang">
                <option value="vi">Tiếng Việt (Mặc định)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button id="btn-settings-close" class="btn-primary">LƯU & ĐÓNG</button>
          </div>
        </div>
      </div>

      <!-- Credits Modal -->
      <div id="modal-credits" class="modal-backdrop hidden">
        <div class="modal-card credits-card">
          <h2>THÔNG TIN DỰ ÁN & BẢN QUYỀN (CREDITS)</h2>
          <div class="credits-content">
            <p><strong>TRẠM 9 — Sổ Tay Trực Ca</strong></p>
            <p>Thiết kế kịch bản, Lập trình 3D, Shader hậu kỳ & Tổng hợp âm thanh: Đội phát triển độc lập Trạm 9.</p>
            <hr />
            <p><strong>Thư viện mã nguồn mở duy nhất sử dụng:</strong></p>
            <ul>
              <li><strong>Three.js v0.186.1</strong> — Bản quyền © 2010–2026 Three.js Authors. Giấy phép: <code>MIT License</code> (https://github.com/mrdoob/three.js).</li>
            </ul>
            <p><strong>Tài nguyên Đồ họa & Âm thanh:</strong></p>
            <ul>
              <li>100% Hình học 3D, Texture bề mặt (HTML5 Canvas 2D), Shader GLSL 16mm và Âm thanh không gian (Web Audio API HRTF) được tạo thủ tục (Procedural Generation) trực tiếp bằng mã nguồn, không sử dụng asset bên ngoài.</li>
            </ul>
          </div>
          <div class="modal-actions">
            <button id="btn-credits-close" class="btn-primary">ĐÓNG</button>
          </div>
        </div>
      </div>

      <!-- Màn hình Kết thúc (Ending Screen) -->
      <div id="screen-ending" class="modal-backdrop hidden">
        <div class="modal-card ending-card">
          <div id="ending-code-badge" class="badge-tag">HỒ SƠ KẾT THÚC CA TRỰC</div>
          <h1 id="ending-title">KẾT THÚC</h1>
          <h3 id="ending-subtitle">Phụ đề</h3>
          <p id="ending-summary" class="ending-summary"></p>
          <div id="ending-stats" class="ending-stats"></div>
          <div id="ending-unlocked-list" class="ending-unlocked-list"></div>
          <div class="modal-actions">
            <button id="btn-ending-replay" class="btn-primary">QUAY VỀ MÀN HÌNH CHÍNH</button>
          </div>
        </div>
      </div>

      <!-- Debug Overlay (F3 hoặc ?debug=1) -->
      <div id="debug-overlay" class="debug-overlay hidden">
        <div class="debug-title">TRẠM 9 DEBUG OVERLAY [F3]</div>
        <pre id="debug-metrics">FPS: --</pre>
        <div class="debug-buttons">
          <button data-dbg-hour="1">H1</button>
          <button data-dbg-hour="2">H2</button>
          <button data-dbg-hour="3">H3</button>
          <button data-dbg-hour="4">H4</button>
          <button data-dbg-hour="5">H5</button>
          <button data-dbg-hour="6">H6</button>
          <button data-dbg-end="1">End1</button>
          <button data-dbg-end="2">End2</button>
          <button data-dbg-end="3">End3</button>
          <button data-dbg-end="4">End4</button>
        </div>
      </div>
    `;

    this._bindUIEvents();
    this._checkMobileDevice();
  }

  _checkMobileDevice() {
    const isTouchMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '') &&
      window.innerWidth < 900;
    if (isTouchMobile) {
      document.getElementById('mobile-notice').classList.remove('hidden');
    }
  }

  _bindUIEvents() {
    const on = (id, evt, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(evt, fn);
    };

    on('btn-mobile-dismiss', 'click', () => {
      document.getElementById('mobile-notice').classList.add('hidden');
    });

    on('chk-warn-reduce-flash', 'change', (e) => {
      const checked = Boolean(e.target.checked);
      this.saveManager.saveSettings({ reduceFlashing: checked });
      document.getElementById('set-reduce-flash').checked = checked;
      if (this.callbacks.onSettingsChanged) {
        this.callbacks.onSettingsChanged(this.saveManager.settings);
      }
    });

    on('btn-warning-confirm', 'click', () => {
      if (this.callbacks.onConfirmWarning) this.callbacks.onConfirmWarning();
    });

    on('btn-start-new', 'click', () => {
      if (this.callbacks.onStartNewGame) this.callbacks.onStartNewGame();
    });

    on('btn-continue', 'click', () => {
      if (this.callbacks.onContinueGame) this.callbacks.onContinueGame();
    });

    on('btn-open-settings', 'click', () => {
      this._previousModalBeforeSettings = 'title';
      this.showModal('settings');
    });

    on('btn-open-credits', 'click', () => {
      this.showModal('credits');
    });

    on('btn-credits-close', 'click', () => {
      this.showModal('title');
    });

    on('btn-pause-resume', 'click', () => {
      if (this.callbacks.onResumeGame) this.callbacks.onResumeGame();
    });

    on('btn-pause-notebook', 'click', () => {
      if (this.callbacks.onOpenNotebookFromPause) this.callbacks.onOpenNotebookFromPause();
    });

    on('btn-pause-settings', 'click', () => {
      this._previousModalBeforeSettings = 'pause';
      this.showModal('settings');
    });

    on('btn-pause-title', 'click', () => {
      if (this.callbacks.onReturnToTitle) this.callbacks.onReturnToTitle();
    });

    on('btn-tab-rules', 'click', () => {
      this.switchNotebookTab('rules');
    });

    on('btn-tab-notes', 'click', () => {
      this.switchNotebookTab('notes');
    });

    on('btn-close-notebook', 'click', () => {
      if (this.callbacks.onCloseNotebook) this.callbacks.onCloseNotebook();
    });

    on('btn-inter-close', 'click', () => {
      if (this.callbacks.onCloseInteraction) this.callbacks.onCloseInteraction();
    });

    on('btn-ending-replay', 'click', () => {
      if (this.callbacks.onReturnToTitle) this.callbacks.onReturnToTitle();
    });

    // Cài đặt
    const syncSettings = () => {
      const updated = {
        quality: document.getElementById('set-quality').value,
        fov: Number(document.getElementById('set-fov').value),
        sensitivity: Number(document.getElementById('set-sens').value),
        invertY: document.getElementById('set-invert-y').checked,
        headBob: document.getElementById('set-headbob').checked,
        reduceFlashing: document.getElementById('set-reduce-flash').checked,
        subtitleSize: document.getElementById('set-sub-size').value,
        bgmVolume: Number(document.getElementById('set-bgm').value),
        sfxVolume: Number(document.getElementById('set-sfx').value),
        voiceVolume: Number(document.getElementById('set-voice').value),
        language: document.getElementById('set-lang').value
      };

      document.getElementById('val-fov').textContent = String(updated.fov);
      document.getElementById('val-sens').textContent = updated.sensitivity.toFixed(1);
      document.getElementById('val-bgm').textContent = String(Math.round(updated.bgmVolume * 100));
      document.getElementById('val-sfx').textContent = String(Math.round(updated.sfxVolume * 100));
      document.getElementById('val-voice').textContent = String(Math.round(updated.voiceVolume * 100));

      this.settings = this.saveManager.saveSettings(updated);
      this.applySettingsToUI(this.settings);
      if (this.callbacks.onSettingsChanged) {
        this.callbacks.onSettingsChanged(this.settings);
      }
    };

    [
      'set-quality',
      'set-fov',
      'set-sens',
      'set-invert-y',
      'set-headbob',
      'set-reduce-flash',
      'set-sub-size',
      'set-bgm',
      'set-sfx',
      'set-voice',
      'set-lang'
    ].forEach((id) => {
      on(id, 'input', syncSettings);
      on(id, 'change', syncSettings);
    });

    on('btn-settings-close', 'click', () => {
      syncSettings();
      const target = this._previousModalBeforeSettings || 'title';
      this.showModal(target);
    });

    // Nút debug nhanh
    const dbgOverlay = document.getElementById('debug-overlay');
    if (dbgOverlay) {
      dbgOverlay.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.dataset.dbgHour && this.callbacks.onDebugSkipHour) {
          this.callbacks.onDebugSkipHour(Number(btn.dataset.dbgHour));
        } else if (btn.dataset.dbgEnd && this.callbacks.onDebugTriggerEnding) {
          this.callbacks.onDebugTriggerEnding(Number(btn.dataset.dbgEnd));
        }
      });
    }
  }

  applySettingsToUI(settings) {
    document.getElementById('set-quality').value = settings.quality;
    document.getElementById('set-fov').value = String(settings.fov);
    document.getElementById('val-fov').textContent = String(settings.fov);
    document.getElementById('set-sens').value = String(settings.sensitivity);
    document.getElementById('val-sens').textContent = Number(settings.sensitivity).toFixed(1);
    document.getElementById('set-invert-y').checked = Boolean(settings.invertY);
    document.getElementById('set-headbob').checked = Boolean(settings.headBob);
    document.getElementById('set-reduce-flash').checked = Boolean(settings.reduceFlashing);
    document.getElementById('chk-warn-reduce-flash').checked = Boolean(settings.reduceFlashing);
    document.getElementById('set-sub-size').value = settings.subtitleSize;
    document.getElementById('set-bgm').value = String(settings.bgmVolume);
    document.getElementById('val-bgm').textContent = String(Math.round(settings.bgmVolume * 100));
    document.getElementById('set-sfx').value = String(settings.sfxVolume);
    document.getElementById('val-sfx').textContent = String(Math.round(settings.sfxVolume * 100));
    document.getElementById('set-voice').value = String(settings.voiceVolume);
    document.getElementById('val-voice').textContent = String(Math.round(settings.voiceVolume * 100));
    document.getElementById('set-lang').value = settings.language || 'vi';

    const subBox = document.getElementById('hud-subtitle-box');
    if (subBox) {
      subBox.classList.remove('sub-small', 'sub-medium', 'sub-large');
      subBox.classList.add(`sub-${settings.subtitleSize || 'medium'}`);
    }

    document.getElementById('ui-game-title').textContent = this._t('gameTitle');
    document.getElementById('ui-game-subtitle').textContent = this._t('gameSubtitle');
    document.getElementById('warn-title').textContent = this._t('warningTitle');
    document.getElementById('warn-body').textContent = this._t('warningBody');
    document.getElementById('lbl-warn-reduce-flash').textContent = this._t('reduceFlashToggle');
    document.getElementById('btn-warning-confirm').textContent = this._t('warningConfirm');
    document.getElementById('btn-start-new').textContent = this._t('startNewGame');
    document.getElementById('btn-continue').textContent = this._t('continueGame');
    document.getElementById('btn-open-settings').textContent = this._t('settingsBtn');
    document.getElementById('btn-open-credits').textContent = this._t('creditsBtn');
    document.getElementById('ui-pause-title').textContent = this._t('pauseTitle');
    document.getElementById('btn-pause-resume').textContent = this._t('resumeBtn');
    document.getElementById('btn-pause-title').textContent = this._t('returnTitleBtn');
    document.getElementById('ui-controls-hint').textContent = this._t('controlsHint');
  }

  setLoadingProgress(percent, statusText) {
    const bar = document.getElementById('loading-bar-fill');
    const txt = document.getElementById('loading-status-text');
    if (bar) bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    if (txt && statusText) txt.textContent = statusText;
  }

  refreshTitleScreenState() {
    const save = this.saveManager.saveData;
    const btnCont = document.getElementById('btn-continue');
    if (btnCont) {
      if (save.hasCheckpoint) {
        btnCont.classList.remove('hidden');
        btnCont.textContent = `${this._t('continueGame')} (GIỜ ${save.checkpointHour})`;
      } else {
        btnCont.classList.add('hidden');
      }
    }

    const endCounter = document.getElementById('title-endings-unlocked');
    if (endCounter) {
      endCounter.textContent = `Kết thúc đã mở khóa: ${save.unlockedEndings.length} / 4`;
    }
  }

  showModal(modalName) {
    this.activeModal = modalName;
    const modalMap = {
      loading: 'screen-loading',
      warning: 'screen-warning',
      title: 'screen-title',
      none: null,
      notebook: 'modal-notebook',
      interaction: 'modal-interaction',
      transition: 'screen-hour-transition',
      pause: 'modal-pause',
      settings: 'modal-settings',
      credits: 'modal-credits',
      ending: 'screen-ending'
    };

    Object.values(modalMap).forEach((id) => {
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    const targetId = modalMap[modalName];
    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.remove('hidden');
    }

    const hud = document.getElementById('hud-layer');
    if (hud) {
      if (modalName === 'none' || modalName === 'notebook' || modalName === 'interaction') {
        hud.classList.remove('hidden');
      } else {
        hud.classList.add('hidden');
      }
    }

    if (modalName === 'title') {
      this.refreshTitleScreenState();
    }
  }

  updateHUD({ hourConfig, checklistItems, flashlightOn, collectedNotesCount, interactLabel }) {
    if (hourConfig) {
      document.getElementById('hud-hour-badge').textContent = `${hourConfig.timeLabel} — ${hourConfig.title}`;
      document.getElementById('hud-objective').textContent = hourConfig.objectiveHint;
    }

    if (Array.isArray(checklistItems)) {
      const clEl = document.getElementById('hud-Checklist');
      clEl.innerHTML = checklistItems
        .map(
          (item) =>
            `<div class="chk-item ${item.done ? 'done' : ''}">${item.done ? '[✓]' : '[ ]'} ${item.label}</div>`
        )
        .join('');
    }

    const flEl = document.getElementById('hud-flashlight');
    if (flEl) {
      flEl.textContent = `ĐÈN PIN [F]: ${flashlightOn ? 'BẬT' : 'TẮT'}`;
      flEl.classList.toggle('active-pill', Boolean(flashlightOn));
    }

    const notesEl = document.getElementById('hud-notes-count');
    if (notesEl && collectedNotesCount !== undefined) {
      notesEl.textContent = `MẢNH NHẬT KÝ: ${collectedNotesCount} / 13`;
    }

    const promptEl = document.getElementById('hud-interact-prompt');
    const crossEl = document.getElementById('hud-crosshair');
    if (promptEl && crossEl) {
      if (interactLabel) {
        promptEl.textContent = `[E] ${interactLabel}`;
        promptEl.classList.remove('hidden');
        crossEl.classList.add('interact-ready');
      } else {
        promptEl.classList.add('hidden');
        crossEl.classList.remove('interact-ready');
      }
    }
  }

  showSubtitle(text, durationSeconds = 4.5) {
    const box = document.getElementById('hud-subtitle-box');
    const span = document.getElementById('hud-subtitle-text');
    if (!box || !span) return;
    span.textContent = text;
    box.classList.remove('hidden');
    this.subtitleTimer = durationSeconds;
  }

  showNotification(text, durationSeconds = 3.5) {
    const el = document.getElementById('hud-notification');
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden');
    clearTimeout(this._notifTimeout);
    this._notifTimeout = setTimeout(() => {
      el.classList.add('hidden');
    }, durationSeconds * 1000);
  }

  update(dt) {
    if (this.subtitleTimer > 0) {
      this.subtitleTimer -= dt;
      if (this.subtitleTimer <= 0) {
        const box = document.getElementById('hud-subtitle-box');
        if (box) box.classList.add('hidden');
      }
    }
  }

  switchNotebookTab(tabName) {
    this.notebookTab = tabName;
    document.getElementById('btn-tab-rules').classList.toggle('active', tabName === 'rules');
    document.getElementById('btn-tab-notes').classList.toggle('active', tabName === 'notes');
    document.getElementById('notebook-body-rules').classList.toggle('hidden', tabName !== 'rules');
    document.getElementById('notebook-body-notes').classList.toggle('hidden', tabName !== 'notes');
  }

  renderNotebook(storyState) {
    const rulesContainer = document.getElementById('notebook-body-rules');
    const notesContainer = document.getElementById('notebook-body-notes');
    const badge = document.getElementById('nb-note-badge');

    const collectedSet = new Set(storyState.collectedNotes || []);
    if (badge) badge.textContent = `${collectedSet.size}/13`;

    const flags = storyState.flags || {};
    const stepText =
      flags.lastStepCount > 0
        ? `Quy tắc thứ 13 tự khắc lên giấy từ bước chân của bạn: Giờ trước bạn đã đi ${flags.lastStepCount} bước, dừng lâu nhất tại [${flags.longestDwellZone || 'Sân Đo'}], và ghé [${flags.favoriteFirstStation || 'Áp kế'}] đầu tiên. Hãy cứ lặp lại như thế để chúng tôi hoàn tất bản đo.`
        : 'Cuốn sổ này vốn chỉ có 12 quy tắc. Quy tắc thứ 13 đang lắng nghe và đếm từng bước chân đầu tiên của bạn trong ca trực này...';

    rulesContainer.innerHTML = NOTEBOOK_RULES.map((rule) => {
      const bodyText = rule.id === 13 ? stepText : rule.text;
      return `
        <div class="rule-entry style-${rule.handwriting}">
          <div class="rule-title">${rule.title}</div>
          <div class="rule-text">${bodyText}</div>
        </div>
      `;
    }).join('');

    notesContainer.innerHTML = DIARY_FRAGMENTS.map((frag) => {
      const isCollected = collectedSet.has(frag.id);
      if (isCollected) {
        return `
          <div class="note-entry collected">
            <div class="note-title">${frag.title} <span class="note-loc">(${frag.locationHint})</span></div>
            <div class="note-text">${frag.content}</div>
          </div>
        `;
      }
      return `
        <div class="note-entry missing">
          <div class="note-title">Mảnh #${String(frag.id).padStart(2, '0')}: [Chưa tìm thấy]</div>
          <div class="note-text">Gợi ý vị trí: ${frag.locationHint}</div>
        </div>
      `;
    }).join('');
  }

  openInteractionModal({ badge, title, description, options }) {
    document.getElementById('inter-badge').textContent = badge || 'TƯƠNG TÁC TRẠM 9';
    document.getElementById('inter-title').textContent = title || 'THIẾT BỊ';
    document.getElementById('inter-desc').innerHTML = description || '';

    const optContainer = document.getElementById('inter-options');
    optContainer.innerHTML = '';

    (options || []).forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = opt.primary ? 'btn-primary inter-opt-btn' : 'btn-secondary inter-opt-btn';
      btn.textContent = opt.label;
      if (opt.disabled) btn.disabled = true;
      btn.addEventListener('click', () => {
        if (opt.onSelect) opt.onSelect();
      });
      optContainer.appendChild(btn);
    });

    this.showModal('interaction');
  }

  showHourTransition(hourConfig) {
    document.getElementById('trans-hour-code').textContent = hourConfig.timeLabel;
    document.getElementById('trans-hour-title').textContent = hourConfig.title.toUpperCase();
    document.getElementById('trans-hour-sub').textContent = `Đã lưu Checkpoint đầu Giờ ${hourConfig.hour}.`;
    this.showModal('transition');
  }

  showEndingScreen(endingId, statsData, unlockedEndings) {
    const meta = ENDINGS_META[endingId] || ENDINGS_META[1];
    document.getElementById('ending-code-badge').textContent = `MÃ KẾT CỤC: ${meta.code}`;
    document.getElementById('ending-title').textContent = meta.title;
    document.getElementById('ending-subtitle').textContent = meta.subtitle;
    document.getElementById('ending-summary').textContent = meta.summary;

    document.getElementById('ending-stats').innerHTML = `
      <div class="stat-box"><span>Mảnh nhật ký thu thập:</span> <strong>${statsData.notesCount} / 13</strong></div>
      <div class="stat-box"><span>Số lần gửi số liệu thật:</span> <strong>${statsData.trueReportCount}</strong></div>
      <div class="stat-box"><span>Số lần phá lộ trình lặp:</span> <strong>${statsData.routineBrokenCount}</strong></div>
      <div class="stat-box"><span>Mức độ bị Kẻ Đo đồng hóa:</span> <strong>${Math.round(statsData.assimilationScore)}%</strong></div>
    `;

    const allIds = [1, 2, 3, 4];
    document.getElementById('ending-unlocked-list').innerHTML =
      `<div class="unlocked-header">Danh sách Kết thúc đã mở (${unlockedEndings.length}/4):</div>` +
      allIds
        .map((id) => {
          const isUnl = unlockedEndings.includes(id);
          return `<span class="end-pill ${isUnl ? 'unlocked' : 'locked'}">${
            isUnl ? ENDINGS_META[id].title : `Kết thúc #${id} [Chưa mở]`
          }</span>`;
        })
        .join('');

    this.showModal('ending');
  }

  toggleDebugOverlay(forceState) {
    this.debugVisible = forceState !== undefined ? Boolean(forceState) : !this.debugVisible;
    const el = document.getElementById('debug-overlay');
    if (el) el.classList.toggle('hidden', !this.debugVisible);
  }

  updateDebugOverlay(renderStats, gameDebugInfo) {
    if (!this.debugVisible) return;
    const pre = document.getElementById('debug-metrics');
    if (!pre) return;

    pre.textContent = [
      `FPS: ${renderStats.fps} | Frame: ${renderStats.frameTimeMs} ms | DRS: ${Math.round(renderStats.drsScale * 100)}%`,
      `Draw Calls: ${renderStats.drawCalls} / 150 | Triangles: ${renderStats.triangles} / 250k`,
      `Geometries: ${renderStats.geometries} | Textures: ${renderStats.textures}`,
      `Giờ trực: H${gameDebugInfo.hour} | Khu vực: ${gameDebugInfo.zone}`,
      `Tọa độ: (${gameDebugInfo.posX}, ${gameDebugInfo.posY}, ${gameDebugInfo.posZ})`,
      `Ngoại vi (Dot): ${gameDebugInfo.periphDot} | Cường độ: ${gameDebugInfo.periphIntensity}`,
      `Độ đoán thói quen: ${gameDebugInfo.predictability}% | Đồng hóa: ${gameDebugInfo.assimilation}%`,
      `Nhật ký: ${gameDebugInfo.notes}/13 | Phá lệ: ${gameDebugInfo.broken} | Báo cáo thật: ${gameDebugInfo.trueReports}`
    ].join('\n');
  }
}
