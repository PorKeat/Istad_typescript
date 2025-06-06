import { fetchProductById } from "../api";

export async function renderProductDetails(): Promise<HTMLElement> {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "min-h-screen flex items-center justify-center bg-gray-50";
    errorDiv.innerHTML = `
      <div class="text-center p-12 bg-white rounded-3xl shadow-lg border border-gray-100 max-w-md">
        <div class="text-4xl mb-6">🔍</div>
        <h2 class="text-2xl font-bold text-black mb-4">Product Not Found</h2>
        <p class="text-gray-600 mb-6">Product ID is missing in URL.</p>
        <a href="/products" class="inline-block px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all duration-300">
          Browse Products
        </a>
      </div>
    `;
    return errorDiv;
  }

  try {
    const product = await fetchProductById(Number(productId));

    const container = document.createElement("div");
    container.className = "min-h-screen bg-gray-50 py-8";

    // Add minimal styles
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
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .card-shadow:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
    `;
    document.head.appendChild(style);

    const content = document.createElement("div");
    content.className = "max-w-6xl mx-auto px-6 fade-in";

    // Minimal back button
    const backLink = document.createElement("a");
    backLink.href = "/products";
    backLink.className =
      "inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors duration-300";
    backLink.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span class="font-medium">Back</span>
    `;
    content.appendChild(backLink);

    // Main product card
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white rounded-3xl p-8 lg:p-12 card-shadow transition-all duration-500";

    const productGrid = document.createElement("div");
    productGrid.className = "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16";

    // Image section - clean and minimal
    const imageSection = document.createElement("div");
    imageSection.className = "space-y-6";

    const mainImage = document.createElement("img");
    mainImage.src = product.images?.[0] || "/placeholder-image.jpg";
    mainImage.alt = product.title;
    mainImage.className =
      "w-full h-96 lg:h-[500px] rounded-2xl object-cover image-hover border border-gray-100";

    // Simple thumbnail grid
    const thumbnailGrid = document.createElement("div");
    thumbnailGrid.className = "flex gap-4 justify-center";

    if (product.images && product.images.length > 1) {
      product.images.slice(0, 4).forEach((imgSrc: string, index: number) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `${product.title} ${index + 1}`;
        thumb.className =
          "w-16 h-16 rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-black";
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

    // Product info - clean typography
    const info = document.createElement("div");
    info.className = "space-y-8";

    // Calculate pricing
    const originalPrice = product.discountPercentage
      ? product.price / (1 - product.discountPercentage / 100)
      : product.price;
    const savings = originalPrice - product.price;

    // Generate rating
    const rating = product.rating || 4.2;
    const fullStars = Math.floor(rating);
    const starsHTML = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

    info.innerHTML = `
      <!-- Header section -->
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <span class="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            ${product.brand || "Premium"}
          </span>
          <div class="flex items-center gap-2">
            <span class="text-black text-lg">${starsHTML}</span>
            <span class="text-gray-500 text-sm">(${rating})</span>
          </div>
        </div>

        <h1 class="text-4xl lg:text-5xl font-bold text-black leading-tight">
          ${product.title}
        </h1>

        <div class="space-y-2">
          <div class="flex items-baseline gap-4">
            <span class="text-4xl font-bold text-black">$${product.price.toFixed(
              2
            )}</span>
            ${
              savings > 0
                ? `
              <span class="text-xl text-gray-400 line-through">$${originalPrice.toFixed(
                2
              )}</span>
            `
                : ""
            }
          </div>
          ${
            savings > 0
              ? `
            <p class="text-sm text-gray-600">Save $${savings.toFixed(
              2
            )} (${product.discountPercentage.toFixed(0)}% off)</p>
          `
              : ""
          }
        </div>
      </div>

      <!-- Description -->
      <div class="border-t border-gray-100 pt-8">
        <p class="text-lg text-gray-700 leading-relaxed">
          ${product.description}
        </p>
      </div>

      <!-- Purchase section -->
      <div class="border-t border-gray-100 pt-8 space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50">
            <button class="quantity-btn px-4 py-3 text-black hover:bg-gray-100 transition-colors duration-200 rounded-l-xl" data-action="decrease">−</button>
            <span class="quantity-display px-6 py-3 font-medium text-black bg-white border-x border-gray-200">1</span>
            <button class="quantity-btn px-4 py-3 text-black hover:bg-gray-100 transition-colors duration-200 rounded-r-xl" data-action="increase">+</button>
          </div>
          <div class="text-black font-medium flex items-center gap-2">
            <div class="w-2 h-2 bg-black rounded-full"></div>
            <span>In Stock</span>
          </div>
        </div>
        
        <div class="space-y-4">
          <button class="add-to-cart-btn w-full py-4 px-8 bg-black text-white font-semibold text-lg rounded-2xl btn-hover">
            Add to Cart
          </button>
          
          <button class="w-full py-4 px-8 border-2 border-gray-200 text-black font-medium rounded-2xl hover:border-black transition-all duration-300">
            Add to Wishlist
          </button>
        </div>

        <div class="text-center pt-4">
          <p class="text-sm text-gray-500">
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

    // Add interactivity
    setTimeout(() => {
      const quantityDisplay = container.querySelector(".quantity-display");
      const quantityBtns = container.querySelectorAll(".quantity-btn");
      let quantity = 1;

      quantityBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const action = (e.target as HTMLElement).dataset.action;
          if (action === "increase") {
            quantity++;
          } else if (action === "decrease" && quantity > 1) {
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
          addToCartBtn.classList.add("bg-gray-800");

          setTimeout(() => {
            addToCartBtn.textContent = "Add to Cart";
            addToCartBtn.classList.remove("bg-gray-800");
          }, 2000);
        }, 800);
      });
    }, 100);

    return container;
  } catch (error) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "min-h-screen flex items-center justify-center bg-gray-50";
    errorDiv.innerHTML = `
      <div class="text-center p-12 bg-white rounded-3xl shadow-lg border border-gray-100 max-w-md">
        <div class="text-4xl mb-6">⚠️</div>
        <h2 class="text-2xl font-bold text-black mb-4">Error Loading Product</h2>
        <p class="text-gray-600 mb-6">Please try again later.</p>
        <button onclick="window.location.reload()" class="px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all duration-300">
          Retry
        </button>
      </div>
    `;
    return errorDiv;
  }
}
