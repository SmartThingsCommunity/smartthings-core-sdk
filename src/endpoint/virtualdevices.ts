import { Endpoint} from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { CommandMappings, Device, DeviceEvent } from './devices'
import { DeviceProfileCreateRequest } from './deviceprofiles'


export interface VirtualDeviceOwner {
	ownerType: VirtualDeviceOwnerTypeEnum
	ownerId: string
}

export type VirtualDeviceOwnerTypeEnum = 'USER' | 'LOCATION'

export type ExecutionTarget = 'CLOUD' | 'LOCAL'

export interface VirtualDeviceCreateRequest {
	name: string
	owner: VirtualDeviceOwner
	deviceProfileId?: string
	deviceProfile?: DeviceProfileCreateRequest
	roomId?: string
	commandMappings?: CommandMappings
	executionTarget?: ExecutionTarget
	hubId?: string
	driverId?: string
}

export interface VirtualDeviceStandardCreateRequest {
	name: string
	owner: VirtualDeviceOwner
	prototype: string
	roomId?: string
	executionTarget?: ExecutionTarget
	hubId?: string
	driverId?: string
}

export interface VirtualDeviceListOptions {
	locationId?: string
}

export interface VirtualDeviceEventsResponse {
	stateChanges: boolean[]
}

export class VirtualDevicesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('virtualdevices', config))
	}

	/**
	 * Returns list of virtual devices.
	 * @param options map of filter options. Currently only 'locationId' is supported.
	 */
	public list(options: VirtualDeviceListOptions = {}): Promise<Device[]> {
		const params: HttpClientParams = {}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		return this.client.getPagedItems<Device>(undefined, params)
	}

	/**
	 * Create a virtual device from a device profile. An existing device profile can be designated by ID, or the
	 * definition of a device profile can be provided inline.
	 */
	public create(definition: VirtualDeviceCreateRequest): Promise<Device> {
		return this.client.post<Device>('', definition)
	}

	/**
	 * Creates a virtual device from a standard prototype.
	 */
	public createStandard(definition: VirtualDeviceStandardCreateRequest): Promise<Device> {
		return this.client.post<Device>('prototypes', definition)
	}

	/**
	 * Creates events for the specified device
	 * @param id UUID of the device
	 * @param deviceEvents list of events
	 */
	public createEvents(id: string, deviceEvents: DeviceEvent[]): Promise<VirtualDeviceEventsResponse> {
		return this.client.post(`${id}/events`, { deviceEvents })
	}
}
