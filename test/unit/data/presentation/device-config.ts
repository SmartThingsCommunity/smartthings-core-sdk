import {
	CapabilityPresentationOperator,
	CapabilityVisibleCondition,
	PatchItemOpEnum,
	PresentationDeviceConfig,
	PresentationDeviceConfigEntry,
	PresentationDPInfo,
} from '../../../../src'


const data = {
	'manufacturerName': 'Test Manufacturer',
	'presentationId': 'd8469d5c-3ca2-4601-9f21-2b7a0ccd44a5',
	'type': 'profile',
	'dpInfo': [

	] as PresentationDPInfo[],
	'iconUrl': 'www.randomplace.com/icon.png',
	'dashboard': {
		'states': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{ 'key': 'keyName' },
				],
				'patch': [
					{'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value'},
				],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'value': 'valueName',
					'operator': CapabilityPresentationOperator.GREATER_THAN_OR_EQUALS,
					'operand': 'keyName',
				} as CapabilityVisibleCondition,
			},
		],
		'actions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{ 'key': 'keyName' },
				],
				'patch': [
					{'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value'},
				],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'value': 'valueName',
					'operator': CapabilityPresentationOperator.GREATER_THAN_OR_EQUALS,
					'operand': 'keyName',
				} as CapabilityVisibleCondition,
			},
		] as PresentationDeviceConfigEntry[],
	},
	'detailView': [
		{
			'component': 'component',
			'capability': 'testCapability',
			'version': 1,
			'values': [
				{ 'key': 'keyName' },
			],
			'patch': [
				{'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value'},
			],
			'visibleCondition': {
				'component': 'component',
				'version': 1,
				'value': 'valueName',
				'operator': CapabilityPresentationOperator.GREATER_THAN_OR_EQUALS,
				'operand': 'keyName',
			} as CapabilityVisibleCondition,
		},
	] as PresentationDeviceConfigEntry[],
	'automation': {
		'conditions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{ 'key': 'keyName' },
				],
				'patch': [
					{'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value'},
				],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'value': 'valueName',
					'operator': CapabilityPresentationOperator.GREATER_THAN_OR_EQUALS,
					'operand': 'keyName',
				} as CapabilityVisibleCondition,
			},
		] as PresentationDeviceConfigEntry[],
		'actions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{ 'key': 'keyName' },
				],
				'patch': [
					{'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value'},
				],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'value': 'valueName',
					'operator': CapabilityPresentationOperator.GREATER_THAN_OR_EQUALS,
					'operand': 'keyName',
				} as CapabilityVisibleCondition,
			},
		] as PresentationDeviceConfigEntry[],
	},
} as PresentationDeviceConfig

export default data
