"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNotFound = renderNotFound;
function renderNotFound() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 transition-colors">
      <h1 class="text-8xl font-bold text-gray-800 dark:text-white">404</h1>
      <p class="text-4xl font-medium text-gray-800 dark:text-gray-300">Page Not Found</p>
      <a href="/" class="mt-4 text-xl text-blue-600 dark:text-blue-400 hover:underline">Go back home</a>
    </div>
  `;
    return div;
}
