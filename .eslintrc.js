module.exports = {
    root: true,

    env: {
        browser: true,
        node: true
    },

    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],

    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },

    ignorePatterns: ["node_modules/"],

    parser: "vue-eslint-parser",

    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2018,
        sourceType: "module",
    },

    rules: {
        "arrow-body-style": 0,
        "arrow-parens": 0,
        "class-methods-use-this": 0,
        "comma-dangle": ["error", "never"],
        "consistent-return": 0,
        "function-paren-newline": 0,
        "generator-star-spacing": ["error", {"before": true, "after": true}],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "import/prefer-default-export": 0,
        "import/order": 0,
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "no-confusing-arrow": 0,
        "no-restricted-syntax": 0,
        "no-use-before-define": 0,
        "nuxt/no-cjs-in-config": 0,
        "max-len": ["error", { "code": 90 }],
        "no-console": 0,
        "no-else-return": 0,
        "no-unused-expressions": 0,
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "object-curly-spacing": [2, "always"],
        "operator-linebreak": 0,
        "quotes": [2, "double"],
        "semi": [2, "always", { "omitLastInOneLineBlock": true }],
        "space-before-function-paren": ["error", "always"],
        "vue/html-indent": ["error", 4]
    }
};
