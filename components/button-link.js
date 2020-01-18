class ButtonLink extends HTMLElement {
  constructor() {
    super();
    this.href = "";
  }

  static get observedAttributes() {
    return ["href"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "href":
        this.href = newValue;
    }
  }

  randomizeValues = () => {
    for (let i = 0; i < 8; ++i)
      this.style.setProperty(
        "--old-pos-" + i,
        this.style.getPropertyValue("--random-" + i)
      );
    for (let i = 0; i < 8; ++i)
      this.style.setProperty("--random-" + i, Math.random() * 50 + 15 + "px");
  };

  connectedCallback() {
    const style = {
      backgroundColorHover: "#3344FF"
    };

    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
        :host {
            --random-old-0: 0px;
            --random-old-1: 0px;
            --random-old-2: 0px;
            --random-old-3: 0px;
            --random-old-4: 0px;
            --random-old-5: 0px;
            --random-old-6: 0px;
            --random-old-7: 0px;
    
            --random-0: 35px;
            --random-1: 35px;
            --random-2: 35px;
            --random-3: 35px;
            --random-4: 35px;
            --random-5: 35px;
            --random-6: 35px;
            --random-7: 35px;
        }
        
        a {
            font-size: 16px;
            display: inline-block;
            padding: 15px;
            margin: 10px;
            text-decoration: none;

            border: black solid 2px;
            animation: animateTextAndBorders 0.1s infinite;

            background-color: #fff;
            transition: background-color 0.5s ease;
        }

        a:hover {
          background-color: ${style.backgroundColorHover};
        }

        a:active {
          background-color: ${style.backgroundColorHover};
        }

        a:visited {
            color: black;
        }

        @keyframes animateTextAndBorders {
            0% {
                border-top-left-radius: var(--old-pos-0) var(--old-pos-1);
                border-top-right-radius: var(--old-pos-2) var(--old-pos-3);
                border-bottom-right-radius: var(--old-pos-4) var(--old-pos-5);
                border-bottom-left-radius: var(--old-pos-6) var(--old-pos-7);
            }
            100% {
                border-top-left-radius: var(--random-0) var(--random-1);
                border-top-right-radius: var(--random-2) var(--random-3);
                border-bottom-right-radius: var(--random-4) var(--random-5);
                border-bottom-left-radius: var(--random-6) var(--random-7);
            }
        }
    </style>

    <a href="${this.href}">
        <slot></slot>
    </a>
`;

    this.randomizeValues();
    this.shadowRoot
      .querySelector("a")
      .addEventListener("animationiteration", this.randomizeValues);
  }
}

customElements.define("cp-button-link", ButtonLink);
