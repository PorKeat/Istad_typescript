"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProducts = renderProducts;
const api_1 = require("../api");
const Skeleton_1 = require("../components/Skeleton");
async function renderProducts() {
    const products = await (0, api_1.fetchProducts)();
    const container = document.createElement("div");
    let filteredProducts = [...products];
    let currentSort = "featured";
    container.innerHTML = `
    <main class="min-h-screen bg-white">
      <!-- Header Section -->
      <section class="bg-black text-white py-16">
        <div class="container mx-auto px-6 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            All Products
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our complete collection of premium products at unbeatable prices
          </p>
          <div class="mt-6 w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="bg-gray-50 py-8 border-b">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-4">
              <span id="product-count" class="text-gray-600 font-medium">
                ${products.length} Products
              </span>
            </div>
            <div class="flex items-center gap-4">
              <select id="sort-select" class="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="py-16 bg-gray-50 relative">
        <div class="container mx-auto px-6">
          <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            ${renderProductCards(filteredProducts)}
          </div>
        </div>

        <!-- Background Decorations -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 -left-20 w-40 h-40 bg-gray-200/50 rounded-full blur-3xl"></div>
          <div class="absolute bottom-1/4 -right-20 w-60 h-60 bg-gray-300/50 rounded-full blur-3xl"></div>
        </div>
      </section>

      <!-- Back to Home Section -->
      <section class="bg-black text-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h3 class="text-2xl font-bold mb-4">Explore More</h3>
          <p class="text-gray-300 mb-6">Check out our featured products and special offers</p>
          <a href="/" class="inline-flex items-center bg-white text-black py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            Back to Home
          </a>
        </div>
      </section>
    </main>
  `;
    const productsGrid = container.querySelector("#products-grid");
    if (productsGrid) {
        const skeleton = (0, Skeleton_1.ProductSkeletonGrid)();
        productsGrid.appendChild(skeleton);
    }
    function sortProducts(products, sortBy) {
        const sorted = [...products];
        switch (sortBy) {
            case "price-low":
                return sorted.sort((a, b) => {
                    const priceA = a.price * (1 - a.discountPercentage / 100);
                    const priceB = b.price * (1 - b.discountPercentage / 100);
                    return priceA - priceB;
                });
            case "price-high":
                return sorted.sort((a, b) => {
                    const priceA = a.price * (1 - a.discountPercentage / 100);
                    const priceB = b.price * (1 - b.discountPercentage / 100);
                    return priceB - priceA;
                });
            case "rating":
                return sorted.sort((a, b) => (b.rating || 4) - (a.rating || 4));
            case "discount":
                return sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
            default:
                return sorted;
        }
    }
    function renderProductCards(productList) {
        return productList
            .map((product) => `
        <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200">
          <a href="/details?id=${product.id}" class="block">
            <div class="relative overflow-hidden">
              <img 
                src="${product.images[0]}" 
                alt="${product.title}" 
                class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                ${Math.round(product.discountPercentage)}% OFF
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-black font-medium text-sm uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                  ${product.brand}
                </span>
                <div class="flex text-black">
                  ${"★".repeat(Math.floor(product.rating || 4))}${"☆".repeat(5 - Math.floor(product.rating || 4))}
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-black transition-colors">
                ${product.title}
              </h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <p class="text-2xl font-bold text-black">
                    ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                  <del class="text-gray-400 text-lg">
                    ${product.price.toFixed(2)}
                  </del>
                </div>
                <button class="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </a>
        </div>
      `)
            .join("");
    }
    function updateProductDisplay() {
        const productsGrid = container.querySelector("#products-grid");
        const productCount = container.querySelector("#product-count");
        if (productsGrid && productCount) {
            productsGrid.innerHTML = renderProductCards(filteredProducts);
            productCount.textContent = `${filteredProducts.length} Products`;
        }
    }
    setTimeout(() => {
        const sortSelect = container.querySelector("#sort-select");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                const target = e.target;
                currentSort = target.value;
                filteredProducts = sortProducts(products, currentSort);
                updateProductDisplay();
            });
        }
    }, 0);
    return container;
}
