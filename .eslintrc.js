module.exports = {
	root: true,
	plugins: ['@typescript-eslint'],
	extends: [
		'@react-native-community',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
	],
	env: {
		node: true,
		browser: true,
		jest: true,
	},
	parserOptions: {
		project: 'tsconfig.json',
		createDefaultProgram: true,
	},
	rules: {
		'no-console': 'off',
		'no-nested-ternary': 'off',
		'consistent-return': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'import/prefer-default-export': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'error',
		'react/jsx-props-no-spreading': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
	},
};
