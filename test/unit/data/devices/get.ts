export const get_devices = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {},
	},
	response: {
		items: [
			{
				'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
				'name': 'c2c-switch',
				'label': 'STS Switch 1',
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
		],
		'_links': {
			'next': {
				'href': 'https://api.smartthings.com/devices?page=1&max=200',
			},
		},
	},
}

export const get_devices_page_1_max_200 = {
	request: {
		'url': 'https://api.smartthings.com/devices?page=1&max=200',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		items: [
			{
				'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfd',
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
		],
		'_links': {
			'previous': {
				'href': 'https://api.smartthings.com/devices?page=0&max=200',
			},
		},
	},
}

export const get_devices_locationId_95efee9b_6073_4871_b5ba_de6642187293 = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		},
	},
	response: {
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
	},
}

export const get_devices_health_locationId_95efee9b_6073_4871_b5ba_de6642187293 = {
	request: {
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
	},
	response: {
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
	},
}

export const get_devices_status_locationId_95efee9b_6073_4871_b5ba_de6642187293 = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'includeStatus': 'true',
		},
	},
	response: {
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
	},
}

export const get_devices_385931b6_0121_4848_bcc8_54cb76436de1 = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {},
	},
	response: {
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
}

export const get_devices_385931b6_0121_4848_bcc8_54cb76436de1_status = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/status',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
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
	},
}

export const get_devices_385931b6_0121_4848_bcc8_54cb76436de1_components_main_capabilities_colorTemperature_status = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/components/main/capabilities/colorTemperature/status',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'colorTemperature': {
			'value': 3000,
			'unit': 'K',
		},
	},
}

export const get_devices_46c38b7c_81bc_4e65_80be_dddf1fdd45b8_components_outlet1_status = {
	request: {
		'url': 'https://api.smartthings.com/devices/46c38b7c-81bc-4e65-80be-dddf1fdd45b8/components/outlet1/status',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'switch': {
			'switch': {
				'value': 'on',
			},
		},
	},
}

export const get_devices_46c38b7c_81bc_4e65_80be_dddf1fdd45b8_components_outlet2_status = {
	request: {
		'url': 'https://api.smartthings.com/devices/46c38b7c-81bc-4e65-80be-dddf1fdd45b8/components/outlet2/status',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'switch': {
			'switch': {
				'value': 'off',
			},
		},
	},
}

export const get_devices_385931b6_0121_4848_bcc8_54cb76436de1_health = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/health',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
		'state': 'ONLINE',
		'lastUpdatedDate': '2020-02-18T22:40:44.000+0000',
	},
}

export const list_devices_by_type = {
	request: {
		url: 'https://api.smartthings.com/devices',
		method: 'get',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Accept: 'application/vnd.smartthings+json;v=20170916',
			Authorization: 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		params: { type: 'HUB' },
	},
	response: {
		items: [
			{
				deviceId: 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
				name: 'SmartThings v3 Hub',
				label: 'SmartThings Hub',
				locationId: '95efee9b-6073-4871-b5ba-de6642187293',
				components: [
					{
						id: 'main',
						capabilities: [
							{
								id: 'bridge',
								version: 1,
							},
						],
						categories: [
							{
								name: 'Hub',
							},
						],
					},
				],
				profile: {
					id: '7eaca7e4-dd01-4711-8e20-1a869bb44b1b',
				},
				type: 'HUB',
			},
		],
		_links: {
		},
	},
}

export const list_devices_by_isa = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': { 'installedAppId': 'f2b6aff2-832b-4d00-8d31-04b16d8f37c7' },
	},
	response: {
		items: [
			{
				'deviceId': '0fb6e57e-bc77-47c9-b78e-17d5ec504236',
				'name': 'Virtual-Appliance-Dishwasher',
				'label': 'Dishwasher',
				'manufacturerName': '0ACp',
				'presentationId': 'virtual-appliance',
				'locationId': '49036240-f18c-46f4-b47f-6be473c80a9b',
				'roomId': 'e095c6b1-6a73-4017-9f69-55fd5ae1466f',
				'components': [
					{
						'id': 'main',
						'capabilities': [
							{
								'id': 'momentary',
								'version': 1,
							},
							{
								'id': 'execute',
								'version': 1,
							},
						],
						'categories': [
							{
								'name': 'Dishwasher',
							},
						],
					},
				],
				'app': {
					'installedAppId': 'f2b6aff2-832b-4d00-8d31-04b16d8f37c7',
					'externalId': 'undefined',
					'profile': {
						'id': '3e5c8e13-2854-4416-b283-d4de222ee988',
					},
				},
				'type': 'ENDPOINT_APP',
				'restrictionTier': 0,
			},
		],
		_links: {
		},
	},
}

export const get_preferences = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/preferences',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/vnd.smartthings+json;v=20170916',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
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
	},
}
