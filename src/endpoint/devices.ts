import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { ConfigEntry} from './installedapps'
import { Links, Status, SuccessStatusValue } from '../types'
import {PresentationDevicePresentation} from './presentation'


const HEADER_OVERRIDES = {Accept: 'application/vnd.smartthings+json;v=20170916'}

export interface CapabilityReference {
	id: string
	version?: number
	status?: CapabilityStatus
}

export interface Component {
	id?: string // <^[-_!.~'()*0-9a-zA-Z]{1,36}$>
	label?: string
	capabilities: CapabilityReference[]
}

export interface AppDeviceDetails {
	installedAppId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	externalId?: string // <= 64 characters
	profileId?: string
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
	deviceNetworkType?: string
	completedSetup: boolean
	networkSecurityLevel?: DeviceNetworkSecurityLevel
	hubId?: string
	installedGroovyAppId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
}

export interface IrDeviceDetails {
	parentDeviceId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	profileId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	ocfDeviceType?: string
	irCode?: string
	functionCodes?: { default: string }
	childDevices?: IrDeviceDetails[]
	metadata?: object
}

export interface ViperDeviceDetails {
	uniqueIdentifier?: string
	manufacturerName?: string
	modelName?: string
	swVersion?: string
	hwVersion?: string
}

export enum DeviceIntegrationType {
	BLE = 'BLE',
	BLE_D2D = 'BLE_D2D',
	DTH = 'DTH',
	ENDPOINT_APP = 'ENDPOINT_APP',
	HUB = 'HUB',
	IR = 'IR',
	IR_OCF = 'IR_OCF',
	MQTT = 'MQTT',
	OCF = 'OCF',
	PENGYOU = 'PENGYOU',
	VIDEO = 'VIDEO',
	VIPER = 'VIPER',
	WATCH = 'WATCH',
}

export interface ProfileIdentifier {
	id: string
}

export interface HealthState {
	state: DeviceHealthState
	lastUpdatedDate?: string
}

export interface Device {
	deviceId?: string
	name?: string
	label?: string
	manufacturerName?: string
	presentationId?: string
	deviceManufacturerCode?: string
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	roomId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	deviceTypeId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	components?: Component[]
	childDevices?: Device[]
	profile?: ProfileIdentifier
	app?: AppDeviceDetails
	dth?: DthDeviceDetails
	ir?: IrDeviceDetails
	irOcf?: IrDeviceDetails
	viper?: ViperDeviceDetails
	type?: DeviceIntegrationType
	restrictionTier?: number
	healthState?: HealthState
}

export interface DeviceUpdate {
	label?: string
}

export interface DeviceProfileUpdate {
	profileId: string
}

export interface DeviceCreate {
	label?: string
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	app?: AppDeviceDetails
	profileId?: undefined
}

export interface AlternateDeviceCreate {
	label?: string
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	installedAppId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	externalId?: string // <= 64 characters
	profileId?: string
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
}

export interface DeviceEvent {
	component: string
	capability: string
	attribute: string
	value: unknown
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
	component: string
	capability: string
	command: string
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

export interface DeviceListOptions {
	/**
	 * Capability ID (for example, 'switchLevel') or array of capability IDs
	 */
	capability?: string | string[]

	/**
	 * Whether to AND or OR the capability IDs when more than one is specified
	 */
	capabilitiesMode?: 'and' | 'or'

	/**
	 * Location UUID or array of location UUIDs
	 */
	locationId?: string | string[]

	/**
	 * Device UUID or array of device UUIDs
	 */
	deviceId?: string | string[]

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
		if ('capabilitiesMode' in options && options.capabilitiesMode) {
			params.capabilitiesMode = options.capabilitiesMode
		}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		if ('deviceId' in options && options.deviceId) {
			params.deviceId = options.deviceId
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
			{headerOverrides: HEADER_OVERRIDES})
	}

	/**
	 * Returns all devices in the location specified in the client configuration. Throws an error if no location is
	 * specified in the client config. For use only in SmartApps.
	 * @deprecated use list() instead
	 */
	public listInLocation(): Promise<Device[]> {
		if (this.client.config.locationId) {
			return this.list({locationId: this.client.config.locationId})
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
			return this.list({locationId: this.locationId(), capability: capability})
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
		return this.client.get<Device>(id, params,{headerOverrides: HEADER_OVERRIDES})
	}

	/**
	 * Deletes the specified device
	 * @param id UUID of the device
	 */
	public delete(id: string): Promise<Device> {
		return this.client.delete<Device>(id)
	}


	/**
	 * Install a device.
	 * @param definition the device definition. If the client configuration specifies a locationId and installedAppId
	 * then these values don't need to be included in the definition.
	 */
	public create(definition: DeviceCreate | AlternateDeviceCreate): Promise<Device> {
		let data
		if (definition.app) {
			data = {
				label: definition.label,
				locationId: this.locationId(definition.locationId),
				app: {
					installedAppId: this.installedAppId(),
					...definition.app,
				},
			}
		} else if (definition.profileId) {
			data = {
				label: definition.label,
				locationId: this.locationId(definition.locationId),
				app: {
					installedAppId: this.installedAppId(definition.installedAppId),
					profileId: definition.profileId,
					externalId: definition.externalId,
				},
			}
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
			{headerOverrides: HEADER_OVERRIDES})
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
	 * Gets the attribute values of the specified ccomponent capability
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
	public async executeCommands(id: string, commands: Command[]): Promise<Status> {
		await this.client.post(`${id}/commands`, { commands })
		return SuccessStatusValue
	}

	/**
	 * Sends the specified command to the device
	 * @param id UUID of the device
	 * @param command a single device command
	 */
	public async executeCommand(id: string, command: Command): Promise<Status> {
		await this.executeCommands(id, [command])
		return SuccessStatusValue
	}

	/**
	 * Sends the specified commands to the device
	 * @deprecated use executeCommands instead
	 */
	public async postCommands(id: string, commands: CommandList): Promise<Status> {
		await this.client.post(`${id}/commands`, commands)
		return SuccessStatusValue
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
	public async sendCommand(item: ConfigEntry, capabilityIdOrCmdList: string | CommandRequest[], command?: string, args?: (object | string | number)[]): Promise<Status> {
		let commands
		const {deviceConfig} = item
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

			const body = {commands}
			await this.client.post(`${deviceConfig.deviceId}/commands`, body)
			return SuccessStatusValue
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
			command: string, args?: (object | string | number)[]): Promise<Status[]> {
		const results = []
		if (items) {
			for (const it of items) {
				results.push(this.sendCommand(it, capabilityIdOrCmdList, command, args))
			}
		}

		return Promise.all(results)
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
