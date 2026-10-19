/**
 * Module dựng cảnh 3D Trạm Khí Tượng Số 9 (World, Procedural Textures, Lighting & Collisions)
 * Tuân thủ ngân sách: <= 4 đèn động (tối đa 1 đèn đổ bóng), dùng InstancedMesh cho vật lặp lại,
 * 100% texture vẽ thủ tục bằng HTML5 Canvas 2D.
 */

import { GAME_CONFIG, DIARY_FRAGMENTS } from './config.js';

export class WorldManager {
  constructor(scene, camera, settings) {
    this.THREE = window.THREE;
    this.scene = scene;
    this.camera = camera;
    this.settings = settings;

    this.textures = [];
    this.geometries = [];
    this.materials = [];
    this.interactables = [];
    this.noteMeshes = new Map();
    this.colliders = [];

    this.anemometerCups = null;
    this.generatorBlock = null;
    this.duplicateCupMesh = null;
    this.bedFrostFigure = null;
    this.windowScareFigure = null;
    this.interiorFogMesh = null;
    this.frontLampBulbMat = null;

    this.windSpeedCurrent = 14;
    this.corruptFrontLamp = false;
    this.windowScareTimer = 0;

    this._initProceduralTextures();
    this._initLights();
    this._buildTerrainAndYard();
    this._buildStationBuilding();
    this._buildInteriorProps();
    this._buildYardInstruments();
    this._buildDiaryNotes();
  }

  _trackGeo(geo) {
    this.geometries.push(geo);
    return geo;
  }

  _trackMat(mat) {
    this.materials.push(mat);
    return mat;
  }

  _trackTex(tex) {
    this.textures.push(tex);
    return tex;
  }

  _initProceduralTextures() {
    const THREE = this.THREE;

    // 1. Texture tường bê tông ẩm + giả lập Ambient Occlusion (AO) ở chân và đỉnh tường
    const wallCanvas = document.createElement('canvas');
    wallCanvas.width = 256;
    wallCanvas.height = 256;
    const wCtx = wallCanvas.getContext('2d');
    const wGrad = wCtx.createLinearGradient(0, 0, 0, 256);
    wGrad.addColorStop(0, '#2a3c47');
    wGrad.addColorStop(0.15, '#4c6575');
    wGrad.addColorStop(0.82, '#415866');
    wGrad.addColorStop(1, '#22313b');
    wCtx.fillStyle = wGrad;
    wCtx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 600; i++) {
      const x = (i * 73) % 256;
      const y = (i * 137) % 256;
      wCtx.fillStyle = i % 2 === 0 ? 'rgba(20, 30, 38, 0.25)' : 'rgba(160, 185, 200, 0.14)';
      wCtx.fillRect(x, y, 4, 10);
    }
    // Kẻ mạch bê tông tạo chiều sâu không gian
    wCtx.strokeStyle = 'rgba(20, 30, 36, 0.45)';
    wCtx.lineWidth = 2;
    for (let y = 64; y < 256; y += 64) {
      wCtx.beginPath();
      wCtx.moveTo(0, y);
      wCtx.lineTo(256, y);
      wCtx.stroke();
    }
    this.texWall = this._trackTex(new THREE.CanvasTexture(wallCanvas));
    this.texWall.wrapS = THREE.RepeatWrapping;
    this.texWall.wrapT = THREE.RepeatWrapping;

    // 2. Texture sàn ván gỗ thông cũ
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 256;
    woodCanvas.height = 256;
    const wdCtx = woodCanvas.getContext('2d');
    wdCtx.fillStyle = '#4e3a2d';
    wdCtx.fillRect(0, 0, 256, 256);
    for (let row = 0; row < 8; row++) {
      const y = row * 32;
      wdCtx.fillStyle = row % 2 === 0 ? '#594334' : '#463428';
      wdCtx.fillRect(0, y + 2, 256, 28);
      wdCtx.fillStyle = '#241a13';
      wdCtx.fillRect(0, y, 256, 2);
    }
    this.texWood = this._trackTex(new THREE.CanvasTexture(woodCanvas));
    this.texWood.wrapS = THREE.RepeatWrapping;
    this.texWood.wrapT = THREE.RepeatWrapping;
    this.texWood.repeat.set(4, 4);

    // 3. Texture mặt đất đá sỏi phủ sương muối ngoài sân
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 256;
    groundCanvas.height = 256;
    const gCtx = groundCanvas.getContext('2d');
    gCtx.fillStyle = '#263742';
    gCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 900; i++) {
      const x = (i * 97) % 256;
      const y = (i * 53) % 256;
      gCtx.fillStyle = i % 3 === 0 ? '#3a505e' : '#1b2830';
      gCtx.fillRect(x, y, 4, 4);
    }
    this.texGround = this._trackTex(new THREE.CanvasTexture(groundCanvas));
    this.texGround.wrapS = THREE.RepeatWrapping;
    this.texGround.wrapT = THREE.RepeatWrapping;
    this.texGround.repeat.set(16, 16);

    // 4. Texture mặt đồng hồ khí tượng (Dial Gauge)
    const dialCanvas = document.createElement('canvas');
    dialCanvas.width = 128;
    dialCanvas.height = 128;
    const dCtx = dialCanvas.getContext('2d');
    dCtx.fillStyle = '#d9d2c5';
    dCtx.beginPath();
    dCtx.arc(64, 64, 58, 0, Math.PI * 2);
    dCtx.fill();
    dCtx.strokeStyle = '#222b30';
    dCtx.lineWidth = 5;
    dCtx.stroke();
    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2;
      dCtx.beginPath();
      dCtx.moveTo(64 + Math.cos(ang) * 42, 64 + Math.sin(ang) * 42);
      dCtx.lineTo(64 + Math.cos(ang) * 52, 64 + Math.sin(ang) * 52);
      dCtx.stroke();
    }
    dCtx.strokeStyle = '#b32e25';
    dCtx.lineWidth = 3;
    dCtx.beginPath();
    dCtx.moveTo(64, 64);
    dCtx.lineTo(96, 44);
    dCtx.stroke();
    this.texDial = this._trackTex(new THREE.CanvasTexture(dialCanvas));

    // 5. Texture giấy nhật ký ố vàng
    const noteCanvas = document.createElement('canvas');
    noteCanvas.width = 128;
    noteCanvas.height = 128;
    const nCtx = noteCanvas.getContext('2d');
    nCtx.fillStyle = '#e6d7b8';
    nCtx.fillRect(0, 0, 128, 128);
    nCtx.fillStyle = '#3c4a52';
    for (let line = 18; line < 110; line += 12) {
      nCtx.fillRect(14, line, 96 - (line % 24), 3);
    }
    this.texNote = this._trackTex(new THREE.CanvasTexture(noteCanvas));
  }

  _initLights() {
    const THREE = this.THREE;

    // Đèn động #1: HemisphereLight tạo ánh sáng môi trường xanh xám lạnh đọc rõ hình khối
    this.hemiLight = new THREE.HemisphereLight(0x6d8fa6, 0x2c3c47, 1.85);
    this.scene.add(this.hemiLight);

    // Đèn động #2 (Đèn duy nhất đổ bóng): SpotLight đèn pin gắn theo Camera người chơi
    this.flashlight = new THREE.SpotLight(0xffeacc, 18.0, 28.0, Math.PI * 0.28, 0.5, 1.0);
    this.flashlight.position.set(0.16, -0.12, 0.0);
    this.flashlight.target.position.set(0, -0.05, -6.0);
    const preset = GAME_CONFIG.graphicsPresets[this.settings.quality] || GAME_CONFIG.graphicsPresets.medium;
    this.flashlight.castShadow = Boolean(preset.shadows);
    this.flashlight.shadow.mapSize.width = preset.shadowMapSize || 1024;
    this.flashlight.shadow.mapSize.height = preset.shadowMapSize || 1024;
    this.flashlight.shadow.camera.near = 0.25;
    this.flashlight.shadow.camera.far = 22.0;
    this.camera.add(this.flashlight);
    this.camera.add(this.flashlight.target);

    // Đèn động #3: PointLight trung tâm trong nhà trạm (tông đèn natri/tungsten ấm)
    this.interiorLight = new THREE.PointLight(GAME_CONFIG.world.interiorLightColor, 12.0, 18.0, 0.9);
    this.interiorLight.position.set(-1.5, 2.85, -1.5);
    this.interiorLight.castShadow = false;
    this.scene.add(this.interiorLight);

    // Đèn động #4: PointLight đèn hơi natri ngoài hiên chính (đổi màu trắng xanh ở Giờ 3/5 theo Quy tắc 11)
    this.frontPorchLight = new THREE.PointLight(GAME_CONFIG.world.sodiumLightColor, 16.0, 24.0, 0.9);
    this.frontPorchLight.position.set(0.0, 3.25, 6.2);
    this.frontPorchLight.castShadow = false;
    this.scene.add(this.frontPorchLight);
  }

  _addBoxCollider(minX, maxX, minZ, maxZ) {
    this.colliders.push({ minX, maxX, minZ, maxZ });
  }

  _registerInteractable(mesh, interactId, label, extra = {}) {
    mesh.userData = {
      interactId,
      label,
      ...extra
    };
    this.interactables.push(mesh);
    return mesh;
  }

  _buildTerrainAndYard() {
    const THREE = this.THREE;

    // Mặt đất toàn khu vực
    const groundGeo = this._trackGeo(new THREE.PlaneGeometry(72, 72));
    const groundMat = this._trackMat(
      new THREE.MeshLambertMaterial({ map: this.texGround })
    );
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // Lối đi bê tông từ cửa chính và cửa hông ra các trạm đo
    const pathGeo = this._trackGeo(new THREE.BoxGeometry(2.2, 0.04, 18.0));
    const pathMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x35444d }));
    const mainPath = new THREE.Mesh(pathGeo, pathMat);
    mainPath.position.set(0, 0.02, 14.0);
    this.scene.add(mainPath);

    // Hàng rào cọc sắt quanh Sân Đo bằng InstancedMesh (1 draw call cho 48 cọc)
    const postCount = 48;
    const postGeo = this._trackGeo(new THREE.BoxGeometry(0.14, 1.7, 0.14));
    const postMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x2b3942 }));
    const postInst = new THREE.InstancedMesh(postGeo, postMat, postCount);
    const dummy = new THREE.Object3D();
    let idx = 0;

    for (let i = 0; i < 16; i++) {
      const z = 5.0 + i * 1.35;
      dummy.position.set(-14.5, 0.85, z);
      dummy.updateMatrix();
      postInst.setMatrixAt(idx++, dummy.matrix);

      dummy.position.set(14.5, 0.85, z);
      dummy.updateMatrix();
      postInst.setMatrixAt(idx++, dummy.matrix);
    }
    for (let i = 0; i < 16; i++) {
      const x = -14.0 + i * 1.86;
      dummy.position.set(x, 0.85, 25.5);
      dummy.updateMatrix();
      postInst.setMatrixAt(idx++, dummy.matrix);
    }
    postInst.instanceMatrix.needsUpdate = true;
    this.scene.add(postInst);

    // Rừng thông đen & đá tảng trong sương ngoài hàng rào bằng InstancedMesh (2 draw calls)
    const treeCount = 52;
    const treeGeo = this._trackGeo(new THREE.ConeGeometry(1.65, 7.5, 6));
    const treeMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x0e181e }));
    const treeInst = new THREE.InstancedMesh(treeGeo, treeMat, treeCount);
    for (let i = 0; i < treeCount; i++) {
      const ang = (i / treeCount) * Math.PI * 2;
      const dist = 23.0 + (i % 4) * 3.2;
      const s = 0.85 + (i % 5) * 0.18;
      dummy.position.set(Math.cos(ang) * dist, 3.6 * s, 4.0 + Math.sin(ang) * dist);
      dummy.scale.set(s, s, s);
      dummy.rotation.y = i * 1.1;
      dummy.updateMatrix();
      treeInst.setMatrixAt(i, dummy.matrix);
    }
    treeInst.instanceMatrix.needsUpdate = true;
    this.scene.add(treeInst);

    const rockCount = 28;
    const rockGeo = this._trackGeo(new THREE.DodecahedronGeometry(1.1, 0));
    const rockMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x1d2a33 }));
    const rockInst = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
    dummy.scale.set(1, 0.65, 1);
    for (let i = 0; i < rockCount; i++) {
      const ang = (i / rockCount) * Math.PI * 2 + 0.2;
      const dist = 16.5 + (i % 3) * 2.8;
      dummy.position.set(Math.cos(ang) * dist, 0.4, 6.0 + Math.sin(ang) * dist);
      dummy.rotation.set(i * 0.4, i * 0.9, 0);
      dummy.updateMatrix();
      rockInst.setMatrixAt(i, dummy.matrix);
    }
    rockInst.instanceMatrix.needsUpdate = true;
    this.scene.add(rockInst);
  }

  _buildStationBuilding() {
    const THREE = this.THREE;
    const wallMat = this._trackMat(new THREE.MeshLambertMaterial({ map: this.texWall }));
    const floorMat = this._trackMat(new THREE.MeshLambertMaterial({ map: this.texWood }));
    const roofMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x1a242b }));

    // Sàn gỗ và Trần nhà Trạm 9 (x: -6..6, z: -5..5)
    const floorMesh = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(12.0, 0.16, 10.0)), floorMat);
    floorMesh.position.set(0, 0.08, 0);
    floorMesh.receiveShadow = true;
    this.scene.add(floorMesh);

    const ceilingMesh = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(12.4, 0.24, 10.4)), roofMat);
    ceilingMesh.position.set(0, 3.28, 0);
    this.scene.add(ceilingMesh);

    const addWall = (x, y, z, w, h, d, collide = true) => {
      const m = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(w, h, d)), wallMat);
      m.position.set(x, y, z);
      m.castShadow = false;
      m.receiveShadow = true;
      this.scene.add(m);
      if (collide) {
        this._addBoxCollider(x - w / 2, x + w / 2, z - d / 2, z + d / 2);
      }
      return m;
    };

    // Tường Bắc (z = -5.0) & Tường Tây (x = -6.0)
    addWall(0, 1.65, -5.0, 12.2, 3.3, 0.3, true);
    addWall(-6.0, 1.65, 0, 0.3, 3.3, 10.2, true);

    // Tường Nam (z = +5.0) chừa lối Cửa Chính ở x = [-0.85, +0.85]
    addWall(-3.45, 1.65, 5.0, 5.2, 3.3, 0.3, true);
    addWall(3.45, 1.65, 5.0, 5.2, 3.3, 0.3, true);
    addWall(0, 2.85, 5.0, 1.8, 0.9, 0.3, false);

    // Tường Đông (x = +6.0) chừa lối Cửa Hông Phòng Máy Phát ở z = [1.6, 3.2]
    addWall(6.0, 1.65, -1.7, 0.3, 3.3, 6.6, true);
    addWall(6.0, 1.65, 4.1, 0.3, 3.3, 1.8, true);
    addWall(6.0, 2.85, 2.4, 0.3, 0.9, 1.6, false);

    // Vách ngăn nội bộ chia 4 khu: Phòng Radio, Hành lang, Phòng Ngủ, Phòng Máy Phát
    // Vách ngăn Phòng Radio (x = -1.8, chừa cửa thông từ z = -1.6 đến -0.3)
    addWall(-1.8, 1.65, -3.3, 0.22, 3.3, 3.4, true);
    addWall(-1.8, 1.65, 2.3, 0.22, 3.3, 5.4, true);

    // Ô cửa kính Phòng Radio nhìn ra Hành lang (nơi xảy ra Jump Scare #1 ở Giờ 3)
    const glassMat = this._trackMat(
      new THREE.MeshBasicMaterial({ color: 0x7ab8d6, transparent: true, opacity: 0.22 })
    );
    const radioWindow = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.06, 1.1, 1.4)), glassMat);
    radioWindow.position.set(-1.8, 1.65, -2.8);
    this.scene.add(radioWindow);

    // Vách ngăn Đông (x = +1.8) chia Hành lang với Phòng Ngủ (Bắc) & Phòng Máy Phát (Nam)
    // Chừa cửa Phòng Ngủ ở z = [-3.1, -1.8] và cửa Phòng Máy Phát ở z = [1.4, 2.7]
    addWall(1.8, 1.65, -4.05, 0.22, 3.3, 1.9, true);
    addWall(1.8, 1.65, -0.2, 0.22, 3.3, 3.2, true);
    addWall(1.8, 1.65, 3.85, 0.22, 3.3, 2.3, true);

    // Vách ngang ngăn Phòng Ngủ và Phòng Máy Phát (z = 0.0, từ x = 1.8 đến 6.0)
    addWall(3.9, 1.65, 0.0, 4.2, 3.3, 0.24, true);

    // Khung Cửa Chính (z = 5.0) có ô kính nhìn ra đèn hiên (Quy tắc 11) & Cửa Hông (x = 6.0)
    const doorFrameMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x3b4d59 }));
    const frontDoorFrame = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.5, 2.35, 0.14)), doorFrameMat);
    frontDoorFrame.position.set(-0.72, 1.2, 5.08);
    frontDoorFrame.rotation.y = 0.42; // Mở hé để người chơi đi qua hoặc quan sát đèn hiên
    this.scene.add(frontDoorFrame);
    this._registerInteractable(
      frontDoorFrame,
      'front_door',
      'Quan sát đèn hiên Cửa Chính (Quy tắc 11)'
    );

    const sideDoorFrame = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.14, 2.35, 1.4)), doorFrameMat);
    sideDoorFrame.position.set(6.08, 1.2, 1.65);
    sideDoorFrame.rotation.y = -0.45;
    this.scene.add(sideDoorFrame);
    this._registerInteractable(
      sideDoorFrame,
      'side_door',
      'Cửa Hông Phòng Máy Phát (Lối vòng an toàn)'
    );

    // Đèn hơi natri ngoài hiên chính (Visual Bulb)
    this.frontLampBulbMat = this._trackMat(
      new THREE.MeshBasicMaterial({ color: GAME_CONFIG.world.sodiumLightColor })
    );
    const porchFixture = new THREE.Mesh(
      this._trackGeo(new THREE.SphereGeometry(0.22, 8, 8)),
      this.frontLampBulbMat
    );
    porchFixture.position.set(0, 3.22, 5.55);
    this.scene.add(porchFixture);

    // Lớp sương mù mỏng tràn vào nhà ở Giờ 5–6
    const intFogMat = this._trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x7ca2b5,
        transparent: true,
        opacity: 0.16,
        depthWrite: false
      })
    );
    this.interiorFogMesh = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(11.4, 0.75, 9.4)), intFogMat);
    this.interiorFogMesh.position.set(0, 0.42, 0);
    this.interiorFogMesh.visible = false;
    this.scene.add(this.interiorFogMesh);
  }

  _buildInteriorProps() {
    const THREE = this.THREE;
    const metalMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x3b4b56 }));
    const darkMetalMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x243038 }));
    const woodPropMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x4d382a }));
    const amberGlowMat = this._trackMat(new THREE.MeshBasicMaterial({ color: 0xffaa44 }));

    // 1. PHÒNG RADIO (Tây-Bắc: x: -6..-1.8, z: -5..0)
    const radioDesk = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(2.6, 0.82, 1.1)), woodPropMat);
    radioDesk.position.set(-4.1, 0.41, -3.9);
    this.scene.add(radioDesk);
    this._addBoxCollider(-5.4, -2.8, -4.5, -3.3);

    // Máy bộ đàm sóng ngắn 2 tần số (142.8 MHz / 108.4 MHz)
    const radioBox = new THREE.Group();
    radioBox.position.set(-3.9, 1.04, -3.85);
    const radioBody = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.78, 0.44, 0.48)), darkMetalMat);
    const radioDial = new THREE.Mesh(
      this._trackGeo(new THREE.PlaneGeometry(0.46, 0.18)),
      this._trackMat(new THREE.MeshBasicMaterial({ color: 0x7ce0a3 }))
    );
    radioDial.position.set(0, 0.05, 0.245);
    radioBox.add(radioBody, radioDial);
    this.scene.add(radioBox);
    this._registerInteractable(
      radioBox,
      'radio_station',
      'Máy Radio Sóng Ngắn (Báo cáo & Chuyển tần số)'
    );

    // Cuộn Sổ Tay Trực Ca đặt trên bàn Radio
    const deskNotebook = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(0.38, 0.05, 0.48)),
      this._trackMat(new THREE.MeshLambertMaterial({ color: 0x8c3b2b }))
    );
    deskNotebook.position.set(-4.75, 0.85, -3.75);
    this.scene.add(deskNotebook);
    this._registerInteractable(deskNotebook, 'open_notebook', 'Đọc Sổ Tay Trực Ca [Tab]');

    // Ghế Bàn Trực Phòng Radio (Dùng để chốt ca an toàn ở Giờ 5 theo Quy tắc 9)
    const dutyChair = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.68, 0.92, 0.68)), metalMat);
    dutyChair.position.set(-3.1, 0.46, -2.85);
    this.scene.add(dutyChair);
    this._registerInteractable(
      dutyChair,
      'duty_chair',
      'Ghế Bàn Trực (Nghỉ chốt ca tại Phòng Radio - Quy tắc 9)'
    );

    // Bóng hù qua cửa kính Phòng Radio (Jump Scare #1 ở Giờ 3)
    this.windowScareFigure = new THREE.Mesh(
      this._trackGeo(new THREE.CapsuleGeometry(0.28, 1.25, 4, 8)),
      this._trackMat(new THREE.MeshBasicMaterial({ color: 0x0b161e, transparent: true, opacity: 0.88 }))
    );
    this.windowScareFigure.position.set(-1.35, 1.45, -2.8);
    this.windowScareFigure.visible = false;
    this.scene.add(this.windowScareFigure);

    // 2. HÀNH LANG CHÍNH (Giữa nhà)
    const shelfMesh = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.1, 1.8, 0.48)), metalMat);
    shelfMesh.position.set(-0.6, 0.9, -1.7);
    this.scene.add(shelfMesh);

    const hallTable = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.2, 0.78, 0.9)), woodPropMat);
    hallTable.position.set(0.65, 0.39, 1.25);
    this.scene.add(hallTable);
    this._addBoxCollider(0.0, 1.3, 0.75, 1.75);

    const cupGeo = this._trackGeo(new THREE.CylinderGeometry(0.08, 0.07, 0.16, 10));
    const cupMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0xd8e2e8 }));
    const cupOriginal = new THREE.Mesh(cupGeo, cupMat);
    cupOriginal.position.set(0.5, 0.86, 1.2);
    this.scene.add(cupOriginal);

    // Chiếc cốc tráng men nhân đôi (Xuất hiện từ Giờ 2 để kiểm tra Quy tắc 8)
    this.duplicateCupMesh = new THREE.Mesh(
      cupGeo,
      this._trackMat(new THREE.MeshLambertMaterial({ color: 0x99d9ea }))
    );
    this.duplicateCupMesh.position.set(0.82, 0.86, 1.25);
    this.duplicateCupMesh.visible = false;
    this.scene.add(this.duplicateCupMesh);
    this._registerInteractable(
      this.duplicateCupMesh,
      'anomaly_cup',
      'Chiếc cốc nhân bản lạ (Kiểm tra Quy tắc 8)'
    );

    // 3. PHÒNG NGỦ (Đông-Bắc: x: 1.8..6.0, z: -5..0)
    const bedFrame = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(2.1, 0.56, 1.25)), woodPropMat);
    bedFrame.position.set(4.55, 0.28, -4.0);
    this.scene.add(bedFrame);
    this._addBoxCollider(3.45, 5.65, -4.65, -3.35);
    this._registerInteractable(
      bedFrame,
      'bed_rest',
      'Giường Ngủ Trực Ca (Chốt ca kết thúc giờ trực)'
    );

    // Hình bóng sương nằm sẵn trên giường ở Giờ 5 (Quy tắc 9)
    this.bedFrostFigure = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(1.65, 0.24, 0.62)),
      this._trackMat(new THREE.MeshBasicMaterial({ color: 0x7ce0ff, transparent: true, opacity: 0.42 }))
    );
    this.bedFrostFigure.position.set(4.55, 0.68, -4.0);
    this.bedFrostFigure.visible = false;
    this.scene.add(this.bedFrostFigure);

    // Nhiệt kế treo tường Phòng Ngủ (Quy tắc 9)
    const thermoMesh = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(0.18, 0.62, 0.08)),
      this._trackMat(new THREE.MeshLambertMaterial({ map: this.texDial }))
    );
    thermoMesh.position.set(3.2, 1.55, -4.82);
    this.scene.add(thermoMesh);
    this._registerInteractable(
      thermoMesh,
      'bedroom_thermometer',
      'Nhiệt Kế Phòng Ngủ (Kiểm tra nhiệt độ theo Quy tắc 9)'
    );

    // 4. PHÒNG MÁY PHÁT ĐIỆN (Đông-Nam: x: 1.8..6.0, z: 0..5)
    this.generatorBlock = new THREE.Group();
    this.generatorBlock.position.set(4.3, 0.72, 3.6);
    const genBody = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.65, 1.35, 1.1)), metalMat);
    const genLever = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.25, 0.45, 0.25)), amberGlowMat);
    genLever.position.set(-0.85, 0.25, 0);
    this.generatorBlock.add(genBody, genLever);
    this.scene.add(this.generatorBlock);
    this._addBoxCollider(3.35, 5.25, 2.95, 4.25);
    this._registerInteractable(
      this.generatorBlock,
      'generator_unit',
      'Máy Phát Điện Diesel (Kiểm tra tải 80% / 100% - Quy tắc 5)'
    );

    // Lò Đốt Mẫu Khí Tượng (Quy tắc 10 & Ending 3)
    const incineratorGroup = new THREE.Group();
    incineratorGroup.position.set(2.55, 0.85, 4.25);
    const incBody = new THREE.Mesh(
      this._trackGeo(new THREE.CylinderGeometry(0.48, 0.54, 1.65, 10)),
      darkMetalMat
    );
    const incFire = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(0.36, 0.28, 0.12)),
      this._trackMat(new THREE.MeshBasicMaterial({ color: 0xff5a1f }))
    );
    incFire.position.set(0, -0.1, -0.46);
    incineratorGroup.add(incBody, incFire);
    this.scene.add(incineratorGroup);
    this._addBoxCollider(2.0, 3.1, 3.7, 4.8);
    this._registerInteractable(
      incineratorGroup,
      'incinerator',
      'Lò Đốt Mẫu 600°C (Hủy tài liệu / Đốt Sổ Tay ở Giờ 6)'
    );
  }

  _buildYardInstruments() {
    const THREE = this.THREE;
    const whiteWoodMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0xdce4ea }));
    const steelMat = this._trackMat(new THREE.MeshLambertMaterial({ color: 0x4a5d6b }));
    const dialMat = this._trackMat(new THREE.MeshBasicMaterial({ map: this.texDial }));
    const beaconMat = this._trackMat(new THREE.MeshBasicMaterial({ color: 0xff4538 }));

    // 1. Trạm đo Khí áp (Áp kế - Barometer) tại (-7.5, 0, 9.2)
    const baroGroup = new THREE.Group();
    baroGroup.position.set(-7.5, 0, 9.2);
    const stevensonBox = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.1, 1.15, 0.9)), whiteWoodMat);
    stevensonBox.position.y = 1.45;
    const baroLegs = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.9, 1.0, 0.7)), steelMat);
    baroLegs.position.y = 0.5;
    const baroFace = new THREE.Mesh(this._trackGeo(new THREE.PlaneGeometry(0.55, 0.55)), dialMat);
    baroFace.position.set(0, 1.45, -0.46);
    baroFace.rotation.y = Math.PI;
    baroGroup.add(stevensonBox, baroLegs, baroFace);
    this.scene.add(baroGroup);
    this._addBoxCollider(-8.2, -6.8, 8.6, 9.8);
    this._registerInteractable(baroGroup, 'station_barometer', 'Đo Áp Kế Khí Quyển (hPa)');

    // 2. Trạm đo Gió (Phong vũ biểu - Anemometer) tại (0.0, 0, 14.2)
    const anemoGroup = new THREE.Group();
    anemoGroup.position.set(0.0, 0, 14.2);
    const mast = new THREE.Mesh(this._trackGeo(new THREE.CylinderGeometry(0.12, 0.18, 3.2, 8)), steelMat);
    mast.position.y = 1.6;
    const readBox = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.58, 0.62, 0.42)), whiteWoodMat);
    readBox.position.set(0, 1.35, -0.22);
    this.anemometerCups = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(1.35, 0.14, 1.35)),
      whiteWoodMat
    );
    this.anemometerCups.position.y = 3.25;
    anemoGroup.add(mast, readBox, this.anemometerCups);
    this.scene.add(anemoGroup);
    this._addBoxCollider(-0.5, 0.5, 13.7, 14.7);
    this._registerInteractable(anemoGroup, 'station_anemometer', 'Đo Phong Vũ Biểu (Tốc độ gió km/h)');

    // 3. Trạm đo Mưa sương (Vũ lượng kế - Rain Gauge) tại (7.5, 0, 9.8)
    const rainGroup = new THREE.Group();
    rainGroup.position.set(7.5, 0, 9.8);
    const rainCylinder = new THREE.Mesh(
      this._trackGeo(new THREE.CylinderGeometry(0.38, 0.34, 1.45, 12)),
      whiteWoodMat
    );
    rainCylinder.position.y = 0.95;
    const rainBase = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(0.95, 0.3, 0.95)), steelMat);
    rainBase.position.y = 0.15;
    rainGroup.add(rainCylinder, rainBase);
    this.scene.add(rainGroup);
    this._addBoxCollider(6.9, 8.1, 9.2, 10.4);
    this._registerInteractable(rainGroup, 'station_raingauge', 'Đo Vũ Lượng Kế (Lượng mưa sương mm)');

    // 4. Cột mốc Tọa độ số 0 & Cổng Sương Mù (Cho Ending 3 & Ending 4 Bí mật)
    const surveyPillar = new THREE.Mesh(
      this._trackGeo(new THREE.BoxGeometry(0.65, 1.5, 0.65)),
      whiteWoodMat
    );
    surveyPillar.position.set(0.0, 0.75, 9.2);
    this.scene.add(surveyPillar);
    this._addBoxCollider(-0.45, 0.45, 8.75, 9.65);
    this._registerInteractable(
      surveyPillar,
      'yard_monolith',
      'Cột Mốc Quan Trắc Số 0 (Đối diện Kẻ Đo / Bước vào Sương)'
    );

    // 5. Tháp Phát Sóng Cao Tần 108.4 MHz cuối Sân Đo (0.0, 0, 22.0) — Cho Ending 2 ("Phá lệ")
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0.0, 0, 22.0);
    const towerMast = new THREE.Mesh(
      this._trackGeo(new THREE.ConeGeometry(1.8, 13.5, 4)),
      this._trackMat(new THREE.MeshLambertMaterial({ color: 0x3b4d59, wireframe: false }))
    );
    towerMast.position.y = 6.75;
    const towerConsole = new THREE.Mesh(this._trackGeo(new THREE.BoxGeometry(1.2, 1.35, 0.85)), steelMat);
    towerConsole.position.set(0, 0.68, -1.35);
    const towerBeacon = new THREE.Mesh(this._trackGeo(new THREE.SphereGeometry(0.28, 8, 8)), beaconMat);
    towerBeacon.position.set(0, 13.4, 0);
    towerGroup.add(towerMast, towerConsole, towerBeacon);
    this.scene.add(towerGroup);
    this._addBoxCollider(-1.5, 1.5, 20.5, 23.2);
    this._registerInteractable(
      towerGroup,
      'radio_tower',
      'Tháp Phát Sóng Cao Tần 108.4 MHz (Gửi bản ghi thật - Phá lệ)'
    );
  }

  _buildDiaryNotes() {
    const THREE = this.THREE;
    const noteGeo = this._trackGeo(new THREE.BoxGeometry(0.32, 0.03, 0.42));
    const noteMat = this._trackMat(
      new THREE.MeshBasicMaterial({ map: this.texNote })
    );

    DIARY_FRAGMENTS.forEach((frag) => {
      const mesh = new THREE.Mesh(noteGeo, noteMat);
      mesh.position.set(frag.pos.x, frag.pos.y, frag.pos.z);
      mesh.rotation.y = (frag.id * 0.7) % Math.PI;
      this.scene.add(mesh);
      this._registerInteractable(mesh, `diary_note_${frag.id}`, `Nhặt ${frag.title}`, {
        noteId: frag.id
      });
      this.noteMeshes.set(frag.id, mesh);
    });
  }

  syncNoteVisibility(collectedNotesSet) {
    this.noteMeshes.forEach((mesh, id) => {
      mesh.visible = !collectedNotesSet.has(id);
    });
  }

  applyHourEnvironment(hourCfg) {
    this.windSpeedCurrent = hourCfg.windSpeedKmh;
    this.corruptFrontLamp = Boolean(hourCfg.corruptFrontLamp);

    const lampColor = this.corruptFrontLamp
      ? GAME_CONFIG.world.corruptedLightColor
      : GAME_CONFIG.world.sodiumLightColor;
    this.frontPorchLight.color.setHex(lampColor);
    if (this.frontLampBulbMat) {
      this.frontLampBulbMat.color.setHex(lampColor);
    }

    if (this.duplicateCupMesh) {
      this.duplicateCupMesh.visible = hourCfg.hour >= 2;
    }
    if (this.bedFrostFigure) {
      this.bedFrostFigure.visible = hourCfg.hour >= 5;
    }
    if (this.interiorFogMesh) {
      this.interiorFogMesh.visible = Boolean(hourCfg.interiorFog);
    }
  }

  triggerWindowScareFigure(duration = 2.8) {
    if (this.windowScareFigure) {
      this.windowScareFigure.visible = true;
      this.windowScareTimer = duration;
    }
  }

  setFlashlight(isOn) {
    if (this.flashlight) {
      this.flashlight.visible = Boolean(isOn);
    }
  }

  applySettings(newSettings) {
    this.settings = newSettings;
    const preset = GAME_CONFIG.graphicsPresets[newSettings.quality] || GAME_CONFIG.graphicsPresets.medium;
    if (this.flashlight) {
      this.flashlight.castShadow = Boolean(preset.shadows);
    }
  }

  resolveCollision(oldX, oldZ, nextX, nextZ, radius) {
    let rx = Math.max(GAME_CONFIG.world.yardBounds.minX, Math.min(GAME_CONFIG.world.yardBounds.maxX, nextX));
    let rz = Math.max(GAME_CONFIG.world.yardBounds.minZ, Math.min(GAME_CONFIG.world.yardBounds.maxZ, nextZ));

    for (let i = 0; i < this.colliders.length; i++) {
      const c = this.colliders[i];
      const expandedMinX = c.minX - radius;
      const expandedMaxX = c.maxX + radius;
      const expandedMinZ = c.minZ - radius;
      const expandedMaxZ = c.maxZ + radius;

      if (rx > expandedMinX && rx < expandedMaxX && rz > expandedMinZ && rz < expandedMaxZ) {
        // Thử trượt theo từng trục X hoặc Z
        const canMoveX = !(rx > expandedMinX && rx < expandedMaxX && oldZ > expandedMinZ && oldZ < expandedMaxZ);
        const canMoveZ = !(oldX > expandedMinX && oldX < expandedMaxX && rz > expandedMinZ && rz < expandedMaxZ);
        if (canMoveX) {
          rz = oldZ;
        } else if (canMoveZ) {
          rx = oldX;
        } else {
          rx = oldX;
          rz = oldZ;
        }
      }
    }

    return { x: rx, z: rz };
  }

  getSurfaceAt(x, z) {
    if (x >= -6.0 && x <= 6.0 && z >= -5.0 && z <= 5.0) {
      if (x > 1.8 && z > 0.0) return 'concrete'; // Sàn bê tông Phòng Máy Phát
      return 'wood';
    }
    return 'gravel';
  }

  getZoneNameAt(x, z) {
    if (x >= -6.0 && x <= 6.0 && z >= -5.0 && z <= 5.0) {
      if (x < -1.8) return 'Phòng Radio';
      if (x > 1.8 && z < 0.0) return 'Phòng Ngủ';
      if (x > 1.8 && z >= 0.0) return 'Phòng Máy Phát';
      return 'Hành Lang Chính';
    }
    if (z > 18.0) return 'Chân Tháp Phát Sóng';
    return 'Sân Quan Trắc';
  }

  update(dt, elapsed) {
    // Quay cánh quạt Phong vũ biểu theo tốc độ gió thực tế của giờ trực
    if (this.anemometerCups) {
      this.anemometerCups.rotation.y += (this.windSpeedCurrent * 0.14) * dt;
    }

    // Rung nhẹ khối động cơ Diesel trong Phòng Máy Phát
    if (this.generatorBlock) {
      this.generatorBlock.position.y = 0.72 + Math.sin(elapsed * 28.0) * 0.004;
    }

    // Dao động ánh sáng đèn an toàn dưới 2.5 Hz (chuẩn WCAG 2.3.1), tắt hoàn toàn nếu bật Reduce Flashing
    if (this.settings.reduceFlashing) {
      this.interiorLight.intensity = 12.0;
      this.frontPorchLight.intensity = 16.0;
    } else {
      this.interiorLight.intensity = 12.0 + Math.sin(elapsed * 4.2) * 0.45;
      this.frontPorchLight.intensity = 16.0 + Math.sin(elapsed * 5.5) * 0.65;
    }

    if (this.windowScareTimer > 0) {
      this.windowScareTimer -= dt;
      if (this.windowScareTimer <= 0 && this.windowScareFigure) {
        this.windowScareFigure.visible = false;
      }
    }
  }

  dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());
  }
}
