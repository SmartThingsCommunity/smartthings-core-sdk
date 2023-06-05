import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Endpoint } from '../endpoint'


export type SchemaAppId = {
	schemaAppId: string
}

export type SchemaAppInvitationId = {
	invitationId: string
}

export type SchemaAppInvitationSummary = {
	invitationId: string
	acceptUrl: string
}

export type SchemaAppInvitationCreate = SchemaAppId & {
	description?: string
}

export type SchemaAppInvitation = SchemaAppId & {
	id: string
	description?: string
	expiration?: number
	acceptUrl?: string
	declineUrl?: string
	shortCode?: string
}

export type SchemaAppAcceptanceStatus = Omit<SchemaAppInvitation, 'id'> & {
	isAccepted?: boolean
}


export class InvitesSchemaAppEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('invites/schemaApp', config))
	}

	public async create(schemaAppInvitation: SchemaAppInvitationCreate): Promise<SchemaAppInvitationId> {
		return this.client.post('', schemaAppInvitation)
	}

	public async list(schemaAppId: string): Promise<SchemaAppInvitation[]> {
		return this.client.getPagedItems('', { schemaAppId })
	}

	public async revoke(invitationId: string): Promise<void> {
		await this.client.delete(invitationId)
	}

	public async getAcceptanceStatus(invitationId: string): Promise<SchemaAppAcceptanceStatus> {
		return this.client.get('checkAcceptance', { invitationId })
	}

	public async accept(shortCode: string): Promise<SchemaAppId> {
		return this.client.put(`${shortCode}/accept`)
	}
}
