import { getResourse } from "../services/services";

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





    getResourse('http://localhost:3000/menu')
        // fetch('http://localhost:3000/menu')
        //.then(data => data.json())
        .then(res => {
            res.forEach(({ img, altimg, title, descr, price }) => {
                new Card(img, altimg, title, descr, price).insertCard();
            });
        });


}
export default cards;