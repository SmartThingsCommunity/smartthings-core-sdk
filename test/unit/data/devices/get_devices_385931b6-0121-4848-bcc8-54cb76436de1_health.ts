const request = {
	'url': 'https://api.smartthings.com/devices/385931b6-0121-4848-bcc8-54cb76436de1/health',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
	'state': 'ONLINE',
	'lastUpdatedDate': '2020-02-18T22:40:44.000+0000',
}
export default {request, response}
