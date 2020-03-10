const request = {
	'url': 'https://api.smartthings.com/schema/installedapps/location/95efee9b-6073-4871-b5ba-de6642187293',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'installedSmartApps': [
		{
			'isaId': 'df5dd5f2-7080-4c0b-8bbb-1b64e05ccbd5',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'icon': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
			'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
			'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/z37Twjyvo3isl3Du',
			'partnerName': 'Virtual STS',
			'appName': 'Virtual STS',
		},
		{
			'isaId': 'b6588a4f-6244-4ba1-8d44-0f725aee1c29',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'icon': 'https://catalog3rd.samsungiotcloud.com/devws/C6LlW0MaxWWfpZaj',
			'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/C6LlW0MaxWWfpZaj',
			'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/C6LlW0MaxWWfpZaj',
			'partnerName': 'Virtual C2C Devices',
			'appName': 'Virtual C2C Devices',
		},
	],
}
export default {request, response}
