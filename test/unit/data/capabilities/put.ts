export const put_translations = {
	'tag': 'fr',
	'label': 'Output Modulation',
	'attributes': {
		'outputModulation': {
			'label': 'La modulation de sortie',
			'description': 'Power supply output modulation, i.e. AC frequency or DC',
			'displayTemplate': '{{attribute}} de {{device.label}} est de {{value}}',
			'i18n': {
				'value': {
					'50hz': {
						'label': '50 Hz',
					},
					'60hz': {
						'label': '60 Hz',
					},
					'400hz': {
						'label': '400 Hz',
					},
					'dc': {
						'label': 'DC',
					},
				},
			},
		},
	},
	'commands': {
		'setOutputModulation': {
			'label': 'Set Output Modulation',
			'description': 'Set the output modulation to the specified value',
			'arguments': {
				'outputModulation': {
					'i18n': {},
					'label': 'Output Modulation',
					'description': 'The desired output modulation',
				},
			},
		},
	},
}
