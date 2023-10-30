/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "@electron-toolkit",
        "@electron-toolkit/eslint-config-ts/eslint-recommended",
        "@vue/eslint-config-typescript/recommended",
        "@vue/eslint-config-prettier"
    ],
    rules: {
        "vue/require-default-prop": "off",
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/ban-types": "off",
        "no-inner-declarations": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off"
    }
};
