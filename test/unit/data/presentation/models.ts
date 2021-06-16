import {
	CapabilityPresentationOperator,
	CapabilityVisibleCondition,
	PatchItemOpEnum,
	PresentationDeviceConfig,
	PresentationDeviceConfigEntry,
	PresentationDPInfo,
} from '../../../../src'


export const deviceConfig = {
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
					{ 'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value' },
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
					{ 'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value' },
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
				{ 'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value' },
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
					{ 'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value' },
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
					{ 'op': PatchItemOpEnum.REPLACE, 'path': '/0/main/1/value', 'value': 'New Value' },
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

export const presentation = {
	'manufacturerName': 'SmartThingsCommunity',
	'presentationId': 'dd8fee94-0896-327c-bcb7-330955289c6d',
	'mnmn': 'SmartThingsCommunity',
	'vid': 'dd8fee94-0896-327c-bcb7-330955289c6d',
	'dashboard': {
		'states': [
			{
				'label': '{{outputVoltage.value}} V',
				'capability': 'detailmedia27985.outputVoltage',
				'version': 1,
				'component': 'main',
			},
		],
		'actions': [],
		'basicPlus': [],
	},
	'detailView': [
		{
			'capability': 'detailmedia27985.outputVoltage',
			'version': 1,
			'label': 'Output Voltage (RMS)',
			'displayType': 'slider',
			'slider': {
				'range': [
					0,
					240,
				],
				'step': 1,
				'unit': null,
				'command': 'setOutputVoltage',
				'value': 'outputVoltage.value',
			},
			'state': null,
			'component': 'main',
		},
	],
	'automation': {
		'conditions': [
			{
				'capability': 'detailmedia27985.outputVoltage',
				'version': 1,
				'label': 'Output Voltage (RMS)',
				'displayType': 'slider',
				'slider': {
					'range': [
						0,
						240,
					],
					'step': 1,
					'unit': null,
					'value': 'outputVoltage.value',
				},
				'exclusion': [],
				'component': 'main',
			},
		],
		'actions': [
			{
				'capability': 'detailmedia27985.outputVoltage',
				'version': 1,
				'label': 'Output Voltage (RMS)',
				'displayType': 'slider',
				'slider': {
					'range': [
						0,
						240,
					],
					'step': 1,
					'unit': null,
					'command': 'setOutputVoltage',
				},
				'component': 'main',
				'exclusion': [],
			},
		],
	},
	'dpInfo': [
		{
			'os': 'ios',
			'dpUri': 'plugin://com.samsung.ios.plugin.stplugin/assets/files/index.html',
		},
		{
			'os': 'android',
			'dpUri': 'plugin://com.samsung.android.plugin.stplugin',
		},
		{
			'os': 'web',
			'dpUri': 'wwst://com.samsung.one.plugin.stplugin',
		},
	],
}
