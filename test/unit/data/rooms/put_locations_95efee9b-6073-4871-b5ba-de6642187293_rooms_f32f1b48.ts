const request = {
	'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/rooms/f32f1b48-58ab-441b-8240-10860cc52618',
	'method': 'put',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'data': {
		'name': 'Test Room Renamed',
	},
}
const response = {
	'roomId': 'f32f1b48-58ab-441b-8240-10860cc52618',
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'name': 'Test Room Renamed',
	'backgroundImage': null,
}
export default {request, response}
