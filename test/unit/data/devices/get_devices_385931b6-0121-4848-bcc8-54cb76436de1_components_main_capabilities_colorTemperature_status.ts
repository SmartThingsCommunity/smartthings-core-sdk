const request = {
	'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/components/main/capabilities/colorTemperature/status',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'colorTemperature': {
		'value': 3000,
		'unit': 'K',
	},
}
export default {request, response}
