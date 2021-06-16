export const get_daily_location = {
	'request': {
		'url': 'https://api.smartthings.com/locations/0bcbe542-d340-42a9-b00a-a2067170810e',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
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
	},
}
