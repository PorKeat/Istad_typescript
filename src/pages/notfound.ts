export function renderNotFound(): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = `
    <h1>Page not found</h1>
  `;
  return div;
}
