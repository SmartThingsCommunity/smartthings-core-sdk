export const get_info = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'subscriptions': [],
		'city': 'Mountain View',
		'latitude': 37.402,
		'longitude': -122.048,
	},
}

export const get_info_explicit = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/ea451fc7-067f-4cff-a935-f8b66db2e530',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'locationId': 'ea451fc7-067f-4cff-a935-f8b66db2e530',
		'subscriptions': [],
		'city': 'Mountain View',
		'latitude': 37.402,
		'longitude': -122.048,
	},
}

export const get_capabilities = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'name': [
			'airQuality',
			'forecast',
			'weather',
		],
	},
}

export const get_capabilities_weather = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'name': 'weather',
		},
	},
	'response': {
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
	},
}

export const get_capabilities_weather_forecast = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/capabilities',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'name': 'weather,forecast',
		},
	},
	'response': {
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
	},
}
