
async function getTable() {
    const data = await getAll(URL_TABLE);

    const tables = document.querySelector(".tables");

    const tableOption = document.querySelector(".tableOption") // tạo biến cho list xổ ra ở chỗ choose table bên oder

    data.forEach(element => {
        if (element.status) {
            tableOption.innerHTML += `<option value="${element.id}">${element.name}</option>`
        }
        const img = element.status ? "../image/tables/tea-time.png" : "../image/tables/restaurant.png";
        const button = element.status ? ` <button class="btn btn-success"><i class="fa-solid fa-plus"></i> ADD</button>
                                    <button class="btn btn-danger"><i class="fa-solid fa-cart-shopping"></i>
                                        CART</button>` : `<button onClick="chooseTable(${element.id})" class="btn btn-warning w-50 " data-bs-toggle="modal" data-bs-target="#bookingModal"><i class="fa-solid fa-calendar-plus"></i>
                                        BOOKING</button>`
        tables.innerHTML += ` <div class="col">
                            <div class="card mb-3">
                                <h1 class="corner-number fs-6">${element.id}</h1>
                                <img src="${img}" class="card-img-top w-50 m-auto" alt="...">
                                <div class="card-body text-center ">
                                   ${button}
                                </div>
                            </div>
                        </div> `
    });

}

getTable()

//do id được lấy trong fucn là local param nên phải khai biến global bên ngoài rồi gán để lấy dc id của table
let tableId;
function chooseTable(id) {
   
   tableId = id ;
}

// lấy nút gửi bên modal(form gửi đi)
const bookingSubmit = document.getElementById("bookingSubmitButton")


//thêm sự kiện update người đặt và số người vào bàn
bookingSubmit.addEventListener("click", () => {
    // .value là cách để lấy giá trị nhập vào ở form booking modal
    const customerName = document.getElementById("customerName").value
    const quantity = document.getElementById("quantity").value

    //tạo một object để update thông tin trong dữ liệu
    const updateTable = {
        id: tableId,
        name: `Table ${tableId}`,
        quantity: quantity,
        status: true,
        bookedBy: customerName
    }

    //như vậy phải có CRUD bên API mới có thể gọi hàm Update bên dữ liệu dc
    // url: địa chỉ API gốc (ví dụ: "http://localhost:3000/orders").
    // item: là đối tượng cần cập nhật, thường chứa thông tin như id, name, status, v.v.
    
    // function edit(url, item) {
    //     fetch(`${url}/${item.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(item),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Đơn hàng đã được cập nhật', data);
    //         })
    //         .catch(error => console.error('Lỗi khi cập nhật đơn hàng', error));
    // }

    //gọi hàm update
    edit(URL_TABLE, updateTable)

})
