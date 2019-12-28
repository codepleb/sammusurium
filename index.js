import Router from "./router.js";

import { randomPage } from "./pages/random.js";
import { aboutPage } from "./pages/about.js";

const router = new Router({
  mode: "hash",
  root: "/"
});

router
  .add(/\//, () => {
    document.querySelector("#root").innerHTML = "home";
  })
  .add(/home/, () => {
    document.querySelector("#root").innerHTML = "home";
  })
  .add(/random/, () => {
    document.querySelector("#root").innerHTML = randomPage;
  })
  .add(/about/, () => {
    document.querySelector("#root").innerHTML = aboutPage;
  })
  // http://127.0.0.1:8080/#/products/12/specification/10
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    alert(`products: ${id} specification: ${specification}`);
  })
  .add("", () => {
    document.querySelector("#root").innerHTML =
      "404 - This page does not exist!";
  });
