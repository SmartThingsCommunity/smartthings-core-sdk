const request = {
	'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/modes/current',
	'method': 'put',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'data': {
		'modeId': '7b7ca378-03ed-419d-93c1-76d3bb41c8b3',
	},
}
const response = {
	'id': '7b7ca378-03ed-419d-93c1-76d3bb41c8b3',
	'label': 'Mode Four',
	'name': 'Mode 4',
}
export default {request, response}
