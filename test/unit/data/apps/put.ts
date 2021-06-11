export const put_apps_a01c0ba4_3ac2_4a5c_9628_c43e394c1ea2_signature_type = {
	request: {
		'url': 'https://api.smartthings.com/apps/a01c0ba4-3ac2-4a5c-9628-c43e394c1ea2/signature-type',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'signatureType': 'ST_PADLOCK',
		},
	},
	response: {},
}

export const put_apps_sdktest_234_1582991474199_oauth = {
	request: {
		'url': 'https://api.smartthings.com/apps/sdktest-234-1582991474199/oauth',
		'method': 'put',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'clientName': 'SDK Test App',
			'scope': [
				'i:deviceprofiles:*',
				'r:devices:*',
				'x:devices:*',
				'r:scenes:*',
				'x:scenes:*',
			],
			'redirectUris': [],
		},
	},
	response: {
		'clientName': 'SDK Test App',
		'scope': [
			'i:deviceprofiles:$',
			'r:devices:$',
			'x:devices:*',
			'r:scenes:*',
			'r:devices:*',
			'i:deviceprofiles:*',
			'x:scenes:*',
			'x:devices:$',
		],
		'redirectUris': [],
	},
}
