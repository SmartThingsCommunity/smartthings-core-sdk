const request = {
	'url': 'https://api.smartthings.com/devices',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/vnd.smartthings+json;v=20170916',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
	'params': { 'installedAppId': 'f2b6aff2-832b-4d00-8d31-04b16d8f37c7' },
}
const response = {
	items: [
		{
			'deviceId': '0fb6e57e-bc77-47c9-b78e-17d5ec504236',
			'name': 'Virtual-Appliance-Dishwasher',
			'label': 'Dishwasher',
			'manufacturerName': '0ACp',
			'presentationId': 'virtual-appliance',
			'locationId': '49036240-f18c-46f4-b47f-6be473c80a9b',
			'roomId': 'e095c6b1-6a73-4017-9f69-55fd5ae1466f',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'momentary',
							'version': 1,
						},
						{
							'id': 'execute',
							'version': 1,
						},
					],
					'categories': [
						{
							'name': 'Dishwasher',
						},
					],
				},
			],
			'app': {
				'installedAppId': 'f2b6aff2-832b-4d00-8d31-04b16d8f37c7',
				'externalId': 'undefined',
				'profile': {
					'id': '3e5c8e13-2854-4416-b283-d4de222ee988',
				},
			},
			'type': 'ENDPOINT_APP',
			'restrictionTier': 0,
		},
	],
	_links: {
	},
}
export default { request, response }
