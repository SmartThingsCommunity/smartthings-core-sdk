import { Config } from 'jest'


const config: Config = {
	preset: 'ts-jest',
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

export default config
