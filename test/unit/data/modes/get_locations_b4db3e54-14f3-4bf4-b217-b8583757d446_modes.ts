const request = {
	'url': 'https://api.smartthings.com/locations/b4db3e54-14f3-4bf4-b217-b8583757d446/modes',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	}
}
const response = {
	'items': [
		{
			'id': 'c6b6ff59-9112-4709-87cd-fba20afc2df7',
			'label': 'Night',
			'name': 'Night'
		},
		{
			'id': 'c0a015c4-2b42-44b9-9968-f789aadfca1c',
			'label': 'Away',
			'name': 'Away'
		},
		{
			'id': 'da0813bd-5d85-48e0-9ef0-c214af8b14aa',
			'label': 'Home',
			'name': 'Home'
		}
	]
}
export default {request, response}
