require('es7-object-polyfill');
import 'formdata-polyfill';
import 'dom-node-polyfills';
import 'whatwg-fetch';
import 'core-js/stable/symbol';
import 'core-js/actual/promise';
var Promise = require('es6-promise-polyfill').Promise;
import 'nodelist-foreach-polyfill';
import 'core-js/es/object';

//"use strict";
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
    timer(".timer", `2022-01-27 15:01`);
    modal("[data-modal]", ".modal", timeoutOpenModal);
    forms(timeoutOpenModal);
    cards();
    calc();
    slider({
        everySlide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        previousArrow: ".offer__slider-prev",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
        container: ".offer__slider",
        totalCouner: "#total",
        currentCounter: "#current"
    });

});