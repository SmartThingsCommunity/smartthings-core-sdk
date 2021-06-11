const request = {
	'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/preferences',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/vnd.smartthings+json;v=20170916',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}

const response = {
	'values': {
		'switchDimmingRate': {
			'preferenceType': 'number',
			'value': 101.0,
		},
		'zwaveRampRate': {
			'preferenceType': 'number',
			'value': 101.0,
		},
		'zwaveDimmingRate': {
			'preferenceType': 'number',
			'value': 3.0,
		},
		'maximumLevel': {
			'preferenceType': 'number',
			'value': 65.0,
		},
		'smartBulbMode': {
			'preferenceType': 'string',
			'value': 'Disabled',
		},
		'minimumLevel': {
			'preferenceType': 'number',
			'value': 35.0,
		},
		'invertSwitch': {
			'preferenceType': 'boolean',
			'value': false,
		},
		'switchRampRate': {
			'preferenceType': 'number',
			'value': 101.0,
		},
	},
}

export default { request, response }
