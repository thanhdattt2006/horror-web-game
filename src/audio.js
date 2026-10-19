/**
 * Module Âm thanh Thủ tục & Không gian 3D (Procedural Web Audio API + HRTF PannerNode)
 * Tổng hợp hoàn toàn bằng code: Drone nền, Gió cao nguyên (tắt lặng ở Giờ 4),
 * Máy phát điện Diesel 3D, Radio nhiễu & Thoại tổng hợp, Nhịp tim,
 * Bước chân theo chất liệu sàn (wood, concrete, gravel) và Bước chân thứ hai trễ 0.35s.
 */

import { GAME_CONFIG } from './config.js';

export class AudioManager {
  constructor(settings) {
    this.settings = { ...GAME_CONFIG.defaultSettings, ...settings };
    this.ctx = null;
    this.unlocked = false;

    this.masterCompressor = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.voiceGain = null;

    this.noiseBuffer = null;
    this.droneOscA = null;
    this.droneOscB = null;
    this.droneFilter = null;
    this.droneNodeGain = null;

    this.windSource = null;
    this.windFilter = null;
    this.windNodeGain = null;

    this.genOsc = null;
    this.genPanner = null;
    this.genGain = null;

    this.heartbeatTimer = 0;
  }

  unlockAudio() {
    if (this.unlocked && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();

      // Bộ nén âm (Compressor / Limiter) ở cuối chuỗi để chống vỡ tiếng tuyệt đối
      this.masterCompressor = this.ctx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.masterCompressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(8, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterCompressor.connect(this.ctx.destination);

      // 3 nhánh âm lượng độc lập: BGM (Drone/Gió), SFX (Bước chân/Máy móc), Voice (Radio)
      this.bgmGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.voiceGain = this.ctx.createGain();

      this.bgmGain.connect(this.masterCompressor);
      this.sfxGain.connect(this.masterCompressor);
      this.voiceGain.connect(this.masterCompressor);

      this._createNoiseBuffer();
      this._startAmbientLoops();
      this.applySettings(this.settings);

      this.unlocked = true;
    } catch (_err) {
      // Môi trường không hỗ trợ Web Audio vẫn chạy game bình thường
    }
  }

  _createNoiseBuffer() {
    if (!this.ctx) return;
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * 3; // 3 giây nhiễu hồng/trắng lặp vòng
    this.noiseBuffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = this.noiseBuffer.getChannelData(0);

    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.950 * b2 + white * 0.048;
      data[i] = Math.max(-0.95, Math.min(0.95, (b0 + b1 + b2 + white * 0.18) * 0.65));
    }
  }

  _createHRTFPanner(x, y, z, refDist = 2.0, maxDist = 24.0) {
    const panner = this.ctx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = refDist;
    panner.maxDistance = maxDist;
    panner.rolloffFactor = 1.25;
    if (panner.positionX) {
      panner.positionX.setValueAtTime(x, this.ctx.currentTime);
      panner.positionY.setValueAtTime(y, this.ctx.currentTime);
      panner.positionZ.setValueAtTime(z, this.ctx.currentTime);
    } else if (panner.setPosition) {
      panner.setPosition(x, y, z);
    }
    return panner;
  }

  _startAmbientLoops() {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;

    // 1. Drone nền trầm lạnh (44 Hz + 65.8 Hz)
    this.droneOscA = this.ctx.createOscillator();
    this.droneOscB = this.ctx.createOscillator();
    this.droneOscA.type = 'sawtooth';
    this.droneOscB.type = 'triangle';
    this.droneOscA.frequency.setValueAtTime(44.0, now);
    this.droneOscB.frequency.setValueAtTime(65.8, now);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(135, now);

    this.droneNodeGain = this.ctx.createGain();
    this.droneNodeGain.gain.setValueAtTime(0.14, now);

    this.droneOscA.connect(this.droneFilter);
    this.droneOscB.connect(this.droneFilter);
    this.droneFilter.connect(this.droneNodeGain);
    this.droneNodeGain.connect(this.bgmGain);

    this.droneOscA.start(now);
    this.droneOscB.start(now);

    // 2. Tiếng gió cao nguyên qua khe núi
    this.windSource = this.ctx.createBufferSource();
    this.windSource.buffer = this.noiseBuffer;
    this.windSource.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(340, now);
    this.windFilter.Q.setValueAtTime(2.6, now);

    this.windNodeGain = this.ctx.createGain();
    this.windNodeGain.gain.setValueAtTime(0.22, now);

    this.windSource.connect(this.windFilter);
    this.windFilter.connect(this.windNodeGain);
    this.windNodeGain.connect(this.bgmGain);
    this.windSource.start(now);

    // 3. Nguồn âm thanh 3D HRTF của Máy Phát Điện Diesel tại (4.3, 0.8, 3.6)
    this.genOsc = this.ctx.createOscillator();
    this.genOsc.type = 'sawtooth';
    this.genOsc.frequency.setValueAtTime(27.5, now);

    const genFilter = this.ctx.createBiquadFilter();
    genFilter.type = 'lowpass';
    genFilter.frequency.setValueAtTime(110, now);

    this.genGain = this.ctx.createGain();
    this.genGain.gain.setValueAtTime(0.25, now);

    this.genPanner = this._createHRTFPanner(4.3, 0.8, 3.6, 1.8, 16.0);

    this.genOsc.connect(genFilter);
    genFilter.connect(this.genGain);
    this.genGain.connect(this.genPanner);
    this.genPanner.connect(this.sfxGain);
    this.genOsc.start(now);

    // Panner 3D tái sử dụng cho tiếng bước chân thứ hai và đài Radio (tránh cấp phát PannerNode mới)
    this.secondStepPanner = this._createHRTFPanner(0, 0.2, 5.0, 1.5, 18.0);
    this.secondStepPanner.connect(this.sfxGain);

    this.radioPanner = this._createHRTFPanner(-3.9, 1.05, -3.85, 1.5, 14.0);
    this.radioPanner.connect(this.voiceGain);
  }

  applySettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    this.bgmGain.gain.setTargetAtTime(this.settings.bgmVolume, now, 0.05);
    this.sfxGain.gain.setTargetAtTime(this.settings.sfxVolume, now, 0.05);
    this.voiceGain.gain.setTargetAtTime(this.settings.voiceVolume, now, 0.05);
  }

  suspendAudio() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  resumeAudio() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  update(dt, elapsed, playerPos, playerYaw, hourCfg, entityDist) {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;

    // Cập nhật vị trí & hướng tai nghe 3D (AudioListener)
    const listener = this.ctx.listener;
    const fx = -Math.sin(playerYaw);
    const fz = -Math.cos(playerYaw);
    if (listener.positionX) {
      listener.positionX.setValueAtTime(playerPos.x, now);
      listener.positionY.setValueAtTime(playerPos.y, now);
      listener.positionZ.setValueAtTime(playerPos.z, now);
      listener.forwardX.setValueAtTime(fx, now);
      listener.forwardY.setValueAtTime(0, now);
      listener.forwardZ.setValueAtTime(fz, now);
      listener.upX.setValueAtTime(0, now);
      listener.upY.setValueAtTime(1, now);
      listener.upZ.setValueAtTime(0, now);
    } else if (listener.setPosition) {
      listener.setPosition(playerPos.x, playerPos.y, playerPos.z);
      listener.setOrientation(fx, 0, fz, 0, 1, 0);
    }

    // Dùng im lặng như một công cụ: Giờ 4 gió tắt hẳn -> tạo khoảng lặng rợn người
    const windSpeed = hourCfg ? hourCfg.windSpeedKmh : 14;
    const isOutside = playerPos.z > 5.0 || playerPos.x > 6.0;
    if (windSpeed <= 0.5) {
      this.windNodeGain.gain.setTargetAtTime(0.003, now, 0.4);
      this.droneNodeGain.gain.setTargetAtTime(0.05, now, 0.4);
    } else {
      const windLevel = Math.min(0.45, (windSpeed / 55) * (isOutside ? 0.42 : 0.16));
      const filterFreq = 240 + windSpeed * 6.5 + Math.sin(elapsed * 0.7) * 85;
      this.windNodeGain.gain.setTargetAtTime(windLevel, now, 0.2);
      this.windFilter.frequency.setTargetAtTime(filterFreq, now, 0.2);
      this.droneNodeGain.gain.setTargetAtTime(0.12 + (hourCfg ? hourCfg.tension * 0.012 : 0.02), now, 0.3);
    }

    // Nhịp tim đập khi Kẻ Đo ở gần (< 9.5m)
    if (entityDist < 9.5) {
      this.heartbeatTimer -= dt;
      const beatInterval = Math.max(0.42, (entityDist / 9.5) * 1.05);
      if (this.heartbeatTimer <= 0) {
        this.heartbeatTimer = beatInterval;
        this.playHeartbeat((10.0 - entityDist) / 10.0);
      }
    }
  }

  playFootstep(surface = 'wood', targetDest = null, pitchScale = 1.0) {
    if (!this.ctx || !this.unlocked || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;

    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    if (surface === 'wood') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260 * pitchScale, now);
      env.gain.setValueAtTime(0.28, now);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    } else if (surface === 'concrete') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(520 * pitchScale, now);
      env.gain.setValueAtTime(0.22, now);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    } else {
      // Sỏi đá ngoài sân (gravel)
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1150 * pitchScale, now);
      filter.Q.setValueAtTime(1.4, now);
      env.gain.setValueAtTime(0.24, now);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    }

    src.connect(filter);
    filter.connect(env);
    env.connect(targetDest || this.sfxGain);

    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      env.disconnect();
    };

    const offset = Math.random() * 1.8;
    src.start(now, offset, 0.16);
  }

  playDelayedSecondFootstep(x, z, surface = 'wood') {
    if (!this.ctx || !this.unlocked || !this.secondStepPanner) return;
    const delayMs = GAME_CONFIG.entity.secondFootstepDelay * 1000;
    setTimeout(() => {
      if (!this.ctx || !this.unlocked || !this.secondStepPanner) return;
      const now = this.ctx.currentTime;
      if (this.secondStepPanner.positionX) {
        this.secondStepPanner.positionX.setValueAtTime(x, now);
        this.secondStepPanner.positionY.setValueAtTime(0.2, now);
        this.secondStepPanner.positionZ.setValueAtTime(z, now);
      } else if (this.secondStepPanner.setPosition) {
        this.secondStepPanner.setPosition(x, 0.2, z);
      }
      this.playFootstep(surface, this.secondStepPanner, 0.86);
    }, delayMs);
  }

  playHeartbeat(intensity = 0.5) {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(58, now);
    osc.frequency.exponentialRampToValueAtTime(34, now + 0.18);

    const vol = Math.min(0.45, 0.12 + intensity * 0.28);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
    osc.start(now);
    osc.stop(now + 0.24);
  }

  playPeripheralSting(intensity = 0.5) {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.linearRampToValueAtTime(142, now + 0.55);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.16 * intensity, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
    osc.start(now);
    osc.stop(now + 0.62);
  }

  playJumpScareStinger(scareId = 1) {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const freqs = scareId === 1 ? [110, 116.5, 233, 311] : [92.5, 130.8, 185, 277.2];

    freqs.forEach((f) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.88, now + 1.1);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
      osc.start(now);
      osc.stop(now + 1.2);
    });
  }

  playRadioTransmission(isEmergency1084 = false) {
    if (!this.ctx || !this.unlocked || !this.noiseBuffer || !this.radioPanner) return;
    const now = this.ctx.currentTime;

    // Tiếng nhiễu sóng ngắn
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isEmergency1084 ? 1450 : 980, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 1.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.radioPanner);
    noise.onended = () => {
      noise.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
    noise.start(now, 0, 1.45);

    // Chuỗi xung âm sắc bộ đàm
    const baseFreq = isEmergency1084 ? 480 : 320;
    for (let i = 0; i < 5; i++) {
      const t = now + i * 0.22;
      const osc = this.ctx.createOscillator();
      const oGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq + ((i * 67) % 140), t);
      oGain.gain.setValueAtTime(0.08, t);
      oGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(oGain);
      oGain.connect(this.radioPanner);
      osc.onended = () => {
        osc.disconnect();
        oGain.disconnect();
      };
      osc.start(t);
      osc.stop(t + 0.18);
    }
  }

  playSwitchClick() {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(920, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  playPaperRustle() {
    if (!this.ctx || !this.unlocked || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, now);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    src.start(now, 0.2, 0.13);
  }

  playInteractChime() {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.09);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playUiClick() {
    this.playSwitchClick();
  }

  playEndingChord(endingId) {
    if (!this.ctx || !this.unlocked) return;
    const now = this.ctx.currentTime;
    const chords = {
      1: [110, 130.81, 164.81, 196.0],
      2: [146.83, 185.0, 220.0, 293.66],
      3: [130.81, 164.81, 196.0, 246.94],
      4: [146.83, 196.0, 246.94, 293.66]
    };
    const notes = chords[endingId] || chords[1];
    notes.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(now);
      osc.stop(now + 3.6);
    });
  }
}
