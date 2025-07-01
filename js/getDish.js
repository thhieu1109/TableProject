let dataFood; // biến toàn cục

// Hàm lấy danh sách món ăn và hiển thị ra giao diện
async function getDish() {
    const dishData = await getAll(URL_DISH); // Gọi API để lấy danh sách món ăn
    dataFood = dishData;
    const dishContainer = document.querySelector(".dish"); // Khu vực hiển thị món ăn

    dishData.forEach(dishItem => {
        // Tạo thẻ div để chứa thông tin từng món
        const dishCard = document.createElement("div");
        dishCard.classList.add("col");

        // Tạo nội dung HTML cho món ăn
        dishCard.innerHTML = `
            <div class="card mb-3 position-relative text-center ">
                    <div class="d-flex justify-content-between align-items-center p-2">
                        <h1 class="corner-number fs-6 mb-0">${dishItem.id}</h1>
                        <h6 class="mb-0 flex-grow-1 mx-2">${dishItem.name}</h6>
                        <div >
                            <i onClick="editFood(${dishItem.id})" class="fa-solid fa-pen-to-square edit-icon me-3" data-bs-toggle="modal"
                                data-bs-target="#addFoodModal"></i>
                              <i onClick="deleteFood(${dishItem.id})" data-bs-toggle="modal" data-bs-target="#deleteModal" class="fa-solid fa-trash delete-icon text-danger"></i>
                        </div>
                    </div>
                    <img src="${dishItem.img}" class="card-img-top m-auto" style="height: 150px" alt="...">
                    <p class="text-danger fw-bold">${dishItem.price} VND</p>
                    <div class="d-flex justify-content-center align-items-center mb-2">
                        <button class="btn minus rounded-btn btn-sm rounded-circle bg-danger text-white me-2">-</button>
                        <input type="text" class="form-control quantity text-center w-25" value="0">
                        <button class="btn plus rounded-btn btn-sm rounded-circle bg-danger text-white ms-2">+</button>
                    </div>
                </div>`;

        // Thêm món ăn vào giao diện
        dishContainer.appendChild(dishCard);

        // Tìm các nút và input số lượng bên trong món ăn hiện tại
        const minusBtn = dishCard.querySelector(".minus");
        const plusBtn = dishCard.querySelector(".plus");
        const quantityInput = dishCard.querySelector(".quantity");

        // Tăng số lượng khi bấm "+"
        plusBtn.addEventListener("click", () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        // Giảm số lượng khi bấm "-", nhưng không nhỏ hơn 0
        minusBtn.addEventListener("click", () => {
            if (parseInt(quantityInput.value) > 0) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    });
}

// Gọi hàm để hiển thị danh sách món ăn khi trang được tải
getDish();



//-----------------------------UPLOAD HÌNH ẢNH MÓN ĂN------------------------------------------------------

// Biến toàn cục để lưu file ảnh món ăn người dùng chọn
let selectedFoodImageFile;

// Gắn sự kiện khi người dùng chọn ảnh món ăn
const foodImageInput = document.getElementById("foodImage");
foodImageInput.addEventListener("change", handleFoodImageSelect);

// Xử lý khi người dùng chọn file ảnh
function handleFoodImageSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Sau khi đọc xong ảnh, hiển thị preview lên giao diện
    reader.onload = (e) => {
        document.getElementById("img_book").src = e.target.result;
    };

    selectedFoodImageFile = file; // Lưu lại file để upload sau
}

//---------------------------------XỬ LÝ KHI BẤM "UPLOAD" MÓN ĂN MỚI-------------------------------------------------
let currentEditingFoodId ;
// Lấy nút "Upload" để thêm món ăn
const uploadFoodBtn = document.getElementById("uploadBtn");

uploadFoodBtn.addEventListener("click", async () => {
    // Lấy dữ liệu người dùng nhập
    const foodName = document.getElementById("foodName").value;
    const foodPrice = document.getElementById("foodPrice").value;

    // Upload ảnh lên Cloudinary (hoặc dịch vụ khác)
    const uploadedImageUrl = await uploadImageToCloudinary(selectedFoodImageFile);
     let id = 1 ;
    dataFood.forEach(e => {
        if (e.id == id) {
            id++;
        } else {
            return
        }
    })
    // Tạo object món ăn mới để gửi lên API
    const newDish = {
        id:  currentEditingFoodId ? currentEditingFoodId : id,
        name: foodName,
        img: uploadedImageUrl,
        price: foodPrice
    };
     if(currentEditingFoodId) {
       edit(URL_DISH, newDish);
     }else {
       // Gửi yêu cầu thêm món ăn vào danh sách
       add(URL_DISH, newDish);
     }
  
});


// 👉 Hàm chỉnh sửa món ăn khi người dùng bấm vào icon cây bút
function editFood(foodId) {
    currentEditingFoodId = foodId; // Ghi nhớ ID món đang được chỉnh sửa

    // 🔍 Tìm món ăn trong danh sách theo ID
    const selectedFood = dataFood.find(food => food.id === foodId);

    // 📝 Gán thông tin món ăn vào các ô nhập trong modal
    const foodNameInput = document.getElementById("foodName");
    foodNameInput.value = selectedFood.name;

    const foodPriceInput = document.getElementById("foodPrice");
    foodPriceInput.value = selectedFood.price;

    const foodImagePreview = document.getElementById("img_book");
    foodImagePreview.src = selectedFood.img;

    // 🖊️ Đổi tên tiêu đề modal thành "EDIT FOOD"
    const modalTitle = document.getElementById("addFoodLabel");
    modalTitle.innerText = "EDIT FOOD";

    // 🔄 Đổi nút "Upload" thành "UPDATE"
    const uploadButton = document.getElementById("uploadBtn");
    uploadButton.innerText = "UPDATE";
}

// 👉 Hàm xử lý khi người dùng bấm icon thùng rác để xóa món ăn
function deleteFood(foodId) {
    const confirmDeleteButton = document.getElementById("confirmDeleteBtn");

    // 🧨 Gắn sự kiện xóa món ăn khi người dùng xác nhận trong modal
    confirmDeleteButton.addEventListener("click", () => {
        deleted(URL_DISH, foodId); // Gọi hàm xóa món ăn khỏi server
    });
}


