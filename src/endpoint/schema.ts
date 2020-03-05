import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
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
}

interface SchemaAppList {
	userId?: string
	endpointApps: Array<SchemaApp>
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
	installedSmartApps: Array<InstalledSchemaApp>
}

export interface SchemaCreateReponse {
	endpointAppId?: string
	stClientId: string
	stClientSecret: string
}

export enum SchemaPageType {
	requiresLogin = 'requiresLogin',
	loggedIn = 'loggedIn'
}

export interface SchemaPage {
	pageType: SchemaPageType
	oAuthLink?: string
	isaId?: string
	locationId?: string
	devices?: Array<DeviceResult>
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

	public async list(): Promise<SchemaApp[]> {
		const response = await this.client.get<SchemaAppList>('apps')
		return response.endpointApps
	}

	public get(id: string): Promise<SchemaApp> {
		return this.client.get<SchemaApp>(`apps/${id}`)
	}

	public create(data: SchemaAppRequest): Promise<SchemaCreateReponse> {
		return this.client.post<SchemaCreateReponse>('apps', data)
	}

	public async update(id: string, data: SchemaAppRequest): Promise<Status> {
		await this.client.put<SchemaApp>(`apps/${id}`, data)
		return SuccessStatusValue
	}

	public async delete(id: string): Promise<Status> {
		await this.client.delete<SchemaApp>(`apps/${id}`)
		return SuccessStatusValue
	}

	public getPage(id: string, locationId: string): Promise<SchemaPage> {
		return this.client.get<SchemaPage>(`install/${id}?locationId=${locationId}&type=oauthLink`)
	}

	public async installedApps(locationId: string): Promise<InstalledSchemaApp[]> {
		const response = await this.client.get<InstalledSchemaAppList>(`installedapps/location/${locationId}`)
		return response === undefined ? [] : response.installedSmartApps
	}

	public getInstalledApp(id: string): Promise<InstalledSchemaApp> {
		return this.client.get(`installedapps/${id}`)
	}

	public async deleteInstalledApp(id: string): Promise<Status> {
		await this.client.delete(`installedapps/${id}`)
		return SuccessStatusValue
	}
}
