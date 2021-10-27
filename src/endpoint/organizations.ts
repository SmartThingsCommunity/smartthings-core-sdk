import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'


export interface OrganizationUpdateRequest {
	label?: string
	warehouseGroupId?: string
}

export interface OrganizationCreateRequest extends OrganizationUpdateRequest {
	name: string
	manufacturerName?: string
	mnid?: string
}

export interface OrganizationResponse extends OrganizationCreateRequest {
	/**
	 * A generated UUID for an organization.
	 */
	organizationId: string

	/**
	 * The user group for organization developers.
	 */
	developerGroupId?: string

	/**
	 * The user group for organization admins.
	 */
	adminGroupId?: string

	/**
	 * Denotes whether this is the default user org for the caller.
	 */
	isDefaultUserOrg?: boolean
}

export class OrganizationsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('organizations', config))
	}

	public list(): Promise<OrganizationResponse[]>{
		return this.client.getPagedItems<OrganizationResponse>('')
	}

	public get(id: string): Promise<OrganizationResponse>{
		return this.client.get<OrganizationResponse>(id)
	}
}
