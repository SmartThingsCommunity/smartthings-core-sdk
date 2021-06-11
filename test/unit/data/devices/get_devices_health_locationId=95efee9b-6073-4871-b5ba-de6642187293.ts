const request = {
	'url': 'https://api.smartthings.com/devices',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/vnd.smartthings+json;v=20170916',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'params': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'includeHealth': 'true',
	},
}
const response = {
	'items': [
		{
			'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
			'name': 'c2c-rgbw-color-bulb',
			'label': 'STS Bulb 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'switchLevel',
							'version': 1,
						},
						{
							'id': 'colorControl',
							'version': 1,
						},
						{
							'id': 'colorTemperature',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '4d24a797-e0c0-45ad-8725-04aa6eb2eeb1',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': '46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
			'name': 'VirtualSTS Two Channel Outlet',
			'label': 'STS Two Channel',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': 'd10017f9-f72e-49ae-9d00-073d606717fc',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
				{
					'id': 'outlet1',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
					],
				},
				{
					'id': 'outlet2',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '3c7e7257-c378-4a43-a8c5-760ff7e9b644',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': '5d5a44a6-8859-4574-adc7-03a28171a76d',
			'name': 'c2c-switch',
			'label': 'STS Switch 2',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '7eaca7e4-dd01-4711-8e20-1a869bb44b1b',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': '79b75c24-1ab0-487e-a046-08cb9e860c1d',
			'name': 'c2c-contact-3',
			'label': 'STS Open/Close 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'contactSensor',
							'version': 1,
						},
						{
							'id': 'battery',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '7417af19-8d1f-40ed-92ce-b64e2a44af52',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': '8cfb5b5f-1683-4459-932c-9493c63da626',
			'name': 'c2c-motion',
			'label': 'STS Motion 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'motionSensor',
							'version': 1,
						},
						{
							'id': 'battery',
							'version': 1,
						},
						{
							'id': 'temperatureMeasurement',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '408305ac-c91f-42ff-9b1d-9fc14d83fe9b',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': 'a99366de-14e5-4580-85a7-b0833a80b929',
			'name': 'HVAC-Thermostat',
			'label': 'STS Thermostat 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': 'd10017f9-f72e-49ae-9d00-073d606717fc',
			'components': [
				{
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
				},
			],
			'profile': {
				'id': '96406249-c14c-4d0e-8dd2-f62fbe381e78',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': 'ab555251-04ef-4df9-afb9-37d95d36d2be',
			'name': 'c2c-rgbw-color-bulb',
			'label': 'STS Bulb 2',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'switchLevel',
							'version': 1,
						},
						{
							'id': 'colorControl',
							'version': 1,
						},
						{
							'id': 'colorTemperature',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '4d24a797-e0c0-45ad-8725-04aa6eb2eeb1',
			},
			'viper': {},
			'type': 'VIPER',
		},
		{
			'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
			'name': 'c2c-switch',
			'label': 'STS Switch 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '7eaca7e4-dd01-4711-8e20-1a869bb44b1b',
			},
			'viper': {},
			'type': 'VIPER',
		},
	],
	'_links': {},
}
export default {request, response}
