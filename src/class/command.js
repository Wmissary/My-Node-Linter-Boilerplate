import { spawn } from "node:child_process";

export const kTypeOfCommand = Object.freeze({
  install: Symbol("install"),
  uninstall: Symbol("uninstall"),
});

export default class Command {
  /**
   * @type {String}
   * @description Cross platform npm command.
   */
  #baseCommand;

  /**
   * @type {Set<string>}
   * @description Install arguments for npm command.
   */
  #installArgs;

  /**
   * @type {Set<string>}
   * @description Uninstall arguments for npm command.
   */
  #uninstallArgs;
  constructor() {
    this.#baseCommand = process.platform.startsWith("win")
      ? "npm.cmd "
      : "npm ";
    this.#installArgs = new Set(["install", "--save-dev "]);
    this.#uninstallArgs = new Set(["uninstall", "--save-dev "]);
  }

  /**
   * @param {Symbol} type
   * @param {Array<string>} dependencies
   * @description Generate cross platform npm command to install, uninstall
   * @return {String}
   */
  generate(type, dependencies) {
    let generatedCommand = "";
    generatedCommand += this.#baseCommand;
    switch (type) {
      case kTypeOfCommand.install: {
        generatedCommand += [...this.#installArgs].join(" ");
        break;
      }
      case kTypeOfCommand.uninstall: {
        generatedCommand += [...this.#uninstallArgs].join(" ");
        break;
      }
      default: {
        throw new Error("Unknown command type: " + type);
      }
    }
    generatedCommand += [...dependencies].join(" ");
    return generatedCommand;
  }

  /**
   * @param {String} command
   * @param {Path} path
   * @description Execute the npm command
   * @return {String}
   */
  spawn(command, path) {
    return spawn(command, {
      cwd: path,
      shell: true,
    });
  }
}
