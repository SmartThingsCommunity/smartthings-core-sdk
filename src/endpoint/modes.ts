import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export interface Mode {
	/**
	 *
	 * Globally unique id for the mode.
	 */
	id: string
	/**
	 * A name provided by the User. Unique per location, updatable.
	 */
	label: string
	/**
	 * A name provided when the mode was created. The name is unique per
	 * location, and can not be updated.
	 */
	name: string
}

export interface ModeRequest {
	/**
	 * A name provided by the User. Unique per location, updatable.
	 */
	label?: string
	/**
	 * A name provided when the mode was created. The name is unique per
	 * location, and can not be updated.
	 */
	name?: string
}

export interface ModeList {
	items: Mode[]
}
export class ModesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('locations', config))
	}

	public async list(locationId?: string): Promise<Mode[]> {
		const list = await this.client.get<ModeList>(`${this.locationId(locationId)}/modes`)
		return list.items ? list.items : []
	}

	public async get(id: string, locationId?: string): Promise<Mode> {
		const list = await this.list(locationId)
		if (list) {
			const item = list.find(it => it.id === id)
			if (item) {
				return item
			}
		}
		throw Error(`Scene ${id} not found`)
	}

	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(`locations/${this.locationId(locationId)}`)
		return SuccessStatusValue
	}

	public create(data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.post(`locations/${this.locationId(locationId)}`, data)
	}

	public update(id: string, data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.put(`locations/${this.locationId(locationId)}`, data)
	}
}
