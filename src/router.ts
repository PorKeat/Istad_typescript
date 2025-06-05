import { renderHome } from "./pages/home";
import { renderProducts } from "./pages/products";
import { renderNotFound } from "./pages/notfound";
import { renderDetails } from "./pages/details";
import { createLayout } from "./layout";

export function initRouter(): void {
  window.addEventListener("popstate", renderRoute);

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("data-link")) {
      e.preventDefault();
      const href = target.getAttribute("href")!;
      history.pushState(null, "", href);
      renderRoute();
    }
  });

  renderRoute();
}

function renderRoute(): void {
  const pathname = window.location.pathname;

  let contentFn: () => HTMLElement;

  switch (pathname) {
    case "/":
      contentFn = renderHome;
      break;
    case "/products":
      contentFn = renderProducts;
      break;
    case "/details":
      contentFn = renderDetails;
      break; 
    default:
      contentFn = renderNotFound;
      break;
  }

  createLayout(contentFn);
}
