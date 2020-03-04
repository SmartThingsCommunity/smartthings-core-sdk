const request = {
	'url': 'https://api.smartthings.com/rules',
	'method': 'post',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	},
	'params': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293'
	},
	'data': {
		'name': 'Functional Test Action Rule',
		'actions': [
			{
				'command': {
					'devices': [
						'385931b6-0121-4848-bcc8-54cb76436de1'
					],
					'commands': [
						{
							'component': 'main',
							'capability': 'switch',
							'command': 'on',
							'arguments': []
						}
					]
				}
			}
		]
	}
}
const response = {
	'name': 'Functional Test Action Rule',
	'actions': [
		{
			'command': {
				'devices': [
					'385931b6-0121-4848-bcc8-54cb76436de1'
				],
				'commands': [
					{
						'component': 'main',
						'capability': 'switch',
						'command': 'on',
						'arguments': []
					}
				]
			}
		}
	],
	'id': '437f4243-389a-4299-b5ed-059edbf08b16'
}
export default {request, response}
