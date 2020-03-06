import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export interface LocationItem {
	locationId: string
	name: string
}


// Location information that can be sent with a location update.
export interface LocationUpdate {
	name: string
	latitude?: number
	longitude?: number
	regionRadius?: number // integer, in meters, minimum value is 20
	temperatureScale: 'F'|'C'
	locale?: string
	additionalProperties?: { [name: string]: string } // TODO: verify type of this
}

export interface LocationCreate extends LocationUpdate {
	countryCode: string // An ISO Alpha-3 country code. (i.e. GBR, USA)
}

export interface Location extends LocationCreate {
	locationId: string
	timeZoneId: string
	backgroundImage: string // not currently in use
}

export class LocationsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('locations', config))
	}

	/**
	 * Returns a list of all locations accessible by the principal (i.e. user)
	 */
	public async list(): Promise<LocationItem[]> {
		return this.client.getPagedItems<LocationItem>()
	}

	/**
	 * Get the definition of a specific location
	 * @param id UUID of the location
	 */
	public get(id?: string): Promise<Location> {
		return this.client.get<Location>(this.locationId(id))
	}

	/**
	 * Creates a location
	 * @param location definition of the location
	 */
	public create(location: LocationCreate): Promise<Location> {
		return this.client.post(undefined, location)
	}

	/**
	 * Updates a location
	 * @param id UUID of the location
	 * @param location new location definition
	 */
	public update(id: string, location: LocationUpdate): Promise<Location> {
		return this.client.put(id, location)
	}

	/**
	 * Deletes a location and all of the devices and installed apps associated with it.
	 * @param id UUID of the location
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}
}
