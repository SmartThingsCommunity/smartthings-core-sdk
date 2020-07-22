import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
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

	/**
	 * Returns a list of the modes defined for a location
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public list(locationId?: string): Promise<Mode[]> {
		return this.client.getPagedItems<Mode>(`${this.locationId(locationId)}/modes`)
	}

	/**
	 * Returns a specific mode
	 * @param id UUID of the mode
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
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

	/**
	 * Returns the currently active mode of a location
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public getCurrent(locationId?: string): Promise<Mode> {
		return this.client.get<Mode>(`${this.locationId(locationId)}/modes/current`)
	}

	/**
	 * Sets the currently active mode of a location
	 * @param id UUID of the mode
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public setCurrent(id: string, locationId?: string): Promise<Mode> {
		return this.client.put(`${this.locationId(locationId)}/modes/current`, {modeId: id})
	}

	/**
	 * Create a new mode in a location
	 * @param data definition specifying the name of the new mode
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public create(data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.post(`${this.locationId(locationId)}/modes`, data)
	}

	/**
	 * Updates the name of a mode
	 * @param id UUID of the mode
	 * @param data definition specifying the new mode name
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public update(id: string, data: ModeRequest, locationId?: string): Promise<Mode> {
		return this.client.put(`${this.locationId(locationId)}/modes/${id}`, data)
	}

	/**
	 * Delete a mode
	 * @param id UUID of the mode
	 * @param locationId UUID of the location. If the client is configured with a locationId this parameter is
	 * not necessary.
	 */
	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(`${this.locationId(locationId)}/modes/${id}`)
		return SuccessStatusValue
	}
}
