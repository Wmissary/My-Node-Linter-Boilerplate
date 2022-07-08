import fs from "node:fs/promises";
import Path from "node:path";
import * as url from "node:url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default class Configuration {
  /**
   * @type {Path}
   * @description Path.
   */
  #path;
  /**
   * @type {Path}
   * @description Path of configuration template.
   */
  #templatePath;

  /**
   * @param {Path} path
   */
  constructor(path) {
    this.#path = Path.join(path, ".eslintrc.json");
    this.#templatePath = Path.join(dirname, "..", "template", ".eslintrc.json");
  }

  /**
   * @description Get configuration template data.
   */
  async #getTemplate() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return await fs.readFile(this.#templatePath, "utf8");
  }

  /**
   * @description Create configuration file.
   */
  async create() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(this.#path, await this.#getTemplate());
  }

  /**
   * @description Delete configuration file.
   */
  async delete() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.unlink(this.#path);
  }
}
