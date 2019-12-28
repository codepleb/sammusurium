import Router from "./router.js";

import { randomPage } from "./pages/random.js";

const router = new Router({
  mode: "hash",
  root: "/"
});

router
  .add(/about/, () => {
    document.querySelector("#root").innerHTML = randomPage;
  })
  // http://127.0.0.1:8080/#/products/12/specification/10
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    alert(`products: ${id} specification: ${specification}`);
  })
  .add("", () => {
    document.querySelector("#root").innerHTML = "";
  });
