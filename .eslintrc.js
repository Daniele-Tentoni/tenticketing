module.exports = {
    env: {
        es2021: true,
    },
    extends: [
        'standard-with-typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
    ],
    overrides: [
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 'latest',
        parser: "@typescript-eslint/parser",
        project: [
            "./tsconfig.json",
        ],
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    root: true,
    rules: {
        "comma-dangle": "off",
        "indent": "off",
        "semi": "off",
        "@typescript-eslint/comma-dangle": [
            "error",
            {
                "arrays": "always",
                "objects": "always",
                "imports": "always",
                "exports": "always",
                "functions": "always-multiline"
            }
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
        ],
        "@typescript-eslint/semi": [
            "error",
            "always",
        ],
        "@typescript-eslint/member-delimiter-style": [
            "warn",
            {
                multiline: {
                    delimiter: "semi",
                },
            },
        ],
    },
}
