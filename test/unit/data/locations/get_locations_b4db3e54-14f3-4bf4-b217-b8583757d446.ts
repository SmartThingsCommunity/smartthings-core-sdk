const request = {
	'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'locationId': 'b4db3e54-14f3-4bf4-b217-b8583757d446',
	'name': 'Location 1/22',
	'countryCode': 'USA',
	'latitude': 37.37458,
	'longitude': -122.06233,
	'regionRadius': 250,
	'temperatureScale': 'F',
	'timeZoneId': 'America/Los_Angeles',
	'locale': 'en',
	'backgroundImage': null,
	'additionalProperties': {},
}
export default {request, response}
