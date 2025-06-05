import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function createLayout(contentFn: () => HTMLElement): void {
  const app = document.getElementById("app")!;
  app.innerHTML = ""; // clear previous content

  const header = Navbar();
  const content = contentFn();
  const footer = Footer();

  app.append(header, content, footer);
}
