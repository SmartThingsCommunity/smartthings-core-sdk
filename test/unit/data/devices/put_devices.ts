const request = {
	'url': 'https://api.smartthings.com/devices/6f5ea629-4c05-4a90-a244-cc129b0a80c3',
	'method': 'put',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'data': {
		'label': 'Living room light',
	},
}
const response = {
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
}
export default {request, response}
