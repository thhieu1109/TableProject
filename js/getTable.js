// Hàm lấy danh sách bàn ăn và hiển thị lên giao diện
async function getTable() {
    const tableData = await getAll(URL_TABLE); // Lấy dữ liệu từ API

    const tableContainer = document.querySelector(".tables"); // Vùng hiển thị danh sách bàn
    const tableSelect = document.querySelector(".tableOption"); // Danh sách thả xuống để chọn bàn (ở phần order)

    tableData.forEach(table => {
        // Nếu bàn đang trống (status === true), thêm vào lựa chọn order
        if (table.status) {
            tableSelect.innerHTML += `<option value="${table.id}">${table.name}</option>`;
        }

        // Chọn hình ảnh phù hợp theo trạng thái của bàn(toán tử 3 ngôi)
        const imageSrc = table.status
            ? "../image/tables/tea-time.png"
            : "../image/tables/restaurant.png";

        // Tạo nút theo trạng thái bàn(toán tử 3 ngôi)
        const actionButtons = table.status
            ? `
                <button class="btn btn-success">
                    <i class="fa-solid fa-plus"></i> ADD
                </button>
                <button class="btn btn-danger">
                    <i class="fa-solid fa-cart-shopping"></i> CART
                </button>`
            : `
                <button 
                    onClick="selectTable(${table.id})" 
                    class="btn btn-warning w-50"
                    data-bs-toggle="modal" 
                    data-bs-target="#bookingModal">
                    <i class="fa-solid fa-calendar-plus"></i> BOOKING
                </button>`;

        // Thêm card hiển thị bàn vào giao diện
        tableContainer.innerHTML += `
            <div class="col">
                <div class="card mb-3">
                    <h1 class="corner-number fs-6">${table.id}</h1>
                    <img src="${imageSrc}" class="card-img-top w-50 m-auto" alt="...">
                    <div class="card-body text-center">
                        ${actionButtons}
                    </div>
                </div>
            </div>`;
    });
}

// Gọi hàm khi trang load
getTable();

// Biến toàn cục để lưu ID của bàn được chọn khi người dùng nhấn BOOKING
let selectedTableId;

// Hàm được gọi khi người dùng chọn bàn để đặt
function selectTable(id) {
    selectedTableId = id;
}

// Lấy nút xác nhận đặt bàn từ modal
const bookingSubmitButton = document.getElementById("bookingSubmitButton");

// Bắt sự kiện click vào nút đặt bàn
bookingSubmitButton.addEventListener("click", () => {
    // Lấy dữ liệu người dùng nhập vào từ form
    const customerName = document.getElementById("customerName").value;
    const numberOfGuests = document.getElementById("quantity").value;

    // Tạo object chứa thông tin bàn cần cập nhật
    const updatedTable = {
        id: selectedTableId,
        name: `Table ${selectedTableId}`,
        quantity: numberOfGuests,
        status: true, // Bàn đã được đặt nên status là true
        bookedBy: customerName
    };

    // Gửi yêu cầu cập nhật bàn lên API (cần có CRUD cho PUT bên backend)
    edit(URL_TABLE, updatedTable);
});
