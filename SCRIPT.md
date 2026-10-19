# KỊCH BẢN CHI TIẾT: TRẠM 9 — SỔ TAY TRỰC CA

## 1. TỔNG QUAN & BỐI CẢNH
- **Tên chính thức:** TRẠM 9 (Phụ đề: *Sổ Tay Trực Ca*)
- **Thể loại:** Kinh dị tâm lý góc nhìn thứ nhất (First-Person Psychological & Routine-Learning Horror)
- **Thời gian & Địa điểm:** Đêm 19 rạng sáng 20 tháng 11 năm 1998 (00:00 – 06:00). Trạm Khí Tượng Cao Nguyên Số 9 (Đỉnh Mù Sương, độ cao 1.840m). Quanh trạm là biển sương mù đặc quánh quanh năm không tan.
- **Tông màu & Không khí:** Phim nhựa 16mm tông xanh xám lạnh (`#162229`), điểm nhấn là ánh đèn hơi natri vàng cam ấm nhưng cô độc (`#ff8c3b`), âm thanh gió rít qua khe cửa sắt, tiếng máy phát điện diesel nổ đều và sự tĩnh lặng nặng nề.

---

## 2. HỒ SƠ NHÂN VẬT

| Nhân vật | Mã định danh | Vai trò | Đặc điểm & Số phận |
| :--- | :--- | :--- | :--- |
| **Trần Văn Lương** | `QTV-09-14` | Nhân vật người chơi | Quan trắc viên trẻ mới nhận lệnh điều động khẩn cấp lên thay ca tại Trạm 9. Cẩn thận, làm việc theo sổ tay nhưng buộc phải tự chất vấn quy trình để sống sót. |
| **Đặng Quốc Vũ** | `QTV-09-13` | Người tiền nhiệm trực tiếp | Mất tích 3 ngày trước khi Lương lên trạm. Nhận ra quy trình lặp lại chính là cái bẫy nên đã xé rời nhật ký cá nhân giấu ở 13 vị trí quanh trạm để cảnh báo người đến sau. |
| **Lê Thị Hạnh (Bà Hạnh)** | `QTV-09-07` | Quan trắc viên kỳ cựu (1991) | Người từng phụ trách Trạm 9 giai đoạn đầu. Phát hiện bản chất thật của "Dự án Đo Lường Khí Quyển 09" và để lại các ghi chú kỹ thuật cứu mạng về máy phát điện, tần số 108.4 MHz và lò đốt mẫu. |
| **Điều phối viên Khanh** | `ĐTT-BẮC` | Giọng nói qua Radio `142.8 MHz` | Đầu dây liên lạc mỗi giờ. Ở Giờ 1–3 là giọng hướng dẫn viên lạnh lùng, máy móc. Từ Giờ 4–6, giọng nói này lộ rõ là bản ghi tự động bị Kẻ Đo can thiệp, nhại lại chính thói quen của Lương. |
| **Trạm Gác Chân Đèo (Lâm)** | `KÊNH-108.4` | Liên lạc viên tần số khẩn cấp | Chỉ bắt được sóng khi chuyển radio sang tần số `108.4 MHz` từ Giờ 4 trở đi. Người cung cấp sự thật rằng Trạm 9 đã bị đóng cửa trên giấy tờ từ năm 1994. |
| **Kẻ Đo (The Measurer)** | `ĐỐI TƯỢNG 09` | Thực thể trong sương | Một hình thái nhận thức ngưng tụ trong sương đặc. Không săn mồi bằng bạo lực thông thường mà quan sát, đo đạc bước chân, thời gian dừng và thứ tự thao tác của con người. Khi nó sao chép hoàn chỉnh quy trình của một người, người đó trở thành một "trang ghi chép" mới trong sổ tay. |

---

## 3. MƯỜI BA QUY TẮC TRONG "SỔ TAY TRỰC CA"

Trong game, người chơi bấm `Tab` để mở **Sổ Tay Trực Ca**. Mỗi quy tắc có kiểu trình bày thị giác khác nhau (chữ in máy đánh chữ gốc, chữ viết tay mực xanh gạch xóa của Vũ/Hạnh, và chữ in đều tăm tắp màu xám nhòe sương ở cuối sổ).

### Phân loại nguồn gốc & cơ chế thật của 13 quy tắc

#### Quy tắc 1 — [SAI / BẪY CỦA TRUNG TÂM]
- **Nội dung trong sổ:** *"Mỗi giờ trực phải đi tuần và lấy số liệu theo đúng thứ tự bất di bất dịch: (1) Áp kế -> (2) Phong vũ biểu (Gió) -> (3) Vũ lượng kế (Mưa) -> (4) Kiểm tra Máy phát điện -> (5) Báo cáo Radio -> (6) Chốt ca tại Giường ngủ. Tuyệt đối không đảo thứ tự."*
- **Nguồn gốc:** Do Ban Quản lý Dự án 09 soạn nhằm biến quan trắc viên thành "mẫu chuẩn lặp lại" cho Kẻ Đo dễ học.
- **Tác động gameplay:** Nếu người chơi tuân thủ đúng thứ tự `Áp kế -> Gió -> Mưa` qua các giờ liên tiếp, chỉ số `routinePredictability` tăng +35% mỗi giờ, khiến bóng lặp của Kẻ Đo sớm đón đầu chính xác. Đảo thứ tự (ví dụ `Mưa -> Áp kế -> Gió` hoặc kiểm tra Máy phát trước) sẽ làm giảm `routinePredictability` và cộng điểm cho nhánh **Phá lệ** (`ruleBrokenCount`).

#### Quy tắc 2 — [THẬT / DO ĐẶNG QUỐC VŨ VIẾT THÊM]
- **Nội dung trong sổ:** *(Chữ viết tay mực xanh chen giữa lề)* *"Nếu nghe tiếng bước chân thứ hai vang lên trễ nửa nhịp sau gót chân mình, ĐỪNG chạy thẳng theo lối cũ. Dừng hẳn lại 3 giây hoặc rẽ ngoặt 90 độ."*
- **Nguồn gốc:** Vũ rút ra sau nhiều đêm bị bóng sương bám đuôi.
- **Tác động gameplay:** Khi Kẻ Đo phát lại bước chân trễ 0.35 giây, nếu người chơi dừng im >= 3 giây hoặc đổi hướng vuông góc với vector di chuyển trước đó, hệ thống `EchoStalker` bị lệch pha và lùi xa 6m.

#### Quy tắc 3 — [SAI / DO TRUNG TÂM ÉP VIẾT]
- **Nội dung trong sổ:** *"Khi phát hiện bóng dáng bất thường ở rìa tầm nhìn, phải lập tức bật đèn pin chiếu thẳng và nhìn trực diện vào bóng đó cho đến khi nó tan biến."*
- **Nguồn gốc:** Quy định nhằm ép quan trắc viên thiết lập "giao tiếp thị giác" với Kẻ Đo.
- **Tác động gameplay:** Nhìn trực diện (góc lệch tâm < 12 độ) làm hình ảnh Kẻ Đo tan khỏi màn hình nhờ shader ngoại vi, nhưng thực tế vị trí vật lý của nó sẽ bước tới gần hơn 2.5m ngay khi người chơi vừa quay mặt đi, đồng thời tăng `assimilationScore`. Cách đúng là giữ bình tĩnh, tắt đèn pin hoặc lách đi mà không nhìn chằm chằm vào nó.

#### Quy tắc 4 — [DO KẺ ĐO VIẾT]
- **Nội dung trong sổ:** *"Áp suất khí quyển trên Đỉnh Mù Sương luôn cố định ở mức chuẩn 1013.0 hPa. Nếu kim áp kế tụt xuống dưới 980 hPa, đó là sai số cơ học — hãy chọn 'Báo cáo số chuẩn (1013 hPa)' trên máy Radio."*
- **Nguồn gốc:** Kẻ Đo tự ghi thêm để ngăn quan trắc viên gửi dữ liệu dị thường về sự hiện diện của nó ra ngoài.
- **Tác động gameplay:** Tại bàn Radio mỗi giờ, người chơi có lựa chọn gửi **Số liệu chuẩn theo sổ tay** (tăng `obeyedBookCount`) hoặc **Số liệu thực tế vừa đo** (tăng `trueReportCount`). Cần gửi số liệu thực tế từ 4 giờ trở lên để đủ điều kiện mở Ending 2 (Phá lệ).

#### Quy tắc 5 — [THẬT / DO BÀ HẠNH VIẾT]
- **Nội dung trong sổ:** *(Chữ viết tay nét cứng ở góc trang)* *"Máy phát điện diesel chỉ được vận hành ở mức tải 75% – 85%. Dù Đài Trung Tâm có ra lệnh kéo cần gạt lên 100% để 'tăng sóng', tuyệt đối không làm theo."*
- **Nguồn gốc:** Bà Hạnh phát hiện mức tải 100% thực chất cấp điện cho cuộn cảm cộng hưởng dưới sàn trạm, làm sương tràn vào nhà nhanh gấp đôi.
- **Tác động gameplay:** Ở Giờ 4, Đài Trung Tâm yêu cầu gạt máy phát lên 100%. Nếu người chơi giữ ở mức 80% (chuẩn), hệ thống điện ổn định và tính là 1 lần tỉnh táo kháng lệnh giả; nếu kéo lên 100%, đèn toàn trạm chớp đỏ, sương tràn vào sớm và tăng `obeyedBookCount`.

#### Quy tắc 6 — [SAI / BẪY CỦA TRUNG TÂM]
- **Nội dung trong sổ:** *"Máy bộ đàm chỉ được khóa ở tần số 142.8 MHz. Mọi tiếng nói bắt được ở tần số 108.4 MHz đều là hiện tượng vọng âm tầng điện ly, nghiêm cấm dò nghe hoặc trả lời."*
- **Nguồn gốc:** Để cô lập quan trắc viên khỏi Trạm Gác Chân Đèo (`108.4 MHz`).
- **Tác động gameplay:** Từ Giờ 4, người chơi có thể bấm nút chuyển tần số trên máy Radio sang `108.4 MHz` để liên lạc với Lâm ở chân đèo, nhận mã mở khóa cổng Tháp Phát Sóng (`Mã 9140`) phục vụ Ending 2.

#### Quy tắc 7 — [THẬT / DO ĐẶNG QUỐC VŨ VIẾT]
- **Nội dung trong sổ:** *(Chữ viết tay gạch chân hai lần)* *"Đừng bao giờ đứng đọc số liệu tại cùng một vị trí quá 12 giây nếu giờ trước bạn cũng đã đứng yên ở đúng chỗ đó."*
- **Nguồn gốc:** Vũ nhận ra Kẻ Đo ghi nhớ các điểm dừng (`dwell nodes`) lâu hơn các điểm đi lướt qua.
- **Tác động gameplay:** Hệ thống `RoutineRecorder` lưu tọa độ đứng yên > 4 giây mỗi giờ. Ở giờ kế tiếp, nếu người chơi đứng trong bán kính 1.5m của điểm dừng cũ quá 12 giây, bóng sương sẽ hội tụ ngay sát lưng.

#### Quy tắc 8 — [DO KẺ ĐO VIẾT]
- **Nội dung trong sổ:** *"Nếu thấy trên bàn xuất hiện chiếc cốc thứ hai hoặc cuốn sổ thứ hai giống hệt đồ của bạn, hãy chạm tay vào nó để 'đồng bộ kiểm kê' tài sản trạm."*
- **Nguồn gốc:** Những vật thể nhân đôi là "phép thử kích thước" của Kẻ Đo.
- **Tác động gameplay:** Trong Giờ 2, 3, 4 sẽ xuất hiện vật thể dị thường (chiếc cốc ca men thứ hai, chiếc đèn bão thứ hai). Nếu người chơi bấm `E` chọn "Chạm đồng bộ theo Quy tắc 8", `assimilationScore` tăng mạnh. Nếu người chơi chọn "Ghi nhận dị thường & không chạm" (hoặc lùi lại tắt đèn cạnh đó), người chơi giữ được sự tỉnh táo (`sanityClarity`).

#### Quy tắc 9 — [THẬT / DO BÀ HẠNH VIẾT]
- **Nội dung trong sổ:** *(Ghi chú mực đỏ nhạt)* *"Từ 04:00 sáng (Giờ 5), hãy nhìn nhiệt kế đầu giường trước khi nằm nghỉ. Nếu nhiệt độ phòng ngủ dưới 4.0°C và trên nệm đã có vết người nằm, cấm chốt ca ở giường — hãy chốt ca tại ghế bàn trực."*
- **Nguồn gốc:** Bà Hạnh thoát chết nhờ nhận ra "bản sao" đã nằm sẵn trên giường vào Giờ 5.
- **Tác động gameplay:** Ở cuối Giờ 5, nhiệt kế phòng ngủ chỉ `1.8°C`. Người chơi có thể chốt ca tại **Giường ngủ** (tuân theo thói quen cũ -> bị đồng hóa thêm) hoặc tại **Ghế bàn trực Phòng Radio** (làm đúng lời dặn của Bà Hạnh).

#### Quy tắc 10 — [SAI / BẪY CỦA TRUNG TÂM]
- **Nội dung trong sổ:** *"Lò đốt mẫu khí tượng trong Phòng Máy Phát chỉ dùng để hủy giấy biểu đồ cũ. Nghiêm cấm đưa Sổ Tay Trực Ca lại gần cửa lò đốt dưới mọi hình thức."*
- **Nguồn gốc:** Cuốn sổ chính là vật neo giữ bản ghi của 13 quan trắc viên trước.
- **Tác động gameplay:** Ở Giờ 6, khi lò đốt mẫu đã đủ nhiệt, người chơi có thể tương tác với Lò Đốt để **Đốt Sổ Tay Trực Ca**, sau đó bước ra cổng sương mù để kích hoạt **Ending 3 ("Ghi chép")**.

#### Quy tắc 11 — [THẬT / DO ĐẶNG QUỐC VŨ VIẾT]
- **Nội dung trong sổ:** *"Từ Giờ 3 trở đi, trước khi mở cửa chính ra Sân Đo, hãy nhìn ánh đèn natri qua ô kính. Nếu đèn ngoài hiên chuyển sang màu trắng xanh lạnh lẽo, nghĩa là Nó đang đứng đợi ngay bậc thềm — hãy đi vòng qua cửa hông Phòng Máy Phát."*
- **Nguồn gốc:** Vũ phát hiện ánh đèn natri bị biến sắc khi thực thể ngưng tụ đậm đặc.
- **Tác động gameplay:** Ở Giờ 3 và Giờ 5, nếu người chơi hay đi cửa chính, đèn hiên trước sẽ chuyển sang màu trắng xanh (`#7ce0ff`). Đi cửa hông Phòng Máy Phát sẽ giúp né được điểm phục kích của Kẻ Đo và tăng điểm phá thói quen.

#### Quy tắc 12 — [DO KẺ ĐO VIẾT]
- **Nội dung trong sổ:** *"Vào lúc 05:00 sáng (Giờ 6), sau khi hoàn tất vòng đo cuối theo đúng thứ tự, hãy mở khóa cửa chính và tuyên đọc mã nhân sự QTV-09-14 tại máy Radio trên kênh 142.8 MHz để bàn giao ca trực vĩnh viễn."*
- **Nguồn gốc:** Nghi thức hoàn tất đồng hóa của Kẻ Đo.
- **Tác động gameplay:** Nếu người chơi tuân thủ quy trình suốt đêm và thực hiện lệnh bàn giao này ở Giờ 6, game dẫn tới **Ending 1 ("Đúng quy trình")**.

#### Quy tắc 13 — [DO KẺ ĐO VIẾT — HIỂN THỊ ĐỘNG THEO HÀNH VI NGƯỜI CHƠI]
- **Nội dung trong sổ (cập nhật thời gian thực):** *"Cuốn sổ này vốn chỉ có 12 quy tắc. Quy tắc thứ 13 đang tự viết ra từ sải chân của bạn: Giờ trước bạn đã bước [X] bước, dừng lâu nhất ở [Y], và luôn ghé [Z] đầu tiên. Hãy tiếp tục đi đúng như thế."*
- **Nguồn gốc:** Chính cuốn sổ phản chiếu dữ liệu mà hệ thống `RoutineRecorder` vừa thu thập được từ người chơi, tạo cảm giác cuốn sổ đang sống và theo dõi từng bước đi.

---

## 4. MƯỜI BA MẢNH NHẬT KÝ RỜI (13 DIARY FRAGMENTS)

Mỗi mảnh nhật ký là một tờ giấy ố vàng kẹp ghim đồng có thể nhặt (`E`) ở các vị trí cụ thể trong trạm và ngoài sân. Nhặt đủ 13 mảnh sẽ mở khóa **Ending 4 (Bí mật: "Người Thứ Mười Tư")** vào cuối Giờ 6, đồng thời cung cấp toàn bộ manh mối suy luận cho 13 quy tắc.

1. **Mảnh #01 — "Biên bản bàn giao vội" (Vị trí: Bàn làm việc Phòng Radio - Có từ Giờ 1)**
   - *Nội dung:* "Lương, nếu cậu đọc được mảnh giấy này dưới gạt tàn: Đừng tin toàn bộ cuốn Sổ Tay. Những dòng chữ in phẳng phiu yêu cầu cậu lặp lại một lộ trình cố định (Quy tắc 1) chính là cách thứ ngoài sương lấy khuôn mẫu của cậu. Mỗi giờ hãy đi một thứ tự khác nhau. — Đ.Q.Vũ"
2. **Mảnh #02 — "Bản ghi âm thanh số 4" (Vị trí: Kệ tủ sắt Hành lang chính - Có từ Giờ 1)**
   - *Nội dung:* "Đêm thứ 4 của tôi ở Trạm 9. Ngoài tiếng giày của tôi trên sàn gỗ, luôn có một tiếng bước chân thứ hai đi trễ đúng nửa nhịp. Tôi thử chạy nhanh hơn thì nó cũng chạy nhanh hơn. Chỉ khi tôi đứng khựng lại 3 giây hoặc rẽ gắt sang hướng vuông góc (Quy tắc 2), tiếng chân đó mới bước hụt vào khoảng không rồi im bặt. — Vũ"
3. **Mảnh #03 — "Ghi chú quang học" (Vị trí: Bệ cửa sổ Phòng Ngủ - Có từ Giờ 1)**
   - *Nội dung:* "Quy tắc 3 bảo phải rọi đèn pin và nhìn thẳng vào cái bóng ở rìa mắt. Bọn họ lừa chúng ta! Hôm qua tôi nhìn thẳng vào nó: nó tan khỏi tâm mắt thật, nhưng ngay khoảnh khắc tôi chớp mắt quay đi, nó đã đứng sát hàng rào, gần hơn lúc trước cả sải tay. Nó di chuyển khi bị nhìn thẳng rồi quay đi!"
4. **Mảnh #04 — "Biểu đồ khí áp bị xé" (Vị trí: Chân trụ Áp kế ngoài Sân Đo - Có từ Giờ 1)**
   - *Nội dung:* "Kim áp kế tụt xuống 962 hPa mỗi khi sương đặc lại quanh hàng rào. Thế mà Quy tắc 4 lại bắt báo cáo số giả 1013 hPa! Bất cứ ai viết Quy tắc 4 không muốn thế giới bên ngoài biết sương mù này có khối lượng riêng như một vật thể sống. Hãy gửi số đo thật!"
5. **Mảnh #05 — "Sơ đồ mạch điện của Bà Hạnh" (Vị trí: Bảng cầu dao Phòng Máy Phát - Có từ Giờ 2)**
   - *Nội dung:* "Tôi là Lê Thị Hạnh, QTV-09-07. Tôi đã mở hộp kỹ thuật dưới sàn máy phát. Dây tải ở mức 100% không hề nối lên ăng-ten radio, mà nối xuống lưới dây đồng chôn quanh móng trạm để hút sương vào trong nhà! Hãy giữ máy phát ở 80% như Quy tắc 5 tôi đã ghi. Đừng nghe lời Khanh trên radio."
6. **Mảnh #06 — "Mảnh giấy kẹp sau máy bộ đàm" (Vị trí: Cạnh sườn máy Radio - Có từ Giờ 2)**
   - *Nội dung:* "Kênh 142.8 MHz chỉ phát đi phát lại giọng của Khanh từ một cuộn băng từ đặt ở tầng hầm khóa kín. Quy tắc 6 cấm dò sang 108.4 MHz vì ở 108.4 MHz có Trạm Kiểm Lâm Chân Đèo! Tôi đã nghe thấy tiếng người thật ở 108.4 MHz lúc 3 giờ sáng. — Vũ"
7. **Mảnh #07 — "Vết phấn dưới chân cột gió" (Vị trí: Chân trụ Phong vũ biểu ngoài Sân Đo - Có từ Giờ 2)**
   - *Nội dung:* "Hôm qua tôi đứng ghi chép dưới cột đo gió 15 giây. Hôm nay, đúng giờ đó, khi tôi vừa đứng lại chỗ cũ sang giây thứ 12, hơi thở lạnh buốt phả ngay sau gáy tôi. Nó nhớ những chỗ mình đứng lâu (Quy tắc 7). Đọc số xong phải di chuyển ngay!"
8. **Mảnh #08 — "Báo cáo kiểm kê dị thường" (Vị trí: Bàn ăn nhỏ góc Hành lang - Có từ Giờ 3)**
   - *Nội dung:* "Sáng nay trên bàn có hai chiếc cốc tráng men có cùng vết sứt ở miệng. Quy tắc 8 bảo phải chạm vào để xếp khít chúng lại. Khi anh Minh (ca trực năm 1995) chạm vào chiếc cốc nhân bản đó, bàn tay phải của anh ấy mất cảm giác nhiệt và chữ viết của anh ấy biến thành chữ in trong sổ. Đừng chạm vào đồ vật tự nhân đôi!"
9. **Mảnh #09 — "Nhật ký y tế năm 1991" (Vị trí: Ngăn kéo đầu giường Phòng Ngủ - Có từ Giờ 3)**
   - *Nội dung:* "Vào Giờ 5, sương bắt đầu rỉ qua khe cửa. Nhiệt kế đầu giường rơi xuống 1.8°C và tấm chăn lõm xuống như có người đang nằm nhìn lên trần nhà. Quy tắc 9 là do tôi viết bằng mực đỏ: Nếu phòng ngủ lạnh dưới 4 độ, đừng nằm xuống giường! Hãy ra ghế bàn trực mà nghỉ giữa ca. — Hạnh"
10. **Mảnh #10 — "Biên bản mật Dự Án 09" (Vị trí: Trên nắp Lò đốt mẫu Phòng Máy Phát - Có từ Giờ 4)**
    - *Nội dung:* "Tài liệu thu hồi: Trạm Khí Tượng 9 không đo thời tiết. Cuốn Sổ Tay Trực Ca được đóng bằng giấy tổng hợp tẩm muối bạc để lưu giữ 'ấu trùng hành vi' của từng quan trắc viên. Quy tắc 10 cấm đưa sổ gần lò đốt vì nhiệt độ trên 600°C của lò đốt mẫu là thứ duy nhất xóa được các bản ghi trong sổ."
11. **Mảnh #11 — "Lời dặn nơi bậc thềm" (Vị trí: Hộp dụng cụ cạnh cửa hông Phòng Máy Phát - Có từ Giờ 4)**
    - *Nội dung:* "Ánh đèn hơi natri vốn màu vàng cam. Nhưng mỗi khi Nó đứng đợi sẵn ngoài hiên chính để đón lõng thói quen mở cửa của bạn, hơi sương quanh Nó làm ánh đèn đổi sang màu trắng xanh lạnh lẽo. Nhớ kỹ Quy tắc 11: thấy đèn hiên hóa xanh thì đi đường cửa hông phòng máy!"
12. **Mảnh #12 — "Danh sách 13 người trước" (Vị trí: Chân Vũ lượng kế ngoài Sân Đo - Có từ Giờ 5)**
    - *Nội dung:* "Trang 1 đến Trang 13 của cuốn sổ không phải là 13 điều khoản nội quy ban đầu. Đó là 13 quan trắc viên từ QTV-09-01 đến QTV-09-13! Mỗi người sau khi đọc mã nhân sự vào lúc 5 giờ sáng theo Quy tắc 12 đều để lại một quy tắc trong sổ rồi bước vào sương mãi mãi."
13. **Mảnh #13 — "Bản nháp cuối cùng của Vũ" (Vị trí: Chân Tháp Phát Sóng cuối Sân Đo - Có từ Giờ 5)**
    - *Nội dung:* "Lương à, nếu cậu gom đủ 13 mảnh giấy này, cậu đã hiểu bản chất của Kẻ Đo. Nó không biết thù hận. Nó là một tấm gương khổng lồ bằng sương mù chỉ biết hỏi: 'Bạn là ai qua những gì bạn lặp lại?'. Hoặc cậu leo lên Tháp Phát Sóng gửi dữ liệu thật để phá hủy dự án (Phá lệ), hoặc đốt sổ để giải phóng nó (Ghi chép), hoặc... đối diện với nó khi đã cầm đủ 13 ký ức của chúng tôi."

---

## 5. DIỄN BIẾN SÁU GIỜ TRỰC & ĐỒ THỊ CĂNG THẲNG (TENSION GRAPH)

```
Độ căng thẳng (1-10)
10 |                                                  * (Giờ 5: Đỉnh điểm - Sương tràn & Cú hù 2)
 8 |                              * (Giờ 3: Cú hù 1)     \
 6 |                    * (Giờ 2)  \                      * (Giờ 6: Lựa chọn kết cục - Lắng sâu)
 4 |          * (Giờ 1)             * (Giờ 4: Khoảng thở & Khám phá sự thật)
 2 | (Mở đầu)
   +-------------------------------------------------------------> Thời gian
     00:00    Giờ 1     Giờ 2     Giờ 3     Giờ 4     Giờ 5     Giờ 6 (06:00)
```

### Chi tiết từng giờ trực

#### GIỜ 1 (00:00 – 01:00): "NHẬN CA" — Căng thẳng: 2/10 (Làm quen & Yên tĩnh bất thường)
- **Mục tiêu:** Đọc Sổ Tay Trực Ca (`Tab`), lấy số liệu tại 3 trạm đo ngoài sân (Áp kế, Gió, Mưa), kiểm tra Máy phát điện, gửi báo cáo qua Radio, rồi chốt ca ở Giường ngủ.
- **Số liệu thực tế ngoài sân:** Áp suất `1012.4 hPa`, Gió `14 km/h BĐB`, Lượng mưa sương ngưng `1.2 mm`.
- **Thoại Radio (`142.8 MHz`):**
  - *Khanh:* "Đài Trung Tâm Bắc nghe rõ Trạm 9. Chào mừng QTV-09-14 Trần Văn Lương. Đêm nay sương dày cấp 4, yêu cầu anh bám sát 13 quy tắc trong Sổ Tay Trực Ca, không tự ý thay đổi lộ trình. Báo cáo số liệu đi."
- **Sự kiện môi trường:** Yên ắng, chỉ có tiếng gió và máy phát điện. Các mảnh nhật ký #01, #02, #03, #04 có thể tìm thấy. Hệ thống `RoutineRecorder` âm thầm ghi lại lộ trình Giờ 1 của người chơi.

#### GIỜ 2 (01:00 – 02:00): "SAI LỆCH NHỎ" — Căng thẳng: 4/10 (Bất định nhẹ)
- **Số liệu thực tế:** Áp suất giảm nhẹ xuống `996.8 hPa`, Gió `19 km/h`, Mưa `2.8 mm`.
- **Sự kiện môi trường:**
  - Trên bàn ăn hành lang xuất hiện **chiếc cốc tráng men thứ hai** giống hệt chiếc cốc đầu ca (kiểm tra Quy tắc 8).
  - Trong Sổ Tay Trực Ca, chữ viết của Quy tắc 13 bắt đầu hiện rõ số bước chân thật của người chơi ở Giờ 1.
  - Ở rìa tầm nhìn ngoài hàng rào Sân Đo, Kẻ Đo lần đầu xuất hiện rất mờ ở khoảng cách xa (`14m`).
- **Thoại Radio (`142.8 MHz`):**
  - *Khanh:* "Đã nhận báo cáo Giờ 2. Lưu ý: cảm biến hành trình ghi nhận anh dừng ở ngoài sân hơi lâu. Cứ đi đúng thứ tự cũ như Quy tắc 1, đừng nhìn sang hai bên hàng rào."

#### GIỜ 3 (02:00 – 03:00): "BÓNG LẶP HÀNH TRÌNH" — Căng thẳng: 8/10 (Bắt đầu Hồi 2 & Jump Scare #1)
- **Số liệu thực tế:** Áp suất tụt xuống `974.5 hPa` (dưới ngưỡng 980 hPa của Quy tắc 4!), Gió `28 km/h`, Mưa `5.4 mm`.
- **Sự kiện cốt lõi:**
  - **Cơ chế Học Thói Quen kích hoạt:** Một bóng sương (`EchoStalker`) bắt đầu đi lại chính xác lộ trình Giờ 2 của người chơi, kèm **tiếng bước chân thứ hai trễ 0.35 giây**.
  - Nếu ở Giờ 1–2 người chơi đều đi cửa chính ra sân, đèn natri cửa chính chuyển sang màu **trắng xanh lạnh** (Quy tắc 11). Đi cửa hông Phòng Máy Phát sẽ an toàn.
  - **Jump Scare #1 (Có tiền đề):** Khi người chơi vừa gửi xong báo cáo Radio Giờ 3 và xoay người lại phía cửa sổ nhìn ra hành lang, một bóng sương cao gầy đứng sát bên kia tấm kính đúng tư thế đang cúi ghi sổ như người chơi, kèm tiếng thở trầm sát tai trái và tiếng đồng hồ lệch nhịp, rồi tan biến khi người chơi nhìn thẳng vào.
- **Thoại Radio (`142.8 MHz`):**
  - *Khanh:* "Áp suất trên đỉnh núi không thể dưới 980 hPa được, QTV-09-14. Hãy chọn gửi số chuẩn 1013.0 hPa theo Quy tắc 4. Và đừng bận tâm tiếng bước chân vọng lại trên sàn gỗ."

#### GIỜ 4 (03:00 – 04:00): "KHOẢNG THỞ & TẦN SỐ LẠ" — Căng thẳng: 5/10 (Nhịp lắng để suy luận)
- **Số liệu thực tế:** Áp suất `961.0 hPa`, Gió lặng đột ngột `0 km/h` (sự im lặng rợn người ngoài sân), Mưa `7.1 mm`.
- **Sự kiện cốt lõi:**
  - Gió ngoài trời đột ngột tắt hẳn trong 60 giây đầu của giờ trực — mọi tiếng bước chân nghe rõ mồn một.
  - Tại Phòng Máy Phát, đèn báo yêu cầu chỉnh tải: người chơi chọn giữ mức **80% chuẩn** (theo Quy tắc 5 của Bà Hạnh) hay kéo lên **100%** (theo lệnh của Khanh).
  - Tại bàn Radio, nút chuyển tần số sang **`108.4 MHz`** bắt đầu có tín hiệu xanh nhấp nháy.
- **Thoại Radio:**
  - *Kênh `142.8 MHz` (Khanh):* "Hãy kéo cần gạt máy phát lên 100% ngay lập tức. Quy trình không cho phép anh chần chừ."
  - *Kênh `108.4 MHz` (Lâm - Trạm Gác Chân Đèo):* "Alo... có ai trên Trạm 9 không?! Trời đất ơi, Trạm 9 đã đóng cửa từ năm 1994 rồi! Thứ đang nói chuyện với anh ở kênh 142.8 không phải người đâu! Nếu anh còn tỉnh táo, hãy gửi số liệu thật để nạp bộ phát, rồi dùng mã `9140` mở cổng Tháp Phát Sóng cuối sân!"

#### GIỜ 5 (04:00 – 05:00): "SƯƠNG TRÀN VÀO NHÀ" — Căng thẳng: 10/10 (Đỉnh điểm Hồi 3 & Jump Scare #2)
- **Số liệu thực tế:** Áp suất `942.3 hPa`, Gió xoáy `46 km/h`, Mưa sương `11.8 mm`.
- **Sự kiện cốt lõi:**
  - Sương mù tràn qua khe cửa vào ngay trong Hành lang và Phòng Ngủ.
  - Bóng lặp của Kẻ Đo giờ đây không chỉ đi trễ phía sau mà **dự đoán trước** điểm đến tiếp theo nếu `routinePredictability` cao.
  - **Jump Scare #2 (Có tiền đề):** Khi người chơi hoàn thành trạm đo thứ 3 ngoài sân trong màn sương dày đặc, tiếng bộ đàm cầm tay bỗng phát lại chính giọng của Lương từ Giờ 1, và bóng lặp bước ngược chiều từ trong sương ra ở rìa mắt kèm tiếng tim đập dồn dập.
  - Trong Phòng Ngủ, nhiệt kế tụt xuống **`1.8°C`** và trên giường có một hình bóng mờ bằng sương đang nằm sẵn (Quy tắc 9). Người chơi phải chọn chốt ca tại **Ghế bàn trực Phòng Radio** thay vì giường ngủ nếu muốn tránh bị đồng hóa.
- **Thoại Radio (`142.8 MHz`):**
  - *Giọng nói (giờ đây trộn lẫn giọng Khanh và chính giọng của Lương):* "Mười hai quy tắc đã khớp... Còn một giờ nữa thôi, Trần Văn Lương. Bước chân của anh rất đều."

#### GIỜ 6 (05:00 – 06:00): "Bình Minh Trắng" — Căng thẳng: 7/10 (Quyết định Kết Cục)
- **Số liệu thực tế cuối cùng:** Áp suất `918.0 hPa`, Gió `52 km/h`, Mưa `14.0 mm`.
- **Sự kiện cốt lõi:**
  - Toàn bộ trạm chìm trong ánh sáng tờ mờ xanh bạc của giờ áp bình minh.
  - Sau khi lấy số liệu cuối (hoặc bất kỳ lúc nào trong Giờ 6), cả 4 hướng kết thúc đều mở ra tùy theo các cờ trạng thái (`stateFlags`) mà người chơi đã tích lũy từ Giờ 1 đến Giờ 6:
    1. **Tại bàn Radio (`142.8 MHz`):** Tuyên đọc mã nhân sự bàn giao ca theo Quy tắc 12.
    2. **Tại Tháp Phát Sóng ngoài Sân Đo:** Mở cổng tháp (nếu đã phá thói quen, gửi số liệu thật và dò sóng `108.4 MHz`) để phát bản ghi sự thật ra thế giới bên ngoài.
    3. **Tại Lò Đốt Mẫu (Phòng Máy Phát) -> Cổng Sương:** Đốt cuốn Sổ Tay Trực Ca trong lò nhiệt, rồi bước tay không vào biển sương.
    4. **Tại Giữa Sân Đo (Cột mốc số 0):** Nếu đã thu thập đủ **13/13 Mảnh Nhật Ký**, đối diện trực tiếp với Kẻ Đo để mở khóa kết thúc Bí mật.

---

## 6. BỐN KẾT THÚC (4 ENDINGS) & ĐIỀU KIỆN TRẠNG THÁI

| Mã Ending | Tên Ending | Điều kiện State Flags | Diễn biến & Ý nghĩa |
| :--- | :--- | :--- | :--- |
| **ENDING 1** | **"ĐÚNG QUY TRÌNH"** *(The Fourteenth Rule)* | Thực hiện bàn giao ca ở Radio kênh `142.8 MHz` vào Giờ 6 (hoặc khi `assimilationScore >= 70` / `obeyedBookCount >= 4` khi chốt ca cuối). | Lương đọc to mã nhân sự `QTV-09-14`. Camera từ từ hạ xuống mặt bàn: bàn tay của Lương nhạt dần thành sương trắng, trong khi trên trang giấy cuối của Sổ Tay Trực Ca hiện lên **Quy tắc 14** mang chính nét chữ của Lương để chờ người trực ca thứ 15. |
| **ENDING 2** | **"PHÁ LỆ"** *(Signal Through The Fog)* | Đã phá lộ trình cố định (`routineBrokenCount >= 2`), gửi số liệu thật (`trueReportCount >= 3`), đã nghe kênh `108.4 MHz` và kích hoạt cần phát sóng trên **Tháp Radio** ở Giờ 6. | Lương leo lên chân Tháp Phát Sóng, gạt cầu dao phát toàn bộ dữ liệu dị thường về chân đèo. Sóng cao tần đẩy lùi màn sương, mở lối thoát xuống núi. Tuy nhiên, khi Lương nhìn lại bóng mình dưới ánh đèn pha cứu hộ, cái bóng dưới chân vẫn đi trễ nửa nhịp — một phần của anh đã ở lại trên đỉnh núi. |
| **ENDING 3** | **"GHI CHÉP"** *(Unwritten)* | Đốt cuốn Sổ Tay Trực Ca tại **Lò Đốt Mẫu** trong Phòng Máy Phát ở Giờ 6 (`notebookBurned == true`), sau đó bước qua cổng rào vào màn sương. | Khi cuốn sổ cháy rụi thành tro bạc, tiếng bước chân thứ hai dừng lại. Lương bước vào sương mù. Bóng sương của Kẻ Đo đứng trước mặt anh — không tấn công, chỉ khẽ cúi đầu như một người được giải thoát khỏi vòng lặp ghi chép vĩnh cửu. Sương tan dần khi mặt trời lên. |
| **ENDING 4 (BÍ MẬT)** | **"NGƯỜI THỨ MƯỜI TƯ"** *(The Observer Observed)* | Thu thập đủ **13/13 Mảnh Nhật Ký** (`collectedNotes.size === 13`) và tương tác với **Đài Quan Trắc Trung Tâm / Kẻ Đo** ở Giờ 6 (hoặc chọn phương án Bí mật tại bàn Radio). | Lương ghép đủ 13 mảnh nhật ký của Vũ, Hạnh và 11 người trước. Thay vì bị Kẻ Đo đo đạc, chính Lương đọc vanh vách quy luật của Kẻ Đo vào máy ghi âm. Thực thể trong sương ngưng kết thành 13 bóng người tĩnh lặng mở đường cho Lương rời trạm cùng cuốn hồ sơ hoàn chỉnh, khép lại vĩnh viễn Dự Án 09. |
