export const post_subscription = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/subscriptions',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'type': 'DIRECT',
			'isaId': '881c4ddf-5399-4576-8ff6-df9f582e737a',
			'capabilities': [
				'weather',
			],
			'predicate': 'weather.temperature.value <= 12',
		},
	},
	'response': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'subscriptionId': '55fca73f-6d70-447c-ba4e-47bcf98e7f7f',
	},
}

export const post_subscription_explicit = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/subscriptions',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'type': 'DIRECT',
			'isaId': '43357bf4-2687-4f9f-8ae6-5ba92c745cab',
			'capabilities': [
				'weather',
			],
			'predicate': 'weather.temperature.value <= 12',
		},
	},
	'response': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'subscriptionId': '55fca73f-6d70-447c-ba4e-47bcf98e7f7f',
	},
}

export const post_subscription_execution = {
	'request': {
		'url': 'https://api.smartthings.com/services/coordinate/locations/95efee9b-6073-4871-b5ba-de6642187293/subscriptions',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'type': 'EXECUTION',
			'isaId': '881c4ddf-5399-4576-8ff6-df9f582e737a',
			'capabilities': [
				'weather',
			],
			'predicate': 'weather.temperature.value <= 12',
		},
	},
	'response': {
		'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
		'subscriptionId': '55fca73f-6d70-447c-ba4e-47bcf98e7f7f',
	},
}
