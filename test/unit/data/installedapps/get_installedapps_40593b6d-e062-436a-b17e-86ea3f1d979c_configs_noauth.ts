const request = {
	'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
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
