export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-console': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
}
