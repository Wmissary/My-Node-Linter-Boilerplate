import Dependencies from "./dependencies.js";
import Package from "./package.js";

export default class Linter {
  /**
   * @type {Set<string>}
   * @description Set of dependencies to install, uninstall.
   */
  #dependenciesToInstall;

  /**
   * @type {Path}
   * @description Path to the directory containing package.json.
   */
  #path;
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
    this.#dependenciesToInstall = dependencies;
    this.#path = path;
    this.#dependencies = new Dependencies(
      this.#dependenciesToInstall,
      this.#path
    );
    this.#packageJson = new Package(this.#path);
  }
  /**
   * @description install dependencies, add node engine to package.json
   */
  async install() {
    await Promise.all([
      this.#dependencies.install(this.#dependenciesToInstall, this.#path),
      this.#packageJson.addNodeEngine(),
    ]);
  }

  /**
   * @description uninstall dependencies, remove node engine from package.json
   */
  async uninstall() {
    await Promise.all([
      this.#dependencies.uninstall(this.#dependenciesToInstall, this.#path),
      this.#packageJson.removeNodeEngine(),
    ]);
  }
}
