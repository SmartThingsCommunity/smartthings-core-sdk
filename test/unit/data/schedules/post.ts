export const post_daily = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/39d84b7a-edf8-4213-b256-122d90a94b3e/schedules',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'onSchedule',
			'cron': {
				'expression': '35 16 * * ? *',
				'timezone': 'PST',
			},
		},
	},
	'response': {
		'scheduledExecutions': [
			1583763662000,
		],
		'name': 'refreshHandler',
		'cron': {
			'expression': '35 16 * * ? *',
			'timezone': 'PST',
		},
		'installedAppId': '39d84b7a-edf8-4213-b256-122d90a94b3e',
		'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	},
}

export const post_daily_simple = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/39d84b7a-edf8-4213-b256-122d90a94b3e/schedules',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'onSchedule',
			'cron': {
				'expression': '45 9 * * ? *',
				'timezone': 'PST',
			},
		},
	},
	'response': {
		'scheduledExecutions': [
			1583763662000,
		],
		'name': 'refreshHandler',
		'cron': {
			'expression': '45 9 * * ? *',
			'timezone': 'PST',
		},
		'installedAppId': '39d84b7a-edf8-4213-b256-122d90a94b3e',
		'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	},
}

export const post_daily_date = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/39d84b7a-edf8-4213-b256-122d90a94b3e/schedules',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'onSchedule',
			'cron': {
				'expression': '30 14 * * ? *',
				'timezone': 'UTC',
			},
		},
	},
	'response': {
		'scheduledExecutions': [
			1583763662000,
		],
		'name': 'refreshHandler',
		'cron': {
			'expression': '30 14 * * ? *',
			'timezone': 'UTC',
		},
		'installedAppId': '39d84b7a-edf8-4213-b256-122d90a94b3e',
		'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	},
}

export const post_daily_location = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/39d84b7a-edf8-4213-b256-122d90a94b3e/schedules',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'onSchedule',
			'cron': {
				'expression': '35 16 * * ? *',
				'timezone': 'America/Los_Angeles',
			},
		},
	},
	'response': {
		'scheduledExecutions': [
			1583763662000,
		],
		'name': 'refreshHandler',
		'cron': {
			'expression': '35 16 * * ? *',
			'timezone': 'America/Los_Angeles',
		},
		'installedAppId': '39d84b7a-edf8-4213-b256-122d90a94b3e',
		'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	},
}

export const post_once = {
	'request': {
		'url': 'https://api.smartthings.com/installedapps/39d84b7a-edf8-4213-b256-122d90a94b3e/schedules',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'name': 'onOnce',
			'once': {
				'time': 1584891000000,
				'overwrite': true,
			},
		},
	},
	'response': {
		'scheduledExecutions': null,
		'name': 'preGameStart',
		'cron': null,
		'installedAppId': '39d84b7a-edf8-4213-b256-122d90a94b3e',
		'locationId': '0bcbe542-d340-42a9-b00a-a2067170810e',
	},
}
