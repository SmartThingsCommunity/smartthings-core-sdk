const request = {
	'url': 'https://api.smartthings.com/schema/installedapps/df5dd5f2-7080-4c0b-8bbb-1b64e05ccbd5',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'isaId': 'df5dd5f2-7080-4c0b-8bbb-1b64e05ccbd5',
	'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
	'pageType': 'loggedIn',
	'devices': [
		{
			'deviceId': '6ff76312-fc5a-4914-86fe-bfd53b8062b5',
			'name': 'STS Open/Close 1',
		},
		{
			'deviceId': '07d8bfdb-7c5f-49eb-a244-904609681c58',
			'name': 'STS Thermostat 1',
		},
		{
			'deviceId': '3d5eb326-4bc6-4650-ba00-b95ad9eb4ae6',
			'name': 'STS Switch 1',
		},
		{
			'deviceId': '23485d24-7b6d-472b-96a2-1dc0b5b6ce31',
			'name': 'STS Bulb 2',
		},
		{
			'deviceId': '012df352-4049-42e5-8bfe-467c89b2199a',
			'name': 'STS Switch 2',
		},
		{
			'deviceId': '36c7b8da-e6e5-43d8-bc1c-8f7a7de53440',
			'name': 'STS Two Channel',
		},
		{
			'deviceId': '42549735-8678-466c-8909-6a10b89ca276',
			'name': 'STS Motion 1',
		},
		{
			'deviceId': '282782bc-1d50-4578-b2a9-7d5756b4865e',
			'name': 'STS Bulb 1',
		},
	],
	'icon': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
	'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
	'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
	'partnerName': 'Virtual STS',
	'appName': 'Virtual STS',
}
export default {request, response}
