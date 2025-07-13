# 🍽️ TableProject - Hệ thống đặt bàn nhà hàng

**TableProject** là một ứng dụng web đơn giản mô phỏng chức năng đặt bàn trong nhà hàng. Dự án này sử dụng `JSON Server` để mô phỏng backend và được xây dựng bằng HTML, CSS và JavaScript DOM thuần.

---

## 📌 Tính năng chính

- 👤 Đăng ký / Đăng nhập người dùng
- 📋 Xem danh sách bàn và món ăn
- 🪑 Đặt bàn (booking) và cập nhật trạng thái bàn
- 📊 Xem biểu đồ thống kê (doanh thu hoặc trạng thái bàn)
- ☁️ Hỗ trợ upload hình ảnh lên cloud với Cloudinary

---

## 🛠️ Công nghệ sử dụng

| Công nghệ        | Vai trò                        |
|------------------|--------------------------------|
| HTML/CSS/JS      | Giao diện và xử lý logic       |
| JSON Server      | Mô phỏng REST API              |
| Cloudinary       | Lưu trữ ảnh món ăn             |
| Chart.js         | Vẽ biểu đồ thống kê            |

---

## 📂 Cấu trúc thư mục chính
<pre lang="markdown"> ```plaintext TABLEPROJECT/ ├── css/ # File CSS cho từng trang │ ├── Home.css │ └── LoginAndSignup.css ├── image/ # Hình ảnh món ăn và bàn │ ├── dish/ │ └── tables/ ├── js/ # Các file xử lý logic JS │ ├── api.js # Hàm gọi API │ ├── chart.js # Hiển thị biểu đồ │ ├── configCloudinary.js # Cấu hình Cloudinary │ ├── getDish.js, getTable.js, getUser.js │ ├── home.js # JS cho trang Home │ ├── loginScript.js │ ├── signIn.js / signUp.js ├── views/ # Giao diện HTML │ ├── Home.html │ └── LoginAndSignup.html ├── db.json # File JSON làm cơ sở dữ liệu giả lập └── README.md # File hướng dẫn ``` </pre>


Dự án sử dụng cho mục đích học tập. Không dùng trong môi trường sản xuất.
