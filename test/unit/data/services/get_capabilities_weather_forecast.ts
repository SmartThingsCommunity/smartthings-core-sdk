const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer c486f217-e128-4915-a5c9-947603f2f1c1',
	},
	'params': {
		'name': 'weather,forecast',
	},
}
const response = {
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'forecast': {
		'temperatureAmount4hour': {
			'value': 12,
			'unit': 'C',
		},
		'temperatureAmount10hour': {
			'value': 9,
			'unit': 'C',
		},
		'snow24hour': {
			'value': 0,
			'unit': 'cm',
		},
		'temperatureAmount6hour': {
			'value': 11,
			'unit': 'C',
		},
		'temperatureAmount9hour': {
			'value': 9,
			'unit': 'C',
		},
		'precip1hour': {
			'value': 0,
			'unit': 'mm',
		},
		'temperatureAmount3hour': {
			'value': 13,
			'unit': 'C',
		},
		'temperatureAmount11hour': {
			'value': 8,
			'unit': 'C',
		},
		'version': {
			'value': 'v3.0',
		},
		'temperatureAmount1hour': {
			'value': 12,
			'unit': 'C',
		},
		'temperatureAmount5hour': {
			'value': 11,
			'unit': 'C',
		},
		'snow1hour': {
			'value': 0,
			'unit': 'cm',
		},
		'vendor': {
			'value': 'TheWeatherChannel',
		},
		'temperatureAmount8hour': {
			'value': 10,
			'unit': 'C',
		},
		'temperatureAmount7hour': {
			'value': 10,
			'unit': 'C',
		},
		'precip24hour': {
			'value': 2.03,
			'unit': 'mm',
		},
		'temperatureAmount2hour': {
			'value': 12,
			'unit': 'C',
		},
		'temperatureAmount12hour': {
			'value': 8,
			'unit': 'C',
		},
		'snow6hour': {
			'value': 0,
			'unit': 'cm',
		},
		'precip6hour': {
			'value': 0.76,
			'unit': 'mm',
		},
	},
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
