
"use strict";
window.addEventListener('DOMContentLoaded', function () {

    const tabs = require("./modules/tabs");
    const timer = require("./modules/timer");
    const modal = require("./modules/modal");
    const forms = require("./modules/forms");
    const cards = require("./modules/cards");
    const slider = require("./modules/slider");
    const calc = require("./modules/calc");

    tabs();
    timer();
    modal();
    forms();
    cards();
    calc();
    slider();

});