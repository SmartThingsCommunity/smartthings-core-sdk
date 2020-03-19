import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig, HttpClientParams } from '../endpoint-client'


export enum OperatingMode {
	EASY_SETUP = 'easySetup',
	DEVICE_CONTROL = 'deviceControl',
}

export interface DPInfo {
	os: string
	dpType: string
	dpUri: string
	operatingMode?: OperatingMode
}

export enum DeviceConfigType {
	PROFILE = 'profile',
	DTH = 'dth',
}

export interface CapabilityValue {
	key: string //Command Name or Attribute Name
	enabledValues?: string[]
	range?: [number, number]
	step?: number //default 1
}

export enum VisibleConditionOperator {
	CONTAIN = 'contain',
	NOT_CONTAIN = 'notContain',
	START_WITH = 'startWith',
	END_WITH = 'endWith',
	EQ = '=',
	NE = '!=',
	GT = '>',
	GTE = '>=',
	LT = '<',
	LTE = '<=',
}

export interface VisibleCondition {
	component: string
	capability: string
	version?: number //default 1
	attribute: string
	operator: VisibleConditionOperator
	operand: string
}

export interface DeviceConfigEntry {
	component: string
	capability: string
	version: number //default 1
	values?: CapabilityValue[]
	visibleCondition?: VisibleCondition
}

export interface PresentationDeviceConfig {
	mnmn: string //the namespace of the integration
	vid: string //an identifier unique to a display configuration for a device
	type?: DeviceConfigType
	dpInfo?: DPInfo[]
	iconUrl?: string
	dashboard?: {
		states?: DeviceConfigEntry[]
		actions?: DeviceConfigEntry[]
	}
	detailView?: DeviceConfigEntry[]
	automation?: {
		conditions?: DeviceConfigEntry[]
		actions?: DeviceConfigEntry[]
	}
}

export class PresentationEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('presentation', config))
	}

	/**
	 * Get or generate a device configuration based on profile.
	 * @param extraParams is deprecated.
	 */
	public get(profileId: string, extraParams?: HttpClientParams ): Promise<PresentationDeviceConfig> {
		return this.client.get<PresentationDeviceConfig>(`types/${profileId}/deviceconfig`, extraParams)
	}

	/**
	 * Make an idempotent call to either create, update, or get a device configuration based on payload.
	 */
	public getOrCreate(deviceConfig: PresentationDeviceConfig): Promise<PresentationDeviceConfig> {
		return this.client.post<PresentationDeviceConfig>('deviceconfig', deviceConfig)
	}
}
