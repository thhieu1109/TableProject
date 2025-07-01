async function register() {

    const name = document.querySelector('.sign-up-container input[placeholder="Họ và tên"]').value
    const email = document.querySelector('.sign-up-container input[placeholder="Email"]').value
    const password = document.querySelector('.sign-up-container input[placeholder="Mật khẩu"]').value
    const confirmPassword = document.querySelector('.sign-up-container input[placeholder="Xác nhận mật khẩu"]').value


    if (!name || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp.");
        return;
    }

    //lay toan bo data user
    const users = await getAll(URL_USER)

    //tim user da ton tai trong db bang cach so sanh email
    const existedUser = users.find(u => u.email === email)

    if (existedUser) {
        alert("Email đã tồn tại.");
        return;
    }

    const newUser = {
        id: Date.now(),
        username: name,
        email: email,
        password: password,
        address: "",
        phone: "",
        birth: "",
        avatar: "https://img.freepik.com/free-icon/user_318-159711.jpg",
    };
    add(URL_USER, newUser);
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    document.getElementById("signIn").click();

}


// Gắn sự kiện khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".sign-up-container form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            register();
        });
    }
});