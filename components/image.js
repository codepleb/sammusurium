class Image extends HTMLElement {
  constructor() {
    super();
    this.src = "";
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.src = newValue;
    }
  }

  randomizeValues = () => {
    for (let i = 0; i < 8; ++i)
      this.style.setProperty(
        "--old-pos-" + i,
        this.style.getPropertyValue("--random-" + i)
      );
    for (let i = 0; i < 8; ++i)
      this.style.setProperty("--random-" + i, Math.random() * 110 + 15 + "px");
  };

  connectedCallback() {
    const borderAnimationStyle = `
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
    `;
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

        --random-0: 75px;
        --random-1: 75px;
        --random-2: 75px;
        --random-3: 75px;
        --random-4: 75px;
        --random-5: 75px;
        --random-6: 75px;
        --random-7: 75px;
     }

      img {
          width: 250px;
          border-radius: 125px;
          margin-right: 20px;

          animation: animateTextAndBorders 0.15s infinite;
      }

      ${borderAnimationStyle}
    </style>

    <img src="${this.src}">
`;

    this.randomizeValues();
    this.shadowRoot
      .querySelector("img")
      .addEventListener("animationiteration", this.randomizeValues);
  }
}

customElements.define("cp-image", Image);
