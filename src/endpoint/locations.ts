import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export interface PagedLocation {
	locationId: string
	name: string
}

export interface LocationList {
	items: PagedLocation[]
}

// Location information that can be sent with a location update.
export interface LocationUpdate {
	name: string
	latitude?: number
	longitude?: number
	regionRadius?: number // integer, in meters, minimum value is 20
	temperatureScale: 'F'|'C'
	locale?: string
	additionalProperties: { [name: string]: string } // TODO: verify type of this
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

	public async list(): Promise<PagedLocation[]> {
		const list = await this.client.get<LocationList>()
		return list.items ? list.items : []
	}

	public get(id?: string): Promise<Location> {
		return this.client.get<Location>(this.locationId(id))
	}

	public create(location: LocationCreate): Promise<Location> {
		return this.client.post(undefined, location)
	}

	public update(id: string, location: LocationUpdate): Promise<Location> {
		return this.client.put(id, location)
	}

	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}
}
