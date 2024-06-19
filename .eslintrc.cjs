module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["@dorakemon/eslint-config-dorakemon", "next/core-web-vitals"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
};