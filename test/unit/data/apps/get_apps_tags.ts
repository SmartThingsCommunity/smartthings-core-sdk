const request = {
	'url': 'https://api.smartthings.com/apps',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {'tag:industry': 'energy', 'tag:region': 'North America'},
}
const response = {
	'items': [
		{
			'appName': 'api-app-minimal-test-1571702766897-128',
			'appId': '3238e691-d3b0-4486-90e4-cc28f32b6784',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'API Access Minimal Test',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-10-22T00:06:07Z',
			'lastUpdatedDate': '2019-11-04T23:35:04Z',
		},
		{
			'appName': 'api-app-subscription-example-2-1571770714389-755',
			'appId': 'c27a69f8-57b8-498e-8704-ea62be3d32f8',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'api-app-subscription-example-2',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-10-22T18:58:34Z',
			'lastUpdatedDate': '2019-10-22T21:11:28Z',
		},
		{
			'appName': 'api-app-subscription-test-1571704633875-935',
			'appId': 'c5a19a9b-2d88-40e6-9c55-ad177c5db73d',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'api-app-subscription-test',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-10-22T00:37:14Z',
			'lastUpdatedDate': '2019-10-22T00:37:15Z',
		},
		{
			'appName': 'bob-florian-scene-control-test-20191014',
			'appId': '7941981b-91aa-451d-b063-da30ea0a775c',
			'appType': 'API_ONLY',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Simple API App Example',
			'description': 'Demonstrates basics of a SmartThings API app which authenticates with the SmartThings platform using OAuth2',
			'iconImage': {},
			'createdDate': '2019-10-14T16:47:31Z',
			'lastUpdatedDate': '2019-10-14T16:47:31Z',
		},
		{
			'appName': 'bobs-api-app-test-20191014-1',
			'appId': '85ff2561-fe8a-495f-ba68-e719c7fcf12d',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'API App Subscription Example',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-10-14T14:44:31Z',
			'lastUpdatedDate': '2019-10-21T22:28:18Z',
		},
		{
			'appName': 'scenecontroller-1565367408854-853',
			'appId': 'f56f6f71-7a2a-4cd2-8a0b-6902bf80ed89',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'Scene Controller',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-08-09T16:16:49Z',
			'lastUpdatedDate': '2019-08-09T16:16:50Z',
		},
		{
			'appName': 'scratchapisubscriptionexample-1575374507848-969',
			'appId': '02ef84da-984e-43a6-b7cc-905c88183e9e',
			'appType': 'API_ONLY',
			'classifications': [
				'CONNECTED_SERVICE',
			],
			'displayName': 'Scratch API Subscription Example',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-12-03T12:01:48Z',
			'lastUpdatedDate': '2019-12-03T12:07:47Z',
		},
	],
	'_links': {},
}
export default {request, response}
