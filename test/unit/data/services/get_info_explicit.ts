const request = {
	'url': 'https://api.smartthings.com/services/coordinate/locations/ea451fc7-067f-4cff-a935-f8b66db2e530',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'locationId': 'ea451fc7-067f-4cff-a935-f8b66db2e530',
	'subscriptions': [],
	'city': 'Mountain View',
	'latitude': 37.402,
	'longitude': -122.048,
}
export default {request, response}
