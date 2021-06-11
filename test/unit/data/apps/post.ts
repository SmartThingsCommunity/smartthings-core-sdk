import { AppType, SignatureType, AppClassification } from '../../../../src'


export const post_apps_requireConfirmation_false_signatureType_APP_RSA = {
	request: {
		'url': 'https://api.smartthings.com/apps',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'params': {
			'requireConfirmation': true,
			'signatureType': 'APP_RSA',
		},
		'data': {
			'appName': 'sdktest-234-1582991474199',
			'displayName': 'zzz SDK Functional Test App 1582991474199',
			'description': 'Created by SDK functional testing',
			'singleInstance': true,
			'appType': AppType.WEBHOOK_SMART_APP,
			'classifications': [
				AppClassification.AUTOMATION,
			],
			'webhookSmartApp': {
				'targetUrl': 'https://smartthings-api.ngrok.io/smartapp',
				'signatureType': SignatureType.APP_RSA,
			},
			'oauth': {
				'clientName': 'zzz SDK Functional Test App 1582991474199',
				'scope': [
					'i:deviceprofiles:*',
					'r:devices:*',
					'x:devices:*',
				],
				'redirectUris': [],
			},
		},
	},
	response: {
		'app': {
			'appName': 'sdktest-234-1582991474199',
			'appId': '2778eb84-2880-47c6-a863-2a4801d7222c',
			'appType': 'WEBHOOK_SMART_APP',
			'principalType': 'LOCATION',
			'classifications': [
				'AUTOMATION',
			],
			'displayName': 'zzz SDK Functional Test App 1582991474199',
			'description': 'Created by SDK functional testing',
			'singleInstance': true,
			'installMetadata': {},
			'owner': {
				'ownerType': 'USER',
				'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			},
			'createdDate': '2020-02-29T15:51:14Z',
			'lastUpdatedDate': '2020-02-29T15:51:14Z',
			'webhookSmartApp': {
				'targetUrl': 'https://smartthings-api.ngrok.io/smartapp',
				'targetStatus': 'PENDING',
				'publicKey': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi2VTBwuG99UM6MRduWlveCTLCovloGpM\r\n7j7kOv0GiD89l14e0uho3K3lk5tgThd63UNpoVfvNqg5+/ugk0rJasg+aN4KGwll4RxVaYB5MVzB\r\noCoDuHHBBR3C5ukGNcb+IsKoAYx89Pujtcmnl51FIiHVP6KJc2JYxD8ZbwAZ/TzKWLWPrdKWZpHf\r\nGhNyh8j7bau29xslfyM0VwkUtFhwRTu5r8Vj7iWVi+Wf0VyeNgRAjH2WmtD8ArPHax3Rbt+3SMot\r\nkdIiuj7bMNlHohrgs8lUKvATIbh1wVic8rNV9Zr7u18Ywq/Pzar8V+17HSKkPtHgQeQtDjH8Br54\r\nddzicwIDAQAB\n-----END PUBLIC KEY-----',
				'signatureType': 'APP_RSA',
			},
		},
		'oauthClientId': '136d88dd-49c5-4a34-977a-03ae8dbf89c9',
		'oauthClientSecret': 'cf1b6534-a94f-41f2-82f4-44d7b4368afd',
	},
}

export const post_apps_sdktest_234_1582991474199_oauth_generate = {
	request: {
		'url': 'https://api.smartthings.com/apps/sdktest-234-1582991474199/oauth/generate',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'clientName': 'SDK Test App V2',
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
		'oauthClientDetails': {
			'clientName': 'SDK Test App V2',
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
			'redirectUris': [
				'https://api.smartthings.com/installedapp',
			],
		},
		'oauthClientId': '69d9c4b1-33ab-4237-8ccf-4bc9e55dc13f',
		'oauthClientSecret': 'f5cd07ce-2bbb-40d7-b3ca-67846bb7e829',
	},
}
