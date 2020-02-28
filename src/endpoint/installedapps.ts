import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { Count, Owner, PrincipalType, Status, SuccessStatusValue } from '../types'


export interface StringConfig {
	/**
	 * A config value
	 */
	value?: string
}

export interface DeviceConfig {
	/**
	 * The ID of the device.
	 */
	deviceId: string
	/**
	 * The component ID on the device.
	 */
	componentId?: string
	permissions?: Array<string>
}

export interface PermissionConfig {
	permissions?: Array<string>
}

export interface ModeConfig {
	/**
	 * The ID of the mode.
	 */
	modeId?: string
}

export interface SceneConfig {
	/**
	 * The ID of the scene.
	 */
	sceneId?: string
	permissions?: Array<string>
}

export interface MessageConfig {
	/**
	 * The key value of the message group.
	 */
	messageGroupKey?: string
}

export enum ConfigValueType {
	STRING = 'STRING',
	DEVICE = 'DEVICE',
	PERMISSION = 'PERMISSION',
	MODE = 'MODE',
	SCENE = 'SCENE',
	MESSAGE = 'MESSAGE',
}

export interface ConfigEntry {
	/**
	 * The value type.
	 */
	valueType?: ConfigValueType
	/**
	 * The config if valueType is STRING, meaningless otherwise
	 */
	stringConfig?: StringConfig
	/**
	 * The config if valueType is DEVICE, meaningless otherwise
	 */
	deviceConfig?: DeviceConfig
	/**
	 * The config if valueType is PERMISSION, meaningless otherwise
	 */
	permissionConfig?: PermissionConfig
	/**
	 * The config if valueType is MODE, meaningless otherwise
	 */
	modeConfig?: ModeConfig
	/**
	 * The config if valueType is SCENE, meaningless otherwise
	 */
	sceneConfig?: SceneConfig
	/**
	 * The config if valueType is MESSAGE, meaningless otherwise
	 */
	messageConfig?: MessageConfig

}

export enum InstalledAppType {
	LAMBDA_SMARTAPP = 'LAMBDA_SMARTAPP',
	WEBHOOK_SMARTAPP = 'WEBHOOK_SMARTAPP',
	API_ONLY = 'API_ONLY',
	BEHAVIOR = 'BEHAVIOR',
}

export enum InstallConfigurationStatus {
	STAGED = 'STAGED',
	DONE = 'DONE',
	AUTHORIZED = 'AUTHORIZED',
	REVOKED = 'REVOKED',
	PENDING = 'PENDING',
	DISABLED = 'DISABLED',
}

export interface InstalledAppUi {
	pluginId?: string
	pluginUri?: string
	dashboardCardsEnabled: boolean
	preInstallDashboardCardsEnabled: boolean
}

export interface InstalledAppIconImage {
	/**
	 * A default icon image url for an app. https url required.
	 */
	url?: string
}

export enum InstalledAppClassification {
	AUTOMATION = 'AUTOMATION',
	SERVICE = 'SERVICE',
	DEVICE = 'DEVICE',
	CONNECTED_SERVICE = 'CONNECTED_SERVICE',
	HIDDEN = 'HIDDEN',
}

export interface InstalledApp {
	/**
	 * The ID of the installed app.
	 */
	installedAppId: string
	installedAppType: InstalledAppType
	installedAppStatus: InstallConfigurationStatus
	/**
	 * A user defined name for the installed app. May be null.
	 */
	displayName?: string
	/**
	 * The ID of the app.
	 */
	appId: string
	/**
	 * A reference to an upstream system.  For example, Behaviors would
	 * reference the behaviorId. May be null.
	 */
	referenceId?: string
	/**
	 * The ID of the location to which the installed app may belong.
	 */
	locationId?: string
	owner: Owner
	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	createdDate: string
	/**
	 * A UTC ISO-8601 Date-Time String
	 */
	lastUpdatedDate: string
	ui?: InstalledAppUi
	iconImage?: InstalledAppIconImage
	/**
	 * An App maybe associated to many classifications.  A classification drives
	 * how the integration is presented to the user in the SmartThings mobile
	 * clients.  These classifications include: * AUTOMATION - Denotes an
	 * integration that should display under the \"Automation\" tab in mobile
	 * clients. * SERVICE - Denotes an integration that is classified as a
	 * \"Service\". * DEVICE - Denotes an integration that should display under
	 * the \"Device\" tab in mobile clients. * CONNECTED_SERVICE - Denotes an
	 * integration that should display under the \"Connected Services\" menu in
	 * mobile clients. * HIDDEN - Denotes an integration that should not display
	 * in mobile clients
	 */
	classifications: InstalledAppClassification
	/**
	 * Denotes the principal type to be used with the app.  Default is LOCATION.
	 */
	principalType: PrincipalType
	/**
	 * Inform the installation systems that the associated app can only be
	 * installed once within a user's account.
	 */
	singleInstance: boolean
}

export interface ConfigurationRequest {
	appId: string
	locationId: string
	installedAppType: InstalledAppType
	configurationStatus: InstallConfigurationStatus
	config: { [name: string]: ConfigEntry }
}

export interface InstalledAppConfiguration {
	installedAppId: string
	configurationId: string
	configurationStatus: InstallConfigurationStatus
	createdDate: string
	lastUpdatedDate: string
	config: { [name: string]: ConfigEntry }
}

export interface InstalledAppConfigItem {
	installedAppId: string
	configurationId: string
	configurationStatus: InstallConfigurationStatus
	createdDate: string
	lastUpdatedDate: string
}

export interface InstalledAppResponse {
	installedApp: InstalledApp
	configurationDetail: InstalledAppConfiguration
}

export interface TokenInformation {
	installedAppId: string
	locationId: string
	scope: string[]
}

export interface InstalledAppUpdateRequest {
	displayName: string
}

export interface ConfigurationUpdateRequest {
	[name: string]: ConfigEntry
}

export interface ConfigurationPatchRequest {
	removals: string[]
	upserts: { [name: string]: ConfigEntry }
}

export interface ConfigurationItemsList {
	items: InstalledAppConfigItem[]
	_links?: {
		next?: {
			href: string
		}
		previous?: {
			href: string
		}
	}
}

export enum DashboardLifecycleEventType {
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

export interface InstalledAppEvents {
	smartAppEvents?: {
		name: string
		attributes: { [name: string]: string }
	}
	smartAppDashboardEvents?: {
		cardId: string
		lifecycle: DashboardLifecycleEventType
	}
}

export enum InstalledAppMessageType {
	PREDEFINED = 'PREDEFINED',
	ADHOC = 'ADHOC'
}

export interface PredefinedMessage {
	messageTemplateKey: string
	defaultVariables: { [name: string]: string }
	localeVariables: [
		{
			localeTag: string
			variables: { [name: string]: string }
		}
	]
}

export interface AdhocMessage {
	fallbackLocale: string
	defaultVariables: { [name: string]: string }
	templates: [
		{
			localeTag: string
			template: string
			variables: { [name: string]: string }
		}
	]
}

export interface InstalledAppMessage {
	messageGroupKey: string
	messageType: InstalledAppMessageType
	predefinedMessage?: PredefinedMessage
	adhocMessage?: AdhocMessage
}

// TODO -- tags??
export interface InstalledAppListOptions {
	locationId?: string
	installedAppStatus?: string
	installedAppType?: string
	appId?: string
	modeId?: string
	deviceId?: string
	max?: number
	page?: number
}

export class InstalledAppsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	public async list(options: InstalledAppListOptions = {}): Promise<InstalledApp[]> {
		const params: HttpClientParams = {}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		if ('installedAppStatus' in options && options.installedAppStatus) {
			params.deviceId = options.installedAppStatus
		}
		if ('installedAppType' in options && options.installedAppType) {
			params.deviceId = options.installedAppType
		}
		if ('deviceId' in options && options.deviceId) {
			params.deviceId = options.deviceId
		}
		if ('max' in options && options.max) {
			params.max = options.max
		}
		if ('page' in options && options.page) {
			params.page = options.page
		}
		return this.client.getPagedItems<InstalledApp>(undefined, params)
	}

	public get(id?: string): Promise<InstalledApp> {
		return this.client.get<InstalledApp>(this.installedAppId(this.installedAppId(id)))
	}

	/**
	 * Returns the token info for a SmartApp principal
	 */
	public tokenInfo(): Promise<TokenInformation> {
		return this.client.get<TokenInformation>('me')
	}

	public create(data: ConfigurationRequest): Promise<InstalledAppResponse> {
		return this.client.post<InstalledAppResponse>(undefined, data)
	}

	// TODO -- make ID mandatory since not commonly (ever) called from ISA?
	public update(data: InstalledAppUpdateRequest, id?: string): Promise<InstalledApp> {
		return this.client.post<InstalledApp>(this.installedAppId(id), data)
	}

	// TODO -- make ID mandatory since not commonly (ever) called from ISA?
	public listConfigurations(id?: string): Promise<InstalledAppConfigItem[]> {
		return this.client.getPagedItems<InstalledAppConfigItem>(`${this.installedAppId(this.installedAppId(id))}/configs`)
	}

	// TODO -- make ID mandatory since not commonly (ever) called from ISA?
	public getConfiguration(configurationId: string, id?: string): Promise<InstalledAppConfiguration> {
		return this.client.get<InstalledAppConfiguration>(`${this.installedAppId(this.installedAppId(id))}/configs/${configurationId}`)
	}

	// TODO -- make ID mandatory since not commonly (ever) called from ISA?
	/**
	 * Returns the most recent authorized configuration, or the most recent
	 * configuration if none are authorized
	 *
	 * @param id UUID of the installed app
	 */
	public async getLastAuthorizedConfiguration(id?: string): Promise<InstalledAppConfiguration> {
		const data = await this.client.get<ConfigurationItemsList>(`${this.installedAppId(this.installedAppId(id))}/configs`)
		const items = data.items.sort((a, b) => {
			return a.lastUpdatedDate === b.lastUpdatedDate ? 0 : a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
		})

		let item = items.find((it) => {
			return it.configurationStatus === 'AUTHORIZED'
		})

		if (!item) {
			item = items[0]
		}

		return this.getConfiguration(item.configurationId, item.installedAppId)
	}

	// TODO -- make ID mandatory since not commonly (ever) called from ISA?
	public updateConfiguration(data: ConfigurationUpdateRequest, id?: string): Promise<InstalledAppConfiguration> {
		return this.client.put<InstalledAppConfiguration>(`${this.installedAppId(this.installedAppId(id))}/configs`, data)
	}

	public patchConfiguration(configurationId: string, data: ConfigurationPatchRequest, id?: string): Promise<InstalledAppConfiguration> {
		return this.client.put<InstalledAppConfiguration>(`${this.installedAppId(this.installedAppId(id))}/configs/${configurationId}`, data)
	}

	public delete(id?: string): Promise<Count> {
		return this.client.delete<Count>(this.installedAppId(id))
	}

	public async createEvent(data: InstalledAppEvents, id?: string): Promise<Status> {
		await this.client.post<Status>(`${this.installedAppId(this.installedAppId(id))}/events`, data)
		return SuccessStatusValue
	}

	public async sendMessage(data: InstalledAppMessage, id?: string): Promise<Status> {
		await this.client.post<Status>(`${this.installedAppId(this.installedAppId(id))}/send-message`, data)
		return SuccessStatusValue
	}
}
