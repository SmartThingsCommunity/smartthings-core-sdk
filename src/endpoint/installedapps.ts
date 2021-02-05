import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { Count, Owner, PrincipalType, Status, SuccessStatusValue } from '../types'


export interface StringConfig {
	/**
	 * A config value
	 */
	value: string
}

export interface DeviceConfig {
	/**
	 * The ID of the device.
	 */
	deviceId: string
	/**
	 * The component ID on the device.
	 */
	componentId: string
	permissions: string[]
}

export interface PermissionConfig {
	permissions: string[]
}

export interface ModeConfig {
	/**
	 * The ID of the mode.
	 */
	modeId: string
}

export interface SceneConfig {
	/**
	 * The ID of the scene.
	 */
	sceneId: string
	permissions: string[]
}

export interface MessageConfig {
	/**
	 * The key value of the message group.
	 */
	messageGroupKey: string
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
	valueType: ConfigValueType
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
	LAMBDA_SMART_APP = 'LAMBDA_SMART_APP',
	WEBHOOK_SMART_APP = 'WEBHOOK_SMART_APP',
	API_ONLY = 'API_ONLY',
	BEHAVIOR = 'BEHAVIOR',
}

export enum InstallConfigurationStatus {
	STAGED = 'STAGED',
	DONE = 'DONE',
	AUTHORIZED = 'AUTHORIZED',
	REVOKED = 'REVOKED',
}

export enum InstalledAppStatus {
	PENDING = 'PENDING',
	AUTHORIZED = 'AUTHORIZED',
	REVOKED = 'REVOKED',
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
	installedAppStatus: InstalledAppStatus
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
	classifications?: InstalledAppClassification[]
	/**
	 * Denotes the principal type to be used with the app.  Default is LOCATION.
	 */
	principalType: PrincipalType
	/**
	 * Inform the installation systems that the associated app can only be
	 * installed once within a user's account.
	 */
	singleInstance: boolean
	restrictionTier?: number
}

export interface ConfigurationRequest {
	appId: string
	locationId: string
	installedAppType: InstalledAppType
	configurationStatus: InstallConfigurationStatus
	config: {[name: string]: ConfigEntry[]}
}

export interface InstalledAppConfiguration {
	installedAppId: string
	configurationId: string
	configurationStatus: InstallConfigurationStatus
	createdDate: string
	lastUpdatedDate: string
	config: {[name: string]: ConfigEntry}
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
	config: {[name: string]: ConfigEntry[]}
}

export interface ConfigurationPatchRequest {
	removals: string[]
	upserts: {[name: string]: ConfigEntry[]}
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

export interface SmartAppEvent {
	name: string
	attributes: {[name: string]: string}
}

export interface SmartAppDashboardEvent {
	cardId: string
	lifecycle: DashboardLifecycleEventType
}

export interface InstalledAppEvents {
	smartAppEvents?: SmartAppEvent[]
	smartAppDashboardEvents?: SmartAppDashboardEvent[]
}

export enum InstalledAppMessageType {
	PREDEFINED = 'PREDEFINED',
	ADHOC = 'ADHOC'
}

export interface PredefinedMessage {
	messageTemplateKey: string
	defaultVariables: {[name: string]: string}
	localeVariables: [
		{
			localeTag: string
			variables: {[name: string]: string}
		}
	]
}

export interface AdhocMessage {
	fallbackLocale: string
	defaultVariables: {[name: string]: string}
	templates: [
		{
			localeTag: string
			template: string
			variables: {[name: string]: string}
		}
	]
}

export interface  InstalledAppMessage {
	messageGroupKey: string
	messageType: InstalledAppMessageType
	predefinedMessage?: PredefinedMessage
	adhocMessage?: AdhocMessage
}

// TODO -- tags??

export interface InstalledAppListOptions {
	locationId?: string | string[]
	installedAppStatus?: InstalledAppStatus | InstalledAppStatus[]
	installedAppType?: InstalledAppType | InstalledAppType[]
	appId?: string | string[]
	modeId?: string | string[]
	deviceId?: string | string[]
	max?: number
	page?: number
}

export interface ConfigurationListOptions {
	configurationStatus?: InstallConfigurationStatus
	max?: number
	page?: number
}

export class InstalledAppsEndpoint extends Endpoint{
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	/**
	 * Returns a list of installed app instances matching the query options or all instances accessible by the principal
	 * (i.e. user) if no options are specified.
	 *
	 * @param options query options, locationId, installedAppStatus, installedAppType, deviceId. These can
	 * be single values or arrays.
	 */
	public async list(options: InstalledAppListOptions = {}): Promise<InstalledApp[]> {
		const params: HttpClientParams = {}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		if ('installedAppStatus' in options && options.installedAppStatus) {
			params.installedAppStatus = options.installedAppStatus
		}
		if ('installedAppType' in options && options.installedAppType) {
			params.installedAppType = options.installedAppType
		}
		if ('deviceId' in options && options.deviceId) {
			params.deviceId = options.deviceId
		}
		if ('appId' in options && options.appId) {
			params.appId = options.appId
		}
		if ('modeId' in options && options.modeId) {
			params.modeId = options.modeId
		}
		if ('max' in options && options.max) {
			params.max = options.max
		}
		if ('page' in options && options.page) {
			params.page = options.page
		}
		return this.client.getPagedItems<InstalledApp>(undefined, params)
	}

	/**
	 * Returns the specified installed app definition
	 * @param id UUID of the installed app
	 */
	public get(id?: string): Promise<InstalledApp> {
		return this.client.get<InstalledApp>(this.installedAppId(this.installedAppId(id)))
	}

	/**
	 * Returns the token info for an intalled app principal
	 */
	public tokenInfo(): Promise<TokenInformation> {
		return this.client.get<TokenInformation>('me')
	}

	/**
	 * Creates an installed app instance
	 * @param data configuration data for the app instance
	 */
	public create(data: ConfigurationRequest): Promise<InstalledAppResponse> {
		return this.client.post<InstalledAppResponse>(undefined, data)
	}

	/**
	 * Updates the display name of an installled app instance
	 * @param id UUID of the installed app
	 * @param data request containing the display name
	 */
	public update(id: string, data: InstalledAppUpdateRequest): Promise<InstalledApp> {
		return this.client.put<InstalledApp>(id, data)
	}

	/**
	 * List configurations of an installed app instance
	 * @param id UUID of the installed app
	 * @param options including the desired configuration status
	 */
	public listConfigurations(id: string, options: ConfigurationListOptions = {}): Promise<InstalledAppConfigItem[]> {
		const params: HttpClientParams = {}
		if ('configurationStatus' in options && options.configurationStatus) {
			params.configurationStatus = options.configurationStatus
		}
		if ('max' in options && options.max) {
			params.max = options.max
		}
		if ('page' in options && options.page) {
			params.page = options.page
		}
		return this.client.getPagedItems<InstalledAppConfigItem>(`${id}/configs`, params)
	}

	/**
	 * Returns a specific installed app configuration
	 * @param id UUID of the installed app
	 * @param configurationId UUID of the configuration
	 */
	public getConfiguration(id: string, configurationId: string): Promise<InstalledAppConfiguration> {
		return this.client.get<InstalledAppConfiguration>(`${id}/configs/${configurationId}`)
	}

	/**
	 * Returns the most recent configuration, authorized or not
	 * @param id The installedAppId
	 */
	public async getLatestConfiguration(id: string): Promise<InstalledAppConfiguration | undefined> {
		const items = (await this.listConfigurations(id)).sort((a, b) => {
			return a.lastUpdatedDate === b.lastUpdatedDate ? 0 : a.lastUpdatedDate < b.lastUpdatedDate ? 1 : -1
		})
		if (items.length > 0) {
			const item = items[0]
			return this.getConfiguration(item.installedAppId, item.configurationId)
		}
		return undefined
	}

	/**
	 * Returns the current authorized configuration, or undefined if there is no authorized configuration
	 * @param id UUID of the installed app
	 */
	public async getAuthorizedConfiguration(id: string): Promise<InstalledAppConfiguration | undefined> {
		const items = await this.listConfigurations(id, {configurationStatus: InstallConfigurationStatus.AUTHORIZED})
		if (items.length > 0) {
			const item = items[0]
			return this.getConfiguration(item.installedAppId, item.configurationId)
		}
		return undefined
	}

	/**
	 * Returns the current authorized configuration, or the latest configuration of any status if none are authorized
	 * @param id UUID of the installed app
	 */
	public async getCurrentConfiguration(id: string): Promise<InstalledAppConfiguration | undefined> {
		let item = await this.getAuthorizedConfiguration(id)
		if (!item) {
			item = await this.getLatestConfiguration(id)
		}
		return item
	}

	/**
	 * Updates an Installed App configuration. Call implicitly operates on the latest 'STAGED' configuration.
	 * @param id UUID of the installed app
	 * @param data the new configuration
	 */
	public updateConfiguration(id: string, data: ConfigurationUpdateRequest): Promise<InstalledAppConfiguration> {
		return this.client.put<InstalledAppConfiguration>(`${id}/configs`, data)
	}

	/**
	 * Allows specific configuration keys to be removed / upserted from any configuration that may already exist.
	 * This operation is only supported on install configurations in status of 'STAGED'. Useful for iteratively
	 * configuring an installed app.
	 * @param id UUID of the installed app
	 * @param configurationId UUID of the configuration
	 * @param data requests containing upserts and removals of configuration items
	 */
	public patchConfiguration(id: string, configurationId: string, data: ConfigurationPatchRequest): Promise<InstalledAppConfiguration> {
		return this.client.put<InstalledAppConfiguration>(`${id}/configs/${configurationId}`, data)
	}

	/**
	 * Deletes an installed app instance. If the client is configured with an installedApp ID this value can be
	 * omitted.
	 * @param id UUID of the installed app
	 */
	public async delete(id?: string): Promise<Status> {
		await this.client.delete<Count>(this.installedAppId(id))
		return SuccessStatusValue
	}

	/**
	 * Create events for an installed app. Note that this method is here in support of future functionality not yet
	 * available in the SmartThings platform.
	 * @param data object contain lists of events
	 * @param id UUID of the installed app. This value does not need to be specified if the client is configured with
	 * an installed app ID
	 */
	public async createEvent(data: InstalledAppEvents, id?: string): Promise<Status> {
		await this.client.post<Status>(`${this.installedAppId(id)}/events`, data)
		return SuccessStatusValue
	}

	/**
	 * Send a message to a message group. Note that this method is here in support of future functionality not yet
	 * available in the SmartThings platform.
	 * @param data the message
	 * @param id UUID of the installed app. This value does not need to be specified if the client is configured with
	 * an installed app ID
	 */
	public async sendMessage(data: InstalledAppMessage, id?: string): Promise<Status> {
		await this.client.post<Status>(`${this.installedAppId(id)}/send-message`, data)
		return SuccessStatusValue
	}
}
