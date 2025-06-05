"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHome = renderHome;
function renderHome() {
    const div = document.createElement("div");
    div.innerHTML = `
    <a href="/products" data-link>ClickToProduct</a>
    <h1>HomePage</h1>
  `;
    return div;
}
