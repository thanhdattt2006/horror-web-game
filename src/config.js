/**
 * TRẠM 9 — SỔ TAY TRỰC CA
 * Phiên bản Three.js cố định (pinned): three@0.186.1
 * CDN chính: https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js
 * File cấu hình tập trung toàn bộ hằng số cân bằng game, đồ họa, kịch bản và ngôn ngữ.
 */

export const THREE_PINNED_VERSION = '0.186.1';
export const THREE_CDN_PRIMARY = 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js';
export const THREE_CDN_FALLBACK = 'https://unpkg.com/three@0.186.1/build/three.module.js';

export const GAME_CONFIG = {
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

export const NOTEBOOK_RULES = [
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

export const DIARY_FRAGMENTS = [
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

export const ENDINGS_META = {
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

export const I18N = {
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
