"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = Footer;
function Footer() {
    const footer = document.createElement("footer");
    footer.className =
        "bg-white dark:bg-gray-800 flex justify-center items-center w-full p-5";
    footer.innerHTML = `
    <h1>Footer</h1>
  `;
    return footer;
}
