export const post_devices_385931b6_0121_4848_bcc8_54cb76436de1_events = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/events',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'deviceEvents': [
				{
					'component': 'main',
					'capability': 'switchLevel',
					'attribute': 'level',
					'value': 0,
				},
			],
		},
	},
	response: {},
}

export const post_devices_385931b6_0121_4848_bcc8_54cb76436de1_commands = {
	request: {
		'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/commands',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'commands': [
				{
					'component': 'main',
					'capability': 'switch',
					'command': 'on',
					'arguments': [],
				},
			],
		},
	},
	response: {},
}

export const post_devices = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'label': 'Living room light',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'app': {
				'profileId': '6f5ea629-4c05-4a90-a244-cc129b0a80c3',
				'installedAppId': '6f5ea629-4c05-4a90-a244-cc129b0a80c3',
				'externalId': 'Th13390',
			},
		},
	},
	response: {
		'deviceId': '6f5ea629-4c05-4a90-a244-cc129b0a80c3',
		'name': 'color.light.100x',
		'label': 'Living room light',
		'deviceManufacturerCode': '010F-0B01-2002',
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'roomId': '0fd2b1ef-1b33-4a54-9153-65aca91e9660',
		'components': [
			{
				'id': 'main',
				'label': 'string',
				'capabilities': [
					{
						'id': 'switch',
						'version': 1,
					},
				],
			},
		],
		'app': {
			'installedAppId': '0c0b935d-0616-4441-a0bf-da7aeec3dc0a',
			'externalId': 'Th13390',
			'profile': {
				'id': 'a7b3c264-2d22-416e-bca1-ca4b59a60aee',
			},
		},
		'type': 'ENDPOINT_APP',
	},
}

export const post_devices_2 = {
	request: {
		'url': 'https://api.smartthings.com/devices',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'label': 'Living room light',
			'locationId': 'c54591e2-a3f3-419a-8526-ce3ff9c3b0f8',
			'app': {
				'profileId': '6f5ea629-4c05-4a90-a244-cc129b0a80c3',
				'installedAppId': '871ae474-8341-418e-ace1-1d72ec22311d',
				'externalId': 'Th13390',
			},
		},
	},
	response: {
		'deviceId': 'a4e8694e-a1aa-4d6b-9d5d-2e3db908de77',
		'name': 'color.light.100x',
		'label': 'Living room light',
		'deviceManufacturerCode': '010F-0B01-2002',
		'locationId': 'c54591e2-a3f3-419a-8526-ce3ff9c3b0f8',
		'roomId': '0fd2b1ef-1b33-4a54-9153-65aca91e9660',
		'components': [
			{
				'id': 'main',
				'label': 'string',
				'capabilities': [
					{
						'id': 'switch',
						'version': 1,
					},
				],
			},
		],
		'app': {
			'installedAppId': '871ae474-8341-418e-ace1-1d72ec22311d',
			'externalId': 'Th13390',
			'profile': {
				'id': '6f5ea629-4c05-4a90-a244-cc129b0a80c3',
			},
		},
		'type': 'ENDPOINT_APP',
	},
}
