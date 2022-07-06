import Fs from "node:fs/promises";

/** Add current node engine to package.json
 * @param {Path} file - path to the package.json you want to modify
 */
const addNodeEngineToPackageJson = async (file) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const packageData = JSON.parse(await Fs.readFile(file, "utf8"));

  packageData.engines = {
    node: `>=${process.versions.node}`,
  };
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await Fs.writeFile(file, JSON.stringify(packageData));
};

/** Remove current node engine from package.json
 * @param {Path} file - path to the package.json you want to modify
 */
const removeNodeEngineFromPackageJson = async (file) => {
  //eslint-disable-next-line security/detect-non-literal-fs-filename
  const packageData = JSON.parse(await Fs.readFile(file, "utf8"));
  delete packageData.engines;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await Fs.writeFile(file, JSON.stringify(packageData));
};

export { addNodeEngineToPackageJson, removeNodeEngineFromPackageJson };
