/**
 * Module quản lý điều khiển (Input & Pointer Lock Controller)
 * Hỗ trợ: WASD + Chuột (Pointer Lock), Phím tắt E/F/Tab/Esc/F3, và Tay cầm (Gamepad API).
 */

import { GAME_CONFIG } from './config.js';

export class InputManager {
  constructor(domElement, callbacks = {}) {
    this.domElement = domElement;
    this.callbacks = callbacks;

    this.keys = new Set();
    this.justPressed = new Set();

    this.isPointerLocked = false;
    this.enabled = false;

    this.yaw = GAME_CONFIG.player.spawnYaw;
    this.pitch = 0;

    this.moveInput = { x: 0, z: 0, sprint: false };
    this.sensitivity = GAME_CONFIG.defaultSettings.sensitivity;
    this.invertY = GAME_CONFIG.defaultSettings.invertY;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerLockChange = this._onPointerLockChange.bind(this);
    this._onPointerLockError = this._onPointerLockError.bind(this);
    this._onWindowBlur = this._onWindowBlur.bind(this);

    this._bindEvents();
  }

  _bindEvents() {
    window.addEventListener('keydown', this._onKeyDown, false);
    window.addEventListener('keyup', this._onKeyUp, false);
    document.addEventListener('mousemove', this._onMouseMove, false);
    document.addEventListener('pointerlockchange', this._onPointerLockChange, false);
    document.addEventListener('pointerlockerror', this._onPointerLockError, false);
    window.addEventListener('blur', this._onWindowBlur, false);
  }

  applySettings(settings) {
    if (Number.isFinite(settings.sensitivity)) {
      this.sensitivity = settings.sensitivity;
    }
    this.invertY = Boolean(settings.invertY);
  }

  setLookAngles(yaw, pitch) {
    this.yaw = yaw;
    this.pitch = Math.max(GAME_CONFIG.player.minPitch, Math.min(GAME_CONFIG.player.maxPitch, pitch));
  }

  requestPointerLock() {
    if (!this.domElement || !this.domElement.requestPointerLock) return;
    try {
      const promise = this.domElement.requestPointerLock();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {});
      }
    } catch (_err) {
      // Một số trình duyệt headless không cho phép pointer lock nếu chưa có gesture thật
    }
  }

  exitPointerLock() {
    if (document.pointerLockElement && document.exitPointerLock) {
      try {
        document.exitPointerLock();
      } catch (_err) {}
    }
  }

  _onPointerLockChange() {
    const locked = document.pointerLockElement === this.domElement;
    const wasLocked = this.isPointerLocked;
    this.isPointerLocked = locked;

    if (wasLocked && !locked && this.enabled) {
      this.keys.clear();
      if (this.callbacks.onPointerLockLost) {
        this.callbacks.onPointerLockLost();
      }
    }
  }

  _onPointerLockError() {
    this.isPointerLocked = false;
  }

  _onWindowBlur() {
    this.keys.clear();
    if (this.enabled && this.callbacks.onWindowBlur) {
      this.callbacks.onWindowBlur();
    }
  }

  _onKeyDown(e) {
    const code = e.code;

    if (code === 'F3') {
      e.preventDefault();
      if (this.callbacks.onToggleDebug) this.callbacks.onToggleDebug();
      return;
    }

    if (code === 'Tab') {
      e.preventDefault();
      if (!e.repeat && this.callbacks.onToggleNotebook) {
        this.callbacks.onToggleNotebook();
      }
      return;
    }

    if (code === 'Escape') {
      if (!e.repeat && this.callbacks.onEscapePressed) {
        this.callbacks.onEscapePressed();
      }
      return;
    }

    if (!this.enabled) return;

    if (!this.keys.has(code)) {
      this.justPressed.add(code);
    }
    this.keys.add(code);

    if (!e.repeat) {
      if (code === 'KeyE' && this.callbacks.onInteract) {
        this.callbacks.onInteract();
      } else if (code === 'KeyF' && this.callbacks.onToggleFlashlight) {
        this.callbacks.onToggleFlashlight();
      }
    }
  }

  _onKeyUp(e) {
    this.keys.delete(e.code);
  }

  _onMouseMove(e) {
    if (!this.enabled || !this.isPointerLocked) return;

    const dx = e.movementX || 0;
    const dy = e.movementY || 0;
    const baseFactor = 0.0021 * this.sensitivity;

    this.yaw -= dx * baseFactor;
    const pitchDelta = dy * baseFactor * (this.invertY ? -1 : 1);
    this.pitch = Math.max(
      GAME_CONFIG.player.minPitch,
      Math.min(GAME_CONFIG.player.maxPitch, this.pitch - pitchDelta)
    );
  }

  update(dt) {
    let moveX = 0;
    let moveZ = 0;

    if (this.enabled) {
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) moveZ -= 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) moveZ += 1;
      if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) moveX -= 1;
      if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) moveX += 1;

      // Hỗ trợ tay cầm (Gamepad API) nếu được kết nối
      if (navigator.getGamepads) {
        const pads = navigator.getGamepads();
        const pad = pads && pads[0];
        if (pad) {
          const lx = pad.axes[0] || 0;
          const ly = pad.axes[1] || 0;
          const rx = pad.axes[2] || 0;
          const ry = pad.axes[3] || 0;
          if (Math.abs(lx) > 0.18) moveX += lx;
          if (Math.abs(ly) > 0.18) moveZ += ly;
          if (Math.abs(rx) > 0.18) this.yaw -= rx * 2.2 * this.sensitivity * dt;
          if (Math.abs(ry) > 0.18) {
            const pSign = this.invertY ? -1 : 1;
            this.pitch = Math.max(
              GAME_CONFIG.player.minPitch,
              Math.min(GAME_CONFIG.player.maxPitch, this.pitch - ry * 1.8 * this.sensitivity * pSign * dt)
            );
          }
        }
      }
    }

    const len = Math.hypot(moveX, moveZ);
    if (len > 1.0) {
      moveX /= len;
      moveZ /= len;
    }

    this.moveInput.x = moveX;
    this.moveInput.z = moveZ;
    this.moveInput.sprint = this.enabled && (this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'));
    this.justPressed.clear();
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown, false);
    window.removeEventListener('keyup', this._onKeyUp, false);
    document.removeEventListener('mousemove', this._onMouseMove, false);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange, false);
    document.removeEventListener('pointerlockerror', this._onPointerLockError, false);
    window.removeEventListener('blur', this._onWindowBlur, false);
  }
}
