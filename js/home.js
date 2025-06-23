// Biến lấy các item trong menu sidebar
const getItem = document.querySelectorAll(".item");

// Biến cha để lấy 2 icon bên trong (icon thu gọn/mở rộng sidebar)
const leftIcon = document.querySelector(".left-icon");

// Biến con để lấy 2 icon đổi qua lại
const iconLeft = leftIcon.querySelector(".fa-arrow-left");
const iconRight = leftIcon.querySelector(".fa-arrow-right-to-bracket");

// Biến để ẩn/hiện toàn bộ menu
const hideMenu = document.querySelector(".menu");

leftIcon.addEventListener("click", () => {
    // Ẩn/hiện item bên menu khi bấm icon
    getItem.forEach(e => e.classList.toggle("d-none"));
    hideMenu.classList.toggle("none");

    // Đổi icon
    iconLeft.classList.toggle("d-none");
    iconRight.classList.toggle("d-none");
});

// Dropdown user info khi bấm vào avatar
// Biến lấy avatar của user bằng DOM
const userAvatar = document.getElementById("userAvatar");
// Biến lấy dropdown của user bằng DOM(hiện đang bị ẩn do thuộc tính d-none của Boostrap)
const userDropdown = document.getElementById("userDropdown");

userAvatar.addEventListener("click", () => {
    userDropdown.classList.toggle("d-none");
});


const listMenu = document.querySelectorAll(".menu li");
const listBox = document.querySelectorAll(".main-content .box");
listMenu.forEach((e, i) => {
    e.addEventListener("click", () => {
        listBox.forEach(e => e.style.display = "none");
        listBox[i].style.display = "block";
    })
})


const logoutBtn = document.getElementById('logoutBtn');

document.getElementById('logoutBtn').addEventListener('click', function () {
    // Chuyển hướng về trang login
    window.location.href = "LoginAndSignup.html";
});




