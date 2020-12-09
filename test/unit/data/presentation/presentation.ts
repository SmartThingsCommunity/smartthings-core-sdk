const data = {
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

export default data
