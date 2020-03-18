const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer c486f217-e128-4915-a5c9-947603f2f1c1',
	},
	'params': {
		'name': 'weather',
	},
}
const response = {
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'weather': {
		'cloudCoverPhrase': {
			'value': 'Cloudy',
		},
		'visibility': {
			'value': 16.09,
			'unit': 'Km',
		},
		'windDirectionCardinal': {
			'value': 'NW',
		},
		'version': {
			'value': 'v3.0',
		},
		'wxPhraseLong': {
			'value': 'Mostly Cloudy',
		},
		'sunriseTimeLocal': {
			'value': 1585144992000,
		},
		'sunsetTimeLocal': {
			'value': 1585189499000,
		},
		'vendor': {
			'value': 'TheWeatherChannel',
		},
		'expirationTime': {
			'value': 1585164654000,
		},
		'relativeHumidity': {
			'value': 59,
			'unit': '%',
		},
		'temperature': {
			'value': 12,
			'unit': 'C',
		},
		'uvDescription': {
			'value': 'Moderate',
		},
		'iconCode': {
			'value': 28,
		},
		'windDirection': {
			'value': 310,
			'unit': '°',
		},
		'conditionState': {
			'value': 'CLEAR',
		},
		'uvIndex': {
			'value': 4,
		},
		'windSpeed': {
			'value': 10,
			'unit': 'Km/h',
		},
		'temperatureFeelsLike': {
			'value': 12,
			'unit': 'C',
		},
		'cloudCeiling': {
			'value': 6500,
			'unit': 'm',
		},
	},
}
export default {request, response}
