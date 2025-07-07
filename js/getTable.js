// Hàm lấy danh sách bàn ăn và hiển thị lên giao diện
async function getTable() {
    const tableData = await getAll(URL_TABLE); // Lấy dữ liệu từ API
    const orderData = await getAll(URL_ORDER);

    const tableContainer = document.querySelector(".tables"); // Vùng hiển thị danh sách bàn
    const tableSelect = document.querySelector(".tableOption"); // Danh sách thả xuống để chọn bàn (ở phần order)



    tableData.forEach(table => {
        const relatedOrder = orderData.find(order => order.id == table.id);

        const isUnpaid = relatedOrder && relatedOrder.status !== "paid";
        // Nếu bàn đang trống (status === true), thêm vào lựa chọn order
        if (table.status && isUnpaid) {
            tableSelect.innerHTML += `<option value="${table.id}">${table.name}</option>`;

        }

        // Chọn hình ảnh phù hợp theo trạng thái của bàn(toán tử 3 ngôi)
        const imageSrc = (table.status && isUnpaid)
            ? "../image/tables/tea-time.png"
            : "../image/tables/restaurant.png";

        // Tạo nút theo trạng thái bàn(toán tử 3 ngôi)
        const actionButtons = (table.status && isUnpaid)
            ? `
                <button class="btn btn-success" onclick="handleAddClick(${table.id})">
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
bookingSubmitButton.addEventListener("click", async () => {
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

    await edit(URL_TABLE, updatedTable);

    // Clear form + đóng modal
    selectedTableId = null;
    document.getElementById("customerName").value = "";
    document.getElementById("quantity").value = "";
    const modal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
    if (modal) modal.hide();


});



let getCurrentTable; //lấy biến global để xài dưới chỗ confirmPayment vì ở hàm ni đã lấy dc biến tableId nên gán vô xài luôn

// hàm handleCartClick(tableId) lấy được biến tableId do được truyền ở bên trên chỗ onClick="handleCartClick(${table.id})" cho nên gán tên parameter tên là tableId tương đương với 
// nó chính là table.id
async function handleCartClick(tableId) {

    getCurrentTable = tableId;


    const orders = await getAll(URL_ORDER);
    const dishes = await getAll(URL_DISH);
    const order = orders.find(order => order.id == tableId);

    const orderDetails = document.getElementById("modalOrderBody");
    const totalSpan = document.getElementById("modalTotalAmount");
    const tableName = document.getElementById("modalTableName");

    orderDetails.innerHTML = "";
    totalSpan.textContent = "0";
    tableName.textContent = tableId;

    if (!order || !order.bill || order.bill.length === 0 || order.status === "paid") {
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
            
        `;
        orderDetails.appendChild(row);
    });

    totalSpan.textContent = total.toLocaleString();

    // Gắn tableId vào nút xác nhận để biết đang xử lý bàn nào
    document.getElementById("confirmPaymentBtn").setAttribute("data-table-id", tableId);
}





function handleAddClick(tableId) {

    const tableSelect = document.querySelector(".tableOption");
    tableSelect.value = tableId;


    const orderMenu = document.getElementById("orderFoodMenu");

    if (orderMenu) {
        // Giả lập click nếu có sự kiện click gắn cho menu
        orderMenu.click();

    }
}


const confirmPayment = document.getElementById("confirmPaymentBtn")

confirmPayment.addEventListener("click", async () => {
    if (!getCurrentTable) return;

    const table = await getAll(URL_TABLE)

    const orders = await getAll(URL_ORDER);
    const order = orders.find(order => order.id == getCurrentTable);

    if (!order) return;
    const getTable = table.find(element => element.id == getCurrentTable)
    order.status = "paid";
    order.paidAt = new Date().toISOString();

    if (getTable) {
        getTable.status = false;
        getTable.bookedBy = null;
        await edit(URL_TABLE, getTable);
    }

    edit(URL_ORDER, order);

    // Đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("billModal"));
    if (modal) modal.hide();
    await getTable();

})

async function showPaidOrders(params) {
    const orders = await getAll(URL_ORDER);
    const dishes = await getAll(URL_DISH);

    const paidOrderContainer = document.getElementById("paidOrderList")

    const paidOrders = orders.filter(element => element.status === "paid")

    if (paidOrders.length === 0) {
        paidOrderContainer.innerHTML = `<p class="text-muted">Không có đơn hàng đã thanh toán.</p>`;
        return;
    }

    paidOrders.forEach(element => {

        let total = 0
        let orderItemsHtml = "";
        const paidTime = new Date(element.paidAt).toLocaleString();
        element.bill.forEach(item => {
            const dish = dishes.find(d => d.id == item.idFood);
            if (!dish) return;

            const itemTotal = dish.price * item.quantity;
            total += itemTotal;

            orderItemsHtml += `<li>${dish.name} x ${item.quantity} = ${itemTotal.toLocaleString()} VND</li>`;
            
        })

        const orderCard = document.createElement("div");
        orderCard.classList.add("col-md-6", "mb-3");

        orderCard.innerHTML = `
            <div class="card shadow-sm fixed-order-card">
                <div class="card-header bg-success text-white">
                    <strong>Bàn số: ${element.id}</strong>
                </div>
                <div class="card-body">
                    <ul>${orderItemsHtml}</ul>
                    <hr>
                    <strong>Tổng cộng: ${total.toLocaleString()} VND</strong>
                    <small class="text-muted">Thanh toán lúc: ${paidTime}</small>
                </div>
            </div>
        `;

        paidOrderContainer.appendChild(orderCard);

    })


}

showPaidOrders();


