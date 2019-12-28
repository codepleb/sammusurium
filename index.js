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
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    alert(`products: ${id} specification: ${specification}`);
  })
  .add("", () => {
    // general controller
    console.log("welcome in catch all controller");
  });
