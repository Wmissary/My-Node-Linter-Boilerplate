import Fs from "node:fs/promises";

export async function fileExist(file) {
  try {
    await Fs.access(file);
    return true;
  } catch {
    return false;
  }
}
