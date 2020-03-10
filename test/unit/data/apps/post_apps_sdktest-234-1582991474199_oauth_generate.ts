const request = {
	'url': 'https://api.smartthings.com/apps/sdktest-234-1582991474199/oauth/generate',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'data': {
		'clientName': 'SDK Test App V2',
		'scope': [
			'i:deviceprofiles:*',
			'r:devices:*',
			'x:devices:*',
			'r:scenes:*',
			'x:scenes:*',
		],
		'redirectUris': [],
	},
}
const response = {
	'oauthClientDetails': {
		'clientName': 'SDK Test App V2',
		'scope': [
			'i:deviceprofiles:$',
			'r:devices:$',
			'x:devices:*',
			'r:scenes:*',
			'r:devices:*',
			'i:deviceprofiles:*',
			'x:scenes:*',
			'x:devices:$',
		],
		'redirectUris': [
			'https://api.smartthings.com/installedapp',
		],
	},
	'oauthClientId': '69d9c4b1-33ab-4237-8ccf-4bc9e55dc13f',
	'oauthClientSecret': 'f5cd07ce-2bbb-40d7-b3ca-67846bb7e829',
}
export default {request, response}
