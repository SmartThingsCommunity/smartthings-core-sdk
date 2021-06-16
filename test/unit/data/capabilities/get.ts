import { CustomCapabilityStatus, CapabilitySchemaPropertyName } from '../../../../src'


export const get_capability = {
	id: 'namespace.colorTemperature',
	version: 1,
	status: CustomCapabilityStatus.PROPOSED,
	name: 'Color Temperature',
	attributes: {
		colorTemperature: {
			schema: {
				type: 'object',
				properties: {
					value: {
						type: 'integer',
						minimum: 1,
						maximum: 30000,
					},
					unit: {
						type: 'string',
						enum: ['K'],
						default: 'K',
					},
				},
				additionalProperties: false,
				required: [CapabilitySchemaPropertyName.VALUE],
			},
		},
	},
	commands: {
		setColorTemperature: {
			name: 'setColorTemperature',
			arguments: [
				{
					name: 'temperature',
					schema: {
						type: 'integer',
						minimum: 1,
						maximum: 30000,
					},
				},
			],
		},
	},
}

export const get_locales = {
	'items': [
		{
			'tag': 'en',
		},
		{
			'tag': 'it',
		},
		{
			'tag': 'fr',
		},
		{
			'tag': 'es',
		},
	],
}

export const list_namespaces = [
	{
		'name': 'testnamespace12345',
		'ownerType': 'user',
		'ownerId': '0000-0000-0000-0000',
	},
]

export const list_capabilities = {
	items: [
		{
			id: 'switch',
			version: 1,
		},
	],
	'_links': {},
}

export const list_capabilities_1 = {
	items: [
		{
			id: 'switch',
			version: 1,
		},
	],
	'_links': {
		'next': {
			'href': 'https://api.smartthings.com/capabilities/namespaces/testNamespace?page=1&max=200',
		},
	},
}

export const list_capabilities_2 = {
	items: [
		{
			id: 'switch',
			version: 2,
		},
	],
	'_links': {
		'previous': {
			'href': 'https://api.smartthings.com/capabilities/namespace/testNamespace?page=0&max=200',
		},
	},
}

export const list_capabilities_3 = {
	items: [
		{
			id: 'switch',
			version: 1,
		},
		{
			id: 'switch',
			version: 2,
		},
	],
	'_links': {
		'previous': {
			'href': 'https://api.smartthings.com/capabilities?page=0&max=200',
		},
	},
}

export const list_standard = {
	'items': [
		{
			'id': 'demandResponseLoadControl',
			'version': 1,
			'status': 'proposed',
		},
		{
			'id': 'airQualitySensor',
			'version': 1,
			'status': 'live',
		},
		{
			'id': 'thermostatFanMode',
			'version': 1,
			'status': 'live',
		},
	],
	'_links': {},
}
