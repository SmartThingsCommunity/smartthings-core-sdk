export const get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms = {
	'request': {
		'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'items': [
			{
				'roomId': 'd10017f9-f72e-49ae-9d00-073d606717fc',
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'name': 'Living room',
				'backgroundImage': null,
			},
			{
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'name': 'Kitchen',
				'backgroundImage': null,
			},
		],
		'_links': null,
	},
}

export const get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_rooms = {
	'request': {
		'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446/rooms',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'items': [
			{
				'roomId': 'd10017f9-f72e-49ae-9d00-073d606717fc',
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'name': 'Living room',
				'backgroundImage': null,
			},
			{
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'name': 'Kitchen',
				'backgroundImage': null,
			},
		],
		'_links': null,
	},
}

export const get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms_717ce958 = {
	'request': {
		'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms/717ce958-49c6-4448-8544-fa2da2e7592b',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'name': 'Kitchen',
		'backgroundImage': null,
	},
}

export const get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_rooms_717ce958 = {
	'request': {
		'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446/rooms/717ce958-49c6-4448-8544-fa2da2e7592b',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'name': 'Kitchen',
		'backgroundImage': null,
	},
}

export const get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms_717ce958_devices = {
	'request': {
		'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms/717ce958-49c6-4448-8544-fa2da2e7592b/devices',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'items': [
			{
				'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
				'ownerId': null,
				'name': 'c2c-rgbw-color-bulb',
				'label': 'STS Bulb 1',
				'deviceManufacturerCode': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'components': [
					{
						'id': 'main',
						'label': null,
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
								'status': null,
							},
							{
								'id': 'switchLevel',
								'version': 1,
								'status': null,
							},
							{
								'id': 'colorControl',
								'version': 1,
								'status': null,
							},
							{
								'id': 'colorTemperature',
								'version': 1,
								'status': null,
							},
							{
								'id': 'refresh',
								'version': 1,
								'status': null,
							},
							{
								'id': 'healthCheck',
								'version': 1,
								'status': null,
							},
						],
						'categories': [],
					},
				],
				'childDevices': [],
				'profile': {
					'id': '4d24a797-e0c0-45ad-8725-04aa6eb2eeb1',
				},
				'app': null,
				'ble': null,
				'bleD2D': null,
				'dth': null,
				'hub': null,
				'mobile': null,
				'ir': null,
				'irOcf': null,
				'viper': {
					'uniqueIdentifier': null,
					'manufacturerName': 'STS',
					'modelName': 'c2c-rgbw-color-bulb',
					'swVersion': null,
					'hwVersion': null,
				},
				'type': 'VIPER',
				'vid': 'SmartThings-smartthings-c2c-rgbw-color-bulb',
				'mnmn': 'SmartThings',
				'ocfDeviceType': 'oic.d.light',
			},
			{
				'deviceId': '79b75c24-1ab0-487e-a046-08cb9e860c1d',
				'ownerId': null,
				'name': 'c2c-contact-3',
				'label': 'STS Open/Close 1',
				'deviceManufacturerCode': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'components': [
					{
						'id': 'main',
						'label': null,
						'capabilities': [
							{
								'id': 'contactSensor',
								'version': 1,
								'status': null,
							},
							{
								'id': 'battery',
								'version': 1,
								'status': null,
							},
							{
								'id': 'refresh',
								'version': 1,
								'status': null,
							},
							{
								'id': 'healthCheck',
								'version': 1,
								'status': null,
							},
						],
						'categories': [],
					},
				],
				'childDevices': [],
				'profile': {
					'id': '7417af19-8d1f-40ed-92ce-b64e2a44af52',
				},
				'app': null,
				'ble': null,
				'bleD2D': null,
				'dth': null,
				'hub': null,
				'mobile': null,
				'ir': null,
				'irOcf': null,
				'viper': {
					'uniqueIdentifier': null,
					'manufacturerName': 'STS',
					'modelName': 'c2c-contact-3',
					'swVersion': null,
					'hwVersion': null,
				},
				'type': 'VIPER',
				'vid': 'SmartThings-smartthings-c2c-contact-3',
				'mnmn': 'SmartThings',
				'ocfDeviceType': 'x.com.st.d.sensor.contact',
			},
			{
				'deviceId': '8cfb5b5f-1683-4459-932c-9493c63da626',
				'ownerId': null,
				'name': 'c2c-motion',
				'label': 'STS Motion 1',
				'deviceManufacturerCode': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'components': [
					{
						'id': 'main',
						'label': null,
						'capabilities': [
							{
								'id': 'motionSensor',
								'version': 1,
								'status': null,
							},
							{
								'id': 'battery',
								'version': 1,
								'status': null,
							},
							{
								'id': 'temperatureMeasurement',
								'version': 1,
								'status': null,
							},
							{
								'id': 'refresh',
								'version': 1,
								'status': null,
							},
							{
								'id': 'healthCheck',
								'version': 1,
								'status': null,
							},
						],
						'categories': [],
					},
				],
				'childDevices': [],
				'profile': {
					'id': '408305ac-c91f-42ff-9b1d-9fc14d83fe9b',
				},
				'app': null,
				'ble': null,
				'bleD2D': null,
				'dth': null,
				'hub': null,
				'mobile': null,
				'ir': null,
				'irOcf': null,
				'viper': {
					'uniqueIdentifier': null,
					'manufacturerName': 'STS',
					'modelName': 'c2c-motion',
					'swVersion': null,
					'hwVersion': null,
				},
				'type': 'VIPER',
				'vid': 'SmartThings-smartthings-c2c-motion',
				'mnmn': 'SmartThings',
				'ocfDeviceType': 'x.com.st.d.sensor.motion',
			},
			{
				'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
				'ownerId': null,
				'name': 'c2c-switch',
				'label': 'STS Switch 1',
				'deviceManufacturerCode': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
				'components': [
					{
						'id': 'main',
						'label': null,
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
								'status': null,
							},
							{
								'id': 'refresh',
								'version': 1,
								'status': null,
							},
							{
								'id': 'healthCheck',
								'version': 1,
								'status': null,
							},
						],
						'categories': [],
					},
				],
				'childDevices': [],
				'profile': {
					'id': '7eaca7e4-dd01-4711-8e20-1a869bb44b1b',
				},
				'app': null,
				'ble': null,
				'bleD2D': null,
				'dth': null,
				'hub': null,
				'mobile': null,
				'ir': null,
				'irOcf': null,
				'viper': {
					'uniqueIdentifier': null,
					'manufacturerName': 'STS',
					'modelName': 'c2c-switch',
					'swVersion': null,
					'hwVersion': null,
				},
				'type': 'VIPER',
				'vid': 'SmartThings-smartthings-c2c-switch',
				'mnmn': 'SmartThings',
				'ocfDeviceType': 'oic.d.switch',
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}
