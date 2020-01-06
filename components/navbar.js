import "./button-link.js";

class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <nav>
        <cp-button-link href="/#/">Home</cp-button-link>
        <cp-button-link href="/#/login">Login</cp-button-link>
        <cp-button-link href="/#/random">Random</cp-button-link>
        <cp-button-link href="/#/about">About</cp-button-link>
    </nav>
  `;
  }
}

customElements.define("cp-navbar", Navbar);
