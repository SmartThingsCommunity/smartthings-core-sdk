import {
	DeviceConfigType, CapabilityValue, DeviceConfigEntry, DPInfo, VisibleCondition, VisibleConditionOperator, PresentationDeviceConfig,
} from '../../../../src'


const data = {
	'mnmn': 'Test Manufacturer',
	'vid': 'vendor-00',
	'type': DeviceConfigType.PROFILE,
	'dpInfo': [

	] as DPInfo[],
	'iconUrl': 'www.randomplace.com/icon.png',
	'dashboard': {
		'states': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{'key': 'keyName'} as CapabilityValue,
				] as CapabilityValue[],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'attribute': 'attributeName',
					'operator': VisibleConditionOperator.GTE,
					'operand': 'keyName',
				} as VisibleCondition,
			},
		],
		'actions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{'key': 'keyName'} as CapabilityValue,
				] as CapabilityValue[],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'attribute': 'attributeName',
					'operator': VisibleConditionOperator.GTE,
					'operand': 'keyName',
				} as VisibleCondition,
			},
		] as DeviceConfigEntry[],
	},
	'detailView': [
		{
			'component': 'component',
			'capability': 'testCapability',
			'version': 1,
			'values': [
				{'key': 'keyName'} as CapabilityValue,
			] as CapabilityValue[],
			'visibleCondition': {
				'component': 'component',
				'version': 1,
				'attribute': 'attributeName',
				'operator': VisibleConditionOperator.GTE,
				'operand': 'keyName',
			} as VisibleCondition,
		},
	] as DeviceConfigEntry[],
	'automation': {
		'conditions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{'key': 'keyName'} as CapabilityValue,
				] as CapabilityValue[],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'attribute': 'attributeName',
					'operator': VisibleConditionOperator.GTE,
					'operand': 'keyName',
				} as VisibleCondition,
			},
		] as DeviceConfigEntry[],
		'actions': [
			{
				'component': 'component',
				'capability': 'testCapability',
				'version': 1,
				'values': [
					{'key': 'keyName'} as CapabilityValue,
				] as CapabilityValue[],
				'visibleCondition': {
					'component': 'component',
					'version': 1,
					'attribute': 'attributeName',
					'operator': VisibleConditionOperator.GTE,
					'operand': 'keyName',
				} as VisibleCondition,
			},
		] as DeviceConfigEntry[],
	},
} as PresentationDeviceConfig

export default data
