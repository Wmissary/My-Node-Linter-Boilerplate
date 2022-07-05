import Fs from "node:fs/promises";

/** Check if file exist (async)
 * @param {Path} file - path to file you want to check
 */

export async function fileExist(file) {
  try {
    await Fs.access(file);
    return true;
  } catch {
    return false;
  }
}
