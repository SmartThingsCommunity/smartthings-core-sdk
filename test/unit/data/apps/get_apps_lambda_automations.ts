const request = {
	'url': 'https://api.smartthings.com/apps',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {'appType': 'LAMBDA_SMART_APP', 'classification': 'AUTOMATION'},
}
const response = {
	'items': [
		{
			'appName': 'bob-sa-sdk-latency-v1',
			'appId': '997d4193-d768-4425-a334-78c34240785f',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'SA SDK Latency V1',
			'description': 'Simple switch reflector',
			'iconImage': {},
			'createdDate': '2020-02-24T18:20:57Z',
			'lastUpdatedDate': '2020-02-24T18:20:57Z',
		},
		{
			'appName': 'bob-sa-sdk-latency-v2',
			'appId': 'd9a6049d-06a0-4bb5-a1a8-dc47c70f2a4c',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'SA SDK Latency V2',
			'description': 'Simple switch reflector',
			'iconImage': {},
			'createdDate': '2020-02-24T18:21:36Z',
			'lastUpdatedDate': '2020-02-24T18:21:37Z',
		},
		{
			'appName': 'demohouse-1567481665364-257',
			'appId': '5598193a-bcd0-418e-bd8c-0de19d87a952',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Demo House',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-09-03T03:34:26Z',
			'lastUpdatedDate': '2019-11-20T01:13:43Z',
		},
		{
			'appName': 'demohousestaging-1575906765074-428',
			'appId': '190ad0af-9d92-4c1c-9015-afb9a0a7f272',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Demo House (staging)',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-12-09T15:52:45Z',
			'lastUpdatedDate': '2019-12-10T12:42:00Z',
		},
		{
			'appName': 'smartfloorplan-1579465520512-787',
			'appId': 'e35ab7dc-af72-4599-875a-61dcf8c00d15',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Smart Floor Plan',
			'description': 'Provides IoT device status and control on a floor plan of your home',
			'iconImage': {},
			'createdDate': '2020-01-19T20:25:21Z',
			'lastUpdatedDate': '2020-01-19T20:25:21Z',
		},
		{
			'appName': 'temp-test-lambda-app-abc123',
			'appId': '07e24fd4-6aec-4f2a-be1e-3b29da92885e',
			'appType': 'LAMBDA_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Temporary Test Lambda App',
			'description': 'A temporary test app',
			'iconImage': {},
			'createdDate': '2020-01-14T23:55:34Z',
			'lastUpdatedDate': '2020-01-14T23:55:35Z',
		},
	],
	'_links': {},
}
export default {request, response}
