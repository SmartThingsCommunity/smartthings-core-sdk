import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { Endpoint } from '../endpoint'
import { IconImage, Owner, PrincipalType, SuccessResponse, ViewPrincipalType } from '../types'


// Pre-existing LAMBDA_SMART_APP and WEBHOOK_SMART_APP can be viewed but only API_ONLY can be created or edited.
export const smartAppTypeValues = ['API_ONLY'] as const
export const viewSmartAppTypeValues = [...smartAppTypeValues, 'LAMBDA_SMART_APP', 'WEBHOOK_SMART_APP'] as const
export type SmartAppType = typeof smartAppTypeValues[number]
export type ViewSmartAppType = typeof viewSmartAppTypeValues[number]

export const smartAppClassificationValues = ['AUTOMATION', 'SERVICE', 'DEVICE', 'CONNECTED_SERVICE'] as const
export type SmartAppClassification = typeof smartAppClassificationValues[number]

export const smartAppTargetStatusValues = ['PENDING', 'CONFIRMED'] as const
export type SmartAppTargetStatus = typeof smartAppTargetStatusValues[number]

export const signatureTypeValues = ['APP_RSA', 'ST_PADLOCK'] as const
export type SignatureType = typeof signatureTypeValues[number]

export type LambdaSmartApp = {
	/**
	 * A list of AWS ARNs referencing a Lambda function.
	 */
	functions: string[]
}

export type WebhookSmartApp = {
	/**
	 * A URL that should be invoked during execution.
	 */
	targetUrl: string

	/**
	 * The registration status of a target url.
	 */
	targetStatus?: SmartAppTargetStatus

	/**
	 * The public half of an RSA key pair. Useful for verifying a Webhook
	 * execution request signature to ensure it came from SmartThings.
	 */
	publicKey?: string

	/**
	 * The http signature type used for authorizing event delivery.
	 * APP_RSA generates an RSA key pair that will be used to verify requests
	 * from SmartThings. ST_PADLOCK requires verification through SmartThings
	 * public certificate.
	 */
	signatureType?: SignatureType
}

export type ApiOnlySubscription = {
	targetUrl: string
	targetStatus: SmartAppTargetStatus
}

export type ApiOnlySmartApp = {
	subscription?: ApiOnlySubscription

	/**
	 * Link to the apps privacy policy. Url scheme must be https.
	 *
	 * This field is required for business plans.
	 *
	 * Must be <= 2048
	 */
	privacyPolicyUrl?: string
}

export type ApiOnlySmartAppRequest = Omit<ApiOnlySmartApp, 'subscription'> & {
	/**
	 * Optional target url to receive events. Url scheme must be https.
	 *
	 * Must be <= 2048 characters.
	 */
	targetUrl?: string
}

export type SmartAppUISettings = {
	dashboardCardsEnabled: boolean
	preInstallDashboardCardsEnabled: boolean
	pluginId?: string
	pluginUri?: string
}

export type SmartAppBase = {
	/**
	 * A user defined unique identifier for an app.  It is alpha-numeric, may
	 * contain dashes, underscores, periods, and be less then 250 characters
	 * long.  It must be unique within your account.
	 */
	appName: string

	/**
	 * Denotes the type of app.
	 */
	appType: ViewSmartAppType

	/**
	 * An App maybe associated to many classifications.  A classification
	 * drives how the integration is presented to the user in the SmartThings
	 * mobile clients.  These classifications include:
	 *
	 * AUTOMATION - Denotes an integration that should display under the "Automation" tab in mobile clients.
	 * SERVICE - Denotes an integration that is classified as a "Service".
	 * DEVICE - Denotes an integration that should display under the "Device" tab in mobile clients.
	 * CONNECTED_SERVICE - Denotes an integration that should display under the "Connected Services" menu in mobile clients.
	 */
	classifications: SmartAppClassification[]

	/**
	 * A default display name for an app.
	 */
	displayName: string

	/**
	 * A default description for an app.
	 */
	description: string
}

export type SmartAppUpdateRequest = Omit<SmartAppBase, 'appName' | 'appType'> & {
	appType: SmartAppType

	/**
	 * Inform the installation systems that a particular app can only be
	 * installed once within a user's account.
	 */
	singleInstance?: boolean

	/**
	 * A default icon image for the app.
	 */
	iconImage?: IconImage

	/**
	 * Details related to an ApiOnly Smart App implementation.
	 * This model should only be specified for apps of type API_ONLY.
	 */
	apiOnly?: ApiOnlySmartAppRequest

	/**
	 * A collection of settings to drive user interface in SmartThings clients.
	 */
	ui?: SmartAppUISettings
}

export type SmartAppCreateRequest = SmartAppUpdateRequest & {
	/**
	 * A globally unique, developer-defined identifier for an app. It is
	 * alpha-numeric, may contain dashes, underscores, periods, and must
	 * be less then 250 characters long.
	 */
	appName: string

	/**
	 * Denotes the principal type to be used with the app.
	 * Default is LOCATION.
	 */
	principalType?: PrincipalType

	/**
	 * App OAuth settings.
	 */
	oauth?: Partial<SmartAppOAuthRequest>
}

export type PagedSmartApp = SmartAppBase & {
	/**
	 * A globally unique identifier for an app.
	 */
	appId: string

	/**
	 * A default icon image for the app.
	 */
	iconImage?: Required<IconImage>

	/**
	 * A typed model which provides information around ownership of a specific domain.
	 */
	owner: Owner

	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	createdDate: string

	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	lastUpdatedDate: string
}

export type SmartAppResponse = PagedSmartApp & {
	/**
	 * Denotes the principal type used with the app.
	 */
	principalType: ViewPrincipalType

	/**
	 * Inform the installation systems that a particular app can only be
	 * installed once within a user's account.
	 */
	singleInstance: boolean

	/**
	 * System generated metadata that impacts eligibility requirements around
	 * installing an App.
	 */
	installMetadata: { [key: string]: string }

	lambdaSmartApp?: LambdaSmartApp
	webhookSmartApp?: WebhookSmartApp
	apiOnly?: ApiOnlySmartApp
	ui: SmartAppUISettings
}

export type SmartAppCreationResponse = {
	app: SmartAppResponse
	oauthClientId: string
	oauthClientSecret: string
}

export type GenerateSmartAppOAuthRequest = {
	/**
	 * A name given to the OAuth Client.
	 */
	clientName: string

	/**
	 * A list of SmartThings API OAuth scope identifiers that maybe required to
	 * execute your integration.
	 */
	scope: string[]
}

export type SmartAppOAuthRequest = GenerateSmartAppOAuthRequest & {
	/**
	 * A list of redirect URIs. Maximum of 10 URIs.
	 */
	redirectUris: string[]

	/**
	 * A list of CORS domains. Maximum of 10 domains.
	 */
	corsDomains?: string[]
}

export type SmartAppOAuthResponse = SmartAppOAuthRequest

export type GenerateSmartAppOAuthResponse = {
	oauthClientDetails: SmartAppOAuthResponse
	oauthClientId: string
	oauthClientSecret: string
}

export type SmartAppSettingsRequest = {
	settings?: { [key: string]: string }
}

export type SmartAppSettingsResponse = Required<SmartAppSettingsRequest>

export type SmartAppListOptions = {
	/**
	 * account/organization id
	 *
	 * If not specified, Smart Apps for your default organization will be displayed.
	 */
	accountId?: string
	appType?: ViewSmartAppType
	classification?: SmartAppClassification | SmartAppClassification[]
	tag?: { [key: string]: string }
}

export class SmartAppsEndpoint extends Endpoint {

	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('smartapps', config))
	}

	/**
	 * Returns a list of all apps belonging to the principal (i.e. the user)
	 */
	public async list(options: SmartAppListOptions = {}): Promise<PagedSmartApp[]> {
		const params: HttpClientParams = {}
		if ('accountId' in options && options.accountId) {
			params.accountId = options.accountId
		}
		if ('appType' in options && options.appType) {
			params.appType = options.appType
		}
		if ('classification' in options && options.classification) {
			params.classification = options.classification
		}
		if ('tag' in options && options.tag) {
			for (const key of Object.keys(options.tag)) {
				params[`tag:${key}`] = options.tag[key]
			}
		}
		return this.client.getPagedItems<PagedSmartApp>(undefined, params)
	}

	/**
	 * Returns a specific app
	 *
	 * @param id either the appId UUID or the appName unique name
	 */
	public get(id: string): Promise<SmartAppResponse> {
		return this.client.get(id)
	}

	/**
	 * Create a new app.
	 *
	 * @param data the app definition
	 */
	public create(data: SmartAppCreateRequest, accountId?: string): Promise<SmartAppCreationResponse> {
		const params: HttpClientParams = {}
		if (accountId) {
			params.accountId = accountId
		}
		return this.client.post(undefined, data, params)
	}

	/**
	 * Update an existing app
	 *
	 * @param id either the appId UUID or the appName unique name
	 * @param data the new app definition
	 */
	public update(id: string, data: SmartAppUpdateRequest): Promise<SmartAppResponse> {
		return this.client.put(id, data)
	}

	/**
	 * Get the settings of an app. Settings are string name/value pairs for optional use by the app developer.
	 * @param id either the appId UUID or the appName unique name
	 */
	public getSettings(id: string): Promise<SmartAppSettingsResponse> {
		return this.client.get(`${id}/settings`)
	}

	/**
	 * Update the settings of an app. Settings are string name/value pairs for optional use by the app developer.
	 * @param id either the appId UUID or the appName unique name
	 * @param data the new app settings
	 */
	public updateSettings(id: string, data: SmartAppSettingsRequest): Promise<SmartAppSettingsResponse> {
		return this.client.put(`${id}/settings`, data)
	}

	/**
	 * Pings the targetUrl of the app to verify its existence. API Access apps must be registered
	 * in order to receive events from SmartThings.
	 * @param id either the appId UUID or the appName unique name
	 */
	public async register(id: string): SuccessResponse {
		await this.client.put(`${id}/register`, {})
		return Promise.resolve()
	}

	/**
	 * Returns the OAuth information for this app, including the name, scopes, and redirect URLs, if any
	 * @param id either the appId UUID or the appName unique name
	 */
	public getOauth(id: string): Promise<SmartAppOAuthResponse> {
		return this.client.get(`${id}/oauth`)
	}

	/**
	 * Updates the OAuth defintion for this app. Use this method to change the scopes or redirect
	 * URLs (for API access apps). This method does not change the clientId or clientSecret of the app.
	 * @param id either the appId UUID or the appName unique name
	 * @param data new OAuth definition
	 */
	public updateOauth(id: string, data: SmartAppOAuthRequest): Promise<SmartAppOAuthResponse> {
		return this.client.put(`${id}/oauth`, data)
	}

	/**
	 * Regenerate clientId and clientSecret for this app. Note that this operation will result in any currently
	 * authorized installed app instances to need to be re-authorized to make calls to SmartThings.
	 * @param id either the appId UUID or the appName unique name
	 * @param data new OAuth definition
	 */
	public regenerateOauth(id: string, data: GenerateSmartAppOAuthRequest): Promise<GenerateSmartAppOAuthResponse> {
		return this.client.post(`${id}/oauth/generate`, data)
	}

	/**
	 * Deletes the specified app
	 * @param id either the appId UUID or the appName unique name
	 */
	public async delete(id: string): SuccessResponse {
		await this.client.delete(id)
		return Promise.resolve()
	}
}
