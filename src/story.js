/**
 * Module Kịch bản, Nhiệm vụ 6 Giờ Trực, 13 Quy tắc, 13 Mảnh Nhật Ký & 4 Kết thúc (Story & State Machine)
 */

import { GAME_CONFIG, DIARY_FRAGMENTS } from './config.js';

export class StoryManager {
  constructor(saveManager, deps = {}) {
    this.saveManager = saveManager;
    this.ui = deps.ui;
    this.audio = deps.audio;
    this.world = deps.world;
    this.entity = deps.entity;
    this.onHourChanged = deps.onHourChanged;
    this.onTriggerJumpScare = deps.onTriggerJumpScare;
    this.onTriggerEnding = deps.onTriggerEnding;

    this.currentHour = 1;
    this.collectedNotes = new Set(saveManager.saveData.collectedNotes || []);
    this.flags = { ...saveManager.saveData.flags };

    this.hourTasks = this._createEmptyTasks();
    this.jumpScare1Done = false;
    this.jumpScare2Done = false;
    this.usedSideDoorThisHour = false;
    this.frontDoorAmbushTriggered = false;
    this.prevPlayerZ = -2.2;
  }

  _createEmptyTasks() {
    return {
      barometerRead: false,
      anemometerRead: false,
      raingaugeRead: false,
      generatorChecked: false,
      radioReported: false,
      anomalyInspected: false
    };
  }

  startAtHour(hourNumber, isNewRun = false) {
    this.currentHour = Math.min(6, Math.max(1, hourNumber));
    if (isNewRun) {
      this.collectedNotes = new Set();
      this.flags = { ...this.saveManager.saveData.flags };
      this.jumpScare1Done = false;
      this.jumpScare2Done = false;
    } else {
      this.collectedNotes = new Set(this.saveManager.saveData.collectedNotes || []);
      this.flags = { ...this.saveManager.saveData.flags };
    }

    this._setupHour(this.currentHour, false);
  }

  _setupHour(hourNumber, showTransition = true) {
    this.currentHour = hourNumber;
    this.hourTasks = this._createEmptyTasks();
    this.usedSideDoorThisHour = false;
    this.frontDoorAmbushTriggered = false;

    const hourCfg = GAME_CONFIG.hours[this.currentHour - 1];

    if (this.world) {
      this.world.applyHourEnvironment(hourCfg);
      this.world.syncNoteVisibility(this.collectedNotes);
    }

    // Lưu checkpoint đầu mỗi giờ trực vào localStorage
    this.saveManager.saveCheckpoint(
      this.currentHour,
      Array.from(this.collectedNotes),
      this.flags
    );

    if (showTransition && this.onHourChanged) {
      this.onHourChanged(hourCfg);
    }

    // Phụ đề mở đầu mỗi giờ
    const introLines = {
      1: 'Đài Trung Tâm (142.8 MHz): "Chào QTV-09-14 Trần Văn Lương. Hãy đọc Sổ Tay [Tab] và đi tuần 3 trạm đo ngoài sân."',
      2: 'Giờ trực thứ 2 (01:00): Sương đặc hơn. Hình như trên bàn ăn ngoài hành lang vừa xuất hiện thêm một chiếc cốc...',
      3: 'Giờ trực thứ 3 (02:00): [Cảnh báo] Áp suất khí quyển đang tụt mạnh. Hãy nhìn màu đèn hiên trước khi mở cửa chính.',
      4: 'Giờ trực thứ 4 (03:00): Gió ngoài trời đột ngột tắt hẳn. Tín hiệu lạ đang nhấp nháy ở tần số 108.4 MHz.',
      5: 'Giờ trực thứ 5 (04:00): Sương lạnh đã tràn qua khe cửa vào trong nhà. Hãy kiểm tra nhiệt kế Phòng Ngủ!',
      6: 'Giờ trực thứ 6 (05:00 - Giờ cuối): Bình minh trắng sắp lên. Hãy hoàn tất số liệu hoặc chọn cách kết thúc đêm trực.'
    };
    if (this.ui && introLines[this.currentHour]) {
      this.ui.showSubtitle(introLines[this.currentHour], 6.0);
    }
  }

  debugCollectAllNotes() {
    DIARY_FRAGMENTS.forEach((f) => this.collectedNotes.add(f.id));
    if (this.world) {
      this.world.syncNoteVisibility(this.collectedNotes);
    }
    this.saveManager.saveCheckpoint(this.currentHour, Array.from(this.collectedNotes), this.flags);
  }

  recordRoutineBroken() {
    this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
  }

  getNotebookState() {
    return {
      collectedNotes: Array.from(this.collectedNotes),
      flags: this.flags
    };
  }

  getChecklist() {
    const h = this.currentHour;
    const list = [
      { label: 'Đo Áp kế ngoài Sân Đo', done: this.hourTasks.barometerRead },
      { label: 'Đo Phong vũ biểu (Gió)', done: this.hourTasks.anemometerRead },
      { label: 'Đo Vũ lượng kế (Mưa sương)', done: this.hourTasks.raingaugeRead },
      { label: 'Kiểm tra Máy phát điện', done: this.hourTasks.generatorChecked },
      { label: 'Báo cáo qua Máy Radio', done: this.hourTasks.radioReported }
    ];
    if (h < 6) {
      list.push({
        label: h === 5 ? 'Chốt ca nghỉ (Chú ý Quy tắc 9!)' : 'Chốt ca nghỉ tại Giường / Bàn trực',
        done: false
      });
    } else {
      list.push({
        label: 'Định đoạt Kết Cục (Radio / Tháp Sóng / Lò Đốt / Cột Mốc)',
        done: false
      });
    }
    return list;
  }

  _allMeasurementsDone() {
    return (
      this.hourTasks.barometerRead &&
      this.hourTasks.anemometerRead &&
      this.hourTasks.raingaugeRead &&
      this.hourTasks.generatorChecked
    );
  }

  _checkJumpScare2Trigger() {
    if (
      this.currentHour === 5 &&
      !this.jumpScare2Done &&
      this.hourTasks.barometerRead &&
      this.hourTasks.anemometerRead &&
      this.hourTasks.raingaugeRead
    ) {
      this.jumpScare2Done = true;
      if (this.entity) {
        this.entity.placeEntityForAmbush(-1.8, 11.5);
      }
      if (this.onTriggerJumpScare) {
        this.onTriggerJumpScare(2);
      }
    }
  }

  update(_dt, player) {
    const hourCfg = GAME_CONFIG.hours[this.currentHour - 1];

    // Kiểm tra Quy tắc 11: Nếu đèn hiên hóa xanh (Giờ 3, 5, 6) mà người chơi bước thẳng qua Cửa Chính (z vượt qua 5.0 ở x ~ [-1, 1])
    if (
      hourCfg.corruptFrontLamp &&
      !this.frontDoorAmbushTriggered &&
      this.prevPlayerZ <= 5.0 &&
      player.pos.z > 5.0 &&
      Math.abs(player.pos.x) < 1.25
    ) {
      this.frontDoorAmbushTriggered = true;
      this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 12);
      this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
      if (this.entity) {
        this.entity.placeEntityForAmbush(0.4, 7.2);
      }
      if (this.audio) {
        this.audio.playPeripheralSting(0.7);
      }
      this.ui.showSubtitle(
        '[Đèn hiên màu trắng xanh! Kẻ Đo đang đứng đợi sẵn ngay bậc thềm Cửa Chính như Quy tắc 11 cảnh báo!]',
        4.5
      );
    }

    // Nếu người chơi đi ra bằng Cửa Hông Phòng Máy Phát (x > 5.8) khi đèn hiên xanh -> Phá thói quen thành công!
    if (hourCfg.corruptFrontLamp && !this.usedSideDoorThisHour && player.pos.x > 5.85) {
      this.usedSideDoorThisHour = true;
      this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
      this.ui.showNotification('Đã đi vòng qua Cửa Hông — Tránh được điểm phục kích ngoài hiên chính!', 3.5);
    }

    this.prevPlayerZ = player.pos.z;
  }

  handleInteract(obj) {
    const id = obj.userData.interactId;
    const hourCfg = GAME_CONFIG.hours[this.currentHour - 1];

    if (this.audio) {
      this.audio.playInteractChime();
    }

    // 1. Nhặt mảnh nhật ký rời
    if (id.startsWith('diary_note_')) {
      const noteId = obj.userData.noteId;
      const frag = DIARY_FRAGMENTS.find((f) => f.id === noteId);
      if (!frag) return false;

      this.collectedNotes.add(noteId);
      obj.visible = false;
      if (this.audio) this.audio.playPaperRustle();

      this.saveManager.saveCheckpoint(this.currentHour, Array.from(this.collectedNotes), this.flags);

      this.ui.openInteractionModal({
        badge: `MẢNH NHẬT KÝ THU THẬP (${this.collectedNotes.size}/13)`,
        title: frag.title,
        description: `<p>${frag.content}</p>`,
        options: [
          {
            label: 'Cất vào Sổ Tay Trực Ca [Đóng]',
            primary: true,
            onSelect: () => this.ui.callbacks.onCloseInteraction()
          }
        ]
      });
      return true;
    }

    // 2. Mở Sổ Tay trên bàn
    if (id === 'open_notebook') {
      this.ui.callbacks.onOpenNotebookFromPause();
      return false;
    }

    // 3. Ba trạm đo ngoài sân (Áp kế, Gió, Mưa)
    if (id === 'station_barometer') {
      this.hourTasks.barometerRead = true;
      if (this.entity) this.entity.recordStationVisit(id);
      this.ui.showNotification(`Đã ghi Áp kế: ${hourCfg.pressureHpa} hPa`, 3.0);
      this.ui.showSubtitle(
        `[Áp kế chỉ ${hourCfg.pressureHpa} hPa${
          hourCfg.pressureHpa < 980 ? ' — Thấp hơn ngưỡng 980 hPa trong Quy tắc 4!' : ''
        }]`,
        4.0
      );
      this._checkJumpScare2Trigger();
      return false;
    }

    if (id === 'station_anemometer') {
      this.hourTasks.anemometerRead = true;
      if (this.entity) this.entity.recordStationVisit(id);
      this.ui.showNotification(`Đã ghi Phong vũ biểu: ${hourCfg.windSpeedKmh} km/h (${hourCfg.windDir})`, 3.0);
      this.ui.showSubtitle(
        `[Phong vũ biểu: Tốc độ gió ${hourCfg.windSpeedKmh} km/h, hướng ${hourCfg.windDir}]`,
        3.8
      );
      this._checkJumpScare2Trigger();
      return false;
    }

    if (id === 'station_raingauge') {
      this.hourTasks.raingaugeRead = true;
      if (this.entity) this.entity.recordStationVisit(id);
      this.ui.showNotification(`Đã ghi Vũ lượng kế: ${hourCfg.rainMm} mm`, 3.0);
      this.ui.showSubtitle(`[Vũ lượng kế: Lượng sương ngưng tụ ${hourCfg.rainMm} mm]`, 3.8);
      this._checkJumpScare2Trigger();
      return false;
    }

    // 4. Kiểm tra Cửa Chính & Cửa Hông
    if (id === 'front_door') {
      const lampState = hourCfg.corruptFrontLamp
        ? 'Đèn natri ngoài hiên đang chuyển sang MÀU TRẮNG XANH LẠNH LẼO! Theo Quy tắc 11 của Vũ, Nó đang đứng đợi ngoài hiên — hãy đi lối Cửa Hông Phòng Máy Phát.'
        : 'Đèn natri ngoài hiên vẫn giữ màu vàng cam ấm bình thường. Lối Cửa Chính an toàn.';
      this.ui.showSubtitle(`[Quan sát qua kính Cửa Chính]: ${lampState}`, 4.8);
      return false;
    }

    if (id === 'side_door') {
      this.ui.showSubtitle('[Cửa Hông Phòng Máy Phát]: Lối đi vòng ra sân giúp tránh mặt hiên chính.', 3.5);
      return false;
    }

    // 5. Nhiệt kế Phòng Ngủ (Quy tắc 9)
    if (id === 'bedroom_thermometer') {
      const warning =
        hourCfg.bedroomTempC < 4.0
          ? ' — CẢNH BÁO QUY TẮC 9: Dưới 4.0°C! Có thứ đang nằm trên giường, hãy chốt ca tại Ghế Bàn Trực Phòng Radio!'
          : ' — Nhiệt độ phòng ngủ trong ngưỡng bình thường.';
      this.ui.showSubtitle(`[Nhiệt kế Phòng Ngủ]: ${hourCfg.bedroomTempC.toFixed(1)}°C${warning}`, 5.0);
      return false;
    }

    // 6. Vật thể dị thường: Chiếc cốc tráng men nhân đôi (Quy tắc 8)
    if (id === 'anomaly_cup') {
      this.ui.openInteractionModal({
        badge: 'DỊ THƯỜNG TRONG TRẠM (QUY TẮC 8)',
        title: 'HAI CHIẾC CỐC TRÁNG MEN GIỐNG HỆT NHAU',
        description:
          '<p>Trên bàn ăn xuất hiện chiếc cốc thứ hai có vết sứt ở miệng giống hệt chiếc cốc đầu ca của bạn.</p>' +
          '<p><strong>Quy tắc 8</strong> bảo phải chạm tay xếp khít chúng lại. Nhưng <strong>Mảnh nhật ký #08</strong> cảnh báo đó là phép thử đồng hóa xúc giác của Kẻ Đo.</p>',
        options: [
          {
            label: 'Lùi lại, tuyệt đối không chạm vào vật nhân bản (Phá lệ / Tỉnh táo)',
            primary: true,
            onSelect: () => {
              this.hourTasks.anomalyInspected = true;
              this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
              obj.visible = false;
              this.ui.showSubtitle('[Bạn lùi lại và tắt đèn bàn — chiếc cốc thứ hai tan thành vệt sương mỏng]', 4.0);
              this.ui.callbacks.onCloseInteraction();
            }
          },
          {
            label: 'Chạm tay xếp chồng hai chiếc cốc theo đúng Quy tắc 8',
            primary: false,
            onSelect: () => {
              this.hourTasks.anomalyInspected = true;
              this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
              this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 16);
              obj.visible = false;
              this.ui.showSubtitle('[Ngón tay bạn tê buốt như chạm vào đá lạnh — Kẻ Đo vừa ghi nhận xong vân tay bạn]', 4.5);
              this.ui.callbacks.onCloseInteraction();
            }
          }
        ]
      });
      return true;
    }

    // 7. Máy Phát Điện Diesel (Quy tắc 5)
    if (id === 'generator_unit') {
      if (this.entity) this.entity.recordStationVisit(id);

      if (this.currentHour === 4 && !this.hourTasks.generatorChecked) {
        this.ui.openInteractionModal({
          badge: 'PHÒNG MÁY PHÁT ĐIỆN (QUY TẮC 5)',
          title: 'ĐIỀU CHỈNH TẢI MÁY PHÁT DIESEL',
          description:
            '<p>Đài Trung Tâm (142.8 MHz) vừa ra lệnh kéo cần gạt công suất lên <strong>100%</strong>.</p>' +
            '<p>Tuy nhiên, ghi chú của <strong>Bà Hạnh (Quy tắc 5 & Mảnh #05)</strong> cảnh báo mức 100% sẽ cấp điện cho cuộn cảm hút sương tràn vào nhà.</p>',
          options: [
            {
              label: 'Giữ mức tải an toàn 80% theo lời dặn của Bà Hạnh (Quy tắc 5)',
              primary: true,
              onSelect: () => {
                this.hourTasks.generatorChecked = true;
                this.flags.generatorKeptSafe = true;
                this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
                this.ui.showNotification('Đã khóa tải Máy phát ở mức 80% an toàn.', 3.2);
                this.ui.callbacks.onCloseInteraction();
              }
            },
            {
              label: 'Kéo cần gạt lên 100% theo lệnh của Đài 142.8 MHz',
              primary: false,
              onSelect: () => {
                this.hourTasks.generatorChecked = true;
                this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
                this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 18);
                if (this.world && this.world.interiorFogMesh) {
                  this.world.interiorFogMesh.visible = true;
                }
                this.ui.showSubtitle('[Cuộn cảm dưới sàn rền vang — Sương lạnh bắt đầu rỉ qua khe cửa sớm!]', 4.5);
                this.ui.callbacks.onCloseInteraction();
              }
            }
          ]
        });
        return true;
      }

      this.hourTasks.generatorChecked = true;
      this.ui.showNotification('Đã kiểm tra Máy phát điện Diesel: Áp suất dầu ổn định (Tải 80%).', 3.0);
      return false;
    }

    // 8. Máy Radio Sóng Ngắn (142.8 MHz & 108.4 MHz)
    if (id === 'radio_station') {
      return this._openRadioModal(hourCfg);
    }

    // 9. Lò Đốt Mẫu 600°C (Quy tắc 10 & Ending 3)
    if (id === 'incinerator') {
      return this._openIncineratorModal();
    }

    // 10. Tháp Phát Sóng Cao Tần (Ending 2 - Phá lệ)
    if (id === 'radio_tower') {
      return this._openRadioTowerModal();
    }

    // 11. Cột Mốc Quan Trắc Số 0 ngoài Sân Đo (Ending 3 & Ending 4 Bí mật)
    if (id === 'yard_monolith') {
      return this._openMonolithModal();
    }

    // 12. Chốt ca nghỉ tại Giường Ngủ hoặc Ghế Bàn Trực (Quy tắc 9)
    if (id === 'bed_rest' || id === 'duty_chair') {
      return this._handleRestInteraction(id, hourCfg);
    }

    return false;
  }

  _openRadioModal(hourCfg) {
    const canReport = this._allMeasurementsDone();
    const options = [];

    if (!this.hourTasks.radioReported) {
      if (canReport) {
        options.push({
          label: `Gửi SỐ LIỆU THỰC TẾ vừa đo (${hourCfg.pressureHpa} hPa | Gió ${hourCfg.windSpeedKmh} km/h | Mưa ${hourCfg.rainMm} mm)`,
          primary: true,
          onSelect: () => {
            this.hourTasks.radioReported = true;
            this.flags.trueReportCount = (this.flags.trueReportCount || 0) + 1;
            if (this.audio) this.audio.playRadioTransmission(false);
            this.ui.showSubtitle(
              `[Radio 142.8 MHz]: "Đã nhận báo cáo thực tế Giờ ${this.currentHour}. Tín hiệu khí áp dị thường đã được lưu vào bộ phát."`,
              4.8
            );
            this._afterRadioReportSubmitted();
            this.ui.callbacks.onCloseInteraction();
          }
        });

        options.push({
          label: 'Gửi SỐ LIỆU CHUẨN LÀM TRÒN (1013.0 hPa) theo Quy tắc 4 trong Sổ Tay',
          primary: false,
          onSelect: () => {
            this.hourTasks.radioReported = true;
            this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
            this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 14);
            if (this.audio) this.audio.playRadioTransmission(false);
            this.ui.showSubtitle(
              '[Radio 142.8 MHz]: "Tốt lắm QTV-09-14. Mọi con số đều khớp với khuôn mẫu. Hãy tiếp tục tuân thủ quy trình."',
              4.8
            );
            this._afterRadioReportSubmitted();
            this.ui.callbacks.onCloseInteraction();
          }
        });
      } else {
        options.push({
          label: 'Chưa đủ số liệu (Cần đo Áp kế, Gió, Mưa ngoài sân và kiểm tra Máy phát điện trước)',
          disabled: true
        });
      }
    }

    // Từ Giờ 4 mở tùy chọn dò tần số khẩn cấp 108.4 MHz (Quy tắc 6)
    if (this.currentHour >= 4) {
      options.push({
        label: 'Xoay núm dò sang tần số khẩn cấp 108.4 MHz (Bất chấp Quy tắc 6)',
        primary: !this.flags.heard1084Mhz,
        onSelect: () => {
          this.flags.heard1084Mhz = true;
          this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
          if (this.audio) this.audio.playRadioTransmission(true);
          this.ui.showSubtitle(
            'Trạm Gác Chân Đèo (108.4 MHz): "Trạm 9 đã đóng cửa từ 1994! Thứ trên kênh 142.8 là băng ghi của Kẻ Đo! Ở Giờ 6 hãy dùng mã 9140 lên Tháp Phát Sóng gửi dữ liệu thật!"',
            7.0
          );
          this.ui.callbacks.onCloseInteraction();
        }
      });
    }

    // Ở Giờ 6: Tùy chọn kết thúc trực tiếp tại bàn Radio (Ending 1 hoặc Ending 4 Bí mật)
    if (this.currentHour === 6) {
      options.push({
        label: '[KẾT THÚC 1 - ĐÚNG QUY TRÌNH] Đọc mã nhân sự QTV-09-14 bàn giao ca trên kênh 142.8 MHz (Quy tắc 12)',
        primary: false,
        onSelect: () => {
          this.ui.callbacks.onCloseInteraction();
          this.onTriggerEnding(1);
        }
      });

      if (this.collectedNotes.size >= 13) {
        options.push({
          label: '[KẾT THÚC BÍ MẬT - 13/13 MẢNH NHẬT KÝ] Phát toàn bộ 13 bản ghi ký ức để đảo ngược quy trình đo Kẻ Đo',
          primary: true,
          onSelect: () => {
            this.ui.callbacks.onCloseInteraction();
            this.onTriggerEnding(4);
          }
        });
      }
    }

    this.ui.openInteractionModal({
      badge: `BÀN LIÊN LẠC RADIO — GIỜ TRỰC ${this.currentHour}/6`,
      title: 'MÁY BỘ ĐÀM SÓNG NGẮN (142.8 MHz / 108.4 MHz)',
      description: `<p>Trạng thái số liệu Giờ ${this.currentHour}: Khí áp <strong>${
        this.hourTasks.barometerRead ? hourCfg.pressureHpa + ' hPa' : 'Chưa đo'
      }</strong> | Gió <strong>${
        this.hourTasks.anemometerRead ? hourCfg.windSpeedKmh + ' km/h' : 'Chưa đo'
      }</strong> | Mưa <strong>${
        this.hourTasks.raingaugeRead ? hourCfg.rainMm + ' mm' : 'Chưa đo'
      }</strong> | Máy phát: <strong>${this.hourTasks.generatorChecked ? 'Đã kiểm tra' : 'Chưa kiểm tra'}</strong>.</p>`,
      options
    });
    return true;
  }

  _afterRadioReportSubmitted() {
    // Jump Scare #1 ở Giờ 3 sau khi gửi báo cáo Radio (Có tiền đề từ tiếng bước chân & áp suất tụt)
    if (this.currentHour === 3 && !this.jumpScare1Done) {
      this.jumpScare1Done = true;
      if (this.world) {
        this.world.triggerWindowScareFigure(3.5);
      }
      if (this.onTriggerJumpScare) {
        this.onTriggerJumpScare(1);
      }
    }
  }

  _openIncineratorModal() {
    const options = [];
    if (this.currentHour === 6 && !this.flags.notebookBurned) {
      options.push({
        label: 'ĐỐT SỔ TAY TRỰC CA trong buồng lửa 600°C (Phá bỏ Quy tắc 10 - Mở đường Kết thúc 3)',
        primary: true,
        onSelect: () => {
          this.flags.notebookBurned = true;
          this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 2;
          this.ui.showSubtitle(
            '[Cuốn Sổ Tay Trực Ca bùng cháy thành ngọn lửa xanh bạc! Tiếng bước chân thứ hai ngoài sương bỗng dừng hẳn. Hãy bước ra Cột Mốc Sân Đo.]',
            6.5
          );
          this.ui.callbacks.onCloseInteraction();
        }
      });
    } else if (this.flags.notebookBurned) {
      options.push({
        label: 'Sổ Tay Trực Ca đã hóa thành tro bạc. Hãy bước ra Cột Mốc Sân Đo trong sương để kết thúc.',
        disabled: true
      });
    } else {
      options.push({
        label: `Lò đốt đang tích nhiệt (${this.currentHour * 100}°C / 600°C). Chỉ đạt 600°C vào Giờ 6 để hủy Sổ Tay.`,
        disabled: true
      });
    }

    this.ui.openInteractionModal({
      badge: 'PHÒNG MÁY PHÁT ĐIỆN (QUY TẮC 10)',
      title: 'LÒ ĐỐT MẪU KHÍ TƯỢNG CAO NHIỆT',
      description:
        '<p>Ngọn lửa trong buồng đốt dùng để tiêu hủy các bản ghi giấy tẩm muối bạc. <strong>Quy tắc 10</strong> nghiêm cấm mang Sổ Tay Trực Ca lại gần lò này.</p>',
      options
    });
    return true;
  }

  _openRadioTowerModal() {
    const canTriggerEnding2 =
      this.currentHour === 6 &&
      (this.flags.trueReportCount >= 2 || this.flags.heard1084Mhz || this.flags.routineBrokenCount >= 1);

    const options = [];
    if (this.currentHour === 6) {
      options.push({
        label: '[KẾT THÚC 2 - PHÁ LỆ] Nhập mã 9140 & Phát toàn bộ dữ liệu khí áp thật lên đỉnh Tháp Sóng 108.4 MHz',
        primary: true,
        onSelect: () => {
          this.ui.callbacks.onCloseInteraction();
          this.onTriggerEnding(2);
        }
      });
    } else {
      options.push({
        label: `Cầu dao phát sóng khẩn cấp đang nạp tụ (${this.currentHour}/6 giờ). Hãy quay lại vào Giờ 6.`,
        disabled: true
      });
    }

    this.ui.openInteractionModal({
      badge: 'THÁP PHÁT SÓNG CAO TẦN 108.4 MHz',
      title: 'BÀN PHÁT SÓNG CỨU HỘ ĐỈNH NÚI',
      description: `<p>Tháp phát sóng độc lập nối thẳng về Trạm Kiểm Lâm Chân Đèo. Số lần bạn đã gửi dữ liệu thật: <strong>${
        this.flags.trueReportCount || 0
      }</strong> | Số lần phá lộ trình lặp: <strong>${this.flags.routineBrokenCount || 0}</strong>${
        canTriggerEnding2 ? ' (Đã đủ điều kiện phát sóng Phá Lệ!)' : ''
      }.</p>`,
      options
    });
    return true;
  }

  _openMonolithModal() {
    const options = [];

    if (this.currentHour === 6 && this.flags.notebookBurned) {
      options.push({
        label: '[KẾT THÚC 3 - GHI CHÉP] Bước tay không qua Cổng Sương Mù sau khi đã đốt Sổ Tay',
        primary: true,
        onSelect: () => {
          this.ui.callbacks.onCloseInteraction();
          this.onTriggerEnding(3);
        }
      });
    }

    if (this.currentHour === 6 && this.collectedNotes.size >= 13) {
      options.push({
        label: '[KẾT THÚC BÍ MẬT - 13/13 MẢNH NHẬT KÝ] Đọc to toàn bộ quy luật của Kẻ Đo từ 13 mảnh ký ức',
        primary: true,
        onSelect: () => {
          this.ui.callbacks.onCloseInteraction();
          this.onTriggerEnding(4);
        }
      });
    }

    if (options.length === 0) {
      options.push({
        label: `Đã thu thập ${this.collectedNotes.size}/13 mảnh nhật ký. (Vào Giờ 6: Đốt sổ tay ở Lò Đốt hoặc gom đủ 13 mảnh nhật ký để mở kết thúc tại đây)`,
        disabled: true
      });
    }

    this.ui.openInteractionModal({
      badge: 'TÂM ĐIỂM ĐO LƯỜNG TRẠM 9',
      title: 'CỘT MỐC TỌA ĐỘ SỐ 0 & CỔNG SƯƠNG MÙ',
      description:
        '<p>Cột mốc đá đánh dấu tâm điểm của biển sương trên Đỉnh Mù Sương. Mọi bước chân trong trạm đều hội tụ về đây.</p>',
      options
    });
    return true;
  }

  _handleRestInteraction(restTargetId, hourCfg) {
    if (!this.hourTasks.radioReported && this.currentHour < 6) {
      this.ui.showNotification(
        'Bạn cần đo 3 chỉ số ngoài sân, kiểm tra Máy phát và gửi báo cáo Radio trước khi chốt ca!',
        3.5
      );
      return false;
    }

    if (this.currentHour === 6) {
      // Ở Giờ 6, tương tác chốt ca sẽ mở lựa chọn Kết thúc dựa trên hành vi cả đêm
      this.ui.openInteractionModal({
        badge: '05:55 SÁNG — KẾT THÚC ĐÊM TRỰC',
        title: 'CHỐT CA TRỰC CUỐI CÙNG',
        description:
          '<p>Đêm trực tại Trạm 9 đã đi đến những phút cuối cùng. Hãy chọn hành động khép lại ca trực của bạn:</p>',
        options: [
          {
            label: '[KẾT THÚC 1 - ĐÚNG QUY TRÌNH] Hoàn tất sổ trực theo đúng nội quy Trạm 9',
            primary: this.flags.obeyedBookCount >= this.flags.routineBrokenCount,
            onSelect: () => {
              this.ui.callbacks.onCloseInteraction();
              this.onTriggerEnding(1);
            }
          },
          ...(this.flags.notebookBurned
            ? [
                {
                  label: '[KẾT THÚC 3 - GHI CHÉP] Bước vào màn sương sau khi đã đốt Sổ Tay',
                  primary: true,
                  onSelect: () => {
                    this.ui.callbacks.onCloseInteraction();
                    this.onTriggerEnding(3);
                  }
                }
              ]
            : []),
          ...(this.collectedNotes.size >= 13
            ? [
                {
                  label: '[KẾT THÚC BÍ MẬT - NGƯỜI ĐO KẺ ĐO] Đối diện Kẻ Đo với đủ 13 mảnh nhật ký',
                  primary: true,
                  onSelect: () => {
                    this.ui.callbacks.onCloseInteraction();
                    this.onTriggerEnding(4);
                  }
                }
              ]
            : [])
        ]
      });
      return true;
    }

    // Kiểm tra Quy tắc 9 ở Giờ 5 (Nhiệt độ phòng ngủ 1.8°C < 4.0°C)
    if (this.currentHour === 5) {
      if (restTargetId === 'bed_rest') {
        this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
        this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 22);
        this.ui.showSubtitle(
          '[Bạn nằm xuống chiếc giường lạnh 1.8°C bất chấp Quy tắc 9 — Hơi lạnh trên nệm thấm sâu vào lồng ngực bạn!]',
          4.5
        );
      } else if (restTargetId === 'duty_chair') {
        this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
        this.ui.showSubtitle(
          '[Làm đúng Quy tắc 9 của Bà Hạnh: Bạn chốt ca trên Ghế Bàn Trực Phòng Radio, tránh được cái bóng trên giường!]',
          4.5
        );
      }
    }

    // Tổng kết dữ liệu học thói quen của giờ vừa qua để cập nhật Quy tắc 13
    if (this.entity) {
      const summary = this.entity.finalizeHourRoutine();
      this.flags.lastStepCount = summary.lastStepCount;
      this.flags.longestDwellZone = summary.longestDwellZone;
      this.flags.favoriteFirstStation = summary.favoriteFirstStation;

      if (summary.followedBookOrder) {
        this.flags.obeyedBookCount = (this.flags.obeyedBookCount || 0) + 1;
        this.flags.assimilationScore = Math.min(100, (this.flags.assimilationScore || 0) + 8);
      } else {
        this.flags.routineBrokenCount = (this.flags.routineBrokenCount || 0) + 1;
      }
    }

    this._setupHour(this.currentHour + 1, true);
    return false;
  }
}
