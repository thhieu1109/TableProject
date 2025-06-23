
async function getDish() {
    const data = await getAll(URL_DISH);

    const dish = document.querySelector(".dish");

    data.forEach(element => {

        dish.innerHTML += `<div class="col">
                            <div class="card mb-3 position-relative text-center ">
                                <h1 class="corner-number fs-6">${element.id}</h1>
                                <h6 class="mt-3">${element.name}</h6>
                                <i class="fa-solid fa-pen-to-square edit-icon"></i>
                                <img src="${element.img}" class="card-img-top w-50 m-auto" alt="...">
                                <p class="text-danger fw-bold">${element.price} VND</p>
                                <div class="d-flex justify-content-center align-items-center mb-2">
                                    <button class="btn rounded-btn btn-sm rounded-circle bg-danger text-white me-2">-</button>
                                    <input type="text" class="form-control text-center w-25" value="0">
                                    <button class="btn rounded-btn btn-sm rounded-circle bg-danger text-white ms-2">+</button>
                                </div>
                            </div>
                        </div>`
    });

}

getDish()