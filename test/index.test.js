// eslint-disable-next-line node/no-missing-import
import test from "node:test";
import assert from "node:assert";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageData = require("./playground/package.json");

import { linter } from "../src/linter.js";

test("Should install & uninstall linter and plugins", (t) => {
  const dependencies = [
    "eslint",
    "eslint-plugin-node",
    "eslint-plugin-security",
    "eslint-plugin-sonarjs",
    "eslint-plugin-unicorn",
  ];

  const fileNotFoundError = "Couldn't find package.json";

  const alreadyInstalledError = "Linter & plugins already installed";

  const dependenciesNotFoundError =
    "Couldn't find linter & plugins dependencies";

  const path = "./playground/";

  t.test("should throw error if package.json is not found", () => {
    try {
      linter.install(dependencies, path);
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  t.test("should install linter and plugins", () => {
    linter.install(dependencies, path);
    assert.strictEqual(packageData.dependencies, dependencies);
  });

  t.test("should throw error if linter & plugins is already installed", () => {
    try {
      linter.install(dependencies, path);
    } catch (error) {
      assert.strictEqual(error, alreadyInstalledError);
    }
  });

  t.test("should uninstall linter and plugins", () => {
    linter.uninstall(dependencies, path);
    assert.strictEqual(packageData.dependencies, dependencies);
  });

  t.test("should throw error if package.json is not found", () => {
    try {
      linter.uninstall(dependencies, path);
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  t.test("should throw error if linter and plugins are not found", () => {
    try {
      linter.uninstall(dependencies, path);
    } catch (error) {
      assert.strictEqual(error.message, dependenciesNotFoundError);
    }
  });
});
