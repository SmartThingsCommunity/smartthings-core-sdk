const request = {
	'url': 'https://api.smartthings.com/deviceprofiles/96406249-c14c-4d0e-8dd2-f62fbe381e78',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'id': '96406249-c14c-4d0e-8dd2-f62fbe381e78',
	'name': 'HVAC-Thermostat',
	'owner': {
		'ownerType': 'USER',
		'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
	},
	'components': [
		{
			'label': 'main',
			'id': 'main',
			'capabilities': [
				{
					'id': 'temperatureMeasurement',
					'version': 1,
				},
				{
					'id': 'thermostatHeatingSetpoint',
					'version': 1,
				},
				{
					'id': 'thermostatCoolingSetpoint',
					'version': 1,
				},
				{
					'id': 'thermostatMode',
					'version': 1,
				},
				{
					'id': 'thermostatFanMode',
					'version': 1,
				},
				{
					'id': 'thermostatOperatingState',
					'version': 1,
				},
				{
					'id': 'healthCheck',
					'version': 1,
				},
			],
			'categories': [],
		},
	],
	'metadata': {
		'vid': 'hvac-thermostat',
		'deviceType': 'Thermostat',
		'ocfDeviceType': 'oic.d.thermostat',
		'mnmn': 'fIIT',
		'ocfSpecVer': 'core 1.1.0',
		'mnid': 'fIIT',
	},
	'status': 'PUBLISHED',
}
export default {request, response}
