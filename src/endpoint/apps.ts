import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Endpoint } from '../endpoint'
import { Count, IconImage, Owner, PrincipalType, Status, SuccessStatusValue } from '../types'


export enum AppType {
	LAMBDA_SMART_APP = 'LAMBDA_SMART_APP',
	WEBHOOK_SMART_APP = 'WEBHOOK_SMART_APP',
	API_ONLY = 'API_ONLY'
}

export enum AppClassification {

	AUTOMATION = 'AUTOMATION',
	SERVICE = 'SERVICE',
	DEVICE = 'DEVICE',
	CONNECTED_SERVICE = 'CONNECTED_SERVICE',
}

export enum AppTargetStatus {
	PENDING = 'PENDING',
	CONFIRMED = 'CONFIRMED',
}

export enum SignatureType {
	APP_RSA = 'APP_RSA',
	ST_PADLOCK = 'ST_PADLOCK',
}

export interface LambdaSmartApp {
	/**
	 * A list of AWS arns referencing a Lambda function.
	 */
	functions?: Array<string>
}

export class WebhookSmartApp {
	/**
	 * A URL that should be invoked during execution.
	 */
	targetUrl?: string
	targetStatus?: AppTargetStatus
	/**
	 * The public half of an RSA key pair.  Useful for verifying a Webhook
	 * execution request signature to ensure it came from SmartThings.
	 */
	publicKey?: string
	signatureType?: SignatureType
}

export interface AppUISettings {
	pluginId?: string
	pluginUri?: string
	dashboardCardsEnabled: boolean
	preInstallDashboardCardsEnabled: boolean
}

export interface App {
	/**
	 * A user defined unique identifier for an app.  It is alpha-numeric, may
	 * contain dashes, underscores, periods, and be less then 250 characters
	 * long.  It must be unique within your account.
	 */
	appName?: string
	/**
	 * A globally unique identifier for an app.
	 */
	appId?: string
	appType?: AppType
	principalType?: PrincipalType
	/**
	 * An App maybe associated to many classifications.  A classification
	 * drives how the integration is presented to the user in the SmartThings
	 * mobile clients.  These classifications include: * AUTOMATION - Denotes
	 * an integration that should display under the \"Automation\" tab in
	 * mobile clients. * SERVICE - Denotes an integration that is classified as
	 * a \"Service\". * DEVICE - Denotes an integration that should display
	 * under the \"Device\" tab in mobile clients. * CONNECTED_SERVICE -
	 * Denotes an integration that should display under the \"Connected
	 * Services\" menu in mobile clients. * HIDDEN - Denotes an integration
	 * that should not display in mobile clients
	 */
	classifications?: Array<AppClassification>
	/**
	 * A default display name for an app.
	 */
	displayName?: string
	/**
	 * A default description for an app.
	 */
	description?: string
	/**
	 * Inform the installation systems that a particular app can only be
	 * installed once within a user's account.
	 */
	singleInstance?: boolean
	iconImage?: IconImage
	/**
	 * System generated metadata that impacts eligibility requirements around
	 * installing an App.
	 */
	installMetadata?: { [key: string]: string }
	owner?: Owner
	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	createdDate?: string
	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	lastUpdatedDate?: string
	lambdaSmartApp?: LambdaSmartApp
	webhookSmartApp?: WebhookSmartApp
	ui?: AppUISettings
}

export interface OAuthRequest {
	clientName: string
	scope?: Array<string>
	redirectUris?: Array<string>
}

export interface AppRequest {
	/**
	 * A user defined unique identifier for an app.  It is alpha-numeric, may
	 * contain dashes, underscores, periods, and be less then 250 characters
	 * long.  It must be unique within your account.
	 */
	appName?: string
	appType?: AppType
	/**
	 * An App maybe associated to many classifications.  A classification
	 * drives how the integration is presented to the user in the SmartThings
	 * mobile clients.  These classifications include: * AUTOMATION - Denotes
	 * an integration that should display under the \"Automation\" tab in
	 * mobile clients. * SERVICE - Denotes an integration that is classified as
	 * a \"Service\". * DEVICE - Denotes an integration that should display
	 * under the \"Device\" tab in mobile clients. * CONNECTED_SERVICE -
	 * Denotes an integration that should display under the \"Connected
	 * Services\" menu in mobile clients. * HIDDEN - Denotes an integration
	 * that should not display in mobile clients
	 */
	classifications?: Array<AppClassification>
	/**
	 * A default display name for an app.
	 */
	displayName?: string
	/**
	 * A default description for an app.
	 */
	description?: string
	/**
	 * Inform the installation systems that a particular app can only be
	 * installed once within a user's account.
	 */
	singleInstance?: boolean
	iconImage?: IconImage
	/**
	 * System generated metadata that impacts eligibility requirements around
	 * installing an App.
	 */
	installMetadata?: { [key: string]: string }
	lambdaSmartApp?: LambdaSmartApp
	webhookSmartApp?: WebhookSmartApp
	ui?: AppUISettings
	oauth: OAuthRequest
}

export interface AppCreationResponse {
	app: App
	oauthClientId: string
	oauthClientSecret: string
}

export interface AppOAuth {
	/**
	 * A name given to the OAuth Client.
	 */
	clientName?: string
	/**
	 * A list of SmartThings API OAuth scope identifiers that maybe required to
	 * execute your integration.
	 */
	scope?: Array<string>
	/**
	 * A list of redirect URIs.
	 */
	redirectUris?: Array<string>
}

export interface AppOAuthResponse {
	clientName: string
	oauthClientId: string
	oauthClientSecret: string
	scope?: Array<string>
	redirectUris?: Array<string>
}

export interface AppSettings {
	settings?: { [key: string]: string }
}

export interface SignatureTypeRequest {
	signatureType: SignatureType
}

export class AppsEndpoint extends Endpoint {

	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('apps', config))
	}

	/**
	 * Returns a list of all apps belonging to the principal
	 */
	public async list(): Promise<App[]> {
		return this.client.getPagedItems<App>()
	}

	/**
	 * Returns a specific app
	 * @param id either the appId or app name
	 */
	public get(id: string): Promise<App> {
		return this.client.get<App>(id)
	}

	public create(data: AppRequest): Promise<AppCreationResponse> {
		// TODO -- use of query params might be temporary
		const params = { requireConfirmation: 'false', signatureType: 'ST_PADLOCK' }
		if (data.webhookSmartApp && data.webhookSmartApp.signatureType) {
			params.signatureType = data.webhookSmartApp.signatureType
		}
		return this.client.post(undefined , data, params)
	}

	public update(id: string, data: AppRequest): Promise<App> {
		return this.client.put(id, data)
	}

	public getSettings(id: string): Promise<AppSettings> {
		return this.client.get(`${id}/settings`)
	}

	public updateSettings(id: string, data: AppSettings): Promise<AppSettings> {
		return this.client.put(`${id}/settings`, data)
	}

	public async updateSignatureType(id: string, data: SignatureTypeRequest): Promise<Status> {
		await this.client.put(`${id}/signature-type`, data)
		return Promise.resolve(SuccessStatusValue)
	}

	public async register(id: string): Promise<Status> {
		await this.client.put(`${id}/register`)
		return Promise.resolve(SuccessStatusValue)
	}

	public getOauth(id: string): Promise<AppOAuth> {
		return this.client.get<AppOAuth>(`${id}/oauth`)
	}

	public updateOauth(id: string, data: AppOAuth): Promise<AppOAuth> {
		return this.client.put<AppOAuth>(`${id}/oauth`,  data)
	}

	public regenerateOauth(id: string, data: AppOAuth): Promise<AppOAuthResponse> {
		return this.client.post<AppOAuthResponse>(`${id}/oauth/generate`, data)
	}

	public async delete(appNameOrId: string): Promise<Count> {
		await this.client.delete(appNameOrId)
		return { count: 1 }
	}
}
