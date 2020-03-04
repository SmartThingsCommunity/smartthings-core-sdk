const request = {
	'url': 'https://api.smartthings.com/installedapps/me',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	}
}
const response = {
	'installedAppId': '5336bd07-435f-4b6c-af1d-fddba55c1c24',
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'scope': [
		'r:devices:5d5a44a6-8859-4574-adc7-03a28171a76d',
		'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
		'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be'
	]
}
export default {request, response}
