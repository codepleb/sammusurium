class HelloWorld extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
    <nav>
      <a href="/about">HTML</a> |
      <a href="/face">CSS</a> |
    </nav>`;
    console.log(shadowRoot.innerHTML);
  }
}

customElements.define("nav-bar", HelloWorld);
