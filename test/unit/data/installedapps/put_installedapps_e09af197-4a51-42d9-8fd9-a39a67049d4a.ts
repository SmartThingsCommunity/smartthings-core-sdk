const request = {
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
}
const response = {
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
}
export default {request, response}
