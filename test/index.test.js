// eslint-disable-next-line node/no-missing-import
import test from "node:test";
import assert from "node:assert";
import * as url from "node:url";
import Path from "node:path";
import Fs from "node:fs/promises";

import Linter from "../src/class/linter.js";

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

  const path = Path.join(dirname, "playground");

  const errorPath = dirname;

  const linter = new Linter(dependencies, path);

  const errorLinter = new Linter(dependencies, errorPath);

  await t.test("should throw error if package.json is not found", async () => {
    try {
      await errorLinter.install();
      assert.strictEqual(1, 2);
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  await t.test(
    "should install linter, plugins and add engine to package.json",
    async () => {
      await linter.install();

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const packageData = await Fs.readFile(
        Path.join(path, "package.json"),
        "utf8"
      );

      /*const configurationData = await Fs.readFile(
        Path.join(path, ".eslintrc.json"),
        "utf8"
      );*/

      const packageDataObject = JSON.parse(packageData);
      assert.deepStrictEqual(
        Object.keys(packageDataObject.devDependencies),
        dependencies
      );
      assert.strictEqual(
        packageDataObject.engines.node,
        ">=" + process.versions.node
      );

      //assert.deepStrictEqual(configurationData);
    }
  );

  await t.test("should throw error if package.json is not found", async () => {
    try {
      await errorLinter.uninstall();
    } catch (error) {
      assert.strictEqual(error.message, fileNotFoundError);
    }
  });

  await t.test("should uninstall linter and plugins", async () => {
    await linter.uninstall();
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const packageData = await Fs.readFile(
      Path.join(path, "package.json"),
      "utf8"
    );

    const packageDataObject = JSON.parse(packageData);
    assert.strictEqual(packageDataObject.devDependencies, undefined);
    assert.strictEqual(packageDataObject.engines, undefined);
  });

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await Fs.unlink(Path.join(path, "package-lock.json"));
  await Fs.rm(Path.join(path, "node_modules"), {
    recursive: true,
  });
});
