/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
// Калькулятор каллорий

let sex, height, weight, age, active;
if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");

} else {
    sex = "female";
    localStorage.setItem("sex", "female");
}
if (localStorage.getItem("data-active")) {
    active = localStorage.getItem("data-active");
} else {
    active = 1.375;
    localStorage.setItem("data-active", 1.375);
}
firstLoad();
function firstLoad() {
    document.querySelectorAll(`#gender div`).forEach(e => {
        e.classList.remove("calculating__choose-item_active");
        if (e.getAttribute("id") === localStorage.getItem("sex")) {
            e.classList.add("calculating__choose-item_active");
        }
    });
    document.querySelector(`#${sex}`).classList.add("calculating__choose-item_active");
    document.querySelectorAll(`.calculating__choose_big div`).forEach(e => {
        e.classList.remove("calculating__choose-item_active");
        if (e.getAttribute("data-active") === localStorage.getItem("data-active")) {
            e.classList.add("calculating__choose-item_active");
        }
    });


}




const result = document.querySelector(".calculating__result span");

calcTotal();

function calcTotal() {
    if (!sex || !height || !weight || !age || !active) {
        result.textContent = 0;
        return; // обязательно
    } else {
        if (sex == "male") {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * active);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * active);
        }
    }
}


function getStaticInformaton(parentElement, activeClass) {
    let input = document.querySelectorAll(`${parentElement} div`);

    input.forEach(btn => {
        btn.addEventListener("click", e => {
            if (e.target.getAttribute("data-active")) {
                active = e.target.getAttribute("data-active");
                input.forEach(el => el.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                localStorage.setItem("data-active", e.target.getAttribute("data-active"));
                calcTotal();
            } else {
                sex = e.target.getAttribute("id");
                input.forEach(el => el.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                localStorage.setItem("sex", e.target.getAttribute("id"));
                calcTotal();
            }
        });
    });
}
getStaticInformaton("#gender", "calculating__choose-item_active");
getStaticInformaton(".calculating__choose_big", "calculating__choose-item_active");

function getDinamycInformation(selector) {

    let input = document.querySelector(selector);

    input.addEventListener("input", () => {
        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = "none";
        }
        switch (input.getAttribute("id")) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }
        calcTotal();
    });

}

getDinamycInformation("#height");
getDinamycInformation("#weight");
getDinamycInformation("#age");



}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
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
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status} `);
        }
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


}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {
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

            // let jsonRequest = {};
            // formData.forEach((item, key) => {
            //     jsonRequest[key] = item;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
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

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // слайдер

    const nextBtn = document.querySelector(".offer__slider-next");
    const prevBtn = document.querySelector(".offer__slider-prev");
    const slides = document.querySelectorAll(".offer__slide");
    document.querySelector("#total").textContent = getZero(slides.length);
    let actingSlide = 0;
    document.querySelector("#current").textContent = getZero((actingSlide + 1));

    // showSlide(0);
    // function showSlide(numberOfSlide) {
    //     slides.forEach(slide => slide.classList.add("hide"));
    //     slides.forEach(slide => slide.classList.remove("fade"));
    //     slides[numberOfSlide].classList.remove("hide");
    //     slides[numberOfSlide].classList.add("fade");
    //     slides[numberOfSlide].classList.add("show");
    // }


    // nextBtn.addEventListener("click", () => {
    //     actingSlide++;
    //     if (actingSlide > 3) {
    //         actingSlide = 0;
    //     }
    //     showSlide(actingSlide);
    //     document.querySelector("#current").textContent = getZero((actingSlide + 1));

    // });

    // prevBtn.addEventListener("click", () => {
    //     actingSlide--;
    //     if (actingSlide < 0) {
    //         actingSlide = 3;
    //     }
    //     showSlide(actingSlide);
    //     document.querySelector("#current").textContent = getZero((actingSlide + 1));

    // });


    // слайдер (второй вариант)
    const slider = document.querySelector(".offer__slider");
    const slidesWraper = document.querySelector(".offer__slider-wrapper");
    const slidesField = document.querySelector(".offer__slider-inner");
    const width = window.getComputedStyle(slidesWraper).width;
    slidesField.style.width = 100 * slides.length + "%";

    let offset = 0;
    slides.forEach(slide => {
        slide.style.width = width;
    });
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWraper.style.overflow = "hidden";

    nextBtn.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        actingSlide++;
        if (actingSlide > 3) {
            actingSlide = 0;
        }
        dots.forEach(el => el.style.opacity = "0.5");
        dots[actingSlide].style.opacity = "1";
        document.querySelector("#current").textContent = getZero((actingSlide + 1));


    });
    prevBtn.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        actingSlide--;
        if (actingSlide < 0) {
            actingSlide = 3;
        }
        dots.forEach(el => el.style.opacity = "0.5");
        dots[actingSlide].style.opacity = "1";
        document.querySelector("#current").textContent = getZero((actingSlide + 1));


    });

    // навигация слайдера (точки)

    slider.style.position = "relative";
    let dots = [];
    let indicators = document.createElement("ol");
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i);
        dot.classList.add("dot");
        indicators.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = "1";
        }
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (element) => {
            //let slideIndex = i;
            let slideIndex = element.target.getAttribute("data-slide-to");
            offset = +width.slice(0, width.length - 2) * slideIndex;
            slidesField.style.transform = `translateX(-${offset}px)`;
            dots.forEach(el => el.style.opacity = "0.5");
            element.target.style.opacity = "1";
            document.querySelector("#current").textContent = getZero((+slideIndex + 1));
        });
    });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

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


    }
    setClock(endtime);

    function getZero(i) {
        if (i >= 10 && i < 0) {
            return i;
        } else {
            return `0${i}`;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', function () {



    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map