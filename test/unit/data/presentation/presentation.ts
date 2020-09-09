import {
	CapabilityPresentationOperator,
	CapabilityVisibleCondition,
	PatchItemOpEnum,
	PresentationDeviceConfig,
	PresentationDeviceConfigEntry,
	PresentationDPInfo,
} from '../../../../src'


const data = {
	'mnmn': 'Test Manufacturer',
	'vid': 'vendor-00',
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
