const request = {
	'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446/rooms',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'items': [
		{
			'roomId': 'd10017f9-f72e-49ae-9d00-073d606717fc',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'name': 'Living room',
			'backgroundImage': null,
		},
		{
			'roomId': '717ce958-49c6-4448-8544-fa2da2e7592b',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'name': 'Kitchen',
			'backgroundImage': null,
		},
	],
	'_links': null,
}
export default { request, response }
