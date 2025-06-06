"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = Navbar;
exports.navigateTo = navigateTo;
exports.handleSearch = handleSearch;
const api_1 = require("../api");
function Navbar() {
    const header = document.createElement("header");
    header.className =
        "sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow z-50 border-b border-gray-100 dark:border-gray-800 transition-colors";
    header.innerHTML = `
    <nav class="w-full py-2">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <!-- Logo -->
        <a class="flex items-center space-x-2 font-bold text-gray-800 dark:text-gray-200 text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="/" data-route="/">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span>VUALTIX</span>
        </a>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-md mx-8 relative items-center">
          <svg class="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="searchInput"
            placeholder="Search products..."
            class="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>


        <!-- Navigation & Dark Mode Toggle -->
        <div class="hidden md:flex items-center space-x-2">
          <ul class="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300" id="desktopMenu">
            <li><a class="nav-link px-4 py-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800" href="#" data-route="/">Home</a></li>
            <li><a class="nav-link px-4 py-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800" href="#" data-route="/products">Products</a></li>
          </ul>
          
          <!-- Dark Mode Toggle -->
          <button id="darkModeToggle" class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Toggle dark mode">
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
            <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobileMenuBtn" class="md:hidden flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>

      <!-- Mobile Menu -->
        <div class="md:hidden hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800" id="mobileMenu">
          <!-- Search bar wrapper -->
          <div class="p-4 relative flex items-center">
            <!-- Icon -->
            <svg class="absolute left-8 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>

            <!-- Input -->
            <input
              id="mobileSearchInput"
              placeholder="Search products..."
              class="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <!-- Navigation Links -->
          <ul class="p-4 flex flex-col space-y-1 text-base font-medium text-gray-700 dark:text-gray-300">
            <li>
              <a class="nav-link px-4 py-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800" href="#" data-route="/">Home</a>
            </li>
            <li>
              <a class="nav-link px-4 py-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800" href="#" data-route="/products">Products</a>
            </li>
          </ul>

        
        <!-- Mobile Dark Mode Toggle -->
        <div class="p-4 border-t border-gray-100 dark:border-gray-800">
          <button id="mobileDarkModeToggle" class="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
            <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <span class="dark:hidden">Dark Mode</span>
            <span class="hidden dark:block">Light Mode</span>
          </button>
        </div>
      </div>
    </nav>
  `;
    setTimeout(() => {
        setupNavbarFunctionality(header);
    }, 0);
    return header;
}
function setupNavbarFunctionality(navbar) {
    initializeDarkMode();
    const mobileMenuBtn = navbar.querySelector("#mobileMenuBtn");
    const mobileMenu = navbar.querySelector("#mobileMenu");
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
    const darkModeToggle = navbar.querySelector("#darkModeToggle");
    const mobileDarkModeToggle = navbar.querySelector("#mobileDarkModeToggle");
    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
        else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
    };
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", toggleDarkMode);
    }
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener("click", () => {
            toggleDarkMode();
            mobileMenu?.classList.add("hidden");
        });
    }
    const navLinks = navbar.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const route = link.getAttribute("data-route");
            if (route) {
                navigateTo(route);
                mobileMenu?.classList.add("hidden");
            }
        });
    });
    const searchInput = navbar.querySelector("#searchInput");
    const resultList = navbar.querySelector("#searchResults");
    let debounceTimer;
    const hideDropdown = () => {
        resultList?.classList.remove("opacity-100");
        resultList?.classList.add("opacity-0", "pointer-events-none");
    };
    const showDropdown = () => {
        resultList?.classList.remove("opacity-0", "pointer-events-none");
        resultList?.classList.add("opacity-100");
    };
    if (searchInput && resultList) {
        searchInput.addEventListener("input", (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const query = e.target.value.trim();
                resultList.innerHTML = "";
                if (!query)
                    return hideDropdown();
                const productId = parseInt(query, 10);
                if (!isNaN(productId)) {
                    const matched = await (0, api_1.fetchProductById)(productId);
                    if (matched && matched.id) {
                        const resultItem = document.createElement("li");
                        resultItem.className =
                            "cursor-pointer px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100";
                        resultItem.textContent = matched.title || `Product ${matched.id}`;
                        resultItem.addEventListener("click", () => {
                            handleSearch(matched.id.toString());
                            hideDropdown();
                        });
                        resultList.appendChild(resultItem);
                        showDropdown();
                    }
                    else {
                        const noMatch = document.createElement("li");
                        noMatch.className =
                            "px-4 py-2 text-gray-400 dark:text-gray-500 italic";
                        noMatch.textContent = "No product found.";
                        resultList.appendChild(noMatch);
                        showDropdown();
                    }
                }
                else {
                    const results = await (0, api_1.fetchProductsBySearch)(query);
                    if (results.length > 0) {
                        results.forEach((product) => {
                            const resultItem = document.createElement("li");
                            resultItem.className =
                                "cursor-pointer px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100";
                            resultItem.textContent = product.title;
                            resultItem.addEventListener("click", () => {
                                handleSearch(product.id.toString());
                                hideDropdown();
                            });
                            resultList.appendChild(resultItem);
                        });
                        showDropdown();
                    }
                    else {
                        const noMatch = document.createElement("li");
                        noMatch.className =
                            "px-4 py-2 text-gray-400 dark:text-gray-500 italic";
                        noMatch.textContent = "No product found.";
                        resultList.appendChild(noMatch);
                        showDropdown();
                    }
                }
            }, 300);
        });
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                handleSearch(query);
                hideDropdown();
            }
        });
        document.addEventListener("click", (event) => {
            if (!navbar.contains(event.target)) {
                hideDropdown();
            }
        });
    }
    updateActiveNav(window.location.pathname);
}
function initializeDarkMode() {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedMode === "true" || (savedMode === null && prefersDark)) {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
}
function handleSearch(query) {
    const id = parseInt(query, 10);
    const route = !isNaN(id)
        ? `/details?id=${id}`
        : `/details?search=${encodeURIComponent(query)}`;
    navigateTo(route);
}
function navigateTo(route) {
    history.pushState(null, "", route);
    updateActiveNav(route);
    window.dispatchEvent(new CustomEvent("navigate", { detail: { route } }));
}
function updateActiveNav(currentRoute) {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        const route = link.getAttribute("data-route") || "/";
        const isActive = currentRoute === route ||
            (route !== "/" && currentRoute.startsWith(route));
        link.classList.toggle("text-blue-600", isActive);
        link.classList.toggle("dark:text-blue-400", isActive);
        link.classList.toggle("bg-blue-50", isActive);
        link.classList.toggle("dark:bg-gray-800", isActive);
    });
}
window.addEventListener("popstate", () => {
    updateActiveNav(window.location.pathname);
    window.dispatchEvent(new CustomEvent("navigate", { detail: { route: window.location.pathname } }));
});
