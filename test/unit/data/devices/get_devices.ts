const request = {
	'url': 'https://api.smartthings.com/devices',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
	'params': {},
}
const response = {
	items: [
		{
			'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
			'name': 'c2c-switch',
			'label': 'STS Switch 1',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'refresh',
							'version': 1,
						},
						{
							'id': 'healthCheck',
							'version': 1,
						},
					],
				},
			],
			'profile': {
				'id': '7eaca7e4-dd01-4711-8e20-1a869bb44b1b',
			},
			'viper': {},
			'type': 'VIPER',
		},
	],
	'_links': {
		'next': {
			'href': 'https://api.smartthings.com/devices?page=1&max=200',
		},
	},
}
export default {request, response}
