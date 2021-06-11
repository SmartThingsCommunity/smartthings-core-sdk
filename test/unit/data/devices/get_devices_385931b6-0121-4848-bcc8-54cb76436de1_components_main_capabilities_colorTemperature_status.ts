const request = {
	'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/components/main/capabilities/colorTemperature/status',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'colorTemperature': {
		'value': 3000,
		'unit': 'K',
	},
}
export default {request, response}
