export const delete_installedapps_subscriptions_one = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/5336bd07-435f-4b6c-af1d-fddba55c1c24/subscriptions/eventHandler',
		'method': 'delete',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'count': 1,
	},
}

export const delete_installedapps_subscriptions_all = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/5336bd07-435f-4b6c-af1d-fddba55c1c24/subscriptions',
		'method': 'delete',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	'response': {
		'count': 3,
	},
}
