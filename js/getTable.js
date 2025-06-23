
async function getTable() {
    const data = await getAll(URL_TABLE);

    const tables = document.querySelector(".tables");

    data.forEach(element => {
        const img = element.status ? "../image/tables/tea-time.png" : "../image/tables/restaurant.png";
        const button = element.status ? ` <button class="btn btn-success"><i class="fa-solid fa-plus"></i> ADD</button>
                                    <button class="btn btn-danger"><i class="fa-solid fa-cart-shopping"></i>
                                        CART</button>` : `<button class="btn btn-warning w-50 " data-bs-toggle="modal" data-bs-target="#bookingModal"><i class="fa-solid fa-calendar-plus"></i>
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