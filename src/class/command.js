import { spawn } from "node:child_process";
import { kCommandArguments } from "../constants.js";
import { kErrorMessages } from "../errors.js";

const kArguments = Object.freeze({
  INSTALL: 0,
  UNINSTALL: 1,
});

export default class Command {
  /**
   * @type {String}
   * @description Cross platform npm command.
   */
  #command;

  /**
   * @type {Set<string>}
   * @description action arguments for npm command.
   */
  #args;

  /**
   * @type {String}
   * @description Option arguments for npm command.
   */
  #option;

  /**
   * @type {Set<string>}
   * @description dependencies arguments for npm command.
   */
  #dependencies;

  /**
   * @type {Path}
   * @description Path.
   */
  #path;

  constructor(dependencies, path) {
    this.#command = process.platform.startsWith("win") ? "npm.cmd" : "npm";
    this.#args = new Set(["install", "uninstall"]);
    this.#option = "--save-dev";
    this.#dependencies = dependencies;
    this.#path = path;
  }

  /**
   * @param {Symbol} type
   * @param {Array<string>} dependencies
   * @description Generate cross platform npm command to install, uninstall
   * @return {String}
   */
  generate(type) {
    let generatedCommand = this.#command + " ";
    if (type === kCommandArguments.install)
      generatedCommand += [...this.#args][kArguments.INSTALL] + " ";
    else if (type === kCommandArguments.uninstall)
      generatedCommand += [...this.#args][kArguments.UNINSTALL] + " ";
    else throw new Error(kErrorMessages.COMMAND_TYPE_UNKNOWN + type);
    generatedCommand += this.#option + " ";
    generatedCommand += [...this.#dependencies].join(" ");
    return generatedCommand;
  }

  /**
   * @param {String} command
   * @param {Path} path
   * @description Execute the npm command
   * @return {String}
   */
  run(command) {
    return spawn(command, {
      cwd: this.#path,
      shell: true,
    });
  }
}
