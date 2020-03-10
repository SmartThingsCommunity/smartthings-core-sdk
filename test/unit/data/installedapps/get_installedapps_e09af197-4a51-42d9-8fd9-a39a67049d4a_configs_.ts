const request = {
	'url': 'https://api.smartthings.com/installedapps/e09af197-4a51-42d9-8fd9-a39a67049d4a/configs',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {},
}
const response = {
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
}
export default {request, response}
