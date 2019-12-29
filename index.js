import Router from "./router.js";

import { randomPage } from "./pages/random.js";
import { aboutPage } from "./pages/about.js";
import { loginPage } from "./pages/login.js";

const router = new Router({
  mode: "hash",
  root: "/"
});

router
  .add("/home", () => {
    document.querySelector("#root").innerHTML = "home";
  })
  .add("/login", () => {
    document.querySelector("#root").innerHTML = loginPage;
  })
  .add("/random", () => {
    document.querySelector("#root").innerHTML = randomPage;
  })
  .add("/about", () => {
    document.querySelector("#root").innerHTML = aboutPage;
  })
  // http://127.0.0.1:8080/#/products/12/specification/10
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    // alert(`products: ${id} specification: ${specification}`);
    document.querySelector(
      "#root"
    ).innerHTML = `<p>Example of a route with parameters. ID: ${id}, Spec: ${specification}</p>`;
  })
  .add("/", () => {
    document.querySelector("#root").innerHTML = "This page does exist :)";
  })
  .add("", () => {
    document.querySelector("#root").innerHTML =
      "404 - This page does not exist!";
  });
