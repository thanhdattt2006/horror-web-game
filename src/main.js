/**
 * Điểm vào chính & Vòng lặp Trò chơi (Main Application & Fixed-Timestep Game Loop)
 * Phiên bản Three.js cố định: three@0.186.1
 */

import { GAME_CONFIG } from './config.js';
import { SaveManager } from './save.js';
import { InputManager } from './input.js';
import { RendererManager } from './renderer.js';
import { UIManager } from './ui.js';

export class Tram9Game {
  constructor() {
    this.THREE = window.THREE;
    this.state = 'BOOT_LOADING';

    this.saveManager = new SaveManager();
    this.settings = this.saveManager.settings;

    // Phân tích tham số URL (?debug=1, ?skipTo=hour5, ?seed=123, ?ending=1)
    this.urlParams = new URLSearchParams(window.location.search);
    this.seed = Number(this.urlParams.get('seed')) || 199809;

    this.container = document.getElementById('canvas-container');
    this.rendererManager = new RendererManager(this.container, this.settings);

    this.player = {
      pos: new this.THREE.Vector3(
        GAME_CONFIG.player.spawnPos.x,
        GAME_CONFIG.player.spawnPos.y,
        GAME_CONFIG.player.spawnPos.z
      ),
      vel: new this.THREE.Vector3(0, 0, 0),
      yaw: GAME_CONFIG.player.spawnYaw,
      pitch: 0,
      flashlightOn: true,
      headBobPhase: 0,
      stepDistanceAccum: 0,
      stillSeconds: 0,
      currentSurface: 'wood',
      currentZone: 'Phòng Radio'
    };

    // Vector tạm cấp phát 1 lần để không tạo rác bộ nhớ trong vòng lặp
    this._forwardVec = new this.THREE.Vector3();
    this._rightVec = new this.THREE.Vector3();
    this._wishDir = new this.THREE.Vector3();
    this._prevDir = new this.THREE.Vector3(0, 0, -1);
    this._raycaster = new this.THREE.Raycaster();
    this._screenCenter = new this.THREE.Vector2(0, 0);

    this.elapsedTime = 0;
    this.accumulator = 0;
    this.lastFrameTime = performance.now();
    this.jumpScarePulse = 0;
    this.transitionTimer = 0;
    this.focusedInteractable = null;

    // Các hệ thống chuyên biệt (sẽ gắn kết khi khởi tạo)
    this.audioManager = null;
    this.worldManager = null;
    this.entityManager = null;
    this.storyManager = null;

    this._initSubsystems();
    this._bindLifecycleEvents();
    this._bootSequence();
  }

  _initSubsystems() {
    if (typeof AudioManager !== 'undefined') {
      this.audioManager = new AudioManager(this.settings);
    }

    this.ui = new UIManager(this.saveManager, {
      onConfirmWarning: () => this._handleConfirmWarning(),
      onStartNewGame: () => this.startNewGame(),
      onContinueGame: () => this.continueFromCheckpoint(),
      onResumeGame: () => this.resumeGame(),
      onOpenNotebookFromPause: () => this.openNotebook(),
      onCloseNotebook: () => this.closeNotebook(),
      onCloseInteraction: () => this.closeInteractionModal(),
      onReturnToTitle: () => this.returnToTitle(),
      onSettingsChanged: (newSettings) => this.applySettings(newSettings),
      onDebugSkipHour: (hr) => this.debugSkipToHour(hr),
      onDebugTriggerEnding: (endId) => this.triggerEnding(endId)
    });

    this.input = new InputManager(this.rendererManager.renderer.domElement, {
      onPointerLockLost: () => {
        if (this.state === 'PLAYING') {
          this.pauseGame();
        }
      },
      onWindowBlur: () => {
        if (this.state === 'PLAYING') {
          this.pauseGame();
        }
      },
      onEscapePressed: () => this._handleEscapeKey(),
      onToggleNotebook: () => this._handleTabKey(),
      onToggleDebug: () => this.ui.toggleDebugOverlay(),
      onInteract: () => this._handleInteractKey(),
      onToggleFlashlight: () => this.toggleFlashlight()
    });
    this.input.applySettings(this.settings);

    if (typeof WorldManager !== 'undefined') {
      this.worldManager = new WorldManager(
        this.rendererManager.scene,
        this.rendererManager.camera,
        this.settings
      );
    }

    if (typeof EntityManager !== 'undefined') {
      this.entityManager = new EntityManager(
        this.rendererManager.scene,
        this.rendererManager.camera,
        {
          onSecondFootstep: (x, z, surface) => {
            if (this.audioManager) {
              this.audioManager.playDelayedSecondFootstep(x, z, surface);
            }
            this.ui.showSubtitle('[Tiếng bước chân thứ hai bám theo sau nửa nhịp...]', 2.4);
          },
          onRoutineBroken: () => {
            if (this.storyManager) {
              this.storyManager.recordRoutineBroken();
            }
            this.ui.showNotification('Bóng lặp đã lệch nhịp và tan vào sương.', 2.8);
          },
          onDirectLookApproach: () => {
            if (this.audioManager) {
              this.audioManager.playPeripheralSting(0.45);
            }
            this.ui.showSubtitle('[Tiếng sương rít nhẹ — Nó vừa bước lại gần hơn khi bạn quay mắt đi]', 3.0);
          }
        }
      );
    }

    if (typeof StoryManager !== 'undefined') {
      this.storyManager = new StoryManager(this.saveManager, {
        ui: this.ui,
        audio: this.audioManager,
        world: this.worldManager,
        entity: this.entityManager,
        onHourChanged: (hourCfg) => this._onHourChanged(hourCfg),
        onTriggerJumpScare: (scareId) => this._triggerJumpScare(scareId),
        onTriggerEnding: (endingId) => this.triggerEnding(endingId)
      });
    }

    this._prewarmGpuResources();
  }

  _prewarmGpuResources() {
    if (!this.worldManager || !this.rendererManager) return;
    const wm = this.worldManager;
    const em = this.entityManager;
    const hiddenMeshes = [
      wm.duplicateCupMesh,
      wm.bedFrostFigure,
      wm.windowScareFigure,
      wm.interiorFogMesh,
      em ? em.echoGroup : null
    ].filter(Boolean);

    hiddenMeshes.forEach((m) => {
      m.visible = true;
    });
    const prevCulled = new Map();
    this.rendererManager.scene.traverse((obj) => {
      if (obj.isMesh) {
        prevCulled.set(obj, obj.frustumCulled);
        obj.frustumCulled = false;
      }
    });
    this.rendererManager.render();
    prevCulled.forEach((val, obj) => {
      obj.frustumCulled = val;
    });
    hiddenMeshes.forEach((m) => {
      m.visible = false;
    });
  }

  _bindLifecycleEvents() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.state === 'PLAYING') {
          this.pauseGame();
        }
        if (this.audioManager) {
          this.audioManager.suspendAudio();
        }
      } else if (this.audioManager && this.state === 'PLAYING') {
        this.audioManager.resumeAudio();
      }
    });

    // Cho phép nhấp vào canvas khi đang chơi để khóa lại chuột
    this.rendererManager.renderer.domElement.addEventListener('click', () => {
      if (this.state === 'PLAYING' && !this.input.isPointerLocked) {
        this.input.requestPointerLock();
      }
    });
  }

  _bootSequence() {
    this.ui.setLoadingProgress(40, 'Đang dựng địa hình Đỉnh Mù Sương & Trạm Khí Tượng Số 9...');

    if (this.urlParams.get('debug') === '1') {
      this.ui.toggleDebugOverlay(true);
    }

    setTimeout(() => {
      this.ui.setLoadingProgress(85, 'Đang khởi tạo bộ tổng hợp âm thanh Web Audio & Shader 16mm...');
      setTimeout(() => {
        this.ui.setLoadingProgress(100, 'Hệ thống đã sẵn sàng.');
        this.state = 'WARNING_SCREEN';
        this.ui.showModal('warning');

        // Xử lý tham số debug nhảy nhanh đến giờ trực hoặc kết thúc
        this._checkUrlDebugShortcuts();
      }, 120);
    }, 100);

    this._animate = this._animate.bind(this);
    requestAnimationFrame(this._animate);
  }

  _checkUrlDebugShortcuts() {
    const skipTo = this.urlParams.get('skipTo');
    const debugEnding = this.urlParams.get('ending');
    const collectAll = this.urlParams.get('collectAllNotes') === '1';

    if (skipTo) {
      const match = /^hour([1-6])$/i.exec(skipTo);
      if (match) {
        const targetHour = Number(match[1]);
        this.startNewGame(targetHour);
        if (collectAll && this.storyManager) {
          this.storyManager.debugCollectAllNotes();
        }
      }
    } else if (debugEnding) {
      const endId = Number(debugEnding);
      if (endId >= 1 && endId <= 4) {
        this.startNewGame(6);
        if (endId === 4 && this.storyManager) {
          this.storyManager.debugCollectAllNotes();
        }
        this.triggerEnding(endId);
      }
    }
  }

  _handleConfirmWarning() {
    if (this.audioManager) {
      this.audioManager.unlockAudio();
      this.audioManager.playUiClick();
    }
    this.state = 'TITLE_SCREEN';
    this.ui.showModal('title');
  }

  applySettings(newSettings) {
    this.settings = newSettings;
    this.rendererManager.applySettings(newSettings);
    this.input.applySettings(newSettings);
    if (this.worldManager) {
      this.worldManager.applySettings(newSettings);
    }
    if (this.audioManager) {
      this.audioManager.applySettings(newSettings);
    }
  }

  startNewGame(startHour = 1) {
    if (this.audioManager) {
      this.audioManager.unlockAudio();
      this.audioManager.playUiClick();
    }

    this.saveManager.resetRunSaveKeepEndings();
    this._resetPlayerPose();

    if (this.entityManager) {
      this.entityManager.resetAll();
    }

    if (this.storyManager) {
      this.storyManager.startAtHour(startHour, true);
    } else {
      this.ui.updateHUD({
        hourConfig: GAME_CONFIG.hours[startHour - 1],
        checklistItems: [],
        flashlightOn: this.player.flashlightOn,
        collectedNotesCount: 0,
        interactLabel: null
      });
    }

    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
    this.input.requestPointerLock();
  }

  continueFromCheckpoint() {
    if (this.audioManager) {
      this.audioManager.unlockAudio();
      this.audioManager.playUiClick();
    }

    const savedHour = this.saveManager.saveData.checkpointHour || 1;
    this._resetPlayerPose();

    if (this.storyManager) {
      this.storyManager.startAtHour(savedHour, false);
    }

    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
    this.input.requestPointerLock();
  }

  _resetPlayerPose() {
    this.player.pos.set(
      GAME_CONFIG.player.spawnPos.x,
      GAME_CONFIG.player.spawnPos.y,
      GAME_CONFIG.player.spawnPos.z
    );
    this.player.vel.set(0, 0, 0);
    this.input.setLookAngles(GAME_CONFIG.player.spawnYaw, 0);
    this.player.yaw = GAME_CONFIG.player.spawnYaw;
    this.player.pitch = 0;
    this.player.flashlightOn = true;
    if (this.worldManager) {
      this.worldManager.setFlashlight(true);
    }
  }

  pauseGame() {
    if (this.state !== 'PLAYING') return;
    this.state = 'PAUSED';
    this.input.enabled = false;
    this.input.exitPointerLock();
    this.ui.showModal('pause');
  }

  resumeGame() {
    if (this.audioManager) {
      this.audioManager.resumeAudio();
      this.audioManager.playUiClick();
    }
    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
    this.input.requestPointerLock();
  }

  openNotebook() {
    if (this.audioManager) this.audioManager.playPaperRustle();
    this.state = 'NOTEBOOK_OPEN';
    this.input.enabled = false;
    this.input.exitPointerLock();
    if (this.storyManager) {
      this.ui.renderNotebook(this.storyManager.getNotebookState());
    } else {
      this.ui.renderNotebook(this.saveManager.saveData);
    }
    this.ui.showModal('notebook');
  }

  closeNotebook() {
    if (this.audioManager) this.audioManager.playPaperRustle();
    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
    this.input.requestPointerLock();
  }

  closeInteractionModal() {
    if (this.state !== 'INTERACTION_MODAL') return;
    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
    this.input.requestPointerLock();
  }

  returnToTitle() {
    this.state = 'TITLE_SCREEN';
    this.input.enabled = false;
    this.input.exitPointerLock();
    this.ui.showModal('title');
  }

  toggleFlashlight() {
    this.player.flashlightOn = !this.player.flashlightOn;
    if (this.worldManager) {
      this.worldManager.setFlashlight(this.player.flashlightOn);
    }
    if (this.audioManager) {
      this.audioManager.playSwitchClick();
    }
  }

  _handleEscapeKey() {
    if (this.state === 'PLAYING') {
      this.pauseGame();
    } else if (this.state === 'PAUSED') {
      this.resumeGame();
    } else if (this.state === 'NOTEBOOK_OPEN') {
      this.closeNotebook();
    } else if (this.state === 'INTERACTION_MODAL') {
      this.closeInteractionModal();
    }
  }

  _handleTabKey() {
    if (this.state === 'PLAYING') {
      this.openNotebook();
    } else if (this.state === 'NOTEBOOK_OPEN') {
      this.closeNotebook();
    }
  }

  _handleInteractKey() {
    if (this.state !== 'PLAYING' || !this.focusedInteractable) return;
    if (this.storyManager) {
      const openedModal = this.storyManager.handleInteract(this.focusedInteractable);
      if (openedModal) {
        this.state = 'INTERACTION_MODAL';
        this.input.enabled = false;
        this.input.exitPointerLock();
      }
    }
  }

  _onHourChanged(hourCfg) {
    this.state = 'HOUR_TRANSITION';
    this.input.enabled = false;
    this.transitionTimer = 2.4;
    this.ui.showHourTransition(hourCfg);

    // Đổi mật độ sương & màu nền theo giờ trực
    const fogColor =
      hourCfg.hour === 6 ? GAME_CONFIG.world.dawnFogColor : GAME_CONFIG.world.baseFogColor;
    this.rendererManager.scene.background.setHex(fogColor);
    this.rendererManager.scene.fog.color.setHex(fogColor);
    this.rendererManager.scene.fog.density = hourCfg.fogDensity;
  }

  _triggerJumpScare(scareId) {
    this.jumpScarePulse = 1.0;
    if (this.audioManager) {
      this.audioManager.playJumpScareStinger(scareId);
    }
    if (scareId === 1) {
      this.ui.showSubtitle('[Tiếng thở lạnh sát bên kia kính cửa sổ — một bóng người cầm sổ tay vừa đứng nhìn bạn!]', 4.5);
    } else {
      this.ui.showSubtitle('[Bộ đàm rè vang chính giọng nói của bạn — Bóng lặp bước ngược từ trong sương ra!]', 4.5);
    }
  }

  debugSkipToHour(hourNum) {
    const h = Math.min(6, Math.max(1, Number(hourNum) || 1));
    if (this.storyManager) {
      this.storyManager.startAtHour(h, false);
    }
    this.state = 'PLAYING';
    this.input.enabled = true;
    this.ui.showModal('none');
  }

  triggerEnding(endingId) {
    this.state = 'ENDING_SCREEN';
    this.input.enabled = false;
    this.input.exitPointerLock();

    this.saveManager.recordEndingUnlocked(endingId);
    if (this.audioManager) {
      this.audioManager.playEndingChord(endingId);
    }

    const flags = this.storyManager
      ? this.storyManager.flags
      : this.saveManager.saveData.flags;
    const notesCount = this.storyManager
      ? this.storyManager.collectedNotes.size
      : this.saveManager.saveData.collectedNotes.length;

    this.ui.showEndingScreen(
      endingId,
      {
        notesCount,
        trueReportCount: flags.trueReportCount || 0,
        routineBrokenCount: flags.routineBrokenCount || 0,
        assimilationScore: flags.assimilationScore || 0
      },
      this.saveManager.saveData.unlockedEndings
    );
  }

  _fixedUpdate(dt) {
    this.elapsedTime += dt;
    this.ui.update(dt);

    if (this.jumpScarePulse > 0) {
      this.jumpScarePulse = Math.max(0, this.jumpScarePulse - dt * 1.4);
    }

    if (this.state === 'HOUR_TRANSITION') {
      this.transitionTimer -= dt;
      if (this.transitionTimer <= 0) {
        this.state = 'PLAYING';
        this.input.enabled = true;
        this.ui.showModal('none');
        this.input.requestPointerLock();
      }
      return;
    }

    if (this.state !== 'PLAYING') {
      // Khi ở màn hình Title, xoay nhẹ camera quanh sân trạm tạo cảnh nền có chiều sâu
      if (this.state === 'TITLE_SCREEN' || this.state === 'WARNING_SCREEN' || this.state === 'BOOT_LOADING') {
        const angle = this.elapsedTime * 0.12;
        this.rendererManager.camera.position.set(
          Math.sin(angle) * 9.5,
          3.4,
          12.0 + Math.cos(angle) * 4.5
        );
        this.rendererManager.camera.lookAt(0, 1.8, 0);
      }
      if (this.worldManager) {
        this.worldManager.update(dt, this.elapsedTime, this.player.pos);
      }
      return;
    }

    this.input.update(dt);
    this._updatePlayerMovement(dt);
    this._updateRaycastInteraction();

    if (this.worldManager) {
      this.worldManager.update(dt, this.elapsedTime, this.player.pos);
    }

    const currentHour = this.storyManager ? this.storyManager.currentHour : 1;
    const hourCfg = GAME_CONFIG.hours[currentHour - 1];

    if (this.entityManager) {
      this.entityManager.update(
        dt,
        this.elapsedTime,
        this.player,
        this.rendererManager.camera,
        currentHour,
        this.player.flashlightOn
      );
    }

    if (this.storyManager) {
      this.storyManager.update(dt, this.player);
    }

    if (this.audioManager) {
      const entityDist = this.entityManager ? this.entityManager.currentDistance : 20.0;
      this.audioManager.update(
        dt,
        this.elapsedTime,
        this.player.pos,
        this.player.yaw,
        hourCfg,
        entityDist
      );
    }

    // Cập nhật HUD
    const interactLabel = this.focusedInteractable ? this.focusedInteractable.userData.label : null;
    this.ui.updateHUD({
      hourConfig: hourCfg,
      checklistItems: this.storyManager ? this.storyManager.getChecklist() : [],
      flashlightOn: this.player.flashlightOn,
      collectedNotesCount: this.storyManager ? this.storyManager.collectedNotes.size : 0,
      interactLabel
    });
  }

  _updatePlayerMovement(dt) {
    this.player.yaw = this.input.yaw;
    this.player.pitch = this.input.pitch;

    const moveX = this.input.moveInput.x;
    const moveZ = this.input.moveInput.z;
    const targetSpeed = this.input.moveInput.sprint
      ? GAME_CONFIG.player.sprintSpeed
      : GAME_CONFIG.player.walkSpeed;

    this._forwardVec.set(-Math.sin(this.player.yaw), 0, -Math.cos(this.player.yaw)).normalize();
    this._rightVec.set(Math.cos(this.player.yaw), 0, -Math.sin(this.player.yaw)).normalize();

    this._wishDir.set(0, 0, 0);
    this._wishDir.addScaledVector(this._rightVec, moveX);
    this._wishDir.addScaledVector(this._forwardVec, -moveZ);
    if (this._wishDir.lengthSq() > 0.0001) {
      this._wishDir.normalize();
    }

    const accel = GAME_CONFIG.player.acceleration;
    const damping = GAME_CONFIG.player.damping;

    this.player.vel.x += (this._wishDir.x * targetSpeed - this.player.vel.x) * Math.min(1, accel * dt);
    this.player.vel.z += (this._wishDir.z * targetSpeed - this.player.vel.z) * Math.min(1, accel * dt);

    if (this._wishDir.lengthSq() < 0.001) {
      this.player.vel.x *= Math.max(0, 1 - damping * dt);
      this.player.vel.z *= Math.max(0, 1 - damping * dt);
    }

    const nextX = this.player.pos.x + this.player.vel.x * dt;
    const nextZ = this.player.pos.z + this.player.vel.z * dt;

    if (this.worldManager) {
      const resolved = this.worldManager.resolveCollision(
        this.player.pos.x,
        this.player.pos.z,
        nextX,
        nextZ,
        GAME_CONFIG.player.radius
      );
      this.player.pos.x = resolved.x;
      this.player.pos.z = resolved.z;
      this.player.currentSurface = this.worldManager.getSurfaceAt(this.player.pos.x, this.player.pos.z);
      this.player.currentZone = this.worldManager.getZoneNameAt(this.player.pos.x, this.player.pos.z);
    } else {
      this.player.pos.x = Math.max(-22, Math.min(22, nextX));
      this.player.pos.z = Math.max(-22, Math.min(26, nextZ));
    }

    const horizSpeed = Math.hypot(this.player.vel.x, this.player.vel.z);
    if (horizSpeed > 0.25) {
      this.player.stillSeconds = 0;
      this.player.stepDistanceAccum += horizSpeed * dt;
      const stepStride = this.input.moveInput.sprint ? 1.75 : 1.45;
      if (this.player.stepDistanceAccum >= stepStride) {
        this.player.stepDistanceAccum = 0;
        if (this.audioManager) {
          this.audioManager.playFootstep(this.player.currentSurface);
        }
        if (this.entityManager) {
          this.entityManager.onPlayerStep(this.player.pos.x, this.player.pos.z, this.player.currentSurface);
        }
      }
      this.player.headBobPhase += dt * GAME_CONFIG.player.headBobFrequency * (horizSpeed / GAME_CONFIG.player.walkSpeed);
    } else {
      this.player.stillSeconds += dt;
      this.player.headBobPhase *= 0.9;
    }

    const bobOffset = this.settings.headBob
      ? Math.sin(this.player.headBobPhase) * GAME_CONFIG.player.headBobAmplitude * Math.min(1, horizSpeed / 2.5)
      : 0;

    this.rendererManager.camera.position.set(
      this.player.pos.x,
      GAME_CONFIG.player.eyeHeight + bobOffset,
      this.player.pos.z
    );
    this.rendererManager.camera.rotation.y = this.player.yaw;
    this.rendererManager.camera.rotation.x = this.player.pitch;
  }

  _updateRaycastInteraction() {
    this.focusedInteractable = null;
    if (!this.worldManager || !this.worldManager.interactables.length) return;

    this._raycaster.setFromCamera(this._screenCenter, this.rendererManager.camera);
    this._raycaster.far = GAME_CONFIG.player.interactDistance;

    const hits = this._raycaster.intersectObjects(this.worldManager.interactables, true);
    for (let i = 0; i < hits.length; i++) {
      let obj = hits[i].object;
      while (obj && (!obj.userData || !obj.userData.interactId)) {
        obj = obj.parent;
      }
      if (obj && obj.visible && obj.userData && obj.userData.interactId) {
        this.focusedInteractable = obj;
        break;
      }
    }
  }

  _animate(now) {
    requestAnimationFrame(this._animate);

    const rawDeltaMs = Math.max(0.1, now - this.lastFrameTime);
    this.lastFrameTime = now;

    // Bỏ qua cập nhật khi tab bị ẩn hoàn toàn
    if (document.hidden) return;

    this.rendererManager.updateDynamicResolution(rawDeltaMs);

    const clampedDelta = Math.min(rawDeltaMs / 1000, GAME_CONFIG.maxDeltaClamp);
    this.accumulator += clampedDelta;

    const fixedDt = GAME_CONFIG.fixedTimeStep;
    let subSteps = 0;
    while (this.accumulator >= fixedDt && subSteps < 6) {
      this._fixedUpdate(fixedDt);
      this.accumulator -= fixedDt;
      subSteps++;
    }

    const currentHour = this.storyManager ? this.storyManager.currentHour : 1;
    const hourCfg = GAME_CONFIG.hours[currentHour - 1];
    const periphState = this.entityManager
      ? this.entityManager.getShaderState()
      : { intensity: 0, screenX: 0.5, screenY: 0.5, onScreen: false, dot: 0 };

    this.rendererManager.setPostParams({
      elapsed: this.elapsedTime,
      tension: hourCfg ? hourCfg.tension : 2.0,
      peripheralIntensity: periphState.intensity,
      entityScreenX: periphState.screenX,
      entityScreenY: periphState.screenY,
      entityOnScreen: periphState.onScreen,
      jumpScarePulse: this.jumpScarePulse
    });

    this.rendererManager.render();

    if (this.ui.debugVisible) {
      const rStats = this.rendererManager.getRenderStats();
      const flags = this.storyManager ? this.storyManager.flags : this.saveManager.saveData.flags;
      this.ui.updateDebugOverlay(rStats, {
        hour: currentHour,
        zone: this.player.currentZone,
        posX: this.player.pos.x.toFixed(1),
        posY: this.player.pos.y.toFixed(1),
        posZ: this.player.pos.z.toFixed(1),
        periphDot: periphState.dot.toFixed(2),
        periphIntensity: periphState.intensity.toFixed(2),
        predictability: this.entityManager ? Math.round(this.entityManager.routinePredictability * 100) : 0,
        assimilation: Math.round(flags.assimilationScore || 0),
        notes: this.storyManager ? this.storyManager.collectedNotes.size : 0,
        broken: flags.routineBrokenCount || 0,
        trueReports: flags.trueReportCount || 0
      });
    }
  }
}

// Khởi chạy khi DOM sẵn sàng và không bị lỗi CDN
window.addEventListener('DOMContentLoaded', () => {
  if (window.__TRAM9_CDN_FAILED__ || typeof window.THREE === 'undefined') {
    return;
  }
  window.__TRAM9_GAME__ = new Tram9Game();
});
