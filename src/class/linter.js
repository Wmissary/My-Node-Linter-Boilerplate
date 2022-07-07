import Dependencies from "./dependencies.js";
import Package from "./package.js";

export default class Linter {
  #dependenciesToInstall;
  #path;
  #dependencies;
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

  async install() {
    await Promise.all([
      this.#dependencies.install(this.#dependenciesToInstall, this.#path),
      this.#packageJson.addNodeEngine(),
    ]);
  }

  async uninstall() {
    await Promise.all([
      this.#dependencies.uninstall(this.#dependenciesToInstall, this.#path),
      this.#packageJson.removeNodeEngine(),
    ]);
  }
}
