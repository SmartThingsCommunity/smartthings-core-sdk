import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
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
	 * A list of AWS ARNs referencing a Lambda function.
	 */
	functions?: string[]
}

export interface WebhookSmartApp {
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

export interface ApiOnlySubscription {
	targetUrl: string
	targetStatus: AppTargetStatus
}

export interface ApiOnlyApp {
	subscription?: ApiOnlySubscription
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
	classifications?: AppClassification[]
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
	apiOnly?: ApiOnlyApp
	ui?: AppUISettings
}

export interface OAuthRequest {
	clientName: string
	scope?: string[]
	redirectUris?: string[]
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
	classifications?: AppClassification[]
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
	oauth?: OAuthRequest
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
	scope?: string[]
	/**
	 * A list of redirect URIs.
	 */
	redirectUris?: string[]
}

export interface AppOAuthResponse {
	clientName: string
	oauthClientId: string
	oauthClientSecret: string
	scope?: string[]
	redirectUris?: string[]
}

export interface AppSettings {
	settings?: { [key: string]: string }
}

export class AppsEndpoint extends Endpoint {

	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('apps', config))
	}

	/**
	 * Returns a list of all apps belonging to the principal (i.e. the user)
	 */
	public async list(): Promise<App[]> {
		return this.client.getPagedItems<App>()
	}

	/**
	 * Returns a specific app
	 * @param id either the appId UUID or the appName unique name
	 */
	public get(id: string): Promise<App> {
		return this.client.get<App>(id)
	}

	/**
	 * Create a new app. For WEBHOOK_SMART_APPs the default SignatureType is ST_PADLOCK.
	 * @param data the app definition
	 */
	public create(data: AppRequest): Promise<AppCreationResponse> {
		// TODO -- use of query params might be temporary
		const params: HttpClientParams = {}
		if (data.webhookSmartApp) {

			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			params.requireConfirmation = true

			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			params.signatureType = data.webhookSmartApp.signatureType || 'ST_PADLOCK'
		}
		return this.client.post(undefined , data, params)
	}

	/**
	 * Update an existing app
	 * @param id either the appId UUID or the appName unique name
	 * @param data the new app definition
	 */
	public update(id: string, data: AppRequest): Promise<App> {
		return this.client.put(id, data)
	}

	/**
	 * Get the settings of an app. Settings are string name/value pairs for optional use by the app developer.
	 * @param id either the appId UUID or the appName unique name
	 */
	public getSettings(id: string): Promise<AppSettings> {
		return this.client.get(`${id}/settings`)
	}

	/**
	 * Update the settings of an app. Settings are string name/value pairs for optional use by the app developer.
	 * @param id either the appId UUID or the appName unique name
	 * @param data the new app settings
	 */
	public updateSettings(id: string, data: AppSettings): Promise<AppSettings> {
		return this.client.put(`${id}/settings`, data)
	}

	/**
	 * Update the signature type of an app. The signature type determines what mechanism is used to verify
	 * the identity of endpoint apps
	 * @param id either the appId UUID or the appName unique name
	 * @param signatureType the new signature type
	 */
	public async updateSignatureType(id: string, signatureType: SignatureType): Promise<Status> {
		await this.client.put(`${id}/signature-type`, {signatureType})
		return Promise.resolve(SuccessStatusValue)
	}

	/**
	 * Pings the targetUrl of the app to verify its existence. Endpoint apps and API Access apps must be registed
	 * in order to receive events from SmartThings.
	 * @param id either the appId UUID or the appName unique name
	 */
	public async register(id: string): Promise<Status> {
		await this.client.put(`${id}/register`)
		return Promise.resolve(SuccessStatusValue)
	}

	/**
	 * Returns the OAuth information for this app, including the name, scopes, and redirect URLs, if any
	 * @param id either the appId UUID or the appName unique name
	 */
	public getOauth(id: string): Promise<AppOAuth> {
		return this.client.get<AppOAuth>(`${id}/oauth`)
	}

	/**
	 * Updates the OAuth defintion for this app. Use this method to change the scopes or redirect
	 * URLs (for API access apps). This method does not change the clientId or clientSecret of the app.
	 * @param id either the appId UUID or the appName unique name
	 * @param data new OAuth definition
	 */
	public updateOauth(id: string, data: AppOAuth): Promise<AppOAuth> {
		return this.client.put<AppOAuth>(`${id}/oauth`,  data)
	}

	/**
	 * Regenerate clientId and clientSecret for this app. Note that this operation will result in any currently
	 * authorized installed app instances to need to be re-authorized to make calls to SmartThings.
	 * @param id either the appId UUID or the appName unique name
	 * @param data new OAuth definition
	 */
	public regenerateOauth(id: string, data: AppOAuth): Promise<AppOAuthResponse> {
		return this.client.post<AppOAuthResponse>(`${id}/oauth/generate`, data)
	}

	/**
	 * Deletes the specified app
	 * @param id either the appId UUID or the appName unique name
	 */
	public async delete(id: string): Promise<Count> {
		await this.client.delete(id)
		return { count: 1 }
	}
}
