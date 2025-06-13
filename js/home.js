const getItem = document.querySelectorAll(".item")
const left_icon = document.querySelector(".left-icon")
const hideMenu = document.querySelector(".menu")

left_icon.addEventListener("click", () => {
    getItem.forEach(e => e.classList.toggle("d-none"))
    hideMenu.classList.toggle("none")
})



const userAvatar = document.getElementById("userAvatar")
const userDropdown = document.getElementById("userDropdown")

userAvatar.addEventListener("click", () => {
    userDropdown.classList.toggle("d-none")
})