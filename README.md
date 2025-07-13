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
├── css/
│   ├── Home.css
│   └── LoginAndSignup.css
├── image/
│   ├── dish/
│   └── tables/
├── js/
│   ├── api.js
│   ├── chart.js
│   ├── configCloudinary.js
│   ├── getDish.js, getTable.js, getUser.js
│   ├── home.js
│   ├── loginScript.js
│   ├── signIn.js / signUp.js
├── views/
│   ├── Home.html
│   └── LoginAndSignup.html
├── db.json
└── README.md


Dự án sử dụng cho mục đích học tập. Không dùng trong môi trường sản xuất.
