import { SubscriptionSource } from '../../../../src'


export const post_installedapps_subscriptions = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/5336bd07-435f-4b6c-af1d-fddba55c1c24/subscriptions',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'sourceType': SubscriptionSource.DEVICE,
			'device': {
				'deviceId': '736e3903-001c-4d40-b408-ff40d162a06b',
				'componentId': 'freezer',
				'capability': 'temperatureMeasurement',
				'attribute': 'temperature',
				'stateChangeOnly': true,
				'modes': [
					'e34b57fb-e73a-4228-8819-e99502d17890',
					'cfa3a42e-5f52-452e-9515-c32bcbea48ce',
				],
			},
		},
	},
	'response': {
		'id': '5e1b134b-bd85-4125-9c25-4a8291e754aa',
		'installedAppId': 'fb05c874-cf1d-406a-930c-69a081e0eaee',
		'sourceType': 'DEVICE',
		'device': {
			'componentId': 'main',
			'deviceId': 'e457978e-5e37-43e6-979d-18112e12c961,',
			'capability': 'contactSensor,',
			'attribute': 'contact,',
			'stateChangeOnly': 'true,',
			'subscriptionName': 'contact_subscription',
			'value': '*',
		},
	},
}
