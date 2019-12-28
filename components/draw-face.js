class DrawFace extends HTMLElement {
  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
        canvas {
        display: block;
        margin: 0 auto;
        }
    </style>
    <canvas id="face" width="300" height="300"></canvas>`;

    const canvas = this.shadowRoot.querySelector("#face");
    const context = canvas.getContext("2d");

    const RANDOM_FACTOR = 10;

    const EYE_LENGTH = 80;
    const LEFT_EYE_START_X = 50;
    const RIGHT_EYE_START_X = 170;
    const EYE_CENTER_Y = 100;
    const NOSE_LEFT_CENTER_X = 150;
    const UNDERLIP_PADDING_X = 30;
    const UNDERLIP_CENTER_Y = 240;

    const LEFT_EYE_CENTER_X = LEFT_EYE_START_X + EYE_LENGTH / 2;
    const RIGHT_EYE_CENTER_X = RIGHT_EYE_START_X + EYE_LENGTH / 2;
    const UNDERLIP_START_X = UNDERLIP_PADDING_X;
    const UNDERLIP_END_X = canvas.width - UNDERLIP_PADDING_X;
    const LEFT_EYE_END_X = LEFT_EYE_START_X + EYE_LENGTH;
    const RIGHT_EYE_END_X = RIGHT_EYE_START_X + EYE_LENGTH;
    const ALL_HEX_VALUES = "0123456789ABCDEF";

    function getRandomizedHex() {
      return `#${[...Array(6)]
        .map(() => ALL_HEX_VALUES.charAt(Math.random() * 16))
        .join("")}`;
    }

    function bezier(template) {
      context.beginPath();
      context.moveTo(template[0].x, template[0].y);
      context.bezierCurveTo(
        template[1].x,
        template[1].y,
        template[2].x,
        template[2].y,
        template[3].x,
        template[3].y
      );
      context.stroke();
    }

    function ellipse(template) {
      context.beginPath();
      context.ellipse(
        template[0],
        template[1],
        template[2],
        template[3],
        template[4],
        template[5],
        template[6]
      );
      context.fillStyle = getRandomizedHex();
      context.fill();
      context.stroke();
    }

    function addRandomValueTo(number, randomFactor = RANDOM_FACTOR) {
      return number - randomFactor + Math.random() * randomFactor * 2;
    }

    let underlip,
      upperLip,
      leftEyeUpper,
      leftEyeLower,
      rightEyeUpper,
      rightEyeLower,
      noseLeft,
      leftPupil,
      rightPupil;

    function defineValues() {
      underlip = [
        {
          x: UNDERLIP_START_X,
          y: UNDERLIP_CENTER_Y
        },
        {
          x: addRandomValueTo(30),
          y: addRandomValueTo(290)
        },
        {
          x: addRandomValueTo(270),
          y: addRandomValueTo(290)
        },
        {
          x: UNDERLIP_END_X,
          y: UNDERLIP_CENTER_Y
        }
      ];

      upperLip = [
        {
          x: 30,
          y: 240
        },
        {
          x: addRandomValueTo(30),
          y: addRandomValueTo(190)
        },
        {
          x: addRandomValueTo(270),
          y: addRandomValueTo(190)
        },
        {
          x: 270,
          y: 240
        }
      ];

      leftEyeUpper = [
        {
          x: LEFT_EYE_START_X,
          y: EYE_CENTER_Y
        },
        {
          x: addRandomValueTo(50),
          y: addRandomValueTo(140)
        },
        {
          x: addRandomValueTo(130),
          y: addRandomValueTo(140)
        },
        {
          x: LEFT_EYE_END_X,
          y: EYE_CENTER_Y
        }
      ];

      leftEyeLower = [
        {
          x: LEFT_EYE_START_X,
          y: EYE_CENTER_Y
        },
        {
          x: addRandomValueTo(50),
          y: addRandomValueTo(60)
        },
        {
          x: addRandomValueTo(130),
          y: addRandomValueTo(60)
        },
        {
          x: LEFT_EYE_END_X,
          y: EYE_CENTER_Y
        }
      ];

      rightEyeUpper = [
        {
          x: RIGHT_EYE_START_X,
          y: EYE_CENTER_Y
        },
        {
          x: addRandomValueTo(170),
          y: addRandomValueTo(60)
        },
        {
          x: addRandomValueTo(250),
          y: addRandomValueTo(60)
        },
        {
          x: RIGHT_EYE_END_X,
          y: EYE_CENTER_Y
        }
      ];

      rightEyeLower = [
        {
          x: RIGHT_EYE_START_X,
          y: EYE_CENTER_Y
        },
        {
          x: addRandomValueTo(170),
          y: addRandomValueTo(140)
        },
        {
          x: addRandomValueTo(250),
          y: addRandomValueTo(140)
        },
        {
          x: RIGHT_EYE_END_X,
          y: EYE_CENTER_Y
        }
      ];

      noseLeft = [
        {
          x: NOSE_LEFT_CENTER_X,
          y: 100
        },
        {
          x: addRandomValueTo(120),
          y: addRandomValueTo(160)
        },
        {
          x: addRandomValueTo(120),
          y: addRandomValueTo(170)
        },
        {
          x: NOSE_LEFT_CENTER_X,
          y: 180
        }
      ];

      leftPupil = [
        addRandomValueTo(LEFT_EYE_CENTER_X),
        addRandomValueTo(EYE_CENTER_Y),
        addRandomValueTo(10, 2),
        addRandomValueTo(10, 2),
        0,
        0,
        Math.PI * 2
      ];

      rightPupil = [
        addRandomValueTo(RIGHT_EYE_CENTER_X),
        addRandomValueTo(EYE_CENTER_Y),
        addRandomValueTo(10, 2),
        addRandomValueTo(10, 2),
        0,
        0,
        Math.PI * 2
      ];
    }

    function drawFace() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = getRandomizedHex();
      bezier(underlip);
      context.fill();
      bezier(upperLip);
      context.fill();
      bezier(leftEyeUpper);
      bezier(leftEyeLower);
      bezier(rightEyeUpper);
      bezier(rightEyeLower);
      bezier(noseLeft);
      context.fillStyle = getRandomizedHex();
      context.fill();

      ellipse(leftPupil);
      ellipse(rightPupil);
    }

    setInterval(() => {
      defineValues();
      drawFace();
    }, 100);
  }
}

customElements.define("draw-face", DrawFace);
