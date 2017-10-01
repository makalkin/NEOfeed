/**
 * Class generator children routes
 */
class RouterGenerator {
  /**
   * @param {string=} basename - base path for children
   */
  constructor(basename = '/') {
    this.basename = basename;
    this.routes = [];
  }

  /**
   * add route
   * @param {string} path - router path
   * @param {className} component - react component
   * @param {boolean=} exact - exact url
   * @returns {RouterGenerator}
   */
  addRoute(path, component, exact = false) {
    const config = { path: `${this.basename}${path}`.replace('//', '/'), exact, component };
    this.routes.push(config);
    return this;
  }

  /**
   * return routes
   */
  getRoutes() {
    return this.routes;
  }
}

export { RouterGenerator };
