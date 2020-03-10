const request = {
	'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/52764f0b-6bfa-4771-8e31-f5e59ebdbf24',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
	'configurationId': '52764f0b-6bfa-4771-8e31-f5e59ebdbf24',
	'configurationStatus': 'REVOKED',
	'config': {
		'triggerSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
					'componentId': 'main',
					'permissions': [
						'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
		],
		'targetSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
					'componentId': 'main',
					'permissions': [
						'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
		],
	},
	'createdDate': '2020-02-27T22:52:33Z',
	'lastUpdatedDate': '2020-03-03T21:47:57Z',
}
export default {request, response}
