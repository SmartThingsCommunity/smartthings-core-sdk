const request = {
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
}
const response = {
	'items': [],
	'_links': {
		'next': null,
		'previous': null,
	},
}
export default {request, response}
