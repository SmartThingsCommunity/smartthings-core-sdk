const request = {
	'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'data': {
		'name': 'Test Room',
	},
}
const response = {
	'roomId': 'f32f1b48-58ab-441b-8240-10860cc52618',
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'name': 'Test Room',
	'backgroundImage': null,
}
export default {request, response}
