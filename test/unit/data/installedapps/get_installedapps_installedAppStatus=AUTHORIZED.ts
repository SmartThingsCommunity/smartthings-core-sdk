const request = {
	'url': 'https://api.smartthings.com/installedapps',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {
		'installedAppStatus': 'AUTHORIZED',
		'deviceId': 'e3893344-372d-46f5-bd3f-e98a5da6cf8d',
	},
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
		},
	],
	'_links': {
		'next': null,
		'previous': null,
	},
}
export default {request, response}
