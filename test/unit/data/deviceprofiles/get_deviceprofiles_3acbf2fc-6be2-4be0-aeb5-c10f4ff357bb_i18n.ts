const request = {
	'url': 'https://api.smartthings.com/deviceprofiles/3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb/i18n',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d',
	},
}
const response = {
	'items': [
		{
			'tag': 'en',
		},
		{
			'tag': 'es',
		},
	],
}
export default {request, response}
