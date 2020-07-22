import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Owner, Status, SuccessStatusValue } from '../types'
import { CapabilityReference } from './devices'


export interface DeviceComponentRequest {
	id?: string
	capabilities?: CapabilityReference[]
	categories?: string[]
}

export interface DeviceComponent extends DeviceComponentRequest {
	/**
	 * UTF-8 label for the component. This value is generated and dependent on the locale of the request
	 */
	label?: string
}

export enum DeviceProfileStatus {
	DEVELOPMENT = 'DEVELOPMENT',
	PUBLISHED = 'PUBLISHED'
}

export interface DeviceProfileRequest {
	name?: string
	components?: DeviceComponentRequest[]
	metadata?: { [key: string]: string }
}

export interface DeviceProfileUpdateRequest {
	components?: DeviceComponentRequest[]
	metadata?: { [key: string]: string }
}

export interface DeviceProfile extends DeviceProfileRequest {
	id: string
	name: string
	owner: Owner
	components: DeviceComponent[]
	metadata?: { [key: string]: string }
	status: DeviceProfileStatus
}

export class DeviceProfilesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('deviceprofiles', config))
	}

	/**
	 * List all the device profiles belonging to the principal (i.e. user)
	 */
	public list(): Promise<DeviceProfile[]> {
		return this.client.getPagedItems<DeviceProfile>()
	}

	/**
	 * Get the definition of a specific device profile
	 * @param id UUID of the device profile
	 */
	public get(id: string): Promise<DeviceProfile> {
		return this.client.get(id)
	}

	/**
	 * Delete a device profile
	 * @param id UUID of the device profile
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}

	/**
	 * Create a device profile
	 * @param data device profile definition
	 */
	public create(data: DeviceProfileRequest): Promise<DeviceProfile> {
		return this.client.post(undefined, data)
	}

	/**
	 * Update a device profile
	 * @param id UUID of the device profile
	 * @param data the new device profile definition
	 */
	public update(id: string, data: DeviceProfileUpdateRequest): Promise<DeviceProfile> {
		return this.client.put(id, data)
	}

	/**
	 * Update the status of a device profile
	 * @param id UUID of the device profile
	 * @param deviceProfileStatus new device profile status
	 */
	public updateStatus(id: string, deviceProfileStatus: DeviceProfileStatus): Promise<DeviceProfile> {
		return this.client.post(`${id}/status`, {deviceProfileStatus})
	}
}
