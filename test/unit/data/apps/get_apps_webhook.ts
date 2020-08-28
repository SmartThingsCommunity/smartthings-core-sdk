const request = {
	'url': 'https://api.smartthings.com/apps',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {'appType': 'WEBHOOK_SMART_APP'},
}
const response = {
	'items': [
		{
			'appName': 'closetlightdemo-1574275255572-598',
			'appId': '91e13c71-4321-4fe7-a5ad-bb4f80967ad3',
			'appType': 'WEBHOOK_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Closet Light Demo',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-11-20T18:40:56Z',
			'lastUpdatedDate': '2020-02-24T22:45:51Z',
		},
		{
			'appName': 'demohouselocal-1567511132081-776',
			'appId': 'cbfe1381-55a5-4006-aecb-786a0772122a',
			'appType': 'WEBHOOK_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Demo House (Local)',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-09-03T11:45:32Z',
			'lastUpdatedDate': '2019-10-18T20:00:56Z',
		},
		{
			'appName': 'eac2cswitch-1576157053431-231',
			'appId': '9bb91ea9-823a-4489-9d18-b1ff19513a27',
			'appType': 'WEBHOOK_SMART_APP',
			'classifications': [
				'CONNECTED_SERVICE',
				'DEVICE',
			],
			'displayName': 'EA C2C Switch',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-12-12T13:24:13Z',
			'lastUpdatedDate': '2019-12-12T13:24:13Z',
		},
		{
			'appName': 'easimplec2c-1576155234487-109',
			'appId': '8b689e7b-eaa3-4f31-b851-2c4ecd37f3ac',
			'appType': 'WEBHOOK_SMART_APP',
			'classifications': [
				'CONNECTED_SERVICE',
				'DEVICE',
			],
			'displayName': 'EA Simple C2C',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-12-12T12:53:58Z',
			'lastUpdatedDate': '2019-12-12T12:53:59Z',
		},
		{
			'appName': 'temperatureindicator-1573489391827-189',
			'appId': 'a6193eb0-479f-4087-b96d-a80c87150647',
			'appType': 'WEBHOOK_SMART_APP',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'Temperature Indicator',
			'description': 'Sets the color of a light depending on a temperature',
			'iconImage': {},
			'createdDate': '2019-11-11T16:23:12Z',
			'lastUpdatedDate': '2019-11-11T16:23:13Z',
		},
	],
	'_links': {},
}
export default {request, response}
