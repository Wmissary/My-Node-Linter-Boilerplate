import Dependencies from "./dependencies.js";
import Package from "./package.js";

export default class Linter {
  /**
   * @type {Class}
   * @description Dependencies class init.
   */
  #dependencies;

  /**
   * @type {Class}
   * @description Package class init.
   */
  #packageJson;

  /**
   * @param {Set<string>} dependencies
   * @param {Path} path
   */
  constructor(dependencies, path) {
    this.#dependencies = new Dependencies(dependencies, path);
    this.#packageJson = new Package(path);
  }
  /**
   * @description install dependencies, add node engine to package.json
   */
  async install() {
    await Promise.all([
      this.#dependencies.install(),
      this.#packageJson.addNodeEngine(),
    ]);
  }

  /**
   * @description uninstall dependencies, remove node engine from package.json
   */
  async uninstall() {
    await Promise.all([
      this.#dependencies.uninstall(),
      this.#packageJson.removeNodeEngine(),
    ]);
  }
}
