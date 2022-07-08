import Command from "./command.js";
import { kCommandArguments } from "../constants.js";
import { kErrorMessages } from "../errors.js";

export default class Dependencies {
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
    this.#command = new Command(dependencies, path);
  }

  /**
   * @description install dependencies
   */
  async install() {
    const command = this.#command.generate(kCommandArguments.install);
    const install = this.#command.run(command);

    await new Promise((resolve, reject) => {
      install.on("error", (error) => {
        reject(
          new Error(kErrorMessages.DEPENDENCIES_INSTALLATION_FAILED + error)
        );
      });
      install.on("close", () => {
        resolve(console.log("Dependencies installation complete"));
      });
    });
  }

  /**
   * @description uninstall dependencies
   */
  async uninstall() {
    const command = this.#command.generate(kCommandArguments.uninstall);
    const uninstall = this.#command.run(command);

    await new Promise((resolve, reject) => {
      uninstall.on("error", (error) => {
        reject(kErrorMessages.DEPENDENCIES_UNINSTALL_FAILED + error);
      });
      uninstall.on("close", () => {
        resolve(console.log("Uninstall complete"));
      });
    });
  }
}
