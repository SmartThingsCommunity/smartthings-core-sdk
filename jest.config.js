module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
	moduleFileExtensions: [
		'ts',
		'js',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	collectCoverageFrom: ['src/**/*.ts'],
	testEnvironment: 'node',
}
