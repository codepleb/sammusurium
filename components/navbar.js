import "./button-link.js";

class Navbar extends HTMLElement {
  constructor() {
    super();
    this._menuOpen = false;
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

            nav.open {
              display: block;
            }
        }
    </style>
    <nav>
        <cp-button-link href="/#/">Home</cp-button-link>
        <cp-button-link href="/#/login">Login</cp-button-link>
        <cp-button-link href="/#/random">Random</cp-button-link>
        <cp-button-link href="/#/about">About</cp-button-link>
    </nav>
    <button id="menu-opener">+</button>
  `;

    const button = this.shadowRoot.querySelector("#menu-opener");
    button.addEventListener("click", () => {
      console.log("clicc");
      this._menuOpen = !this._menuOpen;
      const navClasses = this.shadowRoot.querySelector("nav").classList;
      this._menuOpen ? navClasses.add("open") : navClasses.remove("open");
    });
  }
}

customElements.define("cp-navbar", Navbar);
