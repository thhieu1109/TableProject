document.addEventListener("DOMContentLoaded", () => {


    // Biến lấy các item trong menu sidebar
    const getItemSidebar = document.querySelectorAll(".item");

    // Biến cha để lấy 2 icon bên trong (icon thu gọn/mở rộng sidebar)
    const leftIcon = document.querySelector(".left-icon");

    // Biến con để lấy 2 icon đổi qua lại
    const iconLeft = leftIcon.querySelector(".fa-arrow-left");
    const iconRight = leftIcon.querySelector(".fa-arrow-right-to-bracket");

    // Biến để ẩn/hiện toàn bộ menu
    const hideMenu = document.querySelector(".menu");

    leftIcon.addEventListener("click", () => {
        getItemSidebar.forEach(e => e.classList.toggle("d-none"));
        hideMenu.classList.toggle("none");
        iconLeft.classList.toggle("d-none");
        iconRight.classList.toggle("d-none");
    });





    const listMenu = document.querySelectorAll(".menu li");
    const listBox = document.querySelectorAll(".main-content .box");
    listMenu.forEach((e, i) => {
        e.addEventListener("click", () => {
            listBox.forEach(e => e.style.display = "none");
            listBox[i].style.display = "block";
        });
    });



    document.getElementById("userAvatar").addEventListener("click", () => {
        document.getElementById("userDropdown").classList.toggle("d-none");
    });

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        // Gán avatar
        const avatarImg = document.getElementById("userAvatar");
        avatarImg.src = currentUser.avatar;

        // Gán thông tin user vào dropdown (KHÔNG thêm logoutBtn nếu đã có ngoài HTML)
        const userDropdown = document.getElementById("userDropdown");
        userDropdown.innerHTML = `
            <p><strong>Username:</strong> ${currentUser.username}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <hr>
            <button class="btn btn-sm btn-outline-danger w-100" id="logoutUserBtn">Logout</button>
        `;

        // Bắt sự kiện Logout
        document.getElementById("logoutUserBtn").addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "LoginAndSignup.html";
        });

    } else {
        window.location.href = "LoginAndSignup.html";
    }




    async function loadDashboard() {
        const tables = await getAll(URL_TABLE);
        const orders = await getAll(URL_ORDER);
        const dishes = await getAll(URL_DISH);

        // Tổng bàn
        document.getElementById("totalTables").innerText = tables.length;

        // Số bàn đang hoạt động
        const activeTables = tables.filter(t => t.status == true).length;
        document.getElementById("activeTables").innerText = activeTables;

        // Đơn chưa thanh toán
        const unpaidOrders = orders.filter(o => o.status === "unpaid").length;
        document.getElementById("unpaidOrders").innerText = unpaidOrders;

        // Doanh thu hôm nay
        let todayRevenue = 0;
        const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        orders.forEach(order => {
            if (order.status === "paid" && order.paidAt?.startsWith(today)) {
                order.bill.forEach(item => {
                    const food = dishes.find(d => d.id == item.idFood);
                    if (food) {
                        todayRevenue += food.price * item.quantity;
                    }
                });
            }
        });
        document.getElementById("todayRevenue").innerText = todayRevenue.toLocaleString() + " VND";
    }

    loadDashboard();

});
