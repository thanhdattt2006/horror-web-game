# NHẬT KÝ QUYẾT ĐỊNH KỸ THUẬT & THIẾT KẾ (DECISIONS.md)

Tài liệu này ghi lại mọi quyết định tự chủ trong quá trình phát triển **TRẠM 9 — Sổ Tay Trực Ca** cùng lý do kỹ thuật/thiết kế đằng sau.

---

## 1. Cố định phiên bản Three.js `v0.186.1` và chiến lược chạy trên cả `file://` lẫn Web Server
- **Quyết định:**
  - Chọn **Three.js `v0.186.1`** (phiên bản ổn định mới nhất kiểm tra trực tiếp từ npm registry vào thời điểm khởi tạo dự án).
  - Trong `v0.186.1`, gói Three.js đã bỏ file UMD `build/three.min.js` kiểu cũ và chuyển sang ES Module (`build/three.module.js` + `build/three.core.js`).
  - Để đảm bảo chạy được **100% khi người dùng double-click mở `index.html` (`file://`)** lẫn khi deploy lên GitHub Pages / Netlify / itch.io mà không bị lỗi CORS đối với `<script type="module" src="./src/...">`, chúng tôi áp dụng quy trình kép:
    1. Toàn bộ mã nguồn phát triển được tách thành các module rõ ràng trong `src/` (`config.js`, `save.js`, `audio.js`, `input.js`, `renderer.js`, `world.js`, `entity.js`, `story.js`, `ui.js`, `main.js`).
    2. Dùng script đóng gói `build.mjs` tạo ra `dist/bundle.js` (IIFE classic script không bị chặn CORS trên `file://`) và `dist/index.html` (tự chứa hoàn toàn), đồng thời `index.html` ở thư mục gốc nạp `dist/bundle.js`.
    3. Đối với bản thân thư viện Three.js `0.186.1`: trang nạp ưu tiên từ CDN cố định phiên bản (`https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js`), có dự phòng tự động sang bản đóng gói cục bộ `vendor/three.min.js` (được đóng gói từ chính `three@0.186.1` gắn vào `window.THREE`), và nếu cả hai đều lỗi (ví dụ người dùng xóa thư mục `vendor` khi mất mạng) thì hiển thị màn hình báo lỗi thân thiện có nút Thử lại.
- **Lý do:** Giải quyết triệt để rào cản CORS trên giao thức `file://` của trình duyệt hiện đại mà vẫn giữ nguyên cấu trúc code tách module sạch sẽ trong `src/` và tuân thủ yêu cầu kiểm tra CDN lỗi.

## 2. Tạo thủ tục 100% (Procedural Generation) cho Texture, Hình học và Âm thanh
- **Quyết định:** Không sử dụng bất kỳ file ảnh `.png/.jpg`, model `.glb` hay file âm thanh `.mp3/.ogg` rời nào từ bên ngoài. Toàn bộ texture (tường bê tông ẩm, ván gỗ, kim loại gỉ, mặt đồng hồ đo, giấy nhật ký) được sinh bằng HTML5 Canvas 2D; toàn bộ model được lắp ghép từ hình học cơ bản có gộp lưới và `InstancedMesh`; toàn bộ âm thanh được tổng hợp thời gian thực bằng Web Audio API.
- **Lý do:**
  1. Khi mở bằng `file://`, trình duyệt chặn `fetch()` / `XMLHttpRequest` tới các file `.glb`, `.json`, `.ogg` cục bộ do chính sách CORS `origin 'null'`. Procedural 100% giúp game chạy trên `file://` không có bất kỳ lỗi nạp tài nguyên nào.
  2. Dung lượng gọn nhẹ (< 1 MB), khởi động tức thì, không rủi ro link chết hay tranh chấp bản quyền trên itch.io.

## 3. Gộp toàn bộ hiệu ứng hậu kỳ và "Hiện diện ngoại vi" vào ĐÚNG 1 Shader Pass
- **Quyết định:** Không dùng `EffectComposer` với nhiều pass rời của thư viện phụ trợ. Thay vào đó, tự viết lớp `PostProcessor` trong `src/renderer.js` render cảnh chính vào một `THREE.WebGLRenderTarget` rồi vẽ qua một `THREE.ShaderMaterial` toàn màn hình duy nhất.
- **Lý do:**
  - Mỗi pass hậu kỳ tăng băng thông đọc/ghi framebuffer trên card đồ họa tích hợp (iGPU). Gộp chung: (1) Tông màu phim 16mm xanh xám lạnh, (2) Vignette, (3) Hạt film grain, (4) Chromatic Aberration nhẹ ở rìa, và (5) Hiệu ứng bóng sương / nhiễu quang học của **Kẻ Đo ở rìa tầm nhìn** vào cùng một fragment shader giúp giữ số lệnh vẽ hậu kỳ bằng `1` và đảm bảo 60 FPS ở 1080p.

## 4. Cơ chế giải câu đố 13 Quy tắc và Lựa chọn chủ động tại các điểm tương tác
- **Quyết định:** Thay vì ép người chơi chỉ bấm một nút `E` thụ động, tại các điểm mấu chốt (như bàn Radio, Phòng Máy Phát, Vật thể nhân đôi, hay điểm Chốt ca), người chơi có thể chọn hành động cụ thể (ví dụ ở Radio: *"Gửi số liệu thực tế vừa đo"* vs *"Gửi số chuẩn 1013 hPa theo Quy tắc 4"* vs *"Chuyển tần số 108.4 MHz"*). Ngoài ra, thứ tự đi lấy số liệu 3 máy đo ngoài sân hoàn toàn tự do để người chơi chủ động tuân theo hoặc phá vỡ Quy tắc 1.
- **Lý do:** Biến mâu thuẫn trung tâm ("Làm theo sổ tay thì bị Kẻ Đo học thói quen, phá quy trình thì mới sống sót") thành hành động gameplay thực sự có trọng lượng, quyết định trực tiếp 4 Ending.

## 5. Thiết kế thời lượng giờ trực và Tham số Debug kiểm thử nhanh
- **Quyết định:**
  - Trong chế độ chơi chuẩn, mỗi giờ trực yêu cầu hoàn thành chu trình tuần tra thực tế quanh trạm và sân đo (mất khoảng 5–8 phút khám phá, đọc nhật ký, suy luận quy tắc mỗi giờ, tổng cộng ~35–45 phút cho lần chơi đầu).
  - Bổ sung hệ thống tham số URL đầy đủ (`?debug=1`, `?skipTo=hour1..hour6`, `?seed=123`, `?ending=1..4`, `?collectAllNotes=1`) và phím `F3` bật/tắt bảng thông số kỹ thuật (`FPS`, `Frame Time`, `Draw Calls`, `Triangles`, `Geometries`, `Textures`, trạng thái `RoutineRecorder` & `PeripheralPresence`).
- **Lý do:** Đảm bảo người chơi trải nghiệm đúng nhịp độ kinh dị tâm lý, đồng thời cho phép kiểm thử tự động toàn bộ 6 giờ trực và 4 kết thúc một cách trung thực, chính xác bằng trình duyệt thật.

## 6. Tuân thủ chuẩn an toàn thị giác WCAG 2.3.1 (Chống nhấp nháy)
- **Quyết định:** Mọi hiệu ứng chớp đèn hoặc nhiễu hình ảnh ở chế độ mặc định đều được giới hạn tần số biến thiên dưới `2.5 Hz` (dưới ngưỡng 3 lần/giây của WCAG 2.3.1). Khi người chơi bật **"Chế độ giảm nhấp nháy" (Reduce Flashing)** ở màn Cảnh báo đầu game hoặc trong Settings, toàn bộ dao động cường độ đèn và chớp màn hình được thay bằng chuyển sắc mượt (smooth fade).
- **Lý do:** Bảo vệ người chơi nhạy cảm với ánh sáng và tuân thủ nghiêm ngặt mục 8 & mục 9 của yêu cầu.
