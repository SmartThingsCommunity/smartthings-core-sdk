export const put_deviceprofiles_149476cd_3ca9_4e62_ba40_a399e558b2bf = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles/149476cd-3ca9-4e62-ba40-a399e558b2bf',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'components': [
				{
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
		'status': 'DEVELOPMENT',
	},
}

export const put_deviceprofiles_3acbf2fc_6be2_4be0_aeb5_c10f4ff357bb_i18n_fr = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles/3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb/i18n/fr',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'tag': 'fr',
			'components': {
				'main': {
					'label': 'Alimentation Principale',
					'description': 'Contrôle l\'alimentation de toutes les prises',
				},
				'outlet1': {
					'label': 'Sortie Un',
					'description': 'Prise de courant commutable 1',
				},
				'outlet2': {
					'label': 'Sortie Deux',
					'description': 'Prise de courant commutable 2',
				},
			},
		},
	},
	response: {
		'tag': 'fr',
		'components': {
			'main': {
				'label': 'Alimentation Principale',
				'description': 'Contrôle l\'alimentation de toutes les prises',
			},
			'outlet1': {
				'label': 'Sortie Un',
				'description': 'Prise de courant commutable 1',
			},
			'outlet2': {
				'label': 'Sortie Deux',
				'description': 'Prise de courant commutable 2',
			},
		},
	},
}
