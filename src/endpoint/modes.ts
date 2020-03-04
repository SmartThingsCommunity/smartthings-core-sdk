import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export interface ModeRequest {
	/**
	 * A name provided by the User. Unique per location, updatable.
	 */
	label?: string
}

export interface Mode extends ModeRequest {
	/**
	 *
	 * Globally unique id for the mode.
	 */
	id: string

	/**
	 * A name provided when the mode was created. The name is unique per location, and can not be updated.
	 */
	name?: string
}

export class ModesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('locations', config))
	}

	public list(locationId?: string): Promise<Mode[]> {
		return this.client.getPagedItems<Mode>(`${this.locationId(locationId)}/modes`)
	}

	public async get(id: string, locationId?: string): Promise<Mode> {
		const list = await this.list(locationId)
		if (list) {
			const item = list.find(it => it.id === id)
			if (item) {
				return item
			}
		}
		throw Error(`Mode ${id} not found`)
	}

	public getCurrent(locationId?: string): Promise<Mode> {
		return this.client.get<Mode>(`${this.locationId(locationId)}/modes/current`)
	}

	public create(data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.post(`${this.locationId(locationId)}/modes`, data)
	}

	public update(id: string, data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.put(`${this.locationId(locationId)}/modes/${id}`, data)
	}

	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(`${this.locationId(locationId)}/modes/${id}`)
		return SuccessStatusValue
	}
}
