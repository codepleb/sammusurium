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
      .menu-container {
        position: fixed;
        bottom: 50px;
      }

      nav {
        position: relative;
        left: -50px;
        bottom: 25px;
        width: 100px;
      }

      @media (min-width: 576px) {
        button {
            display: none;
        }

        .menu-container {
          position: static;
          bottom: 0;
        }
  
        nav {
          position: static;
          left: 0;
          bottom: 0;
          width: 100%;
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
    <div class="menu-container">
      <nav>
          <cp-button-link href="/#/">Home</cp-button-link>
          <cp-button-link href="/#/login">Login</cp-button-link>
          <cp-button-link href="/#/random">Random</cp-button-link>
          <cp-button-link href="/#/about">About</cp-button-link>
      </nav>
      <button id="menu-opener">+</button>
    </div>
  `;

    const button = this.shadowRoot.querySelector("#menu-opener");
    button.addEventListener("click", () => {
      this._menuOpen = !this._menuOpen;
      const navClasses = this.shadowRoot.querySelector("nav").classList;
      button.innerText = this._menuOpen ? "-" : "+";
      this._menuOpen ? navClasses.add("open") : navClasses.remove("open");
    });
  }
}

customElements.define("cp-navbar", Navbar);
