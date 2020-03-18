const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/subscriptions',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer c486f217-e128-4915-a5c9-947603f2f1c1',
	},
	'data': {
		'type': 'EXECUTION',
		'isaId': '881c4ddf-5399-4576-8ff6-df9f582e737a',
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
