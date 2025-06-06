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

async function renderRoute(): Promise<void> {
  const pathname = window.location.pathname;

  let content: HTMLElement;

  switch (pathname) {
    case "/":
      content = renderHome();
      break;
    case "/products":
      content = await renderProducts();
      break;
    case "/details":
      content = renderDetails();
      break;
    default:
      content = renderNotFound();
      break;
  }

  createLayout(() => content);
}

