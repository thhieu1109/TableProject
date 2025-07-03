async function logIn() {
    const email = document.querySelector('.sign-in-container input[placeholder="Email"]').value;
    const password = document.querySelector('.sign-in-container input[placeholder="Mật khẩu"]').value;

    if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    const users = await getAll(URL_USER);
    const userLogin = users.find(u => u.email === email && u.password === password);

    if (!userLogin) {
        alert("Email hoặc mật khẩu không chính xác.");
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(userLogin));
    alert(`Đăng nhập thành công! Xin chào ${userLogin.username}.`);
    window.location.href = "Home.html";
}


// Gắn sự kiện khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".sign-in-container form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            logIn();
        });
    }
});


