import { DevicePreferenceCreate } from '../../../../src/endpoint/devicepreferences'


export const integerPreferenceCreate: DevicePreferenceCreate = {
	name: 'integer preference name',
	title: 'integer preference title',
	description: 'integer preference description',
	preferenceType: 'integer',
	definition: {
		minimum: 3,
		maximum: 13,
		default: 7,
	},
	explicit: true,
}
