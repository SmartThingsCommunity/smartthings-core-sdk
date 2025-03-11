
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'jest'
import stylistic from '@stylistic/eslint-plugin'


export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	importPlugin.flatConfigs.recommended,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2019,
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json', './tsconfig-test.json'],
			},
		},
		plugins: {
			jestPlugin,
			'@stylistic': stylistic,
		},
		rules: {
			indent: 'off',
			'@stylistic/indent': [
				'error',
				'tab',
				{
					FunctionDeclaration: { body: 1, parameters: 2 },
					FunctionExpression: { body: 1, parameters: 2 },
					SwitchCase: 1,
				},
			],
			'linebreak-style': ['error',  'unix'],
			'@stylistic/quotes': [
				'error',
				'single',
				{ avoidEscape: true },
			],
			curly: ['error', 'all'],
			'comma-dangle': [
				'error',
				'always-multiline',
			],
			'no-console': 'error',
			'no-process-exit': 'error',
			'no-template-curly-in-string': 'error',
			'require-await': 'off',
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/member-delimiter-style': [
				'error',
				{
					multiline: {
						delimiter: 'none',
						requireLast: true,
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false,
					},
				},
			],
			// Temporarily disabling while we switch from interface to type.
			// see https://github.com/SmartThingsCommunity/smartthings-core-sdk/issues/207
			// '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/explicit-function-return-type': ['error', {
				allowExpressions: true,
			}],
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': [
				'error',
				{ functions: false, classes: false, enums: false, variables: true },
			],
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/ban-ts-comment': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/comma-spacing': ['error'],
			'@stylistic/type-annotation-spacing': 'error',

			// disallow non-import statements appearing before import statements
			'import/first': 'error',
			// Require a newline after the last import/require in a group
			'import/newline-after-import': ['error', { 'count': 2 }],
			// Forbid import of modules using absolute paths
			'import/no-absolute-path': 'error',
			// disallow AMD require/define
			'import/no-amd': 'error',
			// Forbid the use of extraneous packages
			'import/no-extraneous-dependencies': [
				'error', {
					devDependencies: true,
					peerDependencies: true,
					optionalDependencies: false,
				},
			],
			// Forbid mutable exports
			'import/no-mutable-exports': 'error',
			// Prevent importing the default as if it were named
			'import/no-named-default': 'error',
			// Prohibit named exports
			'import/no-named-export': 'off', // we want everything to be a named export
			// Forbid a module from importing itself
			'import/no-self-import': 'error',
			// Require modules with a single export to use a default export
			'import/prefer-default-export': 'off', // we want everything to be named
			'import/named': 'off',
			'import/no-unresolved': ['off'],
		},
	},
)
