import Path from "node:path";

import { fileExist } from "./utils.js";
import { kErrorMessages } from "./error.js";
import {
  installDependencies,
  uninstallDependencies,
  cleanNodeModules,
} from "./spawn.js";

const kPackageJSON = "package.json";

/**
 * @typedef {Object} linter
 */
export const linter = {
  /**
   * Check if package.json exist, install dependencies
   * @param {Array<string>} dependencies - Dependencies you want to install
   * @param {Path} path - Path to package.json
   */
  install: async function (dependencies, path) {
    const file = Path.join(path, kPackageJSON);

    if ((await fileExist(file)) === false) {
      throw new Error(kErrorMessages.PACKAGEJSON_NOT_FOUND);
    }
    await installDependencies(dependencies, path);
  },
  /**
   * Check if package.json exist, uninstall dependencies & Clean node modules
   * @param {Array<string>} dependencies - Dependencies you want to Uninstall
   * @param {Path} path - Path to package.json
   */
  uninstall: async function (dependencies, path) {
    const file = Path.join(path, kPackageJSON);

    if ((await fileExist(file)) === false) {
      throw new Error(kErrorMessages.PACKAGEJSON_NOT_FOUND);
    }

    await uninstallDependencies(dependencies, path);
    await cleanNodeModules(path);
  },
};
