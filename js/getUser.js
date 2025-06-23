async function getUser() {
    const data = await getAll(URL_USER);
    console.log("Data received:", data);
    const users = document.getElementById("user-info")

    data.forEach(element => {

        users.innerHTML += `<div class="col-md-4 mb-4">
                                <div class="card shadow-sm">
                                    <img src="${element.avatar}" class="card-img-top" alt="${element.username}">
                                    <div class="card-body">
                                    <h5 class="card-title">${element.username}</h5>
                                    <p class="card-text"><strong>Email:</strong> ${element.email}</p>
                                    <p class="card-text"><strong>Phone:</strong> ${element.phone}</p>
                                    <p class="card-text"><strong>Address:</strong> ${element.address}</p>
                                    <p class="card-text"><strong>Birth:</strong> ${element.birth}</p>
                                    <button class="btn btn-sm btn-warning" onclick='editUser(${JSON.stringify(element)})' data-bs-toggle="modal" data-bs-target="#editUserModal">Edit</button>
                                    </div>
                                </div>
                            </div>`
    });
}
getUser()