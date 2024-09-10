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
	acceptLimit?: number
}

export type SchemaAppInvitation = SchemaAppId & {
	id: string
	description?: string
	expiration?: number
	acceptUrl?: string
	acceptances: number
	declineUrl?: string
	shortCode?: string
}


export class InvitesSchemaAppEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('invites/schemaApp', config))
	}

	public async create(schemaAppInvitation: SchemaAppInvitationCreate): Promise<SchemaAppInvitationId> {
		return this.client.post('', schemaAppInvitation)
	}

	public async list(schemaAppId: string): Promise<SchemaAppInvitation[]> {
		try {
			return await this.client.getPagedItems('', { schemaAppId })
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch(error: any) {
			if (error.response?.status === 403) {
				return []
			}
			throw error
		}
	}

	public async revoke(invitationId: string): Promise<void> {
		await this.client.delete(invitationId)
	}
}
