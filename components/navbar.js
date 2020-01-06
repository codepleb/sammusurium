import "./button-link.js";

class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
        @media (min-width: 576px) {
            button {
                display: none;
            }
        }
 
        @media (max-width: 576px) {
            nav {
                display: none;
            }
        }
    </style>
    <nav>
        <cp-button-link href="/#/">Home</cp-button-link>
        <cp-button-link href="/#/login">Login</cp-button-link>
        <cp-button-link href="/#/random">Random</cp-button-link>
        <cp-button-link href="/#/about">About</cp-button-link>
    </nav>
    <button id="">+</button>
  `;
  }
}

customElements.define("cp-navbar", Navbar);
