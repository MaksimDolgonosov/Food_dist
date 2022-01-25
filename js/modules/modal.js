function openModal(modalSelector, timeoutOpenModal) {
    let modal = document.querySelector(modalSelector);
    modal.style.display = "block";
    modal.classList.add("fade");
    document.body.style.overflow = "hidden";
    if (timeoutOpenModal) {
        clearTimeout(timeoutOpenModal);
    }
}
function closeModal(modalSelector) {
    let modal = document.querySelector(modalSelector);
    modal.classList.remove("fade");
    modal.style.display = "none";
    document.body.style.overflow = "";
}

function modal(btnsOpeSelector, modalSelector, timeoutOpenModal) {
    // Открытие модального окна
    const btnsOpen = document.querySelectorAll(btnsOpeSelector);
    const modal = document.querySelector(modalSelector);

    modal.addEventListener("click", e => {
        if (e.target == modal || e.target.classList.contains("modal__close")) {
            closeModal(modalSelector);
        }
    });

    btnsOpen.forEach(e => {
        e.addEventListener("click", () => openModal(modalSelector, timeoutOpenModal));
    });

    //btnClose.addEventListener("click", closeModal);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, timeoutOpenModal);
        }
    });




    window.addEventListener("keydown", (k) => {
        if (modal.style.display == "block" && k.code === "Escape") {
            closeModal(modalSelector);
        }
    });




}
export default modal;
export { openModal };
export { closeModal };