const request = {
	'url': 'https://api.smartthings.com/locations/0bcbe542-d340-42a9-b00a-a2067170810e',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	'name': 'Test Location',
	'countryCode': 'USA',
	'latitude': 37.402418282078415,
	'longitude': -122.04800345246598,
	'regionRadius': 150,
	'temperatureScale': 'F',
	'timeZoneId': 'America/Los_Angeles',
	'locale': 'en_US',
	'backgroundImage': null,
	'additionalProperties': {},
}
export default {request, response}
