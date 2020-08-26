import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'
import { Device } from './devices'


export class RoomRequest {
	/**
	 * A name given for the room (eg. Living Room)
	 */
	name?: string
}

export class Room extends RoomRequest {
	/**
	 * The ID of the parent location.
	 */
	locationId?: string

	/**
	 * The ID of the room.
	 */
	roomId?: string
}

export class RoomsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('locations', config))
	}

	/**
	 * List the rooms in a location
	 * @param locationId UUID of the location
	 */
	public list(locationId?: string): Promise<Room[]>{
		return this.client.getPagedItems<Room>(`${this.locationId(locationId)}/rooms`)
	}

	/**
	 * Get a specific room in a location
	 * @param id UUID of the room
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public get(id: string, locationId?: string): Promise<Room>{
		return this.client.get<Room>(`${this.locationId(locationId)}/rooms/${id}`)
	}

	/**
	 * Create a room in a location
	 * @param data request containing the room name
	 * @param locationId  UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public create(data: RoomRequest, locationId?: string): Promise<Room> {
		return this.client.post(`${this.locationId(locationId)}/rooms`, data)
	}

	/**
	 * Update a room
	 * @param id UUID of the room
	 * @param data request containing the name of the room
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public update(id: string, data: RoomRequest, locationId?: string): Promise<Room> {
		return this.client.put(`${this.locationId(locationId)}/rooms/${id}`, data)
	}

	/**
	 * Delete a room from a location
	 * @param id UUID of the room
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(`${this.locationId(locationId)}/rooms/${id}`)
		return SuccessStatusValue
	}

	/**
	 * Returns a list of all the devices in a room
	 * @param id UUID of the room
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public listDevices(id: string, locationId?: string): Promise<Device[]> {
		return this.client.getPagedItems<Device>(`${this.locationId(locationId)}/rooms/${id}/devices`)
	}
}
