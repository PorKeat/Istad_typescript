"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProductDetails = renderProductDetails;
const api_1 = require("../api");
async function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const createErrorDiv = (title, message, retry = false) => {
        const errorDiv = document.createElement("div");
        errorDiv.className =
            "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900";
        errorDiv.innerHTML = `
      <div class="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-md">
        <div class="text-4xl mb-6">${retry ? "⚠️" : "🔍"}</div>
        <h2 class="text-2xl font-bold text-black dark:text-white mb-4">${title}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
        ${retry
            ? `<button onclick="window.location.reload()" class="px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300">
                Retry
              </button>`
            : `<a href="/products" class="inline-block px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300">
                Browse Products
              </a>`}
      </div>
    `;
        return errorDiv;
    };
    if (!productId) {
        return createErrorDiv("Product Not Found", "Product ID is missing in URL.");
    }
    try {
        const product = await (0, api_1.fetchProductById)(Number(productId));
        const container = document.createElement("div");
        container.className = "min-h-screen bg-gray-50 dark:bg-gray-900 py-8";
        const style = document.createElement("style");
        style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeIn 0.6s ease-out; }
      .image-hover {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .image-hover:hover {
        transform: scale(1.02);
      }
      .btn-hover {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .btn-hover:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      .card-shadow {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .card-shadow:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                    0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
    `;
        document.head.appendChild(style);
        const content = document.createElement("div");
        content.className = "max-w-6xl mx-auto px-6 fade-in";
        const backLink = document.createElement("a");
        backLink.href = "/products";
        backLink.className =
            "inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-8 transition-colors duration-300";
        backLink.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span class="font-medium">Back</span>
    `;
        content.appendChild(backLink);
        const productCard = document.createElement("div");
        productCard.className =
            "bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 card-shadow transition-all duration-500";
        const productGrid = document.createElement("div");
        productGrid.className = "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16";
        const imageSection = document.createElement("div");
        imageSection.className = "space-y-6";
        const mainImage = document.createElement("img");
        mainImage.src = product.images?.[0] || "/placeholder-image.jpg";
        mainImage.alt = product.title;
        mainImage.className =
            "w-full h-96 lg:h-[500px] rounded-2xl object-cover image-hover border border-gray-100 dark:border-gray-700";
        const thumbnailGrid = document.createElement("div");
        thumbnailGrid.className = "flex gap-4 justify-center";
        if (product.images && product.images.length > 1) {
            product.images.slice(0, 4).forEach((imgSrc, index) => {
                const thumb = document.createElement("img");
                thumb.src = imgSrc;
                thumb.alt = `${product.title} ${index + 1}`;
                thumb.className =
                    "w-16 h-16 rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-black dark:border-gray-600 dark:hover:border-white";
                thumb.onclick = () => {
                    mainImage.src = imgSrc;
                };
                thumbnailGrid.appendChild(thumb);
            });
        }
        imageSection.appendChild(mainImage);
        if (product.images && product.images.length > 1) {
            imageSection.appendChild(thumbnailGrid);
        }
        const info = document.createElement("div");
        info.className = "space-y-8";
        const originalPrice = product.discountPercentage
            ? product.price / (1 - product.discountPercentage / 100)
            : product.price;
        const savings = originalPrice - product.price;
        const rating = product.rating || 4.2;
        const fullStars = Math.floor(rating);
        const starsHTML = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
        info.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-medium rounded-full">
            ${product.brand || "Premium"}
          </span>
          <div class="flex items-center gap-2">
            <span class="text-black dark:text-white text-lg">${starsHTML}</span>
            <span class="text-gray-500 dark:text-gray-400 text-sm">(${rating})</span>
          </div>
        </div>

        <h1 class="text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
          ${product.title}
        </h1>

        <div class="space-y-2">
          <div class="flex items-baseline gap-4">
            <span class="text-4xl font-bold text-black dark:text-white">$${product.price.toFixed(2)}</span>
            ${savings > 0
            ? `<span class="text-xl text-gray-400 dark:text-gray-500 line-through">$${originalPrice.toFixed(2)}</span>`
            : ""}
          </div>
          ${savings > 0
            ? `<p class="text-sm text-gray-600 dark:text-gray-400">Save $${savings.toFixed(2)} (${product.discountPercentage.toFixed(0)}% off)</p>`
            : ""}
        </div>
      </div>

      <div class="border-t border-gray-100 dark:border-gray-700 pt-8">
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          ${product.description}
        </p>
      </div>

      <div class="border-t border-gray-100 dark:border-gray-700 pt-8 space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700">
            <button class="quantity-btn px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-l-xl" data-action="decrease">−</button>
            <span class="quantity-display px-6 py-3 font-medium text-black dark:text-white bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-600">1</span>
            <button class="quantity-btn px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 rounded-r-xl" data-action="increase">+</button>
          </div>
          <div class="text-black dark:text-white font-medium flex items-center gap-2">
            <div class="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
            <span>In Stock</span>
          </div>
        </div>
        
        <div class="space-y-4">
          <button class="add-to-cart-btn w-full py-4 px-8 bg-black text-white font-semibold text-lg rounded-2xl btn-hover">
            Add to Cart
          </button>
          
          <button class="w-full py-4 px-8 border-2 border-gray-200 dark:border-gray-600 text-black dark:text-white font-medium rounded-2xl hover:border-black dark:hover:border-white transition-all duration-300">
            Add to Wishlist
          </button>
        </div>

        <div class="text-center pt-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Secure checkout • Free shipping • Easy returns
          </p>
        </div>
      </div>
    `;
        productGrid.appendChild(imageSection);
        productGrid.appendChild(info);
        productCard.appendChild(productGrid);
        content.appendChild(productCard);
        container.appendChild(content);
        setTimeout(() => {
            const quantityDisplay = container.querySelector(".quantity-display");
            const quantityBtns = container.querySelectorAll(".quantity-btn");
            let quantity = 1;
            quantityBtns.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const action = e.target.dataset.action;
                    if (action === "increase") {
                        quantity++;
                    }
                    else if (action === "decrease" && quantity > 1) {
                        quantity--;
                    }
                    if (quantityDisplay)
                        quantityDisplay.textContent = quantity.toString();
                });
            });
            const addToCartBtn = container.querySelector(".add-to-cart-btn");
            addToCartBtn?.addEventListener("click", () => {
                addToCartBtn.textContent = "Adding...";
                addToCartBtn.classList.add("opacity-75");
                setTimeout(() => {
                    addToCartBtn.textContent = "Added to Cart!";
                    addToCartBtn.classList.remove("opacity-75");
                    addToCartBtn.classList.add("bg-gray-800", "dark:bg-gray-700");
                    setTimeout(() => {
                        addToCartBtn.textContent = "Add to Cart";
                        addToCartBtn.classList.remove("bg-gray-800", "dark:bg-gray-700");
                    }, 2000);
                }, 800);
            });
        }, 100);
        return container;
    }
    catch (error) {
        return createErrorDiv("Error Loading Product", "Please try again later.", true);
    }
}
