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
export default calc;