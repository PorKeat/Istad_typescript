"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHome = renderHome;
const api_1 = require("../api");
async function renderHome() {
    const products = await (0, api_1.fetchProducts)();
    const div = document.createElement("div");
    const productCards = products
        .slice(0, 8)
        .map((product) => `
        <div class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700">
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
                <span class="text-black dark:text-white font-medium text-sm uppercase tracking-wider bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  ${product.brand}
                </span>
                <div class="flex text-black dark:text-yellow-400">
                  ${"★".repeat(Math.floor(product.rating || 4))}${"☆".repeat(5 - Math.floor(product.rating || 4))}
                </div>
              </div>

              <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                ${product.title}
              </h3>

              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <p class="text-2xl font-bold text-black dark:text-white">
                    ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                  <del class="text-gray-400 dark:text-gray-500 text-lg">
                    ${product.price.toFixed(2)}
                  </del>
                </div>

                <button class="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700">
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
    div.innerHTML = `
    <main class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <!-- Hero Section -->
      <section class="relative w-full mx-auto flex items-center bg-cover bg-center overflow-hidden"
               style="background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc'); height: 60vh;">
        <div class="relative container mx-auto px-6 text-center">
          <h1 class="text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
            Discover Amazing
            <span class="text-white underline decoration-4 underline-offset-8">
              Products
            </span>
          </h1>
          <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Stripy Zig Zag Jigsaw Pillow and Duvet Set - Transform your bedroom into a cozy sanctuary
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a class="bg-white text-black py-4 px-8 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg" href="/products">
              Shop Now
            </a>
            <a class="bg-transparent border-2 border-white text-white py-4 px-8 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300" href="#">
              Learn More
            </a>
          </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      <!-- Products Section -->
      <section class="py-16 relative bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div class="container mx-auto px-6">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Featured 
              <span class="underline decoration-4 underline-offset-8">
                Collection
              </span>
            </h2>
            <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium products at unbeatable prices
            </p>
            <div class="mt-6 w-24 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            ${productCards}
          </div>

          <!-- Call to Action -->
          <div class="text-center mt-16">
            <a href="/products" class="inline-flex items-center bg-black text-white py-4 px-8 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop All Products
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Background Decorations -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 -left-20 w-40 h-40 bg-gray-200/50 dark:bg-gray-700/40 rounded-full blur-3xl"></div>
          <div class="absolute bottom-1/4 -right-20 w-60 h-60 bg-gray-300/50 dark:bg-gray-600/40 rounded-full blur-3xl"></div>
        </div>
      </section>
    </main>
  `;
    return div;
}
