const request = {
	'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms/717ce958-49c6-4448-8544-fa2da2e7592b/devices',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	}
}
const response = {
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
							'status': null
						},
						{
							'id': 'switchLevel',
							'version': 1,
							'status': null
						},
						{
							'id': 'colorControl',
							'version': 1,
							'status': null
						},
						{
							'id': 'colorTemperature',
							'version': 1,
							'status': null
						},
						{
							'id': 'refresh',
							'version': 1,
							'status': null
						},
						{
							'id': 'healthCheck',
							'version': 1,
							'status': null
						}
					],
					'categories': []
				}
			],
			'childDevices': [],
			'profile': {
				'id': '4d24a797-e0c0-45ad-8725-04aa6eb2eeb1'
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
				'hwVersion': null
			},
			'type': 'VIPER',
			'vid': 'SmartThings-smartthings-c2c-rgbw-color-bulb',
			'mnmn': 'SmartThings',
			'ocfDeviceType': 'oic.d.light'
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
							'status': null
						},
						{
							'id': 'battery',
							'version': 1,
							'status': null
						},
						{
							'id': 'refresh',
							'version': 1,
							'status': null
						},
						{
							'id': 'healthCheck',
							'version': 1,
							'status': null
						}
					],
					'categories': []
				}
			],
			'childDevices': [],
			'profile': {
				'id': '7417af19-8d1f-40ed-92ce-b64e2a44af52'
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
				'hwVersion': null
			},
			'type': 'VIPER',
			'vid': 'SmartThings-smartthings-c2c-contact-3',
			'mnmn': 'SmartThings',
			'ocfDeviceType': 'x.com.st.d.sensor.contact'
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
							'status': null
						},
						{
							'id': 'battery',
							'version': 1,
							'status': null
						},
						{
							'id': 'temperatureMeasurement',
							'version': 1,
							'status': null
						},
						{
							'id': 'refresh',
							'version': 1,
							'status': null
						},
						{
							'id': 'healthCheck',
							'version': 1,
							'status': null
						}
					],
					'categories': []
				}
			],
			'childDevices': [],
			'profile': {
				'id': '408305ac-c91f-42ff-9b1d-9fc14d83fe9b'
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
				'hwVersion': null
			},
			'type': 'VIPER',
			'vid': 'SmartThings-smartthings-c2c-motion',
			'mnmn': 'SmartThings',
			'ocfDeviceType': 'x.com.st.d.sensor.motion'
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
							'status': null
						},
						{
							'id': 'refresh',
							'version': 1,
							'status': null
						},
						{
							'id': 'healthCheck',
							'version': 1,
							'status': null
						}
					],
					'categories': []
				}
			],
			'childDevices': [],
			'profile': {
				'id': '7eaca7e4-dd01-4711-8e20-1a869bb44b1b'
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
				'hwVersion': null
			},
			'type': 'VIPER',
			'vid': 'SmartThings-smartthings-c2c-switch',
			'mnmn': 'SmartThings',
			'ocfDeviceType': 'oic.d.switch'
		}
	],
	'_links': {
		'next': null,
		'previous': null
	}
}
export default {request, response}
