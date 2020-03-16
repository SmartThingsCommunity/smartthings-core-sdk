import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export enum Required {
	VALUE = 'value',
	UNIT = 'unit',
	DATA = 'data'
}

export enum CustomCapabilityStatus {
	PROPOSED = 'proposed',
	LIVE = 'live',
	DEPRECATED = 'deprecated',
	DEAD = 'dead'
}

export interface CapabilitySummary {
	id: string
	version: number
	status?: string
}

export interface DataSchema {
	type: string
	additionalProperties?: boolean
	required?: string[]
	properties?: { [name: string]: JSONSchema }
}

export interface UnitSchema {
	type?: string
	enum?: string[]
	default?: string
}

export interface JSONSchema {
	type?: string
	minimum?: number
	maximum?: number
	minLength?: number
	maxLength?: number
	enum?: string[]
	propertyName?: unknown
}

export interface AttributeProperties {
	value: JSONSchema
	unit?: UnitSchema
	data?: DataSchema
}

export interface EnumCommand {
	command: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
}

export interface AttributeSchema {
	title?: string
	type: string
	properties: AttributeProperties
	additionalProperties: boolean
	required?: Required[]
}

export interface CapabilityAttribute {
	schema: AttributeSchema
	setter?: string
	enumCommands?: EnumCommand[]
}

export interface Argument {
	name: string
	optional?: boolean
	schema: JSONSchema
}

export interface CapabilityCommand {
	name: string // ^[[a-z]*([A-Z][a-z]*)*]{1,36}$
	arguments?: Argument[]
}

export interface CapabilityUpdate {
	attributes?: { [name: string]: CapabilityAttribute } // name: lower camel case
	commands?: { [name: string]: CapabilityCommand } // name: lower camel case
}

export interface CapabilityCreate extends CapabilityUpdate {
	name: string // ^[[a-zA-Z0-9]{1}][[a-zA-Z0-9 ]+]{1,35}$
}

export interface Capability extends CapabilityCreate {
	id?: string
	version?: number
	status?: CustomCapabilityStatus
}

export interface Namespace {
	name: string
	ownerType: string
	ownerId: string
}

export class CapabilitiesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('capabilities', config))
	}

	public async list(namespace: string): Promise<CapabilitySummary[]> {
		const list = await this.client.getPagedItems<CapabilitySummary>(`namespaces/${namespace}`)
		return list
	}

	public async listNamespaces(): Promise<Namespace[]> {
		const list = await this.client.get<Namespace[]>('namespaces')
		return list
	}

	public async listStandard(): Promise<CapabilitySummary[]> {
		const list = await this.client.getPagedItems<CapabilitySummary>()
		return list
	}

	public async listVersions(capabilityId: string): Promise<CapabilitySummary[]> {
		const list = await this.client.getPagedItems<CapabilitySummary>(capabilityId)
		return list
	}

	public get(capabilityId: string, capabilityVersion: number): Promise<Capability> {
		return this.client.get<Capability>(`${capabilityId}/${capabilityVersion}`)
	}

	public create(capability: CapabilityCreate): Promise<Capability> {
		return this.client.post(undefined, capability)
	}

	public update(capabilityId: string, capabilityVersion: number, capability: CapabilityUpdate): Promise<Capability> {
		return this.client.put(`${capabilityId}/${capabilityVersion}`, capability)
	}

	public async delete(capabilityId: string, capabilityVersion: number): Promise<Status> {
		await this.client.delete(`${capabilityId}/${capabilityVersion}`)
		return SuccessStatusValue
	}
}
