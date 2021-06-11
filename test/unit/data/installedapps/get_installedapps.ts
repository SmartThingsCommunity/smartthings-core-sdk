const request = {
	'url': 'https://api.smartthings.com/installedapps',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'params': {},
}
const response = {
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
}
export default {request, response}
