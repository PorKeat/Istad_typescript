"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRouter = initRouter;
exports.renderRoute = renderRoute;
const home_1 = require("./pages/home");
const products_1 = require("./pages/products");
const notfound_1 = require("./pages/notfound");
const details_1 = require("./pages/details");
const layout_1 = require("./layout");
function initRouter() {
    window.addEventListener("popstate", renderRoute);
    window.addEventListener("navigate", (e) => {
        const customEvent = e;
        console.log("Navigation details:", customEvent.detail);
        renderRoute();
    });
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
    const searchParams = new URLSearchParams(window.location.search);
    let content;
    try {
        switch (pathname) {
            case "/":
                content = await (0, home_1.renderHome)();
                break;
            case "/products":
                content = await (0, products_1.renderProducts)();
                break;
            case "/details":
                content = await (0, details_1.renderProductDetails)();
                break;
            default:
                if (pathname.startsWith("/products/")) {
                    content = await (0, details_1.renderProductDetails)();
                }
                else {
                    content = (0, notfound_1.renderNotFound)();
                }
                break;
        }
        (0, layout_1.createLayout)(() => content);
    }
    catch (error) {
        console.error("Error rendering route:", error);
        content = (0, notfound_1.renderNotFound)();
        (0, layout_1.createLayout)(() => content);
    }
}
