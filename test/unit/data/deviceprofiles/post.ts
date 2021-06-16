export const post_deviceprofiles = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'Functional Test Switch',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
					],
					'categories': [],
				},
			],
			'metadata': {
				'vid': 'simple-switch',
				'deviceType': 'Switch',
				'ocfDeviceType': 'oic.d.switch',
				'mnmn': 'fIIT',
				'deviceTypeId': 'Switch',
				'ocfSpecVer': 'core 1.1.0',
				'mnid': 'fIIT',
				'mnId': 'fIIT',
			},
		},
	},
	response: {
		'id': '149476cd-3ca9-4e62-ba40-a399e558b2bf',
		'name': 'Functional Test Switch',
		'owner': {
			'ownerType': 'USER',
			'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
		},
		'components': [
			{
				'label': 'main',
				'id': 'main',
				'capabilities': [
					{
						'id': 'switch',
						'version': 1,
					},
				],
				'categories': [],
			},
		],
		'metadata': {
			'vid': 'simple-switch',
			'deviceType': 'Switch',
			'ocfDeviceType': 'oic.d.switch',
			'mnmn': 'fIIT',
			'deviceTypeId': 'Switch',
			'ocfSpecVer': 'core 1.1.0',
			'mnid': 'fIIT',
			'mnId': 'fIIT',
		},
		'status': 'DEVELOPMENT',
	},
}

export const post_deviceprofiles_149476cd_3ca9_4e62_ba40_a399e558b2bf_status = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles/149476cd-3ca9-4e62-ba40-a399e558b2bf/status',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'deviceProfileStatus': 'PUBLISHED',
		},
	},
	response: {
		'id': '149476cd-3ca9-4e62-ba40-a399e558b2bf',
		'name': 'Functional Test Switch',
		'owner': {
			'ownerType': 'USER',
			'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
		},
		'components': [
			{
				'label': 'main',
				'id': 'main',
				'capabilities': [
					{
						'id': 'switch',
						'version': 1,
					},
					{
						'id': 'switchLevel',
						'version': 1,
					},
				],
				'categories': [],
			},
		],
		'metadata': {
			'vid': 'simple-dimmer',
			'deviceType': 'Light',
			'ocfDeviceType': 'oic.d.light',
			'mnmn': 'fIIT',
			'deviceTypeId': 'Light',
			'ocfSpecVer': 'core 1.1.0',
			'mnid': 'fIIT',
			'mnId': 'fIIT',
		},
		'status': 'PUBLISHED',
	},
}
