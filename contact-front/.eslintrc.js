module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: ["plugin:vue/essential"],
  plugins: ["vue"],
  rules: {
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always"
      }
    ],
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "implicit-arrow-linebreak": ["error", "beside"]
  }
};
