import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { ConfigEntry} from './installedapps'
import { Links, Status, SuccessStatusValue } from '../types'
import { PresentationDevicePresentation } from './presentation'


const HEADER_OVERRIDES = { Accept: 'application/vnd.smartthings+json;v=20170916' }

export interface CapabilityReference {
	id: string
	version?: number
	status?: CapabilityStatus
}

export interface DeviceProfileReference {
	id?: string
}

/**
 * Included for backwards compatibility (renamed to match API docs).
 * For new code, use DeviceProfileReference.
 *
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileIdentifier extends DeviceProfileReference {}

export type CategoryType = 'manufacturer' | 'user'

export interface DeviceCategory {
	name: string
	categoryType: CategoryType
}

export interface Restrictions {
	/**
	 * integer
	 */
	tier: number

	/**
	 * integer
	 */
	historyRetentionTTLDays?: number

	/**
	 * default: false
	 */
	visibleWhenRestricted?: boolean
}

export interface Component {
	id: string // <^[-_!.~'()*0-9a-zA-Z]{1,36}$>
	capabilities: CapabilityReference[]
	categories: DeviceCategory[]
	label?: string
	restrictions?: Restrictions
	icon?: string
}

export interface AppDeviceDetails {
	/**
	 * The ID of the installed app that integrates this device.
	 *
	 * <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	 */
	installedAppId?: string
	/**
	 * A field to store an ID from a system external to SmartThings.
	 *
	 * <= 64 characters
	 */
	externalId?: string

	profile?: DeviceProfileReference
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BleDeviceDetails {
	// The API defines this object without properties.
}

export interface BleD2DDeviceDetails {
	encryptionKey?: string
	cipher?: string
	advertisingId?: string
	identifier?: string
	configurationVersion?: string
	configurationUrl?: string
	metadata?: object
}

export enum DeviceNetworkSecurityLevel {
	UNKNOWN = 'UNKNOWN',
	ZWAVE_LEGACY_NON_SECURE = 'ZWAVE_LEGACY_NON_SECURE',
	ZWAVE_S0_LEGACY = 'ZWAVE_S0_LEGACY',
	ZWAVE_S0_FALLBACK = 'ZWAVE_S0_FALLBACK',
	ZWAVE_S2_UNAUTHENTICATED = 'ZWAVE_S2_UNAUTHENTICATED',
	ZWAVE_S2_AUTHENTICATED = 'ZWAVE_S2_AUTHENTICATED',
	ZWAVE_S2_ACCESS_CONTROL = 'ZWAVE_S2_ACCESS_CONTROL',
	ZWAVE_S2_FAILED = 'ZWAVE_S2_FAILED',
	ZWAVE_S0_FAILED = 'ZWAVE_S0_FAILED',
	ZWAVE_S2_DOWNGRADE = 'ZWAVE_S2_DOWNGRADE',
	ZWAVE_S0_DOWNGRADE = 'ZWAVE_S0_DOWNGRADE'
}

export interface DthDeviceDetails {
	deviceTypeId: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	deviceTypeName: string
	completedSetup: boolean
	deviceNetworkType?: string
	executingLocally?: boolean
	hubId?: string
	installedGroovyAppId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	networkSecurityLevel?: DeviceNetworkSecurityLevel
}

export type ProvisioningState = 'PROVISIONED' | 'TYPED' | 'DRIVER_SWITCH' | 'NONFUNCTIONAL'
export interface LanDeviceDetails {
	networkId?: string
	driverId?: string
	executingLocally?: boolean
	hubId?: string
	provisioningState?: ProvisioningState
}

export interface ZigbeeDeviceDetails {
	eui?: string
	networkId?: string
	driverId?: string
	executingLocally?: boolean
	hubId?: string
	provisioningState?: ProvisioningState
}

export interface ZwaveDeviceDetails {
	networkId?: string
	driverId?: string
	executingLocally?: boolean
	hubId?: string
	networkSecurityLevel?: DeviceNetworkSecurityLevel
	provisioningState?: ProvisioningState
}

export interface MatterDeviceDetails {
	/**
	 * matches: string <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$> (DriverId)
	 */
	driverId?: string

	/**
	 * The hub that the device is connected to
	 */
	hubId?: string

	/**
	 * Provisioning type for a widget device
	 */
	provisioningState?: ProvisioningState

	/**
	 * The network-specific identifier of the device on the network
	 */
	networkId?: string

	/**
	 * True if the device is executing locally on the hub
	 */
	executingLocally?: boolean

	/**
	 * Optional Vendor-supplied unique identifier.
	 */
	uniqueId?: string
}

export interface IrDeviceDetails {
	parentDeviceId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	profileId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	ocfDeviceType?: string
	irCode?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	functionCodes?: { default?: string; [name: string]: any }
	childDevices?: IrDeviceDetails[]
	metadata?: object
}

export interface OcfDeviceDetails {
	deviceId?: string
	ocfDeviceType?: string
	name?: string
	specVersion?: string
	verticalDomainSpecVersion?: string
	manufacturerName?: string
	modelNumber?: string
	platformVersion?: string
	platformOS?: string
	hwVersion?: string
	firmwareVersion?: string
	vendorId?: string
	vendorResourceClientServerVersion?: string
	locale?: string
	lastSignupTime?: string
}

export interface ViperDeviceDetails {
	uniqueIdentifier?: string
	manufacturerName?: string
	modelName?: string
	swVersion?: string
	hwVersion?: string
}

export interface AttributeValue {
	/**
	 * The attribute that this command will correspond to
	 */
	attribute?: string

	/**
	 * How will the attribute be provided? Choose 'ARGUMENT' to provide it with a command at
	 * runtime or 'STATIC' to provide a set value here.
	 */
	inputType: 'ARGUMENT' | 'STATIC'

	/**
	 * The argument to be used automatically for this command mapping. Any simple type is accepted.
	 */
	staticValue: string | number | boolean
}

export interface CommandMapping {
	capabilityId: string

	/**
	 * The capability version number.
	 */
	version: string

	/**
	 * The command name to apply the mapping to on the device
	 */
	command: string

	/**
	 * A collection of attribute values, replicator will use these to create device events in
	 * serial for the specified command.
	 */
	eventValues: AttributeValue[]
}

export interface CommandMappings {
	commands: CommandMapping[]
}

export interface VirtualDeviceDetails {
	name?: string
	hubId?: string
	driverId?: string
	commandMappings?: CommandMappings
}

export enum DeviceIntegrationType {
	BLE = 'BLE',
	BLE_D2D = 'BLE_D2D',
	DTH = 'DTH',
	ENDPOINT_APP = 'ENDPOINT_APP',
	GROUP = 'GROUP',
	HUB = 'HUB',
	IR = 'IR',
	IR_OCF = 'IR_OCF',
	LAN = 'LAN',
	MATTER = 'MATTER',
	MOBILE = 'MOBILE',
	MQTT = 'MQTT',
	OCF = 'OCF',
	PENGYOU = 'PENGYOU',
	SHP = 'SHP',
	VIDEO = 'VIDEO',
	VIPER = 'VIPER',
	VIRTUAL = 'VIRTUAL',
	WATCH = 'WATCH',
	ZIGBEE = 'ZIGBEE',
	ZWAVE = 'ZWAVE',
}

export interface HealthState {
	state: DeviceHealthState
	lastUpdatedDate?: string
}

interface ChildDeviceRef {
	id: string
}

export type DeviceClientAction = 'w:devices' | 'w:devices:locationId' | 'w:devices:roomId' | 'x:devices' | 'd:devices'

export interface Device {
	deviceId: string

	/**
	 * A non-unique id that is used to help drive UI information.
	 */
	presentationId: string

	/**
	 * The device manufacturer name.
	 */
	manufacturerName: string

	/**
	 * The type of device integration (may be null). If the type is LAN, the device implementation
	 * is a groovy Device Handler and the details are in the "lan" field. If the type is
	 * ENDPOINT_APP, the device implementation is a SmartApp and the details are in the "app"
	 * field, etc.
	 */
	type: DeviceIntegrationType

	/**
	 * Restriction tier of the device, if any.
	 *
	 * integer value
	 */
	restrictionTier: number

	/**
	 * The name that the Device integration (Device Handler or SmartApp) defines for the Device.
	 */
	name?: string

	/**
	 * The name that a user chooses for the Device. This defaults to the same value as name.
	 */
	label?: string

	/**
	 * The device manufacturer code.
	 */
	deviceManufacturerCode?: string

	/**
	 * The ID of the Location with which the Device is associated.
	 *
	 * matches; <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	 */
	locationId?: string

	/**
	 *
	 */
	eventId?: string

	/**
	 * The identifier for the owner of the Device instance.
	 */
	ownerId?: string

	/**
	 * The ID of the Room with which the Device is associated. If the Device is not associated with
	 * any room, this field will be null.
	 *
	 * matches: <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	 */
	roomId?: string

	/**
	 * @deprecated please use dth.deviceTypeId instead
	 *
	 * matches: <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	 */
	deviceTypeId?: string

	/**
	 * The IDs of all components on the device.
	 */
	components?: Component[]

	/**
	 * The time when the device was created.
	 */
	createTime?: string

	/**
	 * The id of the parent device.
	 */
	parentDeviceId?: string

	/**
	 * References containing device ids of all child devices of the device.
	 */
	childDevices?: ChildDeviceRef[]

	profile?: DeviceProfileReference

	app?: AppDeviceDetails
	ble?: BleDeviceDetails
	bleD2D?: BleD2DDeviceDetails
	dth?: DthDeviceDetails
	lan?: LanDeviceDetails
	zigbee?: ZigbeeDeviceDetails
	zwave?: ZwaveDeviceDetails
	matter?: MatterDeviceDetails
	ir?: IrDeviceDetails
	irOcf?: IrDeviceDetails
	ocf?: OcfDeviceDetails
	viper?: ViperDeviceDetails
	virtual?: VirtualDeviceDetails

	/**
	 * List of client-facing action identifiers that are currently permitted for the user.
	 * If the value of this property is not null, then any action not included in the list value of
	 * the property is currently prohibited for the user.
	 *
	 * * w:devices - the user can change device details
	 * * w:devices:locationId - the user can move the device from a location
	 * * w:devices:roomId - the user can move or remove the device from a room
	 * * x:devices - the user can execute commands on the device
	 * * d:devices - the user can uninstall the device
	 */
	allowed?: DeviceClientAction[]
}

export interface UpdateDeviceComponent {
	id: string
	categories: string[]
	icon?: string
}

export interface DeviceUpdate {
	label?: string
	locationId?: string
	roomId?: string
	components?: UpdateDeviceComponent[]
}

export interface DeviceProfileUpdate {
	profileId: string
}

export interface CreateAppDeviceDetails {
	profileId: string
	/**
	 * installedAppId is required but the user can set a default when instantiating
	 * SmartThingsClient so we don't required it here.
	 *
	 * <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	 */
	installedAppId?: string

	/**
	 * A field to store an ID from a system external to SmartThings.
	 *
	 * <= 64 characters
	 */
	externalId?: string
}

export interface DeviceCreateBase {
	app?: CreateAppDeviceDetails
	/**
	 * locationId is required but the user can set a default when instantiating
	 * SmartThingsClient so we don't required it here.
	 */
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	label?: string
	roomId?: string
}
export interface DeviceCreate extends DeviceCreateBase {
	app: CreateAppDeviceDetails
}

export interface AlternateDeviceCreate extends DeviceCreateBase {
	installedAppId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>

	/**
	 * A field to store an ID from a system external to SmartThings.
	 *
	 * <= 64 characters
	 */
	externalId?: string
	profileId: string
	app?: undefined
}

export interface DeviceList {
	items: Device[]
	_links: Links
}

interface AttributeState {
	value?: unknown
	unit?: string
	data?: { [name: string]: object }
	timestamp?: string // date-time ("Will always be 0 time-zone offset" whatever that means)
}

export interface CapabilityStatus {
	[attributeName: string]: AttributeState
}

export interface ComponentStatus {
	[attributeName: string]: CapabilityStatus
}

export interface DeviceStatus {
	components?: { [componentId: string]: ComponentStatus }
	healthState?: HealthState
}

export interface DeviceEvent {
	value: unknown
	component: string
	capability: string
	attribute: string
	unit?: string
	data?: { [name: string]: object }
}

export interface DeviceEventList {
	deviceEvents: DeviceEvent[]
}

export enum DeviceHealthState {
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
	UNKNOWN = 'UNKNOWN',
}

export interface DeviceHealth {
	deviceId: string
	state: DeviceHealthState
	lastUpdatedDate?: string
}

export interface Command {
	capability: string
	command: string
	component?: string
	arguments?: (object | string | number)[]
}

export interface CommandRequest {
	capability: string
	command: string
	arguments?: (object | string | number)[]
}

export interface CommandList {
	commands: Command[]
}

export type CommandStatus = 'ACCEPTED' | 'COMPLETED' | 'FAILED'

export interface CommandResult {
	id: string
	status: CommandStatus
}

export interface CommandResponse {
	results: CommandResult[]
}

export type PreferenceType = 'integer' | 'number' | 'boolean' | 'string' | 'enumeration'

export interface DevicePreferenceEntry {
	preferenceType: PreferenceType
	value: string | number | boolean
}

export interface DevicePreferenceResponse {
	/**
	 * Map of preference name to its stored value
	 */
	values: Partial<Record<string, DevicePreferenceEntry>>
}

export interface DeviceListOptions {
	/**
	 * Capability ID (for example, 'switchLevel') or array of capability IDs
	 */
	capability?: string | string[]

	/**
	 * Location UUID or array of location UUIDs
	 */
	locationId?: string | string[]

	/**
	 * Device UUID or array of device UUIDs
	 */
	deviceId?: string | string[]

	/**
	 * Whether to AND or OR the capability IDs when more than one is specified
	 */
	capabilitiesMode?: 'and' | 'or'

	/**
	 * Restricted Devices are hidden by default. This option will reveal them. Device status will
	 * not be provided if the token does not have sufficient access level to view the device status
	 * even if includeStatus parameter is set to true.
	 */
	includeRestricted?: boolean

	/**
	 * Only list Devices accessible by the given integer accessLevel.
	 */
	accessLevel?: number

	/**
	 * UUID of an installed app instance
	 */
	installedAppId?: string

	/**
	 * Include the device health, i.e. online/offline status in the response
	 */
	includeHealth?: boolean

	/**
	 * Include the device status data, i.e. the values of all attributes, in the response
	 */
	includeStatus?: boolean

	/**
	 * Limit the number of results to this value. By default all devices are returned
	 */
	max?: number

	/**
	 * Page number for when a max number of results has been specified, starting with 1
	 */
	page?: number

	/**
	 * Device Type
	 */
	type?: DeviceIntegrationType | DeviceIntegrationType[]
}

export interface DeviceGetOptions {
	/**
	 * Include the device health, i.e. online/offline status in the response
	 */
	includeHealth?: boolean

	/**
	 * Include the device status data, i.e. the values of all attributes, in the response
	 */
	includeStatus?: boolean
}

export interface HueSaturation {
	hue: number
	saturation: number
}
export class DevicesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('devices', config))
	}

	/**
	 * Returns a list of devices matching the query options or all devices accessible by the principal (i.e. user)
	 * if no options are specified. If the includeHealth option is set to true then the response will also contain
	 * the health status of each device (i.e. if it is online or offline). If the includeStatus option is set to true
	 * then the response will also include the status of all attributes (i.e. value and timestamp)
	 *
	 * @param options query options, capability, capabilitiesMode ('and' or 'or'), locationId, deviceId. which can
	 * be single values or arrays, and includeHealth & includeStatus booleans
	 */
	public async list(options: DeviceListOptions = {}): Promise<Device[]> {
		const params: HttpClientParams = {}
		if ('capability' in options && options.capability) {
			params.capability = options.capability
		}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		if ('deviceId' in options && options.deviceId) {
			params.deviceId = options.deviceId
		}
		if ('capabilitiesMode' in options && options.capabilitiesMode) {
			params.capabilitiesMode = options.capabilitiesMode
		}
		if ('includeRestricted' in options && options.includeRestricted !== undefined) {
			params.includeRestricted = options.includeRestricted.toString()
		}
		if ('accessLevel' in options && options.accessLevel) {
			params.accessLevel = options.accessLevel
		}
		if ('includeHealth' in options && options.includeHealth !== undefined) {
			params.includeHealth = options.includeHealth.toString()
		}
		if ('includeStatus' in options && options.includeStatus !== undefined) {
			params.includeStatus = options.includeStatus.toString()
		}
		if ('installedAppId' in options && options.installedAppId) {
			params.installedAppId = options.installedAppId
		}
		if ('max' in options && options.max) {
			params.max = options.max
		}
		if ('page' in options && options.page) {
			params.page = options.page
		}
		if ('type' in options && options.type) {
			params.type = options.type
		}
		return this.client.getPagedItems<Device>(undefined, params,
			{ headerOverrides: HEADER_OVERRIDES })
	}

	/**
	 * Returns all devices in the location specified in the client configuration. Throws an error if no location is
	 * specified in the client config. For use only in SmartApps.
	 * @deprecated use list() instead
	 */
	public listInLocation(): Promise<Device[]> {
		if (this.client.config.locationId) {
			return this.list({ locationId: this.client.config.locationId })
		}
		return Promise.reject(Error('Location ID not defined'))
	}

	/**
	 * Returns all devices accessible by the principal (i.e. user)
	 * @deprecated use list() instead
	 */
	public listAll(): Promise<Device[]> {
		return this.list()
	}

	/**
	 * Returns devices with the specified capability.
	 * @deprecated use list({capability: 'switch'} instead
	 */
	public findByCapability(capability: string): Promise<Device[]> {
		if (this.client.config.locationId) {
			return this.list({ locationId: this.locationId(), capability: capability })
		}
		return Promise.reject(Error('Location ID not defined'))
	}

	/**
	 * Returns a description of the specified device
	 * @param id UUID of the device
	 * @param options optional includeHealth and includeStatus parameters.
	 * If the includeHealth option is set to true then the response will also contain
	 * the health status of each device (i.e. if it is online or offline). If the includeStatus option is set to true
	 * then the response will also include the status of all attributes (i.e. value and timestamp)
	 */
	public get(id: string, options: DeviceGetOptions = {}): Promise<Device> {
		const params: HttpClientParams = {}
		if ('includeHealth' in options && options.includeHealth !== undefined) {
			params.includeHealth = options.includeHealth.toString()
		}
		if ('includeStatus' in options && options.includeStatus !== undefined) {
			params.includeStatus = options.includeStatus.toString()
		}
		return this.client.get<Device>(id, params, { headerOverrides: HEADER_OVERRIDES })
	}

	/**
	 * Deletes the specified device
	 * @param id UUID of the device
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete<Device>(id)
		return SuccessStatusValue
	}


	/**
	 * Install a device.
	 * @param definition the device definition. If the client configuration specifies a locationId and installedAppId
	 * then these values don't need to be included in the definition.
	 */
	public async create(definition: DeviceCreate | AlternateDeviceCreate): Promise<Device> {
		let data: DeviceCreate
		if (definition.app) {
			data = {
				label: definition.label,
				roomId: definition.roomId,
				locationId: this.locationId(definition.locationId),
				app: {
					...definition.app,
					installedAppId: this.installedAppId(definition.app.installedAppId),
				},
			}
		} else if (definition.profileId) {
			data = {
				label: definition.label,
				roomId: definition.roomId,
				locationId: this.locationId(definition.locationId),
				app: {
					installedAppId: this.installedAppId(definition.installedAppId),
					profileId: definition.profileId,
					externalId: definition.externalId,
				},
			}
		} else {
			throw Error('Invalid device creation data')
		}

		return this.client.post<Device>('', data)
	}

	/**
	 * Update a device. Currently only the device label can be changed
	 * @param id UUID of the device
	 * @param data new device definition with the label specified
	 */
	public update(id: string, data: DeviceUpdate): Promise<Device> {
		return this.client.put<Device>(id, data)
	}

	/**
	 * Update the deviceProfileId of a device. Note that currently this method can
	 * only be called with an installedApp token with the i:deviceprofiles scope
	 * on a device created by that app.
	 * @param id UUID of the device
	 * @param data the new device profile
	 */
	public updateProfile(id: string, data: DeviceProfileUpdate): Promise<Device> {
		return this.client.put<Device>(`${id}/profile`, data, undefined,
			{ headerOverrides: HEADER_OVERRIDES })
	}

	/**
	 * Returns the current values of all device attributes
	 * @param id UUID of the device
	 */
	public getStatus(id: string): Promise<DeviceStatus> {
		return this.client.get<DeviceStatus>(`${id}/status`)
	}

	/**
	 * Returns the current values of all device attributes
	 * @deprecated use getStatus instead
	 */
	public getState(id: string): Promise<DeviceStatus> {
		return this.client.get<DeviceStatus>(`${id}/status`)
	}

	/**
	 * Gets the attribute values of the specified component of the device
	 * @param id UUID of the device
	 * @param componentId alphanumeric component ID, e.g. 'main'
	 */
	public getComponentStatus(id: string, componentId: string): Promise<ComponentStatus> {
		return this.client.get<ComponentStatus>(`${id}/components/${componentId}/status`)
	}

	/**
	 * Gets the attribute values of the specified component of the device
	 * @deprecated use getComponentStatus instead
	 */
	public getComponentState(id: string, componentId: string): Promise<ComponentStatus> {
		return this.client.get<ComponentStatus>(`${id}/components/${componentId}/status`)
	}

	/**
	 * Gets the attribute values of the specified component capability
	 * @param id UUID of the device
	 * @param componentId alphanumeric component ID, e.g. 'main'
	 * @param capabilityId alphanumeric capability ID, e.g. 'switchLevel'
	 */
	public getCapabilityStatus(id: string, componentId: string, capabilityId: string): Promise<CapabilityStatus> {
		return this.client.get<CapabilityStatus>(`${id}/components/${componentId}/capabilities/${capabilityId}/status`)
	}

	/**
	 * Gets the attribute values of the specified component capability
	 * @deprecated use getCapabilityStatus instead
	 */
	public getCapabilityState(id: string, componentId: string, capabilityId: string): Promise<CapabilityStatus> {
		return this.client.get<CapabilityStatus>(`${id}/components/${componentId}/capabilities/${capabilityId}/status`)
	}

	/**
	 * Returns the health status of the device
	 * @param id UUID of the device
	 */
	public getHealth(id: string): Promise<DeviceHealth> {
		return this.client.get<DeviceHealth>(`${id}/health`).catch(reason => {
			if (reason.statusCode === 404) {
				return {
					deviceId: id,
					state: DeviceHealthState.UNKNOWN,
				}
			}

			return Promise.reject(reason)
		})
	}

	/**
	 * Sends the specified list of commands to the device
	 * @param id UUID of the device
	 * @param commands list of commands
	 */
	public async executeCommands(id: string, commands: Command[]): Promise<CommandResponse> {
		return this.client.post(`${id}/commands`, { commands })
	}

	/**
	 * Sends the specified command to the device
	 * @param id UUID of the device
	 * @param command a single device command
	 */
	public async executeCommand(id: string, command: Command): Promise<CommandResponse> {
		return this.executeCommands(id, [command])
	}

	/**
	 * Sends the specified commands to the device
	 * @deprecated use executeCommands instead
	 */
	public async postCommands(id: string, commands: CommandList): Promise<CommandResponse> {
		return this.client.post(`${id}/commands`, commands)
	}

	/**
	 * Sends the specified command or commands to the device and component defined in the specified config entry. The
	 * end result is the same as calling the executeCommand method, but this method accepts a SmartApp config entry
	 * for convenience
	 * @param item installedApp config entry specifying the device UUID and component
	 * @param capabilityIdOrCmdList either a capability ID or list of commands. If a list of commands is specified
	 * then the command and args parameters are not required.
	 * @param command the command name. Required when a capability ID has been specified in the previous parameter
	 * @param args list of arguments. Required when a capability ID has been specified and the command has arguments
	 */
	public async sendCommand(item: ConfigEntry, capabilityIdOrCmdList: string | CommandRequest[],
			command?: string, args?: (object | string | number)[]): Promise<CommandResponse> {
		let commands
		const { deviceConfig } = item
		if (deviceConfig) {
			if (Array.isArray(capabilityIdOrCmdList)) {
				commands = capabilityIdOrCmdList.map(it => {
					return {
						component: deviceConfig.componentId,
						capability: it.capability,
						command: it.command,
						arguments: it.arguments || [],
					}
				})
			} else {
				commands = [
					{
						component: deviceConfig.componentId,
						capability: capabilityIdOrCmdList,
						command,
						arguments: args || [],
					},
				]
			}

			return this.client.post(`${deviceConfig.deviceId}/commands`, { commands })
		}
		return Promise.reject(Error('Device config not found'))
	}

	/**
	 * Sends the specified command or commands to the devices and components defined in the specified config entry list. The
	 * end result is the same as calling the executeCommand method, but this method accepts a SmartApp config entry
	 * for convenience
	 * @param items a list of the installedApp config entries specifying device UUIDs and component IDs
	 * @param capabilityIdOrCmdList either a capability ID or list of commands. If a list of commands is specified
	 * then the command and args parameters are not required.
	 * @param command the command name. Required when a capability ID has been specified in the previous parameter
	 * @param args list of arguments. Required when a capability ID has been specified and the command has arguments
	 */
	public sendCommands(items: ConfigEntry[], capabilityIdOrCmdList: string | CommandRequest[],
			command: string, args?: (object | string | number)[]): Promise<PromiseSettledResult<CommandResponse>[]> {
		const results = (items ?? [])
			.map(item => this.sendCommand(item, capabilityIdOrCmdList, command, args))

		return Promise.allSettled(results)
	}

	/**
	 * Creates events for the specified device
	 * @param id UUID of the device
	 * @param deviceEvents list of events
	 */
	public async createEvents(id: string, deviceEvents: DeviceEvent[]): Promise<Status> {
		await this.client.post(`${id}/events`, { deviceEvents })
		return SuccessStatusValue
	}

	/**
	 * @deprecated use createEvents instead
	 * @param id
	 * @param deviceEvents
	 */
	public async sendEvents(id: string, deviceEvents: DeviceEventList): Promise<void> {
		await this.client.post(`${id}/events`, deviceEvents)
	}

	/**
	 * Get a device presentation. If mnmn is omitted the default SmartThingsCommunity mnmn is used.
	 * @param deviceId UUID of the device
	 */
	public getPresentation(deviceId: string): Promise<PresentationDevicePresentation> {
		return this.client.get<PresentationDevicePresentation>('/presentation', { deviceId })
	}

	/**
	 * Get the preference values of the device
	 * @param deviceId UUID of the device
	 */
	public getPreferences(deviceId: string): Promise<DevicePreferenceResponse> {
		return this.client.get<DevicePreferenceResponse>(`${deviceId}/preferences`, undefined,
			{ headerOverrides: HEADER_OVERRIDES })
	}

	/**
	 * Convenience function that returns hue and saturation of the named color
	 * @deprecated
	 */
	public namedColor(color: string, sat = 100): HueSaturation {
		let hueColor = 0
		const saturation = sat
		switch (color) {
			case 'Blue':
				hueColor = 70
				break
			case 'Green':
				hueColor = 39
				break
			case 'Yellow':
				hueColor = 25
				break
			case 'Orange':
				hueColor = 10
				break
			case 'Purple':
				hueColor = 75
				break
			case 'Pink':
				hueColor = 83
				break
			case 'Red':
				hueColor = 100
				break
			default:
				hueColor = 0
		}

		return {hue: hueColor, saturation}
	}
}
