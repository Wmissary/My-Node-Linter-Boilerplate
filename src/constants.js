const kCommandArguments = Object.freeze({
  install: Symbol("install"),
  uninstall: Symbol("uninstall"),
});

const kDependencies = [
  "eslint",
  "eslint-plugin-node",
  "eslint-plugin-security",
  "eslint-plugin-sonarjs",
  "eslint-plugin-unicorn",
];

export { kCommandArguments, kDependencies };
