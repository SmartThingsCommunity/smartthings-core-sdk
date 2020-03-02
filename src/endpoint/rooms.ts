import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
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

	public list(locationId?: string): Promise<Room[]>{
		return this.client.getPagedItems<Room>(`${this.locationId(locationId)}/rooms`)
	}

	public get(id: string, locationId?: string): Promise<Room>{
		return this.client.get<Room>(`${this.locationId(locationId)}/rooms/${id}`)
	}

	public create(data: RoomRequest, locationId?: string): Promise<Room> {
		return this.client.post(`${this.locationId(locationId)}/rooms`, data)
	}

	public update(id: string, data: RoomRequest, locationId?: string): Promise<Room> {
		return this.client.put(`${this.locationId(locationId)}/rooms/${id}`, data)
	}

	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(`${this.locationId(locationId)}/rooms/${id}`)
		return SuccessStatusValue
	}

	public listDevices(id: string, locationId?: string): Promise<Device[]> {
		return this.client.getPagedItems<Device>(`${this.locationId(locationId)}/rooms/${id}/devices`)
	}
}
