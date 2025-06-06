"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNotFound = renderNotFound;
function renderNotFound() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
    <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-8xl font-bold text-gray-800">404</h1>
        <p class="text-4xl font-medium text-gray-800">Page Not Found</p>
        <a href="/" class="mt-4 text-xl text-blue-600 hover:underline">Go back home</a>
    </div>
    </div>
  `;
    return div;
}
