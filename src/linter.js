import Fs from "node:fs/promises";
import { spawn } from "node:child_process";
import Path from "node:path";

async function fileExist(file) {
  try {
    await Fs.access(file);
    return true;
  } catch {
    return false;
  }
}

export const linter = {
  install: async function (dependencies, path) {
    const file = Path.join(path, "package.json");
    if ((await fileExist(file)) === false) {
      throw new Error("Couldn't find package.json");
    }

    for (const dependency of dependencies) {
      const install = spawn(
        process.platform.startsWith("win") ? "npm.cmd" : "npm",
        ["install", "--save-dev", dependency],
        {
          cwd: path,
        }
      );
      await new Promise((resolve, reject) => {
        install.on("error", reject);
        install.on("close", resolve);
      });
    }
  },

  uninstall: async function (dependencies, path) {
    const file = Path.join(path, "package.json");
    if ((await fileExist(file)) === false) {
      throw new Error("Couldn't find package.json");
    }

    for (const dependency of dependencies) {
      const uninstall = spawn(
        process.platform.startsWith("win") ? "npm.cmd" : "npm",
        ["uninstall", "--save-dev", dependency],
        {
          cwd: path,
        }
      );
      await new Promise((resolve, reject) => {
        uninstall.on("error", reject);
        uninstall.on("close", resolve);
      });
    }
    const clean = spawn(
      process.platform.startsWith("win") ? "npm.cmd" : "npm",
      ["prune"],
      {
        cwd: path,
      }
    );
    await new Promise((resolve, reject) => {
      clean.on("error", reject);
      clean.on("close", resolve);
    });
  },
};
