"use strict";


// Табы 
const headerList = document.querySelector(".tabheader__items");
const tabItems = document.querySelectorAll(".tabheader__item");
const container = document.querySelector(".tabcontainer");
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


// Обратный таймер

const endtime = `2021-12-27 15:01`;
function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor(t / (1000 * 60 * 60) % 24);
    let minutes = Math.floor(t / (1000 * 60) % 60);
    let seconds = Math.floor(t / 1000 % 60);

    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}


function setClock(endtime) {
    let timer = document.querySelector(".timer");
    let days = timer.querySelector("#days");
    let hours = timer.querySelector("#hours");
    let minutes = timer.querySelector("#minutes");
    let seconds = timer.querySelector("#seconds");
    let interval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
        let t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        if (t.total <= 0) {
            clearInterval(interval);
            days.innerHTML = "00";
            hours.innerHTML = "00";
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
        }
    }

    function getZero(i) {
        if (i >= 10 && i < 0) {
            return i;
        } else {
            return `0${i}`;
        }
    }
}
setClock(endtime);


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
    if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
        openModal();
    }
});

window.addEventListener("keydown", (k) => {
    if (modal.style.display == "block" && k.code === "Escape") {
        closeModal();
    }
});

let timeoutOpenModal = setTimeout(openModal, 999999000);

// создание карточек

class Card {
    constructor(image, alt, menuName, descripton, price, ...classes) {
        this.image = image;
        this.alt = alt;
        this.menuName = menuName;
        this.descripton = descripton;
        this.price = price;
        this.classes = classes;
        this.transfer = 2.5;
        this.changeToUsd();
    }
    insertCard() {
        const cardsContainer = document.querySelector(".menu__field .container");
        let element = document.createElement("div");

        //div.classList.add("menu__item");
        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        cardsContainer.append(element);
        element.innerHTML = ` 
        <img src=${this.image} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.menuName}</h3>
        <div class="menu__item-descr">${this.descripton}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> $/день</div>
        `;

    }

    changeToUsd(price) {
        this.price = this.price / this.transfer;
    }

}

// fetch('db.json')
//     .then(data => data.json())
//     .then(res => {
//         res.menu.forEach(({ img, altimg, title, descr, price }) => {
//             new Card(img, altimg, title, descr, price).insertCard();
//         });
//     }); // без Json-server

const getResourse = async (url) => {
    const res = await fetch(url);
    return await res.json();
};

getResourse('http://localhost:3000/menu')
    // fetch('http://localhost:3000/menu')
    //.then(data => data.json())
    .then(res => {
        res.forEach(({ img, altimg, title, descr, price }) => {
            new Card(img, altimg, title, descr, price).insertCard();
        });
    });


// отправка данных на сервер

const forms = document.querySelectorAll('form');
forms.forEach(e => {
    bindPostData(e);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

function bindPostData(form) {
    form.addEventListener("submit", element => {
        element.preventDefault();
        let message = {
            loading: "img/form/spinner.svg",
            success: "отправлено",
            failure: "ошибка"
        };
        let statusMessage = document.createElement("img");

        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        //form.append(statusMessage);
        form.insertAdjacentElement("afterend", statusMessage);
        // statusMessage.classList.add('status');
        // statusMessage.textContent = message.loading;
        // form.appendChild(statusMessage);
        const formData = new FormData(form);
        let jsonRequest = {};
        formData.forEach((item, key) => {
            jsonRequest[key] = item;
        });



        postData("http://localhost:3000/requests", JSON.stringify(jsonRequest))
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                console.log("Fail");
            }).finally(() => {
                form.reset();
            });

        // const request = new XMLHttpRequest();
        // request.open("POST", "server.php");
        // request.setRequestHeader("Content-type", 'applcaton/json');



        // let jsonRequest = {};
        // formData.forEach((item, key) => {
        //     jsonRequest[key] = item;
        // });    
        //request.send(JSON.stringify(jsonRequest));

        // request.addEventListener("load", () => {
        //     if (request.status == 200) {
        //         console.log(request.response);
        //         showThanksModal();
        //         statusMessage.textContent = message.success;
        //         form.reset();
        //         setTimeout(() => {
        //             statusMessage.remove();
        //         }, 2000);
        //         //setTimeout(closeModal, 1000);
        //     } else {
        //         statusMessage.textContent = message.failure;
        //         form.append(statusMessage);
        //         console.log("Fail");
        //     }
        // });
    }

    );
}


function showThanksModal(messageText) {
    let previousModal = document.querySelector(".modal__content");
    previousModal.classList.add("hide");
    openModal();
    let thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__content");
    thanksModal.innerHTML = `
<form action="#">
<div class="modal__close">&times;</div>
<div class="modal__title">${messageText}</div>
</form>
`;
    document.querySelector(".modal .modal__dialog").append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        previousModal.classList.remove("hide");
        previousModal.classList.add("show");
        closeModal();
    }, 3000);
}

// fetch('db.json')
//     .then(data => data.json())
//     .then(res => console.log(res.menu));