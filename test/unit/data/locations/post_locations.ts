const request = {
	'url': 'https://api.smartthings.com/locations',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'data': {
		'countryCode': 'USA',
		'name': 'Created by Functional Tests',
		'latitude': 37,
		'longitude': -122,
		'regionRadius': 100,
		'temperatureScale': 'F',
		'locale': 'en_US',
	},
}
const response = {
	'locationId': '152b4d07-88fb-450d-896c-a82896efd83f',
	'name': 'Created by Functional Tests',
	'countryCode': 'USA',
	'latitude': 37,
	'longitude': -122,
	'regionRadius': 100,
	'temperatureScale': 'F',
	'timeZoneId': 'America/Los_Angeles',
	'locale': 'en-US',
	'backgroundImage': null,
	'additionalProperties': {},
}
export default {request, response}
