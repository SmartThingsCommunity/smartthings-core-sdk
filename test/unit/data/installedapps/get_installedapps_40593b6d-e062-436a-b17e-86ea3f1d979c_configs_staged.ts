const request = {
	'url': 'https://api.smartthings.com/installedapps/40593b6d-e062-436a-b17e-86ea3f1d979c/configs/fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
	},
}
const response = {
	'installedAppId': '40593b6d-e062-436a-b17e-86ea3f1d979c',
	'configurationId': 'fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d',
	'configurationStatus': 'STAGED',
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
					'deviceId': 'ab555251-04ef-4df9-afb9-37d95d36d2be',
					'componentId': 'main',
					'permissions': [
						'r:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
						'x:devices:ab555251-04ef-4df9-afb9-37d95d36d2be',
					],
				},
				'permissionConfig': null,
				'modeConfig': null,
				'sceneConfig': null,
				'messageConfig': null,
			},
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
	'createdDate': '2020-03-03T21:48:05Z',
	'lastUpdatedDate': '2020-03-03T21:48:05Z',
}
export default {request, response}
