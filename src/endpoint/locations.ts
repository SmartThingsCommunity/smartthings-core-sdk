import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'


export interface LocationParent {
	type?: LocationParentType

	/**
	 * The ID of the parent
	 * @format ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
	 */
	id?: string
}

export type LocationParentType = 'LOCATIONGROUP' | 'ACCOUNT'

/**
 * Client-facing action identifiers that may be permitted for the user.
 *
 *   w:locations - the user can change the name of the location
 *   d:locations - the user can delete the location
 *   w:devices - the user can create devices on the location
 *   w:locations:geo - the user can edit the geo-coordinates of the location
 *   w:rooms - the user can create rooms on the location
 */
export type LocationClientAction = 'w:locations' | 'd:locations' | 'w:devices' | 'w:locations:geo' | 'w:rooms'

/**
 * A slimmed down representation of the Location model.
 */
export interface LocationItem {
	/**
	 * The ID of the location.
	 * @format uuid
	 */
	locationId: string
	name: string

	/**
	 * List of client-facing action identifiers that are currently permitted for the user.
	 * If the value of this property is not null, then any action not included in the list
	 * value of the property is currently prohibited for the user.
	 */
	allowed?: LocationClientAction[] | null
	parent?: LocationParent
}

export interface LocationUpdate {
	name: string

	/**
	 * A geographical latitude.
	 * @min -90
	 * @max 90
	 */
	latitude?: number

	/**
	 * A geographical longitude.
	 * @min -180
	 * @max 180
	 */
	longitude?: number

	/**
	 * The radius in meters (integer) around latitude and longitude which defines this location.
	 * @min 20
	 * @max 500000
	 */
	regionRadius?: number

	/** The desired temperature scale used for the Location. Values include F and C. */
	temperatureScale: 'F' | 'C'

	/**
	 * We expect a POSIX locale but we also accept an IETF BCP 47 language tag.
	 * @example en_US
	 */
	locale?: string

	/** Additional information about the Location that allows SmartThings to further define your Location. */
	additionalProperties?: { [name: string]: string } // TODO: type should be { [name: string]: string | undefined } in future major version
}

export interface LocationCreate extends LocationUpdate {
	/**
	 * An ISO Alpha-3 country code (e.g. GBR, USA)
	 * @pattern ^[A-Z]{3}$
	 */
	countryCode: string
}

export interface Location extends LocationCreate {
	/**
	 * The ID of the location.
	 * @format uuid
	 */
	locationId: string

	/**
	 * An ID matching the Java Time Zone ID of the location. Automatically generated if latitude and longitude have been
	 * provided.
	 */
	timeZoneId: string

	/**
	 * Not currently in use.
	 * @example null
	 */
	backgroundImage: string

	/**
	 * List of client-facing action identifiers that are currently permitted for the user.
	 * If the value of this property is not null, then any action not included in the list
	 * value of the property is currently prohibited for the user.
	 */
	allowed?: LocationClientAction[] | null
	parent?: LocationParent

	/**
	 * The timestamp of when a location was created in UTC.
	 * @format date-time
	 */
	created?: string

	/**
	 * The timestamp of when a location was last updated in UTC.
	 * @format date-time
	 */
	lastModified?: string
}

export interface LocationGetOptions {
	/**
	 * If set to true, the items in the response may contain the allowed list property.
	 */
	allowed: boolean
}

export class LocationsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('locations', config))
	}

	/**
	 * List all Locations currently available in a user account.
	 */
	public async list(): Promise<LocationItem[]> {
		return this.client.getPagedItems<LocationItem>()
	}

	/**
	 * Get a specific Location from a user's account.
	 * @param id UUID of the location
	 * @param options optional query parameters passed wth request
	 */
	public get(id?: string, options: LocationGetOptions = { allowed: false }): Promise<Location> {
		const params = { allowed: options.allowed.toString() }
		return this.client.get<Location>(this.locationId(id), params)
	}

	/**
	 * Create a Location for a user.
	 * The Location will be created geographically close to the country code provided in the request body.
	 * If Location creation is not supported in the requested country code, the API will return a 422 error
	 * response with an error code of UnsupportedGeoRegionError.
	 *
	 * @param location definition of the location
	 */
	public create(location: LocationCreate): Promise<Location> {
		return this.client.post(undefined, location)
	}

	/**
	 * Update one or more fields of a specified Location.
	 * @param id UUID of the location
	 * @param location new location definition
	 */
	public update(id: string, location: LocationUpdate): Promise<Location> {
		return this.client.put(id, location)
	}

	/**
	 * Delete a Location from a user's account.
	 * @param id UUID of the location
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}
}
