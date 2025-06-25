
async function getDish() {
    const data = await getAll(URL_DISH);

    const dish = document.querySelector(".dish");



    data.forEach(element => {
        const item = document.createElement("div")
        item.classList.add("col");
        item.innerHTML = `<div class="card mb-3 position-relative text-center ">
                                <h1 class="corner-number fs-6">${element.id}</h1>
                                <h6 class="mt-3">${element.name}</h6>
                                <i class="fa-solid fa-pen-to-square edit-icon"></i>
                                <img src="${element.img}" class="card-img-top w-50 m-auto" alt="...">
                                <p class="text-danger fw-bold">${element.price} VND</p>
                                <div class="d-flex justify-content-center align-items-center mb-2">
                                    <button class="btn minus rounded-btn btn-sm rounded-circle bg-danger text-white me-2">-</button>
                                    <input type="text" class="form-control quantity text-center w-25" value="0">
                                    <button class="btn plus rounded-btn btn-sm rounded-circle bg-danger text-white ms-2">+</button>
                                </div>
                            </div>`;

        dish.appendChild(item)

        const minus = item.querySelector(".minus")
        const plus = item.querySelector(".plus")
        const quantity = item.querySelector(".quantity")

        plus.addEventListener("click", () => {
            quantity.value = parseInt(quantity.value) + 1;
        })

        minus.addEventListener("click", () => {
            if (quantity.value > 0) {
                quantity.value = parseInt(quantity.value) - 1;
            }

        })



    });






}

getDish();
// console.log(bodytable);
let file_book; // toàn cục
const foodImg = document.getElementById("foodImage");
foodImg.addEventListener("change", fileBook);
function fileBook(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        document.getElementById("img_book").src = e.target.result;
    };
    file_book = file;
}
//lấy nút Add food
const addFood = document.getElementById("uploadBtn");

addFood.addEventListener("click", async () => {

    const foodName = document.getElementById("foodName").value;
    const foodPrice = document.getElementById("foodPrice").value;
    const imgUrl = await uploadImageToCloudinary(file_book);

    const newFood = {
        name: foodName,
        img: imgUrl,
        price: foodPrice
    }
    add(URL_DISH, newFood);
})