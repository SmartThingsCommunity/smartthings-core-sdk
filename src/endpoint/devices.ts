import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { ConfigEntry} from './installedapps'
import { Links, Status, SuccessStatusValue } from '../types'


export interface Capability {
	id: string
	version?: number
}

export interface Component {
	id?: string // <^[-_!.~'()*0-9a-zA-Z]{1,36}$>
	label?: string
	capabilities: Capability[]
}

export interface DeviceProfileReference {
	id?: string
}

export interface AppDeviceDetails {
	installedAppId?: string // <^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$>
	externalId?: string // <= 64 characters
	profile?: DeviceProfileReference
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
}

export enum DeviceIntegrationType {
	DTH = 'DTH',
	ENDPOINT_APP = 'ENDPOINT_APP',
	IR = 'IR',
	IR_OCF = 'IR_OCF',
	VIPER = 'VIPER',
}

export interface Device {
	deviceId?: string
	name?: string
	label?: string
	deviceManufacturerCode?: string
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	roomId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	deviceTypeId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	components?: Component[]
	childDevices?: Device[]
	profile?: DeviceProfileReference
	app?: AppDeviceDetails
	dth?: DthDeviceDetails
	ir?: IrDeviceDetails
	irOcf?: IrDeviceDetails
	viper?: ViperDeviceDetails
	type?: DeviceIntegrationType
}

export interface DeviceCreate {
	label?: string
	locationId?: string // <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	app?: AppDeviceDetails
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
	capability?: string | string[]
	capabilitiesMode?: 'and' | 'or'
	locationId?: string | string[]
	deviceId?: string | string[]
	max?: number
	page?: number
}

export interface HueSaturation {
	hue: number
	saturation: number
}

export class DevicesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('devices', config))
	}

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
		if ('max' in options && options.max) {
			params.max = options.max
		}
		if ('page' in options && options.page) {
			params.page = options.page
		}
		return this.client.getPagedItems<Device>(undefined, params)
	}

	// From current SA SDK -- deprecate?
	// listInLocation
	// listAll
	public listInLocation(): Promise<Device[]> {
		if (this.client.config.locationId) {
			return this.list({locationId: this.client.config.locationId})
		}
		return Promise.reject(Error('Location ID not defined'))
	}

	/**
	 * @deprecated use list() instead
	 */
	public listAll(): Promise<Device[]> {
		return this.list()
	}

	/**
	 * @deprecated use list({capability: 'switch'} instead
	 */
	public findByCapability(capability: string): Promise<Device[]> {
		if (this.client.config.locationId) {
			return this.list({locationId: this.locationId(), capability: capability})
		}
		return Promise.reject(Error('Location ID not defined'))
	}

	public get(id: string): Promise<Device> {
		return this.client.get<Device>(id)
	}

	public delete(id: string): Promise<Device> {
		return this.client.delete<Device>(id)
	}


	public create(definition: DeviceCreate): Promise<Device> {
		const app = {
			installedAppId: this.installedAppId(),
			...definition.app,
		}

		const data = {
			label: definition.label,
			locationId: this.locationId(),
			...app,
		}

		return this.client.post<Device>('', data)
	}

	public update(id: string, data: Device): Promise<Device> {
		return this.client.put<Device>(id, data)
	}

	public getStatus(id: string): Promise<DeviceStatus> {
		return this.client.get<DeviceStatus>(`${id}/status`)
	}

	public getState(id: string): Promise<DeviceStatus> {
		return this.client.get<DeviceStatus>(`${id}/status`)
	}

	public getComponentStatus(id: string, componentId: string): Promise<ComponentStatus> {
		return this.client.get<ComponentStatus>(`${id}/components/${componentId}/status`)
	}

	public getComponentState(id: string, componentId: string): Promise<ComponentStatus> {
		return this.client.get<ComponentStatus>(`${id}/components/${componentId}/status`)
	}

	public getCapabilityStatus(id: string, componentId: string, capabilityId: string): Promise<CapabilityStatus> {
		return this.client.get<CapabilityStatus>(`${id}/components/${componentId}/capabilities/${capabilityId}/status`)
	}

	public getCapabilityState(id: string, componentId: string, capabilityId: string): Promise<CapabilityStatus> {
		return this.client.get<CapabilityStatus>(`${id}/components/${componentId}/capabilities/${capabilityId}/status`)
	}

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

	public async executeCommands(id: string, commands: Command[]): Promise<Status> {
		this.client.post(`${id}/commands`, { commands })
		return SuccessStatusValue
	}

	public async executeCommand(id: string, command: Command): Promise<Status> {
		this.executeCommands(id, [command])
		return SuccessStatusValue
	}

	/**
	 * @deprecated use executeCommands instead
	 * @param id
	 * @param commands
	 */
	public async postCommands(id: string, commands: CommandList): Promise<Status> {
		this.client.post(`${id}/commands`, commands)
		return SuccessStatusValue
	}

	public async sendCommand(item: ConfigEntry, capabilityNameOrCmdList: string | CommandRequest[], command: string, args: (object | string | number)[]): Promise<Status> {
		let commands
		const {deviceConfig} = item
		if (deviceConfig) {
			if (Array.isArray(capabilityNameOrCmdList)) {
				commands = capabilityNameOrCmdList.map(it => {
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
						capability: capabilityNameOrCmdList,
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

	public sendCommands(items: ConfigEntry[], capabilityNameOrCmdList: string | CommandRequest[], command: string, args: (object | string | number)[]): Promise<Status[]> {
		const results = []
		if (items) {
			for (const it of items) {
				results.push(this.sendCommand(it, capabilityNameOrCmdList, command, args))
			}
		}

		return Promise.all(results)
	}

	public createEvents(id: string, events: DeviceEvent[]): void {
		this.client.post(`${id}/events`, { events })
	}

	/**
	 * @deprecated use createEvents instead
	 * @param id
	 * @param events
	 */
	public sendEvents(id: string, events: DeviceEventList): void {
		this.client.post(`${id}/events`, events)
	}

	/**
	 * Returns hue and saturation of the nameed color
	 * @param color
	 * @param sat
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
