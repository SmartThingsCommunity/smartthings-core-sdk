const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/subscriptions',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer c486f217-e128-4915-a5c9-947603f2f1c1',
	},
	'data': {
		'type': 'DIRECT',
		'isaId': '43357bf4-2687-4f9f-8ae6-5ba92c745cab',
		'capabilities': [
			'weather',
		],
		'predicate': 'weather.temperature.value <= 12',
	},
}
const response = {
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'subscriptionId': '55fca73f-6d70-447c-ba4e-47bcf98e7f7f',
}
export default {request, response}
