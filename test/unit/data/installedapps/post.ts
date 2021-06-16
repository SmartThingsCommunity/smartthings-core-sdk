import { ConfigValueType, InstallConfigurationStatus, InstalledAppType } from '../../../../src'


export const post_installedapps = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'installedAppType': InstalledAppType.WEBHOOK_SMART_APP,
			'configurationStatus': InstallConfigurationStatus.DONE,
			'config': {
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
				],
			},
		},
	},
	'response': {
		'installedApp': {
			'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
			'installedAppType': 'WEBHOOK_SMART_APP',
			'installedAppStatus': 'PENDING',
			'displayName': 'Functional Test Switch Reflector',
			'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
			'referenceId': null,
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'owner': {
				'ownerType': 'USER',
				'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			},
			'notices': [],
			'createdDate': '2020-02-29T15:51:17Z',
			'lastUpdatedDate': '2020-02-29T15:51:17Z',
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
		'configurationDetail': {
			'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
			'configurationId': 'f1c9ddca-cc1f-4391-a955-5485d849c23e',
			'configurationStatus': 'DONE',
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
				],
			},
			'createdDate': '2020-02-29T15:51:17Z',
			'lastUpdatedDate': '2020-02-29T15:51:17Z',
		},
	},
}
