"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNotFound = renderNotFound;
function renderNotFound() {
    const div = document.createElement("div");
    div.innerHTML = `
    <h1>Page not found</h1>
  `;
    return div;
}
