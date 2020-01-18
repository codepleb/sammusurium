import Router from "./router.js";

import { randomPage } from "./pages/random.js";
import { aboutPage } from "./pages/about.js";
import { loginPage } from "./pages/login.js";
import { homePage } from "./pages/home.js";

const router = new Router();

router.defineError(() => {
  document.querySelector("#root").innerHTML = "404 - This page does not exist!";
});

router
  .add("/", () => {
    document.querySelector("#root").innerHTML = homePage;
  })
  .add("/login", () => {
    document.querySelector("#root").innerHTML = loginPage;
  })
  .add("/random", () => {
    document.querySelector("#root").innerHTML = randomPage;
  })
  .add("/about", () => {
    document.querySelector("#root").innerHTML = aboutPage;
  });
