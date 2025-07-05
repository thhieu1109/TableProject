async function getUser() {
    const userLogin = JSON.parse(localStorage.getItem("currentUser"));
    const users = document.getElementById("user-info");

    users.innerHTML = `
        <div class="user-card d-flex rounded-4 overflow-hidden shadow-lg">
            <div class="user-left text-white d-flex flex-column align-items-center justify-content-center p-4">
                <img src="${userLogin.avatar}" alt="${userLogin.username}" class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;">
                <h4 class="fw-bold mb-1">${userLogin.username}</h4>
                <p class="mb-3 text-white-50">${userLogin.role || "Member"}</p>
                <button class="btn btn-outline-light btn-sm rounded-pill" 
                    onclick='editUser(${JSON.stringify(userLogin)})' 
                    data-bs-toggle="modal" 
                    data-bs-target="#editUserModal">
                    <i class="fas fa-edit me-2"></i>Edit
                </button>
            </div>
            <div class="user-right bg-dark text-white p-4 flex-grow-1">
                <h5 class="border-bottom pb-2 mb-3">Information</h5>
                <div class="row mb-3">
                    <div class="col-6"><strong>Email</strong><br>${userLogin.email}</div>
                    <div class="col-6"><strong>Phone</strong><br>${userLogin.phone}</div>
                </div>
                <div class="mb-3"><strong>Address</strong><br>${userLogin.address}</div>
                <div class="mb-3"><strong>Birth</strong><br>${userLogin.birth}</div>
                
                <h6 class="border-top pt-3 mt-4 mb-2">Follow me</h6>
                <div class="social-icons d-flex gap-3">
                    <i class="fab fa-facebook text-white fs-5"></i>
                    <i class="fab fa-twitter text-white fs-5"></i>
                    <i class="fab fa-instagram text-white fs-5"></i>
                </div>
            </div>
        </div>`;
}
getUser();
