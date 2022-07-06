import Fs from "node:fs/promises";

const addNodeEngineToPackageJson = async (file) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const packageData = JSON.parse(await Fs.readFile(file, "utf8"));

  packageData.engines = {
    node: `>=${process.versions.node}`,
  };
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await Fs.writeFile(file, JSON.stringify(packageData));
};

const removeNodeEngineFromPackageJson = async (file) => {
  //eslint-disable-next-line security/detect-non-literal-fs-filename
  const packageData = JSON.parse(await Fs.readFile(file, "utf8"));
  delete packageData.engines;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await Fs.writeFile(file, JSON.stringify(packageData));
};

export { addNodeEngineToPackageJson, removeNodeEngineFromPackageJson };
