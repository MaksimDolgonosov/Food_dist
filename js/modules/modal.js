function modal() {
    // Открытие модального окна

    const modal = document.querySelector(".modal");
    const btnsOpen = document.querySelectorAll("[data-modal]");
    //const btnClose = modal.querySelector(".modal__close");

    function openModal() {
        modal.style.display = "block";
        modal.classList.add("fade");
        document.body.style.overflow = "hidden";
        clearTimeout(timeoutOpenModal);
    }
    function closeModal() {
        modal.classList.remove("fade");
        modal.style.display = "none";
        document.body.style.overflow = "";
    }


    modal.addEventListener("click", e => {
        if (e.target == modal || e.target.classList.contains("modal__close")) {
            closeModal();
        }
    });

    btnsOpen.forEach(e => {
        e.addEventListener("click", openModal);
    });

    //btnClose.addEventListener("click", closeModal);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    });




    window.addEventListener("keydown", (k) => {
        if (modal.style.display == "block" && k.code === "Escape") {
            closeModal();
        }
    });

    let timeoutOpenModal = setTimeout(openModal, 999999000);


}
module.exports = modal;