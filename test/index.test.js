// eslint-disable-next-line node/no-missing-import
import test from "node:test";
import assert from "node:assert";
import * as url from "node:url";
import Path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageData = require("./playground/package.json");

import { linter } from "../src/linter.js";

test("Should install & uninstall linter and plugins", async (t) => {
  const dependencies = [
    "eslint",
    "eslint-plugin-node",
    "eslint-plugin-security",
    "eslint-plugin-sonarjs",
    "eslint-plugin-unicorn",
  ];

  const fileNotFoundError = "Couldn't find package.json";

  const dirname = url.fileURLToPath(new URL(".", import.meta.url));

  const path = Path.join(dirname, "playground", "package.json");

  const errorPath = Path.join(dirname, "package.json");

  await t.test("should throw error if package.json is not found", async () => {
    try {
      await linter.install(dependencies, errorPath);
      assert.strictEqual(1, 2);
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  await t.test("should install linter and plugins", async () => {
    await linter.install(dependencies, path);
    assert.strictEqual(packageData.dependencies, dependencies);
  });

  await t.test("should throw error if package.json is not found", async () => {
    try {
      await linter.uninstall(dependencies, errorPath);
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  await t.test("should uninstall linter and plugins", async () => {
    await linter.uninstall(dependencies, path);
    assert.strictEqual(packageData.dependencies, dependencies);
  });
});
