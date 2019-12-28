class Router {
  routes = [];

  mode = null;

  root = "/";

  constructor(options) {
    this.mode = window.history.pushState ? "history" : "hash";
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path, cb) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = path => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = path => {
    return path.toString().replace(/\/$/, ""); // Does the end contain a '/'?
    // .replace(/^\//, ""); // Does the beginning contain a '/'?
  };

  getFragment = () => {
    let fragment = "";
    if (this.mode === "history") {
      fragment = this.clearSlashes(
        decodeURI(window.location.pathname + window.location.search)
      );
      fragment = fragment.replace(/\?(.*)$/, ""); // Remove GET parameters from URL
      fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/); // Does URL contain a hash?
      fragment = match ? match[1] : "";
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = "") => {
    console.log("path: ", path);
    if (this.mode === "history") {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ""
      )}#${path}`; // Remove everything after # and then set the URL with a preceding hash
    }
    return this;
  };

  listen = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  };

  // Listen for path changes
  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}

export default Router;
