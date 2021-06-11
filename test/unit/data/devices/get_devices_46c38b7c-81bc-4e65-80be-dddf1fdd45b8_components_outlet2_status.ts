const request = {
	'url': 'https://api.smartthings.com/devices/46c38b7c-81bc-4e65-80be-dddf1fdd45b8/components/outlet2/status',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'switch': {
		'switch': {
			'value': 'off',
		},
	},
}
export default {request, response}
