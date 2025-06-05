export function renderHome(): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = `
    <h1>HomePage</h1>
  `;
  return div;
}
