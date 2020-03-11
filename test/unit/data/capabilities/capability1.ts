import {
	CustomCapabilityStatus,
	Required,
} from '../../../../src'


const data = {
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
				required: [Required.VALUE],
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

export default data
