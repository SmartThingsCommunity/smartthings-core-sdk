import { AppClassification, AppType, SignatureType } from '../../../../src/endpoint/apps'


const data = {
	'appName': 'my-silly-app-name',
	'displayName': 'Example Smart App',
	'description': 'Just an example',
	'singleInstance': false,
	'appType': AppType.WEBHOOK_SMART_APP,
	'classifications': [AppClassification.AUTOMATION],
	'webhookSmartApp': {
		'targetUrl': 'https://foobar.com/smartapp}',
		'signatureType': SignatureType.ST_PADLOCK,
	},
	'oauth': {
		'clientName': 'Example Smart App',
		'scope': [
			'r:devices:*',
			'x:devices:*',
		],
	},
}

export default data
