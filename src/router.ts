import { renderHome } from "./pages/home";
import { renderProducts } from "./pages/products";
import { renderNotFound } from "./pages/notfound";
import { renderProductDetails } from "./pages/details";
import { createLayout } from "./layout";

export function initRouter(): void {
  // Listen for browser back/forward
  window.addEventListener("popstate", renderRoute);

  // Listen for the custom navigate event from navbar
  window.addEventListener("navigate", (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log("Navigation details:", customEvent.detail);
    renderRoute();
  });

  // Legacy support for data-link attributes (if you have any other links)
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("data-link")) {
      e.preventDefault();
      const href = target.getAttribute("href")!;
      history.pushState(null, "", href);
      renderRoute();
    }
  });

  // Initial render
  renderRoute();
}

async function renderRoute(): Promise<void> {
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  let content: HTMLElement;

  try {
    switch (pathname) {
      case "/":
        content = await renderHome();
        break;
      case "/products":
        content = await renderProducts();
        break;
      case "/details":
        content = await renderProductDetails();
        break;
      default:
        // Handle dynamic routes or show 404
        if (pathname.startsWith("/products/")) {
          // Example: /products/123 - product detail page
          content = await renderProductDetails();
        } else {
          content = renderNotFound();
        }
        break;
    }

    createLayout(() => content);
  } catch (error) {
    console.error("Error rendering route:", error);
    content = renderNotFound();
    createLayout(() => content);
  }
}

// Export renderRoute so navbar can call it directly if needed
export { renderRoute };