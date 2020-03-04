const request = {
	'url': 'https://api.smartthings.com/scenes',
	'method': 'get',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	},
}
const response = {
	'items': [
		{
			'sceneId': 'a2847398-fe89-43ae-9309-0cf2bfec9e02',
			'sceneName': 'Good Night',
			'sceneIcon': '200',
			'sceneColor': null,
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'createdBy': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			'createdDate': 1581189422000,
			'lastUpdatedDate': 1582612667000,
			'lastExecutedDate': 1582990765000,
			'editable': false,
			'apiVersion': 'ocfmode'
		},
		{
			'sceneId': '13a63ff0-587e-45d2-8c4e-b40525f2093c',
			'sceneName': 'Good Morning',
			'sceneIcon': '200',
			'sceneColor': null,
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'createdBy': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			'createdDate': 1581189457000,
			'lastUpdatedDate': 1582612638000,
			'lastExecutedDate': 1582990762000,
			'editable': false,
			'apiVersion': 'ocfmode'
		},
		{
			'sceneId': 'd6bb2387-d022-453c-8747-b9665b8697f1',
			'sceneName': 'Temp',
			'sceneIcon': '200',
			'sceneColor': null,
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'createdBy': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			'createdDate': 1581190971000,
			'lastUpdatedDate': 1581190971000,
			'lastExecutedDate': null,
			'editable': false,
			'apiVersion': 'ocfmode'
		},
		{
			'sceneId': '90b36cd5-c017-47ca-8ebd-045ca63b571f',
			'sceneName': 'Goodbye',
			'sceneIcon': '200',
			'sceneColor': null,
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'createdBy': 'c257d2c7-332b-d60d-808d-550bfbd54556',
			'createdDate': 1582612476000,
			'lastUpdatedDate': 1582612587000,
			'lastExecutedDate': 1582612680000,
			'editable': false,
			'apiVersion': 'ocfmode'
		}
	],
	'_links': {
		'next': null,
		'previous': null
	}
}
export default {request, response}
