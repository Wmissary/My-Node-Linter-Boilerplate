import { spawn } from "node:child_process";

/**
 * Install dependencies
 * @param {Array<String>} dependencies - Dependencies you want to install
 * @param {Path} path - Path to package.json
 */
const installDependencies = async (dependencies, path) => {
  const commandArray = ["install", "--save-dev"];

  for (const dependency of dependencies) {
    commandArray.push(dependency);
  }

  const install = spawn(
    process.platform.startsWith("win") ? "npm.cmd" : "npm",
    commandArray,
    {
      cwd: path,
    }
  );

  try {
    await new Promise((resolve, reject) => {
      install.on("error", reject);
      install.on("close", resolve);
    });
  } catch {
    throw new Error("Npm install problem");
  }
};

/**
 * Uninstall dependencies
 * @param {Array<String>} dependencies - Dependencies you want to uninstall
 * @param {Path} path - Path to package.json
 */
const uninstallDependencies = async (dependencies, path) => {
  const commandArray = ["uninstall", "--save-dev"];

  for (const dependency of dependencies) {
    commandArray.push(dependency);
  }
  const uninstall = spawn(
    process.platform.startsWith("win") ? "npm.cmd" : "npm",
    commandArray,
    {
      cwd: path,
    }
  );
  try {
    await new Promise((resolve, reject) => {
      uninstall.on("error", reject);
      uninstall.on("close", resolve);
    });
  } catch {
    throw new Error("Npm uninstall problem");
  }
};

/**
 * Clean node_modules
 * @param {Path} path - Path to package.json
 */
const cleanNodeModules = async (path) => {
  const clean = spawn(
    process.platform.startsWith("win") ? "npm.cmd" : "npm",
    ["prune"],
    {
      cwd: path,
    }
  );
  try {
    await new Promise((resolve, reject) => {
      clean.on("error", reject);
      clean.on("close", resolve);
    });
  } catch {
    throw new Error("Cleaning node modules problem");
  }
};

export { installDependencies, uninstallDependencies, cleanNodeModules };
