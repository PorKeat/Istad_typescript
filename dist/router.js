"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouter = initRouter;
const home_1 = require("./pages/home");
const products_1 = require("./pages/products");
const notfound_1 = require("./pages/notfound");
const details_1 = require("./pages/details");
const layout_1 = require("./layout");
function initRouter() {
    window.addEventListener("popstate", renderRoute);
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "A" && target.hasAttribute("data-link")) {
            e.preventDefault();
            const href = target.getAttribute("href");
            history.pushState(null, "", href);
            renderRoute();
        }
    });
    renderRoute();
}
async function renderRoute() {
    const pathname = window.location.pathname;
    let content;
    switch (pathname) {
        case "/":
            content = (0, home_1.renderHome)();
            break;
        case "/products":
            content = await (0, products_1.renderProducts)();
            break;
        case "/details":
            content = (0, details_1.renderDetails)();
            break;
        default:
            content = (0, notfound_1.renderNotFound)();
            break;
    }
    (0, layout_1.createLayout)(() => content);
}
