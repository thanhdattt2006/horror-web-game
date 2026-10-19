/**
 * Module quản lý đồ họa & Hậu kỳ 1-Pass (Renderer & Single-Pass Post-Processing Shader)
 * Gộp: 16mm Cold Blue-Grey Grading, Vignette, Film Grain, Chromatic Aberration và Peripheral Presence Shader.
 */

import { GAME_CONFIG } from './config.js';

const POST_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const POST_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uGrainIntensity;
  uniform float uChromaticAberration;
  uniform float uTensionLevel;
  uniform float uPeripheralIntensity;
  uniform vec2 uEntityScreenPos;
  uniform float uEntityOnScreen;
  uniform float uReduceFlashing;
  uniform float uJumpScarePulse;

  varying vec2 vUv;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = vUv;
    vec2 centerOffset = uv - vec2(0.5);
    float edgeDist = length(centerOffset);

    // 1. Hiệu ứng Hiện diện ngoại vi (Peripheral Presence Distortion & Silhouette)
    float periphMask = smoothstep(0.14, 0.44, edgeDist) * uPeripheralIntensity;
    vec2 entityDelta = uv - uEntityScreenPos;
    entityDelta.x *= (uResolution.x / max(1.0, uResolution.y));

    // Tạo hình dáng bóng cao gầy ở rìa mắt bằng trường khoảng cách elip đứng
    float bodyEllipse = length(vec2(entityDelta.x * 2.8, (entityDelta.y + 0.02) * 0.85));
    float headEllipse = length(vec2(entityDelta.x * 4.2, (entityDelta.y - 0.14) * 3.6));
    float silhouetteField = min(bodyEllipse, headEllipse);

    float entityPresence = 0.0;
    if (uEntityOnScreen > 0.5 && uPeripheralIntensity > 0.005) {
      float streakNoise = hash12(vec2(floor(uv.x * 160.0), floor(uTime * 8.0)));
      float silhouetteCore = 1.0 - smoothstep(0.06, 0.24, silhouetteField);
      entityPresence = silhouetteCore * uPeripheralIntensity * (0.85 + 0.15 * streakNoise);
      uv.x += (streakNoise - 0.5) * 0.012 * entityPresence;
      uv.y += sin(uv.y * 40.0 + uTime * 3.0) * 0.004 * periphMask;
    }

    // 2. Chromatic Aberration nhẹ ở rìa màn hình (tăng khi Kẻ Đo ở rìa tầm nhìn)
    float caAmount = uChromaticAberration * (1.0 + periphMask * 2.6 + uJumpScarePulse * 2.0) * edgeDist * 1.6;
    vec2 caDir = normalize(centerOffset + vec2(0.0001)) * caAmount;

    float rChannel = texture2D(tDiffuse, clamp(uv + caDir, 0.001, 0.999)).r;
    float gChannel = texture2D(tDiffuse, clamp(uv, 0.001, 0.999)).g;
    float bChannel = texture2D(tDiffuse, clamp(uv - caDir, 0.001, 0.999)).b;
    vec3 col = vec3(rChannel, gChannel, bChannel);

    // 3. Chỉnh màu phim nhựa 16mm: Tông xanh xám lạnh + giữ sắc vàng cam đèn natri rõ nét, dễ đọc
    col = pow(max(col, vec3(0.0)), vec3(0.86)); // Nâng gamma vùng trung tính để đọc rõ chi tiết kiến trúc
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 coldShadowTint = vec3(0.11, 0.18, 0.23);
    vec3 sodiumHighlight = vec3(1.10, 0.94, 0.78);

    col = mix(col + coldShadowTint * 0.18, col * sodiumHighlight, smoothstep(0.15, 0.75, col.r));

    // 4. Kết xuất bóng sương Kẻ Đo ở ngoại vi tầm nhìn
    if (entityPresence > 0.001) {
      vec3 fogShadowCol = vec3(0.03, 0.06, 0.08);
      vec3 rimMistCol = vec3(0.45, 0.72, 0.85);
      float rim = smoothstep(0.12, 0.24, silhouetteField) * (1.0 - smoothstep(0.24, 0.34, silhouetteField));
      col = mix(col, fogShadowCol, clamp(entityPresence * 0.82, 0.0, 0.88));
      col += rimMistCol * rim * uPeripheralIntensity * 0.45;
    }

    // 5. Hạt phim 16mm (Film Grain) — làm dịu tần số nếu bật Reduce Flashing
    float grainClock = uReduceFlashing > 0.5 ? floor(uTime * 2.0) : floor(uTime * 15.0);
    float grain = fract(sin(dot(uv + vec2(grainClock * 0.073), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    col += grain * uGrainIntensity * (1.0 - luma * 0.4);

    // 6. Vignette (Tối góc màn hình vừa phải, không che khuất tầm nhìn)
    float vigStrength = 0.65 + uTensionLevel * 0.025 + uPeripheralIntensity * 0.22 + uJumpScarePulse * 0.3;
    float vignette = 1.0 - smoothstep(0.38, 0.96, edgeDist * vigStrength);
    col *= mix(0.32, 1.0, vignette);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export class RendererManager {
  constructor(container, settings) {
    this.THREE = window.THREE;
    this.container = container;
    this.settings = settings;

    this.width = Math.max(1, window.innerWidth);
    this.height = Math.max(1, window.innerHeight);

    this.preset = GAME_CONFIG.graphicsPresets[settings.quality] || GAME_CONFIG.graphicsPresets.medium;
    this.drsScale = 1.0;
    this.avgFrameMs = 16.6;
    this.fps = 60;
    this.drsCooldownFrames = 0;

    // Thống kê cộng dồn vì post-processing vẽ lần 2 làm ghi đè renderer.info nếu autoReset=true
    this.lastStats = {
      fps: 60,
      frameTimeMs: 16.6,
      drawCalls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
      drsScale: 1.0
    };

    this._initThree();
    this._initPostProcess();

    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize, false);
  }

  _initThree() {
    const THREE = this.THREE;

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });

    // Phát hiện trình kết xuất phần mềm CPU (như SwiftShader trong môi trường Headless) để tự tối ưu tỷ lệ điểm ảnh
    this.isSoftwareRenderer = false;
    try {
      const gl = this.renderer.getContext();
      const dbg = gl && gl.getExtension('WEBGL_debug_renderer_info');
      const rendererStr = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
      if (/SwiftShader|llvmpipe|Software/i.test(rendererStr)) {
        this.isSoftwareRenderer = true;
      }
    } catch (_e) {}

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.32;
    this.renderer.shadowMap.enabled = Boolean(this.preset.shadows) && !this.isSoftwareRenderer;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.info.autoReset = false;

    this.renderer.domElement.id = 'game-canvas';
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100vw';
    this.renderer.domElement.style.height = '100vh';
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GAME_CONFIG.world.baseFogColor);
    this.scene.fog = new THREE.FogExp2(GAME_CONFIG.world.baseFogColor, GAME_CONFIG.hours[0].fogDensity);

    this.camera = new THREE.PerspectiveCamera(
      this.settings.fov || 72,
      this.width / this.height,
      GAME_CONFIG.world.cameraNear,
      GAME_CONFIG.world.cameraFar
    );
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);
  }

  _initPostProcess() {
    const THREE = this.THREE;
    const effectiveRatio = this._computeEffectivePixelRatio();
    const rtW = Math.max(64, Math.floor(this.width * effectiveRatio));
    const rtH = Math.max(64, Math.floor(this.height * effectiveRatio));

    this.renderer.setPixelRatio(effectiveRatio);
    this.renderer.setSize(this.width, this.height, false);

    this.renderTarget = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: true,
      stencilBuffer: false
    });

    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.postUniforms = {
      tDiffuse: { value: this.renderTarget.texture },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(rtW, rtH) },
      uGrainIntensity: { value: this.preset.grainIntensity },
      uChromaticAberration: { value: this.preset.chromaticAberration },
      uTensionLevel: { value: 2.0 },
      uPeripheralIntensity: { value: 0.0 },
      uEntityScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
      uEntityOnScreen: { value: 0.0 },
      uReduceFlashing: { value: this.settings.reduceFlashing ? 1.0 : 0.0 },
      uJumpScarePulse: { value: 0.0 }
    };

    this.postMaterial = new THREE.ShaderMaterial({
      vertexShader: POST_VERTEX_SHADER,
      fragmentShader: POST_FRAGMENT_SHADER,
      uniforms: this.postUniforms,
      depthWrite: false,
      depthTest: false
    });

    this.postQuadGeo = new THREE.PlaneGeometry(2, 2);
    this.postQuadMesh = new THREE.Mesh(this.postQuadGeo, this.postMaterial);
    this.postQuadMesh.frustumCulled = false;
    this.postScene.add(this.postQuadMesh);
  }

  _computeEffectivePixelRatio() {
    if (this.isSoftwareRenderer) {
      return Math.max(0.28, 0.36 * this.drsScale);
    }
    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2.0);
    return Math.max(0.55, Math.min(deviceRatio, this.preset.maxPixelRatio) * this.drsScale);
  }

  applySettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.preset = GAME_CONFIG.graphicsPresets[this.settings.quality] || GAME_CONFIG.graphicsPresets.medium;

    this.camera.fov = this.settings.fov || 72;
    this.camera.updateProjectionMatrix();

    this.renderer.shadowMap.enabled = Boolean(this.preset.shadows) && !this.isSoftwareRenderer;
    this.postUniforms.uGrainIntensity.value = this.preset.grainIntensity;
    this.postUniforms.uChromaticAberration.value = this.preset.chromaticAberration;
    this.postUniforms.uReduceFlashing.value = this.settings.reduceFlashing ? 1.0 : 0.0;

    this.drsScale = 1.0;
    this._updateRenderSize();
  }

  _onResize() {
    this.width = Math.max(1, window.innerWidth);
    this.height = Math.max(1, window.innerHeight);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this._updateRenderSize();
  }

  _updateRenderSize() {
    const effectiveRatio = this._computeEffectivePixelRatio();
    const rtW = Math.max(64, Math.floor(this.width * effectiveRatio));
    const rtH = Math.max(64, Math.floor(this.height * effectiveRatio));

    this.renderer.setPixelRatio(effectiveRatio);
    this.renderer.setSize(this.width, this.height, false);
    this.renderTarget.setSize(rtW, rtH);
    this.postUniforms.uResolution.value.set(rtW, rtH);
  }

  updateDynamicResolution(frameMs) {
    // Bỏ qua cú nhảy thời gian lúc biên dịch shader đầu tiên hoặc khi chuyển tab
    if (frameMs > 120) {
      return;
    }
    // Trung bình trượt thời gian mỗi khung hình
    this.avgFrameMs = this.avgFrameMs * 0.88 + frameMs * 0.12;
    this.fps = Math.min(144, Math.max(1, Math.round(1000 / Math.max(1, this.avgFrameMs))));

    if (!this.preset.drsEnabled) return;

    this.drsCooldownFrames++;
    if (this.drsCooldownFrames < 45) return;

    if (this.avgFrameMs > this.preset.targetFrameMs + 4.5 && this.drsScale > 0.65) {
      this.drsScale = Math.max(0.65, Number((this.drsScale - 0.1).toFixed(2)));
      this.drsCooldownFrames = 0;
      this._updateRenderSize();
    } else if (this.avgFrameMs < this.preset.targetFrameMs - 3.5 && this.drsScale < 1.0) {
      this.drsScale = Math.min(1.0, Number((this.drsScale + 0.08).toFixed(2)));
      this.drsCooldownFrames = 0;
      this._updateRenderSize();
    }
  }

  setPostParams({ elapsed, tension, peripheralIntensity, entityScreenX, entityScreenY, entityOnScreen, jumpScarePulse }) {
    this.postUniforms.uTime.value = elapsed;
    if (tension !== undefined) this.postUniforms.uTensionLevel.value = tension;
    if (peripheralIntensity !== undefined) this.postUniforms.uPeripheralIntensity.value = peripheralIntensity;
    if (entityScreenX !== undefined && entityScreenY !== undefined) {
      this.postUniforms.uEntityScreenPos.value.set(entityScreenX, entityScreenY);
    }
    if (entityOnScreen !== undefined) {
      this.postUniforms.uEntityOnScreen.value = entityOnScreen ? 1.0 : 0.0;
    }
    if (jumpScarePulse !== undefined) {
      this.postUniforms.uJumpScarePulse.value = jumpScarePulse;
    }
  }

  render() {
    this.renderer.info.reset();

    // Pass 1: Vẽ cảnh 3D vào RenderTarget
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    // Lưu chỉ số drawCalls/triangles của cảnh 3D trước khi vẽ pass hậu kỳ
    const sceneCalls = this.renderer.info.render.calls;
    const sceneTris = this.renderer.info.render.triangles;

    // Pass 2: Vẽ fullscreen quad hậu kỳ (gộp toàn bộ hiệu ứng + Kẻ Đo ngoại vi)
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCamera);

    this.lastStats.fps = this.fps;
    this.lastStats.frameTimeMs = Number(this.avgFrameMs.toFixed(2));
    this.lastStats.drawCalls = sceneCalls + 1;
    this.lastStats.triangles = sceneTris + 2;
    this.lastStats.geometries = this.renderer.info.memory.geometries;
    this.lastStats.textures = this.renderer.info.memory.textures;
    this.lastStats.drsScale = this.drsScale;
  }

  getRenderStats() {
    return this.lastStats;
  }

  dispose() {
    window.removeEventListener('resize', this._onResize, false);
    if (this.renderTarget) this.renderTarget.dispose();
    if (this.postQuadGeo) this.postQuadGeo.dispose();
    if (this.postMaterial) this.postMaterial.dispose();
    if (this.renderer) this.renderer.dispose();
  }
}
