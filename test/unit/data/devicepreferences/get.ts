import { DevicePreference } from '../../../../src/endpoint/devicepreferences'


export const minimalIntegerPreference: DevicePreference = {
	preferenceId: 'minimal-integer-preference-id',
	title: 'minimal integer preference title',
	preferenceType: 'integer',
	definition: {},
}

export const integerPreference: DevicePreference = {
	preferenceId: 'integer-preference-id',
	name: 'integer preference name',
	title: 'integer preference title',
	description: 'integer preference description',
	preferenceType: 'integer',
	definition: {
		minimum: 3,
		maximum: 13,
		default: 7,
	},
}

export const numberPreference: DevicePreference = {
	preferenceId: 'number-preference-id',
	name: 'number preference name',
	title: 'number preference title',
	description: 'number preference description',
	preferenceType: 'number',
	definition: {
		minimum: -10.1,
		maximum: 11.2,
		default: 3.141592653589793,
	},
}

export const booleanPreference: DevicePreference = {
	preferenceId: 'boolean-preference-id',
	name: 'boolean preference name',
	title: 'boolean preference title',
	description: 'boolean preference description',
	preferenceType: 'boolean',
	definition: {
		default: true,
	},
}

export const stringPreference: DevicePreference = {
	preferenceId: 'string-preference-id',
	name: 'string preference name',
	title: 'string preference title',
	description: 'string preference description',
	preferenceType: 'string',
	definition: {
		minLength: 3,
		maxLength: 72,
		stringType: 'text',
		default: 'sky-blue pink',
	},
}

export const enumerationPreference: DevicePreference = {
	preferenceId: 'enumeration-preference-id',
	name: 'enumeration preference name',
	title: 'enumeration preference title',
	description: 'enumeration preference description',
	preferenceType: 'enumeration',
	definition: {
		options: {
			red: '0',
			orange: '1',
			yellow: '2',
			green: '3',
			blue: '4',
			purple: '5',
		},
		default: '1', // obviously
	},
}

export const preferencesList = {
	items: [
		minimalIntegerPreference,
		integerPreference,
		numberPreference,
		booleanPreference,
		stringPreference,
		enumerationPreference,
	],
	_links: {},
}
