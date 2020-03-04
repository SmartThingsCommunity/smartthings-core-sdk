const request = {
	'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/e9428d01-6710-45f0-85a4-e31e51d011fe',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	},
}
const response = {
	'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
	'configurationId': 'e9428d01-6710-45f0-85a4-e31e51d011fe',
	'configurationStatus': 'AUTHORIZED',
	'config': {
		'triggerSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
					'componentId': 'main',
					'permissions': [
						'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc'
					]
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null
			}
		],
		'targetSwitch': [
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': 'ab555251-04ef-4df9-afb9-37d95d36d2be',
					'componentId': 'main',
					'permissions': [
						'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
						'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be'
					]
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null
			},
			{
				'valueType': 'DEVICE',
				'stringConfig': null,
				'deviceConfig': {
					'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
					'componentId': 'main',
					'permissions': [
						'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						'x:devices:385931b6-0121-4848-bcc8-54cb76436de1'
					]
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null
			}
		]
	},
	'createdDate': '2020-03-03T21:47:42Z',
	'lastUpdatedDate': '2020-03-03T21:47:57Z'
}
export default {request, response}
