import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Owner, Status, SuccessStatusValue } from '../types'


export class CapabilityReference {
	id?: string
	version?: number
}

export class DeviceComponent {
	id?: string
	/**
	 * UTF-8 label for the component.
	 */
	label?: string
	capabilities?: Array<CapabilityReference>
}

export class DeviceProfileMetadata extends null<string, string> {

}

export enum DeviceProfileStatus {
	DEVELOPMENT = 'DEVELOPMENT',
	PUBLISHED = 'PUBLISHED'
}

export class DeviceProfileRequest {
	name?: string
	components?: Array<DeviceComponent>
	metadata?: DeviceProfileMetadata
}

export class DeviceProfile extends DeviceProfileRequest {
	id?: string
	owner?: Owner
	status?: DeviceProfileStatus
}

export class DeviceProfilesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('deviceprofiles', config))
	}

	public list(): Promise<DeviceProfile[]> {
		return this.client.get<DeviceProfile[]>()
	}

	public get(id: string): Promise<DeviceProfile> {
		return this.client.get(id)
	}

	public async delete(id: string): Promise<Status> {
		await this.client.get(id)
		return SuccessStatusValue
	}

	public create(data: DeviceProfileRequest): Promise<DeviceProfile> {
		return this.client.post(undefined, data)
	}

	public update(id: string, data: DeviceProfileRequest): Promise<DeviceProfile> {
		return this.client.put(id, data)
	}

	public updateStatus(id: string, status: string): Promise<DeviceProfile> {
		return this.client.post(id, status)
	}
}
