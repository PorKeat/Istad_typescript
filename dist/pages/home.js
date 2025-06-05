"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHome = renderHome;
function renderHome() {
    const div = document.createElement("div");
    div.innerHTML = `
    <h1>HomePage</h1>
  `;
    return div;
}
