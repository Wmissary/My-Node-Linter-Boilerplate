import Dependencies from "./dependencies.js";
import Package from "./package.js";
import Configuration from "./configuration.js";

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
   * @type {Class}
   * @description Configuration class init.
   */
  #configuration;

  /**
   * @param {Set<string>} dependencies
   * @param {Path} path
   */
  constructor(dependencies, path) {
    this.#dependencies = new Dependencies(dependencies, path);
    this.#packageJson = new Package(path);
    this.#configuration = new Configuration(path);
  }
  /**
   * @description install dependencies, add node engine to package.json
   */
  async install() {
    await this.#packageJson.exist();
    await Promise.all([
      this.#dependencies.install(),
      this.#packageJson.addNodeEngine(),
      this.#configuration.create(),
    ]);
  }

  /**
   * @description uninstall dependencies, remove node engine from package.json
   */
  async uninstall() {
    await this.#packageJson.exist();
    await Promise.all([
      this.#dependencies.uninstall(),
      this.#packageJson.removeNodeEngine(),
      this.#configuration.delete(),
    ]);
  }
}
