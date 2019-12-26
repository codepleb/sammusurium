class HelloWorld extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
    <ul>
        <li>home</li>
        <li>face</li>
    </ul>
    `;
  }
}
customElements.define("hello-world", HelloWorld);
