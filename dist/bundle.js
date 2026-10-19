/**
 * TRẠM 9 — SỔ TAY TRỰC CA (Bản đóng gói tự chứa từ src/*)
 * Three.js Pinned Version: three@0.186.1
 * Tương thích hoàn toàn với file:// (double-click) và HTTP static server.
 */
(function () {
  'use strict';

// ==========================================
// MODULE: src/config.js
// ==========================================
/**
 * TRẠM 9 — SỔ TAY TRỰC CA
 * Phiên bản Three.js cố định (pinned): three@0.186.1
 * CDN chính: https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js
 * File cấu hình tập trung toàn bộ hằng số cân bằng game, đồ họa, kịch bản và ngôn ngữ.
 */
const THREE_PINNED_VERSION = '0.186.1';
const THREE_CDN_PRIMARY = 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js';
const THREE_CDN_FALLBACK = 'https://unpkg.com/three@0.186.1/build/three.module.js';
const GAME_CONFIG = {
  version: '1.0.0',
  fixedTimeStep: 1 / 60,
  maxDeltaClamp: 0.1,
  storageKey: 'tram9_sotaytrucca_save_v1',
  settingsKey: 'tram9_sotaytrucca_settings_v1',

  player: {
    eyeHeight: 1.68,
    crouchEyeHeight: 1.05,
    radius: 0.36,
    walkSpeed: 3.3,
    sprintSpeed: 5.1,
    acceleration: 16.0,
    damping: 10.0,
    interactDistance: 2.75,
    stepIntervalWalk: 0.52,
    stepIntervalSprint: 0.35,
    headBobFrequency: 8.5,
    headBobAmplitude: 0.038,
    minPitch: -Math.PI * 0.46,
    maxPitch: Math.PI * 0.46,
    spawnPos: { x: -3.2, y: 1.68, z: -2.2 },
    spawnYaw: 0.0
  },

  world: {
    stationBounds: { minX: -6.2, maxX: 6.2, minZ: -5.2, maxZ: 5.2 },
    yardBounds: { minX: -24.0, maxX: 24.0, minZ: -24.0, maxZ: 28.0 },
    cameraNear: 0.1,
    cameraFar: 56.0,
    baseFogColor: 0x111a21,
    dawnFogColor: 0x1f2d38,
    sodiumLightColor: 0xff8c3b,
    corruptedLightColor: 0x7ce0ff,
    interiorLightColor: 0xffb36b,
    dangerLightColor: 0xff4030
  },

  graphicsPresets: {
    low: {
      label: 'Thấp (Low)',
      maxPixelRatio: 0.85,
      shadows: false,
      shadowMapSize: 512,
      grainIntensity: 0.04,
      chromaticAberration: 0.0012,
      fogParticles: 40,
      drsEnabled: true,
      targetFrameMs: 28.0
    },
    medium: {
      label: 'Trung bình (Medium)',
      maxPixelRatio: 1.35,
      shadows: true,
      shadowMapSize: 1024,
      grainIntensity: 0.065,
      chromaticAberration: 0.0022,
      fogParticles: 90,
      drsEnabled: true,
      targetFrameMs: 17.5
    },
    high: {
      label: 'Cao (High)',
      maxPixelRatio: 2.0,
      shadows: true,
      shadowMapSize: 1024,
      grainIntensity: 0.075,
      chromaticAberration: 0.0028,
      fogParticles: 140,
      drsEnabled: true,
      targetFrameMs: 16.8
    }
  },

  defaultSettings: {
    quality: 'medium',
    fov: 72,
    sensitivity: 1.0,
    invertY: false,
    headBob: true,
    reduceFlashing: false,
    subtitleSize: 'medium',
    bgmVolume: 0.7,
    sfxVolume: 0.85,
    voiceVolume: 0.9,
    language: 'vi'
  },

  entity: {
    // Hiện diện ngoại vi: tích vô hướng giữa hướng nhìn camera và vector tới thực thể
    peripheralDotMin: 0.34,
    peripheralDotPeak: 0.62,
    peripheralDotDirect: 0.88,
    directLookStepCloser: 2.35,
    directLookCooldown: 1.8,
    baseAppearDistance: 13.5,
    minSafeDistance: 1.65,
    assimilationDirectLookRate: 11.0,
    assimilationProximityRate: 8.5,

    // Học thói quen & phát lại hành trình
    recordSampleInterval: 0.25,
    maxSamplesPerHour: 1200,
    dwellSpeedThreshold: 0.22,
    dwellTimeThreshold: 4.0,
    dwellDangerSeconds: 12.0,
    secondFootstepDelay: 0.35,
    breakRoutineStopSeconds: 3.0,
    breakRoutineTurnDot: 0.25,
    echoSpeedMultiplier: 1.04
  },

  hours: [
    {
      hour: 1,
      timeLabel: '00:00 — GIỜ TRỰC THỨ NHẤT',
      title: 'Nhận Ca Đêm',
      tension: 2,
      fogDensity: 0.038,
      windSpeedKmh: 14,
      windDir: 'BĐB',
      pressureHpa: 1012.4,
      rainMm: 1.2,
      bedroomTempC: 11.5,
      corruptFrontLamp: false,
      interiorFog: false,
      echoActive: false,
      anomalyType: null,
      objectiveHint: 'Đọc Sổ Tay (Tab), đo Áp kế, Gió, Mưa ngoài sân, kiểm tra Máy phát điện, báo cáo Radio rồi nghỉ tại Giường.'
    },
    {
      hour: 2,
      timeLabel: '01:00 — GIỜ TRỰC THỨ HAI',
      title: 'Sai Lệch Nhỏ',
      tension: 4,
      fogDensity: 0.046,
      windSpeedKmh: 19,
      windDir: 'B',
      pressureHpa: 996.8,
      rainMm: 2.8,
      bedroomTempC: 9.8,
      corruptFrontLamp: false,
      interiorFog: false,
      echoActive: false,
      anomalyType: 'double_cup',
      objectiveHint: 'Đi tuần Giờ 2. Chú ý các vật thể lạ trên bàn và sự thay đổi ở trang cuối Sổ Tay.'
    },
    {
      hour: 3,
      timeLabel: '02:00 — GIỜ TRỰC THỨ BA',
      title: 'Bóng Lặp Hành Trình',
      tension: 8,
      fogDensity: 0.058,
      windSpeedKmh: 28,
      windDir: 'TB',
      pressureHpa: 974.5,
      rainMm: 5.4,
      bedroomTempC: 7.2,
      corruptFrontLamp: true,
      interiorFog: false,
      echoActive: true,
      anomalyType: 'mirror_clipboard',
      objectiveHint: 'Áp suất tụt sâu dưới 980 hPa. Lắng nghe tiếng bước chân thứ hai và chú ý màu đèn hiên trước khi mở cửa.'
    },
    {
      hour: 4,
      timeLabel: '03:00 — GIỜ TRỰC THỨ TƯ',
      title: 'Khoảng Lặng & Tần Số Lạ',
      tension: 5,
      fogDensity: 0.052,
      windSpeedKmh: 0,
      windDir: 'LẶNG GIÓ',
      pressureHpa: 961.0,
      rainMm: 7.1,
      bedroomTempC: 5.4,
      corruptFrontLamp: false,
      interiorFog: false,
      echoActive: true,
      anomalyType: 'generator_order',
      objectiveHint: 'Gió ngoài trời lặng hẳn. Kiểm tra tải Máy phát điện và thử dò tần số 108.4 MHz trên Radio.'
    },
    {
      hour: 5,
      timeLabel: '04:00 — GIỜ TRỰC THỨ NĂM',
      title: 'Sương Tràn Qua Khe Cửa',
      tension: 10,
      fogDensity: 0.072,
      windSpeedKmh: 46,
      windDir: 'ĐB',
      pressureHpa: 942.3,
      rainMm: 11.8,
      bedroomTempC: 1.8,
      corruptFrontLamp: true,
      interiorFog: true,
      echoActive: true,
      anomalyType: 'bedroom_frost',
      objectiveHint: 'Sương đã tràn vào nhà. Kiểm tra nhiệt kế Phòng Ngủ trước khi quyết định nơi chốt ca.'
    },
    {
      hour: 6,
      timeLabel: '05:00 — GIỜ TRỰC CUỐI CÙNG',
      title: 'Bình Minh Trắng',
      tension: 7,
      fogDensity: 0.064,
      windSpeedKmh: 52,
      windDir: 'B',
      pressureHpa: 918.0,
      rainMm: 14.0,
      bedroomTempC: 0.4,
      corruptFrontLamp: true,
      interiorFog: true,
      echoActive: true,
      anomalyType: 'final_convergence',
      objectiveHint: 'Giờ trực cuối: Hoàn tất số liệu và định đoạt số phận tại Radio, Tháp Phát Sóng, Lò Đốt Mẫu hoặc Cột Mốc Sân Đo.'
    }
  ]
};
const NOTEBOOK_RULES = [
  {
    id: 1,
    origin: 'center_trap',
    handwriting: 'typed',
    title: 'Quy tắc 1 (Trình tự tuần tra)',
    text: 'Mỗi giờ trực phải đi tuần đúng thứ tự cố định: (1) Áp kế -> (2) Phong vũ biểu -> (3) Vũ lượng kế -> (4) Máy phát điện -> (5) Báo cáo Radio -> (6) Nghỉ tại Giường. Nghiêm cấm đảo ngược hoặc tự ý đổi lộ trình.'
  },
  {
    id: 2,
    origin: 'vu_true',
    handwriting: 'handwritten_blue',
    title: 'Quy tắc 2 (Ghi chú lề của Vũ)',
    text: '[Chữ viết tay mực xanh]: Nếu nghe tiếng bước chân thứ hai vang lên trễ nửa nhịp sau gót chân mình, ĐỪNG bước tiếp theo lối cũ. Hãy đứng im 3 giây hoặc rẽ ngoặt 90 độ ngay lập tức.'
  },
  {
    id: 3,
    origin: 'center_trap',
    handwriting: 'typed',
    title: 'Quy tắc 3 (Xác nhận thị giác)',
    text: 'Khi thấy bóng người ở rìa tầm nhìn, phải lập tức bật đèn pin và nhìn thẳng trực diện vào mục tiêu cho đến khi bóng đó tan hẳn vào sương.'
  },
  {
    id: 4,
    origin: 'entity_fake',
    handwriting: 'wet_ink',
    title: 'Quy tắc 4 (Hiệu chuẩn áp suất)',
    text: 'Áp suất trên Đỉnh Mù Sương luôn bằng 1013.0 hPa. Nếu kim áp kế tụt xuống dưới 980 hPa, đó là lỗi cơ học — hãy chọn gửi "Số liệu chuẩn 1013.0 hPa" trên máy Radio.'
  },
  {
    id: 5,
    origin: 'hanh_true',
    handwriting: 'handwritten_red',
    title: 'Quy tắc 5 (Cảnh báo kỹ thuật - Hạnh)',
    text: '[Chữ viết tay nét cứng]: Giữ cần gạt Máy phát điện ở mức tải chuẩn 80%. Dù Đài Trung Tâm có ra lệnh kéo lên 100% ở Giờ 4, tuyệt đối không làm theo.'
  },
  {
    id: 6,
    origin: 'center_trap',
    handwriting: 'typed',
    title: 'Quy tắc 6 (Kỷ luật tần số)',
    text: 'Chỉ được phép liên lạc trên tần số 142.8 MHz. Mọi tín hiệu bắt được ở tần số 108.4 MHz đều là nhiễu khí quyển, nghiêm cấm chuyển kênh nghe hoặc trả lời.'
  },
  {
    id: 7,
    origin: 'vu_true',
    handwriting: 'handwritten_blue',
    title: 'Quy tắc 7 (Thời gian dừng)',
    text: '[Chữ viết tay gạch chân]: Không đứng yên quá 12 giây tại cùng một vị trí mà bạn đã đứng ở giờ trực trước. Đọc xong thông số phải bước đi ngay.'
  },
  {
    id: 8,
    origin: 'entity_fake',
    handwriting: 'wet_ink',
    title: 'Quy tắc 8 (Đồng bộ kiểm kê)',
    text: 'Nếu thấy trên bàn xuất hiện chiếc cốc thứ hai hoặc sổ ghi chép thứ hai giống hệt đồ của trạm, hãy chạm tay vào nó để đồng bộ kiểm kê.'
  },
  {
    id: 9,
    origin: 'hanh_true',
    handwriting: 'handwritten_red',
    title: 'Quy tắc 9 (Kiểm tra nhiệt độ giường)',
    text: '[Mực đỏ]: Từ 04:00 sáng (Giờ 5), hãy nhìn nhiệt kế Phòng Ngủ trước khi nghỉ. Nếu dưới 4.0°C, đã có thứ nằm sẵn trên giường — hãy ra Ghế Bàn Trực Phòng Radio để chốt ca.'
  },
  {
    id: 10,
    origin: 'center_trap',
    handwriting: 'typed',
    title: 'Quy tắc 10 (Bảo quản sổ tay)',
    text: 'Sổ Tay Trực Ca là tài sản tuyệt mật của Dự án 09. Nghiêm cấm mang cuốn sổ này lại gần Lò Đốt Mẫu trong Phòng Máy Phát.'
  },
  {
    id: 11,
    origin: 'vu_true',
    handwriting: 'handwritten_blue',
    title: 'Quy tắc 11 (Màu đèn hiên trước)',
    text: '[Chữ viết tay]: Từ Giờ 3, nhìn qua kính cửa chính trước khi mở. Nếu đèn natri ngoài hiên đổi sang màu trắng xanh lạnh, Nó đang đứng đợi trước cửa — hãy đi vòng qua cửa hông Phòng Máy Phát.'
  },
  {
    id: 12,
    origin: 'entity_fake',
    handwriting: 'wet_ink',
    title: 'Quy tắc 12 (Thủ tục bàn giao 05:00)',
    text: 'Vào Giờ 6, sau khi đi đúng quy trình, hãy tuyên đọc mã nhân sự QTV-09-14 trên kênh 142.8 MHz để hoàn tất bàn giao bản thể cho Trạm 9.'
  },
  {
    id: 13,
    origin: 'entity_fake',
    handwriting: 'wet_ink_dynamic',
    title: 'Quy tắc 13 (Đang tự viết...)',
    text: 'Cuốn sổ này vốn chỉ có 12 quy tắc. Nếu bạn đọc được dòng thứ 13, chúng tôi đang đo sải chân của bạn...'
  }
];
const DIARY_FRAGMENTS = [
  {
    id: 1,
    minHour: 1,
    title: 'Mảnh #01: Biên bản bàn giao vội',
    locationHint: 'Bàn làm việc Phòng Radio',
    pos: { x: -4.1, y: 0.92, z: -3.6 },
    content: 'Lương, nếu cậu tìm thấy mảnh giấy này: Đừng tin toàn bộ Sổ Tay. Quy tắc 1 bắt cậu lặp lại thứ tự cố định (Áp kế -> Gió -> Mưa) chính là để thứ ngoài sương học thuộc bước chân cậu. Mỗi giờ hãy đảo thứ tự đi tuần! — Đ.Q.Vũ (QTV-09-13)'
  },
  {
    id: 2,
    minHour: 1,
    title: 'Mảnh #02: Bản ghi âm thanh số 4',
    locationHint: 'Kệ sắt Hành lang chính',
    pos: { x: -0.4, y: 1.05, z: -1.6 },
    content: 'Đêm thứ tư của tôi. Luôn có tiếng bước chân thứ hai đi trễ đúng nửa nhịp sau gót giày tôi. Chạy nhanh không thoát được nó. Chỉ khi tôi dừng khựng lại 3 giây hoặc rẽ ngoặt 90 độ như Quy tắc 2 tôi viết thêm, tiếng chân đó mới bước hụt rồi tan biến. — Vũ'
  },
  {
    id: 3,
    minHour: 1,
    title: 'Mảnh #03: Ghi chú quang học',
    locationHint: 'Bệ cửa sổ Phòng Ngủ',
    pos: { x: 4.5, y: 0.95, z: -3.8 },
    content: 'Quy tắc 3 bảo chiếu đèn và nhìn thẳng vào cái bóng ở rìa mắt là một cái bẫy! Khi nhìn thẳng, nó tan khỏi tâm mắt thật, nhưng ngay lúc ta quay đầu đi, nó đã bước lại gần hơn cả sải tay. Thấy nó ở rìa mắt thì cứ lặng lẽ lách đi, đừng nhìn chằm chằm!'
  },
  {
    id: 4,
    minHour: 1,
    title: 'Mảnh #04: Biểu đồ khí áp bị xé',
    locationHint: 'Chân trụ Áp kế ngoài Sân Đo',
    pos: { x: -7.6, y: 0.85, z: 8.4 },
    content: 'Mỗi khi Nó tiến lại gần hàng rào, áp suất khí quyển tụt xuống dưới 980 hPa. Quy tắc 4 do chính Nó viết thêm để lừa ta gửi số giả 1013.0 hPa. Hãy gửi số liệu thực tế vừa đo để hệ thống ghi nhận dị thường thật!'
  },
  {
    id: 5,
    minHour: 1,
    title: 'Mảnh #05: Sơ đồ mạch điện của Bà Hạnh',
    locationHint: 'Bảng cầu dao Phòng Máy Phát',
    pos: { x: 4.6, y: 1.15, z: 3.5 },
    content: 'Tôi là Lê Thị Hạnh (QTV-09-07). Dây tải 100% của máy phát không nối lên ăng-ten mà nối xuống cuộn cảm dưới móng nhà để hút sương tràn vào trạm. Ở Giờ 4, hãy giữ máy phát ở mức 80% theo Quy tắc 5 của tôi, đừng nghe lời đài 142.8 MHz!'
  },
  {
    id: 6,
    minHour: 1,
    title: 'Mảnh #06: Mảnh giấy kẹp sau máy bộ đàm',
    locationHint: 'Góc bàn phụ Phòng Radio',
    pos: { x: -5.2, y: 0.88, z: -1.5 },
    content: 'Kênh 142.8 MHz chỉ là vòng lặp nội bộ của Dự án 09. Quy tắc 6 cấm dò sang 108.4 MHz vì ở 108.4 MHz có Trạm Kiểm Lâm Chân Đèo! Từ Giờ 4 trở đi, hãy chuyển tần số sang 108.4 MHz để lấy mã mở Tháp Phát Sóng. — Vũ'
  },
  {
    id: 7,
    minHour: 1,
    title: 'Mảnh #07: Vết phấn dưới chân cột gió',
    locationHint: 'Chân trụ Phong vũ biểu ngoài Sân Đo',
    pos: { x: 0.4, y: 0.65, z: 13.5 },
    content: 'Hôm qua tôi đứng dưới cột đo gió 14 giây. Đêm nay, khi tôi đứng lại đúng chỗ đó sang giây thứ 12, hơi thở băng giá phả ngay sau cổ. Nó nhớ các điểm dừng lâu (Quy tắc 7). Đọc số xong phải rời vị trí ngay!'
  },
  {
    id: 8,
    minHour: 1,
    title: 'Mảnh #08: Báo cáo kiểm kê dị thường',
    locationHint: 'Bàn ăn nhỏ giữa Hành lang',
    pos: { x: 0.8, y: 0.88, z: 1.2 },
    content: 'Trên bàn bỗng xuất hiện chiếc cốc tráng men thứ hai giống hệt chiếc cốc đang dùng. Quy tắc 8 xúi chạm vào để đồng bộ — đừng nghe! Chạm vào vật nhân bản là cho phép Nó sao chép xúc giác của bạn. Hãy chọn lờ đi và tránh xa.'
  },
  {
    id: 9,
    minHour: 1,
    title: 'Mảnh #09: Nhật ký y tế năm 1991',
    locationHint: 'Bàn đầu giường Phòng Ngủ',
    pos: { x: 3.1, y: 0.85, z: -1.9 },
    content: 'Vào Giờ 5, khi sương rỉ qua khe cửa, nhiệt kế Phòng Ngủ rơi xuống 1.8°C và trên nệm có vết lõm như người đang nằm. Nhớ kỹ Quy tắc 9 tôi viết bằng mực đỏ: Nếu nhiệt kế dưới 4°C, hãy ra Ghế Bàn Trực Phòng Radio mà chốt ca! — Hạnh'
  },
  {
    id: 10,
    minHour: 1,
    title: 'Mảnh #10: Biên bản mật Dự Án 09',
    locationHint: 'Nắp Lò đốt mẫu Phòng Máy Phát',
    pos: { x: 2.6, y: 1.1, z: 4.3 },
    content: 'Tài liệu mật: Cuốn Sổ Tay Trực Ca được dệt từ sợi giấy tẩm muối bạc để giam giữ bản ghi hành vi của các quan trắc viên. Quy tắc 10 cấm mang sổ gần Lò Đốt Mẫu vì ngọn lửa 600°C của lò đốt là thứ duy nhất xóa sạch được cuốn sổ vào Giờ 6.'
  },
  {
    id: 11,
    minHour: 1,
    title: 'Mảnh #11: Lời dặn nơi bậc thềm',
    locationHint: 'Kệ dụng cụ cạnh cửa hông Phòng Máy Phát',
    pos: { x: 5.5, y: 0.95, z: 1.8 },
    content: 'Đèn hơi natri ngoài hiên vốn có màu vàng cam. Nhưng ở Giờ 3 và Giờ 5, nếu Nó đứng phục sẵn ngoài cửa chính để đón đầu thói quen của cậu, ánh đèn hiên sẽ chuyển sang màu trắng xanh lạnh lẽo (Quy tắc 11). Thấy đèn xanh, hãy đi cửa hông Phòng Máy Phát!'
  },
  {
    id: 12,
    minHour: 1,
    title: 'Mảnh #12: Danh sách 13 người trước',
    locationHint: 'Chân trụ Vũ lượng kế ngoài Sân Đo',
    pos: { x: 7.8, y: 0.82, z: 9.2 },
    content: 'Mười hai quy tắc đầu tiên không phải nội quy công ty. Đó là dấu vết của 12 quan trắc viên từ QTV-09-01 đến QTV-09-12! Ai làm theo Quy tắc 12 đọc mã nhân sự lúc 05:00 sáng trên kênh 142.8 MHz đều biến thành một dòng chữ mới trong sổ.'
  },
  {
    id: 13,
    minHour: 1,
    title: 'Mảnh #13: Bản nháp cuối cùng của Vũ',
    locationHint: 'Chân Tháp Phát Sóng cuối Sân Đo',
    pos: { x: 0.0, y: 0.9, z: 21.2 },
    content: 'Lương, nếu cậu cầm đủ 13 mảnh giấy này, cậu đã hiểu toàn bộ sự thật. Kẻ Đo không phải ác quỷ — nó là một tấm gương bằng sương mù bị Dự Án 09 giam cầm để đo con người. Ở Giờ 6, hãy đến Cột Mốc Giữa Sân hoặc Bàn Radio để đối diện với nó bằng cả 13 ký ức này! — Vũ'
  }
];
const ENDINGS_META = {
  1: {
    id: 1,
    code: 'ENDING_1_PROTOCOL',
    title: 'KẾT THÚC 1: ĐÚNG QUY TRÌNH',
    subtitle: 'Quy Tắc Thứ Mười Bốn',
    summary: 'Bạn đã tuân thủ cuốn Sổ Tay Trực Ca và đọc mã nhân sự QTV-09-14 vào lúc 05:00 sáng. Hơi sương ấm dần lên khi bàn tay bạn nhạt đi. Trên trang giấy trắng cuối sổ, một dòng chữ in mới tự động hiện lên — chờ đợi quan trắc viên thứ 15.'
  },
  2: {
    id: 2,
    code: 'ENDING_2_RULEBREAKER',
    title: 'KẾT THÚC 2: PHÁ LỆ',
    subtitle: 'Tín Hiệu Xuyên Màn Sương',
    summary: 'Bạn đã chủ động phá vỡ lộ trình lặp lại, gửi dữ liệu khí áp thật và phát sóng khẩn cấp từ đỉnh Tháp Radio trên tần số 108.4 MHz. Đội cứu hộ chân đèo tìm thấy bạn lúc rạng đông. Bạn đã sống sót rời khỏi Đỉnh Mù Sương — chỉ trừ việc cái bóng của bạn dưới ánh nắng mai vẫn luôn bước trễ hơn bạn nửa nhịp.'
  },
  3: {
    id: 3,
    code: 'ENDING_3_UNWRITTEN',
    title: 'KẾT THÚC 3: GHI CHÉP',
    subtitle: 'Trang Giấy Trắng Trong Sương',
    summary: 'Bạn ném cuốn Sổ Tay Trực Ca vào ngọn lửa 600°C của Lò Đốt Mẫu rồi tay không bước qua cổng sương. Tiếng bước chân thứ hai dừng lại trước mặt bạn. Thực thể trong sương không hề tấn công — nó chỉ lặng lẽ cúi đầu khi xiềng xích của 13 quy tắc tan thành tro bụi, rồi cùng biển sương tan dần vào ánh bình minh.'
  },
  4: {
    id: 4,
    code: 'ENDING_4_SECRET',
    title: 'KẾT THÚC BÍ MẬT: NGƯỜI ĐO KẺ ĐO',
    subtitle: 'Mười Ba Ký Ức Trở Về',
    summary: 'Gom đủ 13 mảnh nhật ký của Vũ, bà Hạnh và những người đi trước, bạn đứng giữa sân quan trắc và đọc to chính xác quy luật vận hành của Kẻ Đo. Bị đảo ngược vai trò từ kẻ quan sát thành đối tượng được thấu hiểu, màn sương ngưng kết thành 13 bóng người lặng lẽ mở lối cho bạn mang toàn bộ hồ sơ Dự Án 09 xuống núi.'
  }
};
const I18N = {
  vi: {
    gameTitle: 'TRẠM 9',
    gameSubtitle: 'SỔ TAY TRỰC CA',
    warningTitle: 'CẢNH BÁO NỘI DUNG & AN TOÀN THỊ GIÁC',
    warningBody: 'Trò chơi có không khí tâm lý căng thẳng, âm thanh không gian 3D và hiệu ứng ánh sáng chớp nhẹ (đã giới hạn an toàn dưới 3Hz theo chuẩn WCAG 2.3.1). Khuyên dùng tai nghe để nghe rõ hướng bước chân.',
    reduceFlashToggle: 'Bật chế độ Giảm Nhấp Nháy (Tắt hoàn toàn chớp sáng)',
    warningConfirm: 'TÔI ĐÃ HIỂU & BẮT ĐẦU (MỞ ÂM THANH)',
    startNewGame: 'NHẬN CA TRỰC MỚI (00:00)',
    continueGame: 'TIẾP TỤC TỪ CHECKPOINT',
    settingsBtn: 'CÀI ĐẶT HỆ THỐNG',
    creditsBtn: 'THÔNG TIN & CREDITS',
    pauseTitle: 'TẠM DỪNG CA TRỰC',
    resumeBtn: 'TIẾP TỤC CA TRỰC',
    returnTitleBtn: 'VỀ MÀN HÌNH CHÍNH',
    interactPrompt: '[E] Tương tác',
    controlsHint: 'WASD: Di chuyển | Chuột: Nhìn | E: Tương tác | F: Đèn pin | Tab: Sổ tay | Esc: Tạm dừng'
  },
  en: {
    gameTitle: 'STATION 9',
    gameSubtitle: 'SHIFT LOGBOOK',
    warningTitle: 'CONTENT & PHOTOSENSITIVITY WARNING',
    warningBody: 'This game features psychological tension, 3D spatial audio, and subtle lighting fluctuations (safely capped below 3Hz per WCAG 2.3.1). Headphones are strongly recommended to hear footstep directions.',
    reduceFlashToggle: 'Enable Reduce Flashing Mode (Disable all light flicker)',
    warningConfirm: 'I UNDERSTAND & BEGIN (UNLOCK AUDIO)',
    startNewGame: 'START NEW SHIFT (00:00)',
    continueGame: 'CONTINUE FROM CHECKPOINT',
    settingsBtn: 'SYSTEM SETTINGS',
    creditsBtn: 'CREDITS & LICENSES',
    pauseTitle: 'SHIFT PAUSED',
    resumeBtn: 'RESUME SHIFT',
    returnTitleBtn: 'RETURN TO TITLE',
    interactPrompt: '[E] Interact',
    controlsHint: 'WASD: Move | Mouse: Look | E: Interact | F: Flashlight | Tab: Logbook | Esc: Pause'
  }
};



// ==========================================
// MODULE: src/save.js
// ==========================================
/**
 * Module quản lý lưu trữ (Save & Settings Manager)
 * Bọc try/catch toàn bộ thao tác localStorage để không lỗi khi chạy ở file:// hoặc chế độ chặn cookie.
 */
class SaveManager {
  constructor() {
    this.memoryFallback = {};
    this.storageAvailable = this._checkStorage();
    this.settings = this.loadSettings();
    this.saveData = this.loadSaveData();
  }

  _checkStorage() {
    try {
      const testKey = '__tram9_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (_err) {
      return false;
    }
  }

  _getRaw(key) {
    try {
      if (this.storageAvailable && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (_err) {
      this.storageAvailable = false;
    }
    return Object.prototype.hasOwnProperty.call(this.memoryFallback, key)
      ? this.memoryFallback[key]
      : null;
  }

  _setRaw(key, value) {
    this.memoryFallback[key] = value;
    try {
      if (this.storageAvailable && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (_err) {
      this.storageAvailable = false;
    }
  }

  loadSettings() {
    const defaults = { ...GAME_CONFIG.defaultSettings };
    const raw = this._getRaw(GAME_CONFIG.settingsKey);
    if (!raw) return defaults;
    try {
      const parsed = JSON.parse(raw);
      return {
        quality: ['low', 'medium', 'high'].includes(parsed.quality) ? parsed.quality : defaults.quality,
        fov: Number.isFinite(parsed.fov) ? Math.min(100, Math.max(55, parsed.fov)) : defaults.fov,
        sensitivity: Number.isFinite(parsed.sensitivity) ? Math.min(3.0, Math.max(0.2, parsed.sensitivity)) : defaults.sensitivity,
        invertY: Boolean(parsed.invertY),
        headBob: parsed.headBob !== undefined ? Boolean(parsed.headBob) : defaults.headBob,
        reduceFlashing: Boolean(parsed.reduceFlashing),
        subtitleSize: ['small', 'medium', 'large'].includes(parsed.subtitleSize) ? parsed.subtitleSize : defaults.subtitleSize,
        bgmVolume: Number.isFinite(parsed.bgmVolume) ? Math.min(1, Math.max(0, parsed.bgmVolume)) : defaults.bgmVolume,
        sfxVolume: Number.isFinite(parsed.sfxVolume) ? Math.min(1, Math.max(0, parsed.sfxVolume)) : defaults.sfxVolume,
        voiceVolume: Number.isFinite(parsed.voiceVolume) ? Math.min(1, Math.max(0, parsed.voiceVolume)) : defaults.voiceVolume,
        language: ['vi', 'en'].includes(parsed.language) ? parsed.language : defaults.language
      };
    } catch (_err) {
      return defaults;
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this._setRaw(GAME_CONFIG.settingsKey, JSON.stringify(this.settings));
    return this.settings;
  }

  loadSaveData() {
    const emptySave = {
      hasCheckpoint: false,
      checkpointHour: 1,
      collectedNotes: [],
      unlockedEndings: [],
      flags: {
        obeyedBookCount: 0,
        trueReportCount: 0,
        routineBrokenCount: 0,
        assimilationScore: 0,
        heard1084Mhz: false,
        generatorKeptSafe: false,
        notebookBurned: false,
        lastStepCount: 0,
        favoriteFirstStation: 'Áp kế',
        longestDwellZone: 'Phòng Radio',
        stationOrdersHistory: []
      }
    };

    const raw = this._getRaw(GAME_CONFIG.storageKey);
    if (!raw) return emptySave;
    try {
      const parsed = JSON.parse(raw);
      return {
        hasCheckpoint: Boolean(parsed.hasCheckpoint),
        checkpointHour: Number.isInteger(parsed.checkpointHour) ? Math.min(6, Math.max(1, parsed.checkpointHour)) : 1,
        collectedNotes: Array.isArray(parsed.collectedNotes) ? parsed.collectedNotes : [],
        unlockedEndings: Array.isArray(parsed.unlockedEndings) ? parsed.unlockedEndings : [],
        flags: {
          ...emptySave.flags,
          ...(parsed.flags || {})
        }
      };
    } catch (_err) {
      return emptySave;
    }
  }

  saveCheckpoint(hour, collectedNotesArray, flagsObj) {
    this.saveData.hasCheckpoint = true;
    this.saveData.checkpointHour = Math.min(6, Math.max(1, hour));
    this.saveData.collectedNotes = Array.from(new Set(collectedNotesArray));
    this.saveData.flags = {
      ...this.saveData.flags,
      ...flagsObj
    };
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
  }

  recordEndingUnlocked(endingId) {
    if (!this.saveData.unlockedEndings.includes(endingId)) {
      this.saveData.unlockedEndings.push(endingId);
    }
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
  }

  resetRunSaveKeepEndings() {
    const unlocked = [...this.saveData.unlockedEndings];
    this.saveData = {
      hasCheckpoint: true,
      checkpointHour: 1,
      collectedNotes: [],
      unlockedEndings: unlocked,
      flags: {
        obeyedBookCount: 0,
        trueReportCount: 0,
        routineBrokenCount: 0,
        assimilationScore: 0,
        heard1084Mhz: false,
        generatorKeptSafe: false,
        notebookBurned: false,
        lastStepCount: 0,
        favoriteFirstStation: 'Áp kế',
        longestDwellZone: 'Phòng Radio',
        stationOrdersHistory: []
      }
    };
    this._setRaw(GAME_CONFIG.storageKey, JSON.stringify(this.saveData));
    return this.saveData;
  }
}



// ==========================================
// MODULE: src/audio.js
// ==========================================
/**
 * Module Âm thanh Thủ tục & Không gian 3D (Procedural Web Audio API + HRTF PannerNode)
 * Tổng hợp hoàn toàn bằng code: Drone nền, Gió cao nguyên (tắt lặng ở Giờ 4),
 * Máy phát điện Diesel 3D, Radio nhiễu & Thoại tổng hợp, Nhịp tim,
 * Bước chân theo chất liệu sàn (wood, concrete, gravel) và Bước chân thứ hai trễ 0.35s.
 */
class AudioManager {
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



// ==========================================
// MODULE: src/input.js
// ==========================================
/**
 * Module quản lý điều khiển (Input & Pointer Lock Controller)
 * Hỗ trợ: WASD + Chuột (Pointer Lock), Phím tắt E/F/Tab/Esc/F3, và Tay cầm (Gamepad API).
 */
class InputManager {
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



// ==========================================
// MODULE: src/renderer.js
// ==========================================
/**
 * Module quản lý đồ họa & Hậu kỳ 1-Pass (Renderer & Single-Pass Post-Processing Shader)
 * Gộp: 16mm Cold Blue-Grey Grading, Vignette, Film Grain, Chromatic Aberration và Peripheral Presence Shader.
 */

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
class RendererManager {
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



// ==========================================
// MODULE: src/world.js
// ==========================================
/**
 * Module dựng cảnh 3D Trạm Khí Tượng Số 9 (World, Procedural Textures, Lighting & Collisions)
 * Tuân thủ ngân sách: <= 4 đèn động (tối đa 1 đèn đổ bóng), dùng InstancedMesh cho vật lặp lại,
 * 100% texture vẽ thủ tục bằng HTML5 Canvas 2D.
 */
class WorldManager {
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



// ==========================================
// MODULE: src/entity.js
// ==========================================
/**
 * Module Thực thể "Kẻ Đo" (The Measurer: Peripheral Presence & Routine Learning System)
 * 1. Hiện diện ngoại vi: Tính tích vô hướng góc nhìn, kết hợp lưới 3D bán trong suốt và GPU Post-Shader.
 *    Nhìn thẳng -> tan vào sương; quay mặt đi -> dịch lại gần 2.35m.
 * 2. Học thói quen: Ghi lại quỹ đạo, điểm dừng lâu (Quy tắc 7) và thứ tự trạm đo (Quy tắc 1) mỗi giờ;
 *    từ Giờ 3 phát lại bóng lặp + tiếng bước chân thứ hai trễ nửa nhịp (Quy tắc 2).
 */
class EntityManager {
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



// ==========================================
// MODULE: src/story.js
// ==========================================
/**
 * Module Kịch bản, Nhiệm vụ 6 Giờ Trực, 13 Quy tắc, 13 Mảnh Nhật Ký & 4 Kết thúc (Story & State Machine)
 */
class StoryManager {
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



// ==========================================
// MODULE: src/ui.js
// ==========================================
/**
 * Module giao diện người dùng (UI Manager)
 * Quản lý: Màn Cảnh báo, Màn Tiêu đề, HUD, Phụ đề (Subtitles/Audio Captions),
 * Sổ Tay Trực Ca (13 Quy tắc + 13 Mảnh nhật ký), Bảng tương tác Radio/Máy phát,
 * Pause Menu, Settings, Credits, Màn Kết Thúc (4 Endings) và Debug Overlay (F3).
 */
class UIManager {
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



// ==========================================
// MODULE: src/main.js
// ==========================================
/**
 * Điểm vào chính & Vòng lặp Trò chơi (Main Application & Fixed-Timestep Game Loop)
 * Phiên bản Three.js cố định: three@0.186.1
 */
class Tram9Game {
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


})();
