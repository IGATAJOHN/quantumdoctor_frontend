import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import prettierConfig from 'eslint-config-prettier'
// import airbnb from "eslint-config-airbnb";
// import airbnbHooks from "eslint-config-airbnb/hooks";
// import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
    // airbnb,
    // airbnbHooks.rules,
    // jsxA11y.configs,
    {
        languageOptions: { globals: globals.browser },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/semi': 'off',
            '@typescript-eslint/quotes': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    prettierConfig,
]
