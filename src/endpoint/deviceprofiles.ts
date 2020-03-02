import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Owner, Status, SuccessStatusValue } from '../types'


export interface CapabilityReference {
	id: string
	version?: number
}

export interface DeviceComponent {
	id?: string
	/**
	 * UTF-8 label for the component.
	 */
	label?: string
	capabilities?: Array<CapabilityReference>
}

export enum DeviceProfileStatus {
	DEVELOPMENT = 'DEVELOPMENT',
	PUBLISHED = 'PUBLISHED'
}

export interface DeviceProfileRequest {
	name?: string
	components?: Array<DeviceComponent>
	metadata?: { [key: string]: string }
}

export interface DeviceProfile extends DeviceProfileRequest {
	id?: string
	owner?: Owner
	status?: DeviceProfileStatus
}

export interface DeviceProfileStatusRequest {
	deviceProfileStatus: DeviceProfileStatus
}

export class DeviceProfilesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('deviceprofiles', config))
	}

	public list(): Promise<DeviceProfile[]> {
		return this.client.getPagedItems<DeviceProfile>()
	}

	public get(id: string): Promise<DeviceProfile> {
		return this.client.get(id)
	}

	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}

	public create(data: DeviceProfileRequest): Promise<DeviceProfile> {
		return this.client.post(undefined, data)
	}

	public update(id: string, data: DeviceProfileRequest): Promise<DeviceProfile> {
		return this.client.put(id, data)
	}

	public updateStatus(id: string, status: DeviceProfileStatusRequest): Promise<DeviceProfile> {
		return this.client.post(`${id}/status`, status)
	}
}
