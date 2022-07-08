import fs from "node:fs/promises";
import Path from "node:path";
import * as url from "node:url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default class Configuration {
  #path;
  #templatePath;
  constructor(path) {
    this.#path = Path.join(path, ".eslintrc.json");
    this.#templatePath = Path.join(dirname, "..", "template", ".eslintrc.json");
  }
  async #getTemplate() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return await fs.readFile(this.#templatePath, "utf8");
  }

  async create() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(this.#path, await this.#getTemplate());
  }

  async delete() {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.unlink(this.#path);
  }
}
