import { AppClassification, AppTargetStatus, AppType, SignatureType } from '../../../../endpoint/apps'
import { OwnerType, PrincipalType } from '../../../../types'


const data = {
	app: {
		'appName': 'closetlightdemo-1574275255572-598',
		'appId': '91e13c71-4321-4fe7-a5ad-bb4f80967ad3',
		'appType': AppType.WEBHOOK_SMART_APP,
		'principalType': PrincipalType.LOCATION,
		'classifications': [AppClassification.AUTOMATION],
		'displayName': 'Closet Light Demo',
		'description': 'Description',
		'singleInstance': false,
		'installMetadata': {
			'certified': 'false',
			'maxInstalls': '500',
		},
		'owner': {
			'ownerType': OwnerType.USER,
			'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
		},
		'createdDate': '2019-11-20T18:40:56Z',
		'lastUpdatedDate': '2019-12-23T17:14:26Z',
		'webhookSmartApp': {
			'targetUrl': 'https://smartthings.ngrok.io',
			'targetStatus': AppTargetStatus.CONFIRMED,
			'signatureType': SignatureType.ST_PADLOCK,
		},
		'ui': {
			'pluginUri': '',
			'dashboardCardsEnabled': false,
			'preInstallDashboardCardsEnabled': false,
		},
	},
}

export default data
