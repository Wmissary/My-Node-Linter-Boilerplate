import { spawn } from "node:child_process";

export const installDependencies = async (dependencies, path) => {
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
};

export const uninstallDependencies = async (dependencies, path) => {
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
};

export const cleanNodeModules = async (path) => {
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
};
