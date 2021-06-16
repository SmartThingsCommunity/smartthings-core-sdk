export const get_locations = {
	'request': {
		'url': 'https://api.smartthings.com/locations',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'items': [
			{
				'locationId': '55445e89-23df-40f1-99db-4aa8f1995dcf',
				'name': 'General Testing',
			},
			{
				'locationId': '8572417a-748e-43cd-bf61-5d80a77902a9',
				'name': 'Aria',
			},
			{
				'locationId': 'ae19304f-034b-4c14-9bef-b35375385c7b',
				'name': 'First Look Test',
			},
			{
				'locationId': '49036240-f18c-46f4-b47f-6be473c80a9b',
				'name': 'MV Office',
			},
			{
				'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
				'name': 'Test Location',
			},
			{
				'locationId': '8d17bc64-1a98-4cf5-9428-4408783a2121',
				'name': 'Smart Floor Plan',
			},
			{
				'locationId': 'b4db3e54-14f3-4bf4-b217-b8583757d446',
				'name': 'Location 1/22',
			},
			{
				'locationId': 'e1b473ab-a831-4a55-b8ec-189a599740bc',
				'name': 'Icon Trst',
			},
		],
		'_links': null,
	},
}

export const get_locations_95efee9b_6073_4871_b5ba_de6642187293 = {
	'request': {
		'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
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

export const get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446 = {
	'request': {
		'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
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
	},
}
