import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { SuccessStatusValue, Status } from '../types'


export interface SchemaApp extends SchemaAppRequest {
	/**
	 * Viper endpoint app id for the partner
	 */
	endpointAppId?: string

	/**
	 * user id for the partner
	 */
	userId?: string

	/**
	 * Possible values - '', 'cst', 'wwst'
	 */
	certificationStatus?: string
}

export interface SchemaAppRequest {

	/**
	 * The name of the endpoint app
	 */
	appName?: string

	/**
	 * The name of the partner/brand
	 */
	partnerName?: string

	/**
	 * oAuth authorization url of the partner
	 */
	oAuthAuthorizationUrl?: string

	/**
	 * lambda arn of the partner for US region (default)
	 */
	lambdaArn?: string

	/**
	 * lambda arn of the partner for EU region
	 */
	lambdaArnEU?: string

	/**
	 * lambda arn of the partner for AP region
	 */
	lambdaArnAP?: string

	/**
	 * lambda arn of the partner for CN region
	 */
	lambdaArnCN?: string

	/**
	 * url of partner icon
	 */
	icon?: string

	/**
	 * url of partner icon in 2x dimensions
	 */
	icon2x?: string

	/**
	 * url of partner icon in 3x dimensions
	 */
	icon3x?: string

	/**
	 * Client id for the partner oAuth
	 */
	oAuthClientId?: string

	/**
	 * Client secret for the partner oAuth
	 */
	oAuthClientSecret?: string

	/**
	 * oAuth token refresh url of the partner
	 */
	oAuthTokenUrl?: string

	/**
	 * oAuth scope for the partner. Example 'remote_control:all' for Lifx
	 */
	oAuthScope?: string

	/**
	 * Possible values - 'lambda' or 'webhook'
	 */
	hostingType?: string

	/**
	 * Possible values - 'alexa-schema', 'st-schema', 'google-schema'
	 */
	schemaType?: string

	/**
	 * webhook url for the partner
	 */
	webhookUrl?: string

	/**
	 * email for the partner
	 */
	userEmail: string

	/**
	 * Data to support deep-linking to partner's mobile app
	 */
	viperAppLinks?: ViperAppLinks
}

export interface ViperAppLinks {
	android?: string

	ios?: string

	isLinkingEnabled?: boolean
}

interface SchemaAppList {
	userId?: string
	endpointApps: SchemaApp[]
}

export interface DeviceResult {

	/**
	 * deviceId created by DM
	 */
	deviceId?: string

	/**
	 * initial device name from the partner
	 */
	name?: string
}

export interface InstalledSchemaApp {
	/**
	 * Possible values - __requiresLogin__ or __loggedIn__. These two values determine what fields are returned in this response. If value is "requiresLogin", only "oAuthLink" is returned in the response. If value is "loggedIn", only isaId, partnerName, appName, devices and icons are returned.
	 */
	pageType?: string

	/**
	 * isaId (Installed App Id)
	 */
	isaId?: string

	/**
	 * partner or brand name eg LIFX Inc.
	 */
	partnerName?: string

	/**
	 * Connector name. eg Lifx (Connect)
	 */
	appName?: string

	/**
	 * url of partner icon
	 */
	icon?: string

	/**
	 * url of partner icon in 2x dimensions
	 */
	icon2x?: string

	/**
	 * url of partner icon in 3x dimensions
	 */
	icon3x?: string

	/**
	 * location of the installed smart app
	 */
	locationId?: string
	devices?: DeviceResult[]

	/**
	 * generated oAuth link for the user to login to partner server. This will only be returned when the user is not logged in.
	 */
	oAuthLink?: string
}

interface InstalledSchemaAppList {
	userId?: string
	installedSmartApps: InstalledSchemaApp[]
}

export interface SchemaCreateResponse {
	endpointAppId?: string
	stClientId: string
	stClientSecret: string
}

export enum SchemaPageType {
	requiresLogin = 'requiresLogin',
	loggedIn = 'loggedIn'
}

export interface SchemaPage {
	/**
	 * The type of the page being returned, which is determined by the authentication state of the connector instance,
	 * i.e. 'requiresLogin' or 'loggedIn'
	 */
	pageType: SchemaPageType
}

export interface UnauthorizedSchemaPage extends SchemaPage {
	/**
	 * An href to the OAuth page for this connector that allows authentication and connection to the SmartThings
	 * patform.
	 */
	oAuthLink?: string
}

export interface AuthorizedSchemaPage extends SchemaPage {
	isaId?: string
	locationId?: string
	devices?: DeviceResult[]
	icon?: string
	icon2x?: string
	icon3x?: string
	partnerName?: string
	appName?: string
}

export class SchemaEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('schema', config))
	}

	/**
	 * Returns a list of all ST Schema C2C connectors belonging to the principal (i.e. the user)
	 */
	public async list(): Promise<SchemaApp[]> {
		const response = await this.client.get<SchemaAppList>('apps')
		return response.endpointApps
	}

	/**
	 * Returns a specific ST Schema connector
	 * @param id the "endpointApp" UUID of the connector, e.g. "viper_799ff3a0-8249-11e9-9bf1-b5c7d651c2c3"
	 */
	public get(id: string): Promise<SchemaApp> {
		return this.client.get<SchemaApp>(`apps/${id}`)
	}

	/**
	 * Create an ST Schema connector
	 * @param data definition of the connector
	 */
	public create(data: SchemaAppRequest): Promise<SchemaCreateResponse> {
		return this.client.post<SchemaCreateResponse>('apps', data)
	}

	/**
	 * Update an ST Schema connector
	 * @param id the "endpointApp" UUID of the connector, e.g. "viper_799ff3a0-8249-11e9-9bf1-b5c7d651c2c3"
	 * @param data new definition of the connector
	 */
	public async update(id: string, data: SchemaAppRequest): Promise<Status> {
		await this.client.put<SchemaApp>(`apps/${id}`, data)
		return SuccessStatusValue
	}

	/**
	 * Re-generate the OAuth clientId and clientSecret for an ST Schema connector. The old clientId and clientSecret
	 * will no longer be valid after this operation.
	 * @param id the "endpointApp" UUID of the connector, e.g. "viper_799ff3a0-8249-11e9-9bf1-b5c7d651c2c3"
	 */
	public regenerateOauth(id: string): Promise<SchemaCreateResponse> {
		return this.client.post<SchemaCreateResponse>('oauth/stclient/credentials', {endpointAppId: id})
	}

	/**
	 * Delete an ST Schema connector
	 * @param id the "endpointApp" UUID of the connector, e.g. "viper_799ff3a0-8249-11e9-9bf1-b5c7d651c2c3"
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete<SchemaApp>(`apps/${id}`)
		return SuccessStatusValue
	}

	/**
	 * Get the page definition of an ST Schema installed instance in the specified location.
	 * @param id the "endpointApp" UUID of the connector, e.g. "viper_799ff3a0-8249-11e9-9bf1-b5c7d651c2c3"
	 * @param locationId UUID of the location in which the connector is or is to be installed.
	 */
	public getPage(id: string, locationId: string): Promise<AuthorizedSchemaPage | UnauthorizedSchemaPage> {
		return this.client.get<SchemaPage>(`install/${id}?locationId=${locationId}&type=oauthLink`)
	}

	/**
	 * Returns a list of the installed ST Schema connector instances in the specified location
	 * @param locationId UUID of the location
	 */
	public async installedApps(locationId?: string): Promise<InstalledSchemaApp[]> {
		const response = await this.client.get<InstalledSchemaAppList>(`installedapps/location/${this.locationId(locationId)}`)
		return response === undefined ? [] : response.installedSmartApps
	}

	/**
	 * Returns a specific installed instance of an ST Schema connector. The returned object includes a list of the
	 * devices created by the instance.
	 * @param id UUID of the installed app instance
	 */
	public getInstalledApp(id: string): Promise<InstalledSchemaApp> {
		return this.client.get(`installedapps/${id}`)
	}

	/**
	 * Deletes a specific installed instance of an ST Schema connector. This operation will also delete all
	 * devices created by this instance
	 * @param id
	 */
	public async deleteInstalledApp(id: string): Promise<Status> {
		await this.client.delete(`installedapps/${id}`)
		return SuccessStatusValue
	}
}
