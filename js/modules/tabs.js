function tabs() {
    // Табы 
    const headerList = document.querySelector(".tabheader__items");
    const tabItems = document.querySelectorAll(".tabheader__item");
    const imgHam = document.querySelectorAll(".tabcontainer img")[3];
    const tabs = document.querySelectorAll(".tabcontent");

    imgHam.src = "img/tabs/hamburger.jpg";
    // tabs[3].innerHTML = `
    // <img src="img/tabs/hamburger.jpg" alt="vegy">
    // <div class="tabcontent__descr">
    //     Меню "Сбалансированное" - это соответствие вашего рациона всем научным рекомендациям. Мы
    //     тщательно просчитываем вашу потребность в к/б/ж/у и создаем лучшие блюда для вас.
    // </div>`;

    tabs[1].style.display = "none";

    openTab();
    function openTab(i = 0) {
        tabs.forEach(k => {
            k.style.display = "none";
            k.classList.remove("fade");
        });
        tabs[i].classList.add("fade");
        tabs[i].classList.add("show");
        tabs[i].style.display = "block";
    }

    headerList.addEventListener("click", e => {
        if (e.target && e.target.classList.contains("tabheader__item")) {
            tabItems.forEach((element, i) => {
                if (element == e.target) {
                    tabItems.forEach(item => {
                        item.classList.remove("tabheader__item_active");
                    });
                    e.target.classList.add("tabheader__item_active");
                    openTab(i);
                }
            });
        }
    });
    // tabItems.forEach((e, k) => {
    //     e.addEventListener("click", el => {
    //         tabItems.forEach(item => {
    //             item.classList.remove("tabheader__item_active");
    //         });
    //         console.log(k);
    //         el.target.classList.add("tabheader__item_active");
    //         openTab(k);
    //     });
    // });

}

export default tabs;