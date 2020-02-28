import { AppClassification, AppType } from '../../../../src/endpoint/apps'


const data = {
	items: [
		{
			'appName': 'temp-test-lambda-app-abc123',
			'appId': '07e24fd4-6aec-4f2a-be1e-3b29da92885e',
			'appType': AppType.LAMBDA_SMART_APP,
			'classifications': [AppClassification.AUTOMATION],
			'displayName': 'Temporary Test Lambda App',
			'description': 'A temporary test app',
			'iconImage': {},
			'createdDate': '2020-01-14T23:55:34Z',
			'lastUpdatedDate': '2020-01-14T23:55:35Z',
		},
		{
			'appName': 'closetlightdemo-1574275255572-598',
			'appId': '91e13c71-4321-4fe7-a5ad-bb4f80967ad3',
			'appType': AppType.WEBHOOK_SMART_APP,
			'classifications': [AppClassification.AUTOMATION],
			'displayName': 'Closet Light Demo',
			'description': 'Description',
			'iconImage': {},
			'createdDate': '2019-11-20T18:40:56Z',
			'lastUpdatedDate': '2019-12-23T17:14:26Z',
		}],
	'_links': {},
}

export default data
