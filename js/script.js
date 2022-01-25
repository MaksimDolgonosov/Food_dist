
"use strict";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import forms from "./modules/forms";
import cards from "./modules/cards";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";
window.addEventListener('DOMContentLoaded', function () {


    const timeoutOpenModal = setTimeout(() => openModal(".modal", timeoutOpenModal), 3000);

    tabs();
    timer();
    modal("[data-modal]", ".modal", timeoutOpenModal);
    forms(timeoutOpenModal);
    cards();
    calc();
    slider();

});