export function renderHome(): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = `
    <a href="/products" data-link>ClickToProduct</a>
    <h1>HomePage</h1>
  `;
  return div;
}
