"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProducts = renderProducts;
const api_1 = require("../api");
async function renderProducts() {
    const products = await (0, api_1.fetchProducts)();
    const container = document.createElement("div");
    container.className = "p-6";
    const title = document.createElement("h1");
    title.className = "text-3xl font-bold mb-6";
    title.textContent = "Product Page";
    const grid = document.createElement("div");
    grid.className =
        "w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5";
    products.forEach((product) => {
        const card = document.createElement("div");
        card.className =
            "bg-white rounded-2xl shadow p-4 hover:shadow-lg transition";
        card.innerHTML = `
        <div class="w-72 bg-white rounded-xl duration-500 hover:scale-105 ">
        <a href="#">
            <img src="${product.images}" alt="${product.title}" class="h-80 w-72 object-cover rounded-t-xl" />
            <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">${product.brand}</span>
                <p class="text-lg font-bold text-black truncate block capitalize">${product.title}</p>
                <div class="flex items-center">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">$${(product.price / product.discountPercentage).toFixed(2)}</p>
                    <del>
                        <p class="text-sm text-gray-600 cursor-auto ml-2">$${product.price}</p>
                    </del>
                    <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                </div>
            </div>
        </a>
    </div>
    `;
        grid.appendChild(card);
    });
    container.appendChild(title);
    container.appendChild(grid);
    return container;
}
