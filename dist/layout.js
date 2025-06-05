"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLayout = createLayout;
const Navbar_1 = require("./components/Navbar");
const Footer_1 = require("./components/Footer");
function createLayout(contentFn) {
    const app = document.getElementById("app");
    app.innerHTML = "";
    const header = (0, Navbar_1.Navbar)();
    const content = contentFn();
    const footer = (0, Footer_1.Footer)();
    app.append(header, content, footer);
}
