import Command, { kTypeOfCommand } from "./command.js";

export default class Dependencies {
  /**
   * @type {Set<string>}
   * @description Dependencies to install.
   */
  #dependencies;

  /**
   * @type {Path}
   * @description Path to the directory containing package.json.
   */
  #path;

  /**
   * @type {Class}
   * @description Command class init.
   */
  #command;

  /**
   * @param {Set<string>} dependencies
   * @param {Path} path
   */
  constructor(dependencies, path) {
    this.#dependencies = dependencies;
    this.#path = path;
    this.#command = new Command();
  }

  async install() {
    const command = this.#command.generate(
      kTypeOfCommand.install,
      this.#dependencies
    );
    const install = this.#command.spawn(command, this.#path);

    await new Promise((resolve, reject) => {
      install.on("error", (error) => {
        reject(new Error("Error happened: " + error));
      });
      install.on("close", () => {
        resolve(console.log("install complete"));
      });
    });
  }

  async uninstall() {
    const command = this.#command.generate(
      kTypeOfCommand.uninstall,
      this.#dependencies
    );
    const uninstall = this.#command.spawn(command, this.#path);

    await new Promise((resolve, reject) => {
      uninstall.on("error", (error) => {
        reject(new Error("Error happened: " + error));
      });
      uninstall.on("close", () => {
        resolve(console.log("Uninstall complete"));
      });
    });
  }
}
