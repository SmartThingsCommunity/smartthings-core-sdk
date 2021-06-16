import { ConfigValueType } from '../../../../src'


export const put_installedapps_e09af197_4a51_42d9_8fd9_a39a67049d4a = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/e09af197-4a51-42d9-8fd9-a39a67049d4a',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'displayName': 'Updated Functional Test Switch Reflector',
		},
	},
	'response': {
		'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
		'installedAppType': 'WEBHOOK_SMART_APP',
		'installedAppStatus': 'PENDING',
		'displayName': 'Updated Functional Test Switch Reflector',
		'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
		'referenceId': null,
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'owner': {
			'ownerType': 'USER',
			'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
		},
		'notices': [],
		'createdDate': '2020-02-29T15:51:17Z',
		'lastUpdatedDate': '2020-02-29T15:51:18Z',
		'ui': {
			'pluginId': null,
			'pluginUri': null,
			'dashboardCardsEnabled': false,
			'preInstallDashboardCardsEnabled': false,
		},
		'iconImage': {
			'url': null,
		},
		'classifications': [
			'AUTOMATION',
		],
		'principalType': 'LOCATION',
		'singleInstance': false,
	},
}

export const put_installedapps_e09af197_4a51_42d9_8fd9_a39a67049d4a_configs = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/e09af197-4a51-42d9-8fd9-a39a67049d4a/configs',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			config: {
				'triggerSwitch': [
					{
						'valueType': ConfigValueType.DEVICE,
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
						'valueType': ConfigValueType.DEVICE,
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
						'valueType': ConfigValueType.DEVICE,
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
						'valueType': ConfigValueType.DEVICE,
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
	},
	'response': {
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
	},
}
