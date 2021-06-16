export const get_installedapps = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'installedAppType': 'WEBHOOK_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'Functional Test Switch Reflector',
				'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-02-27T22:52:34Z',
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
				'restrictionTier': 0,
			},
			{
				'installedAppId': '24eac88d-ee09-42f8-b4ac-72f2e91b8ac4',
				'installedAppType': 'LAMBDA_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'SA SDK Latency V1',
				'appId': '997d4193-d768-4425-a334-78c34240785f',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T17:22:19Z',
				'lastUpdatedDate': '2020-02-27T17:22:38Z',
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
				'restrictionTier': 20,
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_locationId_95efee9b_6073_4871_b5ba_de6642187293 = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'installedAppType': 'WEBHOOK_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'Functional Test Switch Reflector',
				'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-02-27T22:52:34Z',
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
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_installedAppType_WEBHOOK_SMART_APP = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'installedAppType': [
				'WEBHOOK_SMART_APP',
				'LAMBDA_SMART_APP',
			],
		},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'installedAppType': 'WEBHOOK_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'Functional Test Switch Reflector',
				'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-02-27T22:52:34Z',
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
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_installedAppStatus_AUTHORIZED = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'installedAppStatus': 'AUTHORIZED',
			'deviceId': 'e3893344-372d-46f5-bd3f-e98a5da6cf8d',
		},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'installedAppType': 'WEBHOOK_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'Functional Test Switch Reflector',
				'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-02-27T22:52:34Z',
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
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c',
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
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'installedAppType': 'WEBHOOK_SMART_APP',
				'installedAppStatus': 'AUTHORIZED',
				'displayName': 'Functional Test Switch Reflector',
				'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
				'referenceId': null,
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'notices': [],
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-02-27T22:52:34Z',
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
				'restrictionTier': 10,
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'configurationId': 'fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d',
				'configurationStatus': 'STAGED',
				'createdDate': '2020-03-03T21:48:05Z',
				'lastUpdatedDate': '2020-03-03T21:48:05Z',
			},
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'configurationId': '52764f0b-6bfa-4771-8e31-f5e59ebdbf24',
				'configurationStatus': 'REVOKED',
				'createdDate': '2020-02-27T22:52:33Z',
				'lastUpdatedDate': '2020-03-03T21:47:57Z',
			},
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'configurationId': 'e9428d01-6710-45f0-85a4-e31e51d011fe',
				'configurationStatus': 'AUTHORIZED',
				'createdDate': '2020-03-03T21:47:42Z',
				'lastUpdatedDate': '2020-03-03T21:47:57Z',
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs_noauth = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'configurationStatus': 'AUTHORIZED',
		},
	},
	'response': {
		'items': [],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs_configurationStatus_authorized = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'configurationStatus': 'AUTHORIZED',
		},
	},
	'response': {
		'items': [
			{
				'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
				'configurationId': 'e9428d01-6710-45f0-85a4-e31e51d011fe',
				'configurationStatus': 'AUTHORIZED',
				'createdDate': '2020-03-03T21:47:42Z',
				'lastUpdatedDate': '2020-03-03T21:47:57Z',
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs_authorized = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/e9428d01-6710-45f0-85a4-e31e51d011fe',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
		'configurationId': 'e9428d01-6710-45f0-85a4-e31e51d011fe',
		'configurationStatus': 'AUTHORIZED',
		'config': {
			'triggerSwitch': [
				{
					'valueType': 'DEVICE',
					'stringConfig': null,
					'deviceConfig': {
						'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'componentId': 'main',
						'permissions': [
							'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
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
						'deviceId': 'ab555251-04ef-4df9-afb9-37d95d36d2be',
						'componentId': 'main',
						'permissions': [
							'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
							'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
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
						'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
						'componentId': 'main',
						'permissions': [
							'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
							'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						],
					},
					'permissionConfig': null,
					'modeConfig': null,
					'sceneConfig': null,
					'messageConfig': null,
				},
			],
		},
		'createdDate': '2020-03-03T21:47:42Z',
		'lastUpdatedDate': '2020-03-03T21:47:57Z',
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs_revoked = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/52764f0b-6bfa-4771-8e31-f5e59ebdbf24',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
		'configurationId': '52764f0b-6bfa-4771-8e31-f5e59ebdbf24',
		'configurationStatus': 'REVOKED',
		'config': {
			'triggerSwitch': [
				{
					'valueType': 'DEVICE',
					'stringConfig': null,
					'deviceConfig': {
						'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'componentId': 'main',
						'permissions': [
							'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
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
						'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
						'componentId': 'main',
						'permissions': [
							'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
							'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						],
					},
					'permissionConfig': null,
					'modeConfig': null,
					'sceneConfig': null,
					'messageConfig': null,
				},
			],
		},
		'createdDate': '2020-02-27T22:52:33Z',
		'lastUpdatedDate': '2020-03-03T21:47:57Z',
	},
}

export const get_installedapps_40593b6d_e062_436a_b17e_86ea3f1d979c_configs_staged = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
		'configurationId': 'fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d',
		'configurationStatus': 'STAGED',
		'config': {
			'triggerSwitch': [
				{
					'valueType': 'DEVICE',
					'stringConfig': null,
					'deviceConfig': {
						'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'componentId': 'main',
						'permissions': [
							'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
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
						'deviceId': 'ab555251-04ef-4df9-afb9-37d95d36d2be',
						'componentId': 'main',
						'permissions': [
							'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
							'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
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
						'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
						'componentId': 'main',
						'permissions': [
							'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
							'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						],
					},
					'permissionConfig': null,
					'modeConfig': null,
					'sceneConfig': null,
					'messageConfig': null,
				},
			],
		},
		'createdDate': '2020-03-03T21:48:05Z',
		'lastUpdatedDate': '2020-03-03T21:48:05Z',
	},
}

export const get_installedapps_e09af197_4a51_42d9_8fd9_a39a67049d4a_configs_ = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/e09af197-4a51-42d9-8fd9-a39a67049d4a/configs',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {},
	},
	'response': {
		'items': [
			{
				'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
				'configurationId': '95758b7b-6a37-45fc-9702-c6d5609c7241',
				'configurationStatus': 'STAGED',
				'createdDate': '2020-02-29T15:51:18Z',
				'lastUpdatedDate': '2020-02-29T15:51:18Z',
			},
			{
				'installedAppId': 'e09af197-4a51-42d9-8fd9-a39a67049d4a',
				'configurationId': 'f1c9ddca-cc1f-4391-a955-5485d849c23e',
				'configurationStatus': 'DONE',
				'createdDate': '2020-02-29T15:51:17Z',
				'lastUpdatedDate': '2020-02-29T15:51:17Z',
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_installedapps_me = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/me',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'installedAppId': '5336bd07-435f-4b6c-af1d-fddba55c1c24',
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'scope': [
			'r:devices:5d5a44a6-8859-4574-adc7-03a28171a76d',
			'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
			'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
		],
	},
}
