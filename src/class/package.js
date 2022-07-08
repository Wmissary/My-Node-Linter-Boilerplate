import fs from "node:fs/promises";
import Path from "node:path";

import { kErrorMessages } from "../errors.js";
import { fileExist } from "../utils.js";

export default class Package {
  /**
   * @type {Path}
   * @description Path of package.json.
   */
  #path;

  /**
   * @param {Path} path
   */
  constructor(path) {
    this.#path = Path.join(path, "package.json");
  }

  /**
   * @param {String} data
   * @description Data you want to write in package.json.
   */
  async #write(data) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(this.#path, data);
  }

  /**
   * @description Get package.json data.
   */
  async #get() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return await fs.readFile(this.#path, "utf8");
  }

  /**
   * @description add node engine to package.json.
   */
  async addNodeEngine() {
    const packageData = JSON.parse(await this.#get());
    packageData.engines = {
      node: `>=${process.versions.node}`,
    };
    await this.#write(JSON.stringify(packageData));
  }

  /**
   * @description remove node engine from package.json.
   */
  async removeNodeEngine() {
    const packageData = JSON.parse(await this.#get());
    delete packageData.engines;
    await this.#write(JSON.stringify(packageData));
  }

  async exist() {
    if ((await fileExist(this.#path)) === false) {
      throw new Error(kErrorMessages.PACKAGEJSON_NOT_FOUND);
    }
  }
}
