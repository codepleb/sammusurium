import about from "./about";

const routes = {
  //   "/": home,
  //   "/contact": contact,
  "/about": about
};

const rootDiv = document.getElementById("root");
rootDiv.innerHTML = routes[window.location.pathname];

export const onNavigate = pathname => {
  console.log("hi");
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname];
};

export const onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname];
};
