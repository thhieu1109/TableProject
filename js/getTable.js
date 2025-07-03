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
                <button class="btn btn-danger" onClick="handleCartClick(${table.id})" data-bs-toggle="modal" data-bs-target="#billModal">
                    <i class="fa-solid fa-cart-shopping"></i> CART
                </button>`
            : `
                <button 
                    onClick="selectTable(${table.id})" 
                    class="btn btn-warning w-50 text-nowrap"
                    data-bs-toggle="modal" 
                    data-bs-target="#bookingModal">
                    <i class="fa-solid fa-calendar-plus"></i> BOOKING
                </button>`;

        // Thêm card hiển thị bàn vào giao diện
        tableContainer.innerHTML += `
            <div class="col">
                <div class="card mb-3 p-4">
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



async function handleCartClick(tableId) {
    const orders = await getAll(URL_ORDER);
    const dishes = await getAll(URL_DISH);
    const order = orders.find(order => order.id === tableId.toString());

    const orderDetails = document.getElementById("modalOrderBody");
    const totalSpan = document.getElementById("modalTotalAmount");
    const tableName = document.getElementById("modalTableName");

    orderDetails.innerHTML = "";
    totalSpan.textContent = "0";
    tableName.textContent = tableId;

    if (!order || !order.bill || order.bill.length === 0) {
        orderDetails.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Chưa có món nào</td></tr>`;
        return;
    }

    let total = 0;
    order.bill.forEach(item => {
        const dish = dishes.find(d => d.id === item.idFood);
        if (!dish) return;

        const itemTotal = dish.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dish.name}</td>
            <td>${dish.price.toLocaleString()} VND</td>
            <td>${item.quantity}</td>
            <td>${itemTotal.toLocaleString()} VND</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFoodFromBill('${order.id}', '${item.idFood}')">Xóa</button></td>
        `;
        orderDetails.appendChild(row);
    });

    totalSpan.textContent = total.toLocaleString();

    // Gắn tableId vào nút xác nhận để biết đang xử lý bàn nào
    document.getElementById("confirmPaymentBtn").setAttribute("data-table-id", tableId);
}


// Xóa món khỏi đơn hàng
async function removeFoodFromBill(orderId, foodId) {
    const orders = await getAll(URL_ORDER);
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedBill = order.bill.filter(item => item.idFood !== foodId);

    await fetch(`${URL_ORDER}/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bill: updatedBill })
    });

    showOrder(orderId);
}



