// eslint-disable-next-line node/no-missing-import
import test from "node:test";
import assert from "node:assert";
import * as url from "node:url";
import Path from "node:path";
import fs from "node:fs/promises";

import Linter from "../src/class/linter.js";
import { fileExist } from "../src/utils.js";

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
  const packagePath = Path.join(path, "package.json");
  const configurationPath = Path.join(path, ".eslintrc.json");
  const configurationTemplatePath = Path.join(
    path,
    "..",
    "..",
    "src",
    "template",
    ".eslintrc.json"
  );

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
      const packageData = await fs.readFile(packagePath, "utf8");
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const configurationData = await fs.readFile(configurationPath, "utf8");
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const templateData = await fs.readFile(configurationTemplatePath, "utf8");

      const packageDataObject = JSON.parse(packageData);
      const configurationDataObject = JSON.parse(configurationData);
      const templateDataObject = JSON.parse(templateData);

      assert.deepStrictEqual(
        Object.keys(packageDataObject.devDependencies),
        dependencies
      );
      assert.strictEqual(
        packageDataObject.engines.node,
        ">=" + process.versions.node
      );

      assert.deepStrictEqual(configurationDataObject, templateDataObject);
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
    const packageData = await fs.readFile(packagePath, "utf8");
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const configurationExist = await fileExist(configurationPath);

    const packageDataObject = JSON.parse(packageData);

    assert.strictEqual(packageDataObject.devDependencies, undefined);
    assert.strictEqual(packageDataObject.engines, undefined);
    assert.strictEqual(configurationExist, false);
  });

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.unlink(Path.join(path, "package-lock.json"));
  await fs.rm(Path.join(path, "node_modules"), {
    recursive: true,
  });
});
