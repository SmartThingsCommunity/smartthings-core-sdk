const request = {
	'url': 'https://api.smartthings.com/installedapps/e09af197-4a51-42d9-8fd9-a39a67049d4a/configs',
	'method': 'put',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'data': {
		'config': {
			'triggerSwitch': [
				{
					'valueType': 'DEVICE',
					'deviceConfig': {
						'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
						'componentId': 'main',
						'permissions': [
							'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						],
					},
				},
			],
			'targetSwitch': [
				{
					'valueType': 'DEVICE',
					'deviceConfig': {
						'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'componentId': 'main',
						'permissions': [
							'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
							'x:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
						],
					},
				},
				{
					'valueType': 'DEVICE',
					'deviceConfig': {
						'deviceId': '8cfb5b5f-1683-4459-932c-9493c63da626',
						'componentId': 'main',
						'permissions': [
							'r:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
							'x:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
						],
					},
				},
				{
					'valueType': 'DEVICE',
					'deviceConfig': {
						'deviceId': '46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
						'componentId': 'main',
						'permissions': [
							'r:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
							'x:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
						],
					},
				},
			],
		},
	},
}
const response = {
	'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
	'configurationId': '95758b7b-6a37-45fc-9702-c6d5609c7241',
	'configurationStatus': 'STAGED',
	'config': {
		'triggerSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
					'componentId': 'main',
					'permissions': [
						'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
		],
		'targetSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
					'componentId': 'main',
					'permissions': [
						'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'x:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': '8cfb5b5f-1683-4459-932c-9493c63da626',
					'componentId': 'main',
					'permissions': [
						'r:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
						'x:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': '46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
					'componentId': 'main',
					'permissions': [
						'r:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
						'x:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
		],
	},
	'createdDate': '2020-02-29T15:51:18Z',
	'lastUpdatedDate': '2020-02-29T15:51:18Z',
}
export default {request, response}
