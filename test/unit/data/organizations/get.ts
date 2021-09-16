export const get_organizations = {
	request: {
		'url': 'https://api.smartthings.com/organizations',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		items: [
			{
				'label': 'default user organization',
				'warehouseGroupId': '00000000-0000-0000-0000-000000000000',
				'name': 'orgnamespace1',
				'developerGroupId': '00000000-0000-0000-0000-000000000000',
				'adminGroupId': '00000000-0000-0000-0000-000000000000',
				'organizationId': '00000000-0000-0000-0000-000000000000',
				'isDefaultUserOrg': true,
			},
			{
				'label': 'Organization Two',
				'warehouseGroupId': '00000000-0000-0000-0000-000000000000',
				'name': 'orgnamespace2',
				'developerGroupId': '00000000-0000-0000-0000-000000000000',
				'adminGroupId': '00000000-0000-0000-0000-000000000000',
				'organizationId': '00000000-0000-0000-0000-000000000002',
				'isDefaultUserOrg': false,
			},
			{
				'label': 'Organization Three',
				'warehouseGroupId': '00000000-0000-0000-0000-000000000000',
				'name': 'orgnamespace3',
				'developerGroupId': '00000000-0000-0000-0000-000000000000',
				'adminGroupId': '00000000-0000-0000-0000-000000000000',
				'organizationId': '00000000-0000-0000-0000-000000000003',
				'isDefaultUserOrg': false,
			},
		],
		'_links': null,
	},
}

export const get_an_organization = {
	request: {
		'url': 'https://api.smartthings.com/organizations/00000000-0000-0000-0000-000000000000',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'label': 'default user organization',
		'warehouseGroupId': '00000000-0000-0000-0000-000000000000',
		'name': 'orgnamespace1',
		'developerGroupId': '00000000-0000-0000-0000-000000000000',
		'adminGroupId': '00000000-0000-0000-0000-000000000000',
		'organizationId': '00000000-0000-0000-0000-000000000000',
		'isDefaultUserOrg': true,
	},
}
