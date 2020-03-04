const request = {
	'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/modes',
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
			'id': '801c7097-800c-46dd-b17d-1145cd1922c2',
			'label': 'Night',
			'name': 'Night'
		},
		{
			'id': 'ab7d4dc0-c0de-4276-a5dc-6b3a230f1bc7',
			'label': 'Home',
			'name': 'Home'
		},
		{
			'id': 'a2114683-3145-4acd-a4ce-e988cf362918',
			'label': 'Away',
			'name': 'Away'
		}
	]
}
export default {request, response}
