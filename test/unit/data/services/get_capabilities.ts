const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer c486f217-e128-4915-a5c9-947603f2f1c1',
	},
}
const response = {
	'name': [
		'airQuality',
		'forecast',
		'weather',
	],
}
export default {request, response}
