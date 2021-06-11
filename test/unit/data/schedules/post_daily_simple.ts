const request = {
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
}
const response = {
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
}
export default {request, response}
