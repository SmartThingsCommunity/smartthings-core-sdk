const request = {
	'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/status',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'components': {
		'main': {
			'colorControl': {
				'saturation': {
					'value': 0,
				},
				'color': {
					'value': null,
				},
				'hue': {
					'value': 0,
				},
			},
			'healthCheck': {
				'checkInterval': {
					'value': null,
					'unit': 's',
					'data': {},
				},
				'healthStatus': {
					'value': null,
					'data': {},
				},
				'DeviceWatch-Enroll': {
					'value': {
						'protocol': 'cloud',
						'scheme': 'UNTRACKED',
					},
				},
				'DeviceWatch-DeviceStatus': {
					'value': 'online',
					'data': {},
				},
			},
			'switchLevel': {
				'level': {
					'value': 100,
					'unit': '%',
				},
			},
			'refresh': {},
			'switch': {
				'switch': {
					'value': 'off',
				},
			},
			'colorTemperature': {
				'colorTemperature': {
					'value': 3000,
					'unit': 'K',
				},
			},
		},
	},
}
export default {request, response}
