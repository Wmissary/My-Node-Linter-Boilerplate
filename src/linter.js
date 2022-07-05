import Path from "node:path";

import { fileExist } from "./utils.js";
import { kErrorMessages } from "./error.js";
import {
  installDependencies,
  uninstallDependencies,
  cleanNodeModules,
} from "./spawn.js";

const kPackageJSON = "package.json";

export const linter = {
  install: async function (dependencies, path) {
    const file = Path.join(path, kPackageJSON);

    if ((await fileExist(file)) === false) {
      throw new Error(kErrorMessages.PACKAGEJSON_NOT_FOUND);
    }
    await installDependencies(dependencies, path);
  },

  uninstall: async function (dependencies, path) {
    const file = Path.join(path, kPackageJSON);

    if ((await fileExist(file)) === false) {
      throw new Error(kErrorMessages.PACKAGEJSON_NOT_FOUND);
    }

    await uninstallDependencies(dependencies, path);
    await cleanNodeModules(path);
  },
};
