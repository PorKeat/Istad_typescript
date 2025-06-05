"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = Navbar;
function Navbar() {
    const header = document.createElement("header");
    header.className = "bg-blue-900 text-white";
    header.innerHTML = `
    <h1>Header</h1>
  `;
    return header;
}
