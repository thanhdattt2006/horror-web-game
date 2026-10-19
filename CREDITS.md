# GHI CÔNG & GIẤY PHÉP BẢN QUYỀN (CREDITS.md)

## 1. THÔNG TIN TRÒ CHƠI
- **Tên trò chơi:** TRẠM 9 — Sổ Tay Trực Ca (*Station 9: Shift Logbook*)
- **Thể loại:** Web Game Kinh Dị Tâm Lý 3D Góc Nhìn Thứ Nhất
- **Kịch bản, Lập trình, Kỹ thuật Shader & Thiết kế Âm thanh:** Đội phát triển nội bộ dự án Trạm 9.

---

## 2. THƯ VIỆN MÃ NGUỒN MỞ SỬ DỤNG

| Tên thư viện | Phiên bản cố định (Pinned) | Nguồn chính thức | Giấy phép (License) |
| :--- | :--- | :--- | :--- |
| **Three.js** | `0.186.1` | https://github.com/mrdoob/three.js / https://cdn.jsdelivr.net/npm/three@0.186.1/ | **MIT License** (Copyright © 2010–2026 Three.js Baseline Authors) |

### Nội dung giấy phép MIT của Three.js
```text
The MIT License
Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
```

---

## 3. TÀI NGUYÊN ĐỒ HỌA, MÔ HÌNH 3D VÀ ÂM THANH (100% PROCEDURAL)

Trò chơi **không sử dụng bất kỳ hình ảnh, mô hình 3D hay tệp âm thanh bên ngoài nào** nhằm đảm bảo tính tự chủ bản quyền 100% và khả năng vận hành ngoại tuyến qua giao thức `file://`:

1. **Mô hình 3D & Kiến trúc (`src/world.js`, `src/entity.js`):**
   - Toàn bộ kiến trúc Trạm Khí Tượng Số 9 (Phòng Radio, Hành lang chính, Phòng Ngủ, Phòng Máy Phát), các thiết bị đo đạc (Lều khí tượng Áp kế, Trụ Phong vũ biểu quay cánh gió, Vũ lượng kế, Tháp phát sóng cao tần, Lò đốt mẫu), rừng thông và hàng rào đều được dựng thủ tục bằng mã nguồn Three.js (`BoxGeometry`, `CylinderGeometry`, `ConeGeometry`, `InstancedMesh`).
2. **Texture bề mặt (`src/world.js`):**
   - Tường bê tông ẩm giả lập Ambient Occlusion (AO), sàn ván gỗ thông, mặt đất đá sỏi phủ sương muối, mặt đồng hồ đo khí tượng và giấy nhật ký ố vàng được vẽ thủ tục bằng **HTML5 Canvas 2D API** lúc khởi động.
3. **Kỹ thuật Hậu kỳ & Hiện diện ngoại vi (`src/renderer.js`):**
   - Chương trình đồ họa GLSL (Fragment/Vertex Shader) 1-Pass tự viết xử lý: chỉnh màu phim nhựa 16mm tông xanh xám lạnh + điểm nhấn đèn hơi natri vàng cam, hạt phim (film grain), tối góc (vignette), lệch sắc rìa (chromatic aberration) và bóng nhiễu ngoại vi của thực thể "Kẻ Đo".
4. **Âm thanh & Hiệu ứng không gian 3D (`src/audio.js`):**
   - Tổng hợp thời gian thực 100% bằng **Web Audio API** (`OscillatorNode`, `BiquadFilterNode`, `GainNode`, `DynamicsCompressorNode`, `PannerNode` chế độ HRTF): tiếng drone nền, tiếng gió cao nguyên theo từng giờ trực, tiếng máy phát điện diesel 3D, tiếng nhiễu và tín hiệu bộ đàm 2 tần số, tiếng nhịp tim, tiếng bước chân theo chất liệu sàn (`wood`, `concrete`, `gravel`) và tiếng bước chân thứ hai đi trễ nửa nhịp.
