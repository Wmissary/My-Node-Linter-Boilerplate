#!/usr/bin/env node
/* eslint-disable node/shebang */

import sade from "sade";

import Linter from "../src/class/linter.js";
import { kDependencies } from "../src/constants.js";

const linter = new Linter(kDependencies, process.cwd());
const prog = sade("mylinter");

prog.version("0.0.1");

prog
  .command("install")
  .describe("Install eslint, plugins & configuration")
  .action(async () => {
    await linter.install();
  });

prog
  .command("uninstall")
  .describe("uninstall eslint, plugins & configuration")
  .action(async () => {
    await linter.uninstall();
  });

prog.parse(process.argv);
