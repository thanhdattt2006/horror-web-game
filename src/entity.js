/**
 * Module Thực thể "Kẻ Đo" (The Measurer: Peripheral Presence & Routine Learning System)
 * 1. Hiện diện ngoại vi: Tính tích vô hướng góc nhìn, kết hợp lưới 3D bán trong suốt và GPU Post-Shader.
 *    Nhìn thẳng -> tan vào sương; quay mặt đi -> dịch lại gần 2.35m.
 * 2. Học thói quen: Ghi lại quỹ đạo, điểm dừng lâu (Quy tắc 7) và thứ tự trạm đo (Quy tắc 1) mỗi giờ;
 *    từ Giờ 3 phát lại bóng lặp + tiếng bước chân thứ hai trễ nửa nhịp (Quy tắc 2).
 */

import { GAME_CONFIG } from './config.js';

export class EntityManager {
  constructor(scene, camera, callbacks = {}) {
    this.THREE = window.THREE;
    this.scene = scene;
    this.camera = camera;
    this.callbacks = callbacks;

    this.geometries = [];
    this.materials = [];

    // Trạng thái Hiện diện ngoại vi
    this.entityPos = new this.THREE.Vector3(-11.0, 0.0, 12.0);
    this.currentDistance = 15.0;
    this.peripheralDot = 0.0;
    this.peripheralIntensity = 0.0;
    this.wasLookedDirectly = false;
    this.directLookCooldown = 0.0;
    this.DirectLookExposureAccum = 0.0;

    this.shaderState = {
      intensity: 0.0,
      screenX: 0.5,
      screenY: 0.5,
      onScreen: false,
      dot: 0.0
    };

    // Bộ đệm cố định (Pre-allocated Ring Buffer) để không cấp phát bộ nhớ trong vòng lặp
    const maxSamples = GAME_CONFIG.entity.maxSamplesPerHour;
    this.currentSamples = new Array(maxSamples);
    this.previousSamples = new Array(maxSamples);
    for (let i = 0; i < maxSamples; i++) {
      this.currentSamples[i] = { x: -3.2, z: -2.2, yaw: 0, speed: 0 };
      this.previousSamples[i] = { x: -3.2, z: -2.2, yaw: 0, speed: 0 };
    }
    this.currentSampleCount = 0;
    this.previousSampleCount = 0;
    this.sampleTimer = 0;

    // Dữ liệu học thói quen
    this.routinePredictability = 0.25;
    this.currentStationOrder = [];
    this.previousStationOrder = [];
    this.previousDwellNodes = [];
    this.currentDwellTimer = 0;
    this.zoneDwellTime = {
      'Phòng Radio': 0,
      'Hành Lang Chính': 0,
      'Phòng Ngủ': 0,
      'Phòng Máy Phát': 0,
      'Sân Quan Trắc': 0,
      'Chân Tháp Phát Sóng': 0
    };
    this.hourStepCount = 0;

    // Bóng lặp hành trình (Echo Stalker từ Giờ 3)
    this.echoActive = false;
    this.echoPlayIndex = 0;
    this.echoDisruptedTimer = 0;
    this.echoPos = new this.THREE.Vector3(0, 0, 10);
    this.stalkingStepCount = 0;
    this.lastMoveDir = new this.THREE.Vector3(0, 0, -1);
    this.currMoveDir = new this.THREE.Vector3(0, 0, -1);

    // Vector tạm tái sử dụng
    this._camForward = new this.THREE.Vector3();
    this._toEntity = new this.THREE.Vector3();
    this._projVec = new this.THREE.Vector3();

    this._buildEntityMeshes();
  }

  _buildEntityMeshes() {
    const THREE = this.THREE;

    // 1. Hình nhân "Kẻ Đo" (Cao gầy, chỉ rõ ở vùng ngoại vi)
    this.measurerGroup = new THREE.Group();
    this.measurerMat = new THREE.MeshBasicMaterial({
      color: 0x0b151c,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    this.materials.push(this.measurerMat);

    const torsoGeo = new THREE.CylinderGeometry(0.18, 0.26, 1.95, 7);
    const headGeo = new THREE.SphereGeometry(0.19, 7, 7);
    const limbGeo = new THREE.CylinderGeometry(0.05, 0.04, 1.25, 5);
    this.geometries.push(torsoGeo, headGeo, limbGeo);

    const torso = new THREE.Mesh(torsoGeo, this.measurerMat);
    torso.position.y = 1.15;
    const head = new THREE.Mesh(headGeo, this.measurerMat);
    head.position.set(0.04, 2.28, 0.05);
    head.scale.set(0.85, 1.25, 0.9);

    const leftArm = new THREE.Mesh(limbGeo, this.measurerMat);
    leftArm.position.set(-0.28, 1.22, 0.08);
    leftArm.rotation.z = 0.12;
    const rightArm = new THREE.Mesh(limbGeo, this.measurerMat);
    rightArm.position.set(0.28, 1.28, 0.18);
    rightArm.rotation.x = -0.55; // Tư thế đang cầm sổ đo đạc

    this.measurerGroup.add(torso, head, leftArm, rightArm);
    this.measurerGroup.position.copy(this.entityPos);
    this.scene.add(this.measurerGroup);

    // 2. Bóng lặp hành trình (Echo Stalker - lặp lại lộ trình giờ trước từ Giờ 3)
    this.echoGroup = new THREE.Group();
    this.echoMat = new THREE.MeshBasicMaterial({
      color: 0x52798c,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });
    this.materials.push(this.echoMat);

    const echoBody = new THREE.Mesh(torsoGeo, this.echoMat);
    echoBody.position.y = 1.05;
    const echoHead = new THREE.Mesh(headGeo, this.echoMat);
    echoHead.position.y = 2.12;
    this.echoGroup.add(echoBody, echoHead);
    this.echoGroup.visible = false;
    this.scene.add(this.echoGroup);
  }

  resetAll() {
    this.currentSampleCount = 0;
    this.previousSampleCount = 0;
    this.routinePredictability = 0.25;
    this.currentStationOrder = [];
    this.previousStationOrder = [];
    this.previousDwellNodes = [];
    this.hourStepCount = 0;
    this.echoActive = false;
    this.echoDisruptedTimer = 0;
    this.wasLookedDirectly = false;
    this.entityPos.set(-11.0, 0.0, 12.0);
  }

  recordStationVisit(stationId) {
    if (!this.currentStationOrder.includes(stationId)) {
      this.currentStationOrder.push(stationId);
    }
  }

  finalizeHourRoutine() {
    // Tính toán độ lặp lại thứ tự trạm đo so với giờ trước hoặc so với Quy tắc 1 chuẩn
    const bookOrder = ['station_barometer', 'station_anemometer', 'station_raingauge'];
    let matchesBook = 0;
    let matchesPrev = 0;

    for (let i = 0; i < 3; i++) {
      if (this.currentStationOrder[i] === bookOrder[i]) matchesBook++;
      if (
        this.previousStationOrder.length > i &&
        this.currentStationOrder[i] === this.previousStationOrder[i]
      ) {
        matchesPrev++;
      }
    }

    if (matchesBook === 3 || matchesPrev === 3) {
      this.routinePredictability = Math.min(1.0, this.routinePredictability + 0.32);
    } else {
      this.routinePredictability = Math.max(0.1, this.routinePredictability - 0.22);
    }

    // Chép mẫu của giờ vừa xong sang previousSamples để phát lại ở giờ kế tiếp
    this.previousSampleCount = this.currentSampleCount;
    for (let i = 0; i < this.currentSampleCount; i++) {
      this.previousSamples[i].x = this.currentSamples[i].x;
      this.previousSamples[i].z = this.currentSamples[i].z;
      this.previousSamples[i].yaw = this.currentSamples[i].yaw;
      this.previousSamples[i].speed = this.currentSamples[i].speed;
    }

    // Tìm khu vực người chơi đứng lâu nhất để ghi vào Quy tắc 13
    let bestZone = 'Phòng Radio';
    let maxTime = -1;
    Object.keys(this.zoneDwellTime).forEach((z) => {
      if (this.zoneDwellTime[z] > maxTime) {
        maxTime = this.zoneDwellTime[z];
        bestZone = z;
      }
      this.zoneDwellTime[z] = 0;
    });

    const stationLabels = {
      station_barometer: 'Áp kế',
      station_anemometer: 'Phong vũ biểu',
      station_raingauge: 'Vũ lượng kế',
      generator_unit: 'Máy phát điện'
    };
    const firstSt = stationLabels[this.currentStationOrder[0]] || 'Áp kế';
    const steps = Math.max(24, this.hourStepCount);

    this.previousStationOrder = [...this.currentStationOrder];
    this.currentStationOrder = [];
    this.currentSampleCount = 0;
    this.hourStepCount = 0;
    this.echoPlayIndex = 0;

    return {
      lastStepCount: steps,
      longestDwellZone: bestZone,
      favoriteFirstStation: firstSt,
      followedBookOrder: matchesBook === 3,
      repeatedPreviousOrder: matchesPrev === 3
    };
  }

  onPlayerStep(playerX, playerZ, surface) {
    this.hourStepCount++;

    if (!this.echoActive || this.echoDisruptedTimer > 0) return;

    this.stalkingStepCount++;
    // Phát tiếng bước chân thứ hai trễ nửa nhịp từ vị trí bóng lặp sau lưng người chơi
    if (this.stalkingStepCount % 2 === 0 && this.callbacks.onSecondFootstep) {
      const behindX = playerX - Math.sin(this.camera.rotation.y) * -2.8;
      const behindZ = playerZ - Math.cos(this.camera.rotation.y) * -2.8;
      this.callbacks.onSecondFootstep(behindX, behindZ, surface);
    }
  }

  placeEntityForAmbush(x, z) {
    this.entityPos.set(x, 0.0, z);
    this.measurerGroup.position.copy(this.entityPos);
  }

  update(dt, elapsed, player, camera, currentHour, flashlightOn) {
    if (this.directLookCooldown > 0) {
      this.directLookCooldown -= dt;
    }
    if (this.echoDisruptedTimer > 0) {
      this.echoDisruptedTimer -= dt;
    }

    // 1. Thu thập mẫu lộ trình & kiểm tra Quy tắc 7 (đứng yên quá 12 giây ở điểm dừng cũ)
    const speed = Math.hypot(player.vel.x, player.vel.z);
    if (this.zoneDwellTime[player.currentZone] !== undefined) {
      this.zoneDwellTime[player.currentZone] += dt;
    }

    this.sampleTimer += dt;
    if (
      this.sampleTimer >= GAME_CONFIG.entity.recordSampleInterval &&
      this.currentSampleCount < GAME_CONFIG.entity.maxSamplesPerHour
    ) {
      this.sampleTimer = 0;
      const slot = this.currentSamples[this.currentSampleCount++];
      slot.x = player.pos.x;
      slot.z = player.pos.z;
      slot.yaw = player.yaw;
      slot.speed = speed;

      if (player.stillSeconds >= GAME_CONFIG.entity.dwellTimeThreshold && this.previousDwellNodes.length < 24) {
        this.previousDwellNodes.push({ x: player.pos.x, z: player.pos.z });
      }
    }

    // Quy tắc 7: Nếu đứng yên quá 12s tại điểm dừng cũ, Kẻ Đo áp sát từ phía sau
    if (currentHour >= 2 && player.stillSeconds >= GAME_CONFIG.entity.dwellDangerSeconds) {
      const behindAngle = player.yaw;
      this.entityPos.x = player.pos.x + Math.sin(behindAngle) * 2.4;
      this.entityPos.z = player.pos.z + Math.cos(behindAngle) * 2.4;
      player.stillSeconds = 0;
      if (this.callbacks.onDirectLookApproach) {
        this.callbacks.onDirectLookApproach();
      }
    }

    // 2. Kiểm tra phá thói quen bước chân theo Quy tắc 2 (dừng 3 giây hoặc rẽ ngoặt 90 độ)
    if (speed > 0.4) {
      this.currMoveDir.set(player.vel.x, 0, player.vel.z).normalize();
      const turnDot = this.currMoveDir.dot(this.lastMoveDir);
      if (this.echoActive && this.echoDisruptedTimer <= 0 && this.stalkingStepCount >= 4 && turnDot < GAME_CONFIG.entity.breakRoutineTurnDot) {
        this._disruptEchoStalker();
      }
      this.lastMoveDir.copy(this.currMoveDir);
    } else if (
      this.echoActive &&
      this.echoDisruptedTimer <= 0 &&
      this.stalkingStepCount >= 4 &&
      player.stillSeconds >= GAME_CONFIG.entity.breakRoutineStopSeconds
    ) {
      this._disruptEchoStalker();
    }

    // 3. Cập nhật Bóng lặp hành trình (Echo Stalker từ Giờ 3)
    this.echoActive = currentHour >= 3;
    if (this.echoActive && this.echoDisruptedTimer <= 0 && this.previousSampleCount > 5) {
      this.echoGroup.visible = true;
      this.echoPlayIndex = (this.echoPlayIndex + dt * 4.0 * GAME_CONFIG.entity.echoSpeedMultiplier) % this.previousSampleCount;
      const idx = Math.floor(this.echoPlayIndex);
      const sample = this.previousSamples[idx];

      // Nếu độ đoán trước thói quen cao, bóng lặp đón đầu gần người chơi hơn
      if (this.routinePredictability > 0.62) {
        const aheadAngle = player.yaw + 0.55;
        const targetX = player.pos.x - Math.sin(aheadAngle) * 6.2;
        const targetZ = player.pos.z - Math.cos(aheadAngle) * 6.2;
        this.echoPos.x += (targetX - this.echoPos.x) * dt * 1.5;
        this.echoPos.z += (targetZ - this.echoPos.z) * dt * 1.5;
      } else {
        this.echoPos.set(sample.x, 0, sample.z);
      }

      this.echoGroup.position.copy(this.echoPos);
      this.echoGroup.lookAt(player.pos.x, 1.1, player.pos.z);
      const echoDist = Math.hypot(this.echoPos.x - player.pos.x, this.echoPos.z - player.pos.z);
      this.echoMat.opacity = Math.max(0.05, Math.min(0.45, (14.0 - echoDist) / 14.0));
    } else {
      this.echoGroup.visible = false;
    }

    // 4. Cập nhật vị trí & Hiện diện ngoại vi của Kẻ Đo (Peripheral Presence)
    this._updatePeripheralPresence(dt, elapsed, player, camera, currentHour, flashlightOn);
  }

  _disruptEchoStalker() {
    this.echoDisruptedTimer = 15.0;
    this.stalkingStepCount = 0;
    this.echoGroup.visible = false;
    this.routinePredictability = Math.max(0.1, this.routinePredictability - 0.12);
    if (this.callbacks.onRoutineBroken) {
      this.callbacks.onRoutineBroken();
    }
  }

  _updatePeripheralPresence(dt, elapsed, player, camera, currentHour, flashlightOn) {
    // Kẻ Đo lảng vảng quanh rìa tầm nhìn ngoài sân hoặc hành lang (Giờ 5-6)
    const isOutside = player.pos.z > 4.8 || player.pos.x > 5.8;
    const canManifestIndoors = currentHour >= 5;

    if (!isOutside && !canManifestIndoors) {
      // Khi người chơi ở trong nhà Giờ 1-4, Kẻ Đo đứng ngoài hàng rào nhìn vào qua cửa
      const targetX = 0.0 + Math.sin(elapsed * 0.25) * 4.5;
      const targetZ = 7.8;
      this.entityPos.x += (targetX - this.entityPos.x) * dt * 0.8;
      this.entityPos.z += (targetZ - this.entityPos.z) * dt * 0.8;
    }

    this._toEntity.set(
      this.entityPos.x - player.pos.x,
      0,
      this.entityPos.z - player.pos.z
    );
    this.currentDistance = Math.max(0.1, this._toEntity.length());
    this._toEntity.divideScalar(this.currentDistance);

    this._camForward.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw)).normalize();
    const dot = this._camForward.dot(this._toEntity);
    this.peripheralDot = dot;

    // Tính cường độ ngoại vi: Cực đại ở rìa màn hình (dot ~ 0.62), bằng 0 khi nhìn thẳng (dot > 0.88)
    let targetIntensity = 0.0;
    const cfg = GAME_CONFIG.entity;

    if (this.currentDistance < 22.0 && dot >= cfg.peripheralDotMin && dot <= cfg.peripheralDotDirect) {
      if (dot < cfg.peripheralDotPeak) {
        targetIntensity = (dot - cfg.peripheralDotMin) / (cfg.peripheralDotPeak - cfg.peripheralDotMin);
      } else {
        targetIntensity = 1.0 - (dot - cfg.peripheralDotPeak) / (cfg.peripheralDotDirect - cfg.peripheralDotPeak);
      }
      const distFactor = Math.max(0.2, Math.min(1.0, (20.0 - this.currentDistance) / 14.0));
      targetIntensity *= distFactor;
    }

    // Nếu người chơi nhìn thẳng (và đặc biệt khi bật đèn pin chiếu vào theo Quy tắc 3 sai):
    // Hình ảnh Kẻ Đo tan biến khỏi tâm mắt nhưng kích hoạt cơ chế dịch lại gần khi quay mặt đi!
    if (dot > cfg.peripheralDotDirect && this.currentDistance < 18.0) {
      targetIntensity = 0.0;
      if (this.directLookCooldown <= 0) {
        this.wasLookedDirectly = true;
      }
    } else if (this.wasLookedDirectly && dot < 0.72) {
      // Khoảnh khắc người chơi vừa quay mắt đi sau khi nhìn thẳng!
      this.wasLookedDirectly = false;
      this.directLookCooldown = cfg.directLookCooldown;

      const stepDist = flashlightOn ? cfg.directLookStepCloser * 1.25 : cfg.directLookStepCloser;
      if (this.currentDistance > cfg.minSafeDistance + stepDist) {
        this.entityPos.x -= this._toEntity.x * stepDist;
        this.entityPos.z -= this._toEntity.z * stepDist;
      } else {
        // Dịch sang góc rìa mới quanh người chơi
        const sideAngle = player.yaw + (Math.random() > 0.5 ? 0.95 : -0.95);
        this.entityPos.x = player.pos.x - Math.sin(sideAngle) * 7.5;
        this.entityPos.z = player.pos.z - Math.cos(sideAngle) * 7.5;
      }

      if (this.callbacks.onDirectLookApproach) {
        this.callbacks.onDirectLookApproach();
      }
    }

    // Nội suy mượt cường độ ngoại vi
    const lerpSpeed = targetIntensity < this.peripheralIntensity ? 9.0 : 4.5;
    this.peripheralIntensity += (targetIntensity - this.peripheralIntensity) * Math.min(1.0, dt * lerpSpeed);

    // Cập nhật mesh 3D và chiếu tọa độ lên màn hình cho Post-Processing Shader
    this.measurerGroup.position.set(
      this.entityPos.x,
      Math.sin(elapsed * 2.2) * 0.05,
      this.entityPos.z
    );
    this.measurerGroup.lookAt(player.pos.x, 1.2, player.pos.z);
    this.measurerMat.opacity = this.peripheralIntensity * 0.78;

    this._projVec.set(this.entityPos.x, 1.35, this.entityPos.z);
    this._projVec.project(camera);

    const onScreen = this._projVec.z < 1.0 && Math.abs(this._projVec.x) <= 1.15 && Math.abs(this._projVec.y) <= 1.15;
    this.shaderState.intensity = this.peripheralIntensity;
    this.shaderState.screenX = (this._projVec.x + 1.0) * 0.5;
    this.shaderState.screenY = (this._projVec.y + 1.0) * 0.5;
    this.shaderState.onScreen = onScreen;
    this.shaderState.dot = dot;
  }

  getShaderState() {
    return this.shaderState;
  }

  dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
  }
}
