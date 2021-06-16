export const post_schema_apps = {
	'request': {
		'url': 'https://api.smartthings.com/schema/apps',
		'method': 'post',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
		'data': {
			'appName': 'Functional Test Schema App',
			'partnerName': 'Functional Test',
			'hostingType': 'lambda',
			'oAuthAuthorizationUrl': 'https://st-schema.ngrok.io/oauth/login',
			'oAuthClientId': '15245388-2660-4a3e-a1be-1e276dba1377',
			'oAuthClientSecret': '90459b40-cc1a-4f4e-8a50-0b8bca9892b4',
			'oAuthTokenUrl': 'https://st-schema.ngrok.io/oauth/token',
			'icon': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'lambdaArn': 'arn:aws:lambda:us-east-1:084870046141:function:st-virtual-devices',
		},
	},
	'response': {
		'endpointAppId': 'viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53',
		'stClientId': 'aabdc28c-7f72-4380-a419-aeb52b27e0b4',
		'stClientSecret': '51d713160873792a7ceacda72125128abea8965b0c18176304371396e2d76fbf565402c66845c33a32fdaf912a44aa9fffc50c4186961229ca3a3f6f3fc75a8ccd27bba72a69ec66028d985fb8111bfce9e4bbcf67cda6310eb7414e4ddac3ebb2a0052890d3ed8a543c094832ccbfe3bdde53a428a5709a0efdd8a25c15312a7307860d97cf216e3e0433dff99f7babc9ada40266ba35172c05ffc505f1fc11cf8c2e41d5b2c13668bc1013029b8885138b8ffa5ef16dcce3cb81efe2cdf9db092d06511bc0ff7ab41af5d42f6483723938487bff15ef3efe9adec21201fcddcb434472cbf71249ae43f5cd9d053a2d598ce00efc7727301729b12575629844',
	},
}
