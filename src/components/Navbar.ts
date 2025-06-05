export function Navbar(): HTMLElement {
  const header = document.createElement("header");
  header.className = "bg-blue-900 text-white";
  header.innerHTML = `
    <h1>Header</h1>
  `;
  return header;
}
