module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
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
        extraFileExtensions: ['.vue'],
        parser: {
            "<template>": "espree",
            js: "@typescript-eslint/parser",
            ts: "@typescript-eslint/parser",
        },
        project: [
            "./tsconfig.json",
        ],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: [
        '@typescript-eslint',
    ],
    root: true,
    rules: {
        "comma-dangle": "off",
        "indent": "off",
        "no-undef": "off",
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
        "vue/multi-word-component-names": [
            "warn",
            {
                "ignores": ["field", "index", "signup", "signin"]
            },
        ]
    },
}
