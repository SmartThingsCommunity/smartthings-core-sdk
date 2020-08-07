import {Endpoint} from '../endpoint'
import {EndpointClient, EndpointClientConfig, HttpClientParams} from '../endpoint-client'
import {PaginatedList} from '../pagination'


export interface DeviceActivity {
	/** Device ID */
	deviceId: string

	/** Device nick name */
	deviceName: string

	/** Location ID */
	locationId: string

	/** Location name */
	locationName: string

	/** The IS0-8601 date time strings in UTC of the activity */
	time: string

	/** Translated human readable string (localized) */
	text: string

	/** device component ID. Not nullable. */
	component: string

	/** device component label. Nullable. */
	componentLabel?: string

	/** capability name */
	capability: string

	/** attribute name */
	attribute: string

	/** attribute value */
	value: object
	unit?: string
	data?: Record<string, object>

	/** translated attribute name based on 'Accept-Language' requested in header */
	translatedAttributeName?: string

	/** translated attribute value based on 'Accept-Language' requested in header */
	translatedAttributeValue?: string

	/** UNIX epoch in milliseconds of the activity time */
	epoch: number

	/** Hash to differentiate two events with the same epoch value */
	hash: number
}

export interface PaginationRequest {
	/**
	 * Paging parameter for going to previous page. Before epoch time (millisecond).
	 * Return the nearest records (the immediate previous page) with event time before the specified value exclusively. e.g. 1511913638679. Note: type is a long.
	 *
	 */
	before?: number

	/**
	 * Paging parameter for going to previous page. Before Hash (long). This needs to be specified when 'before' is specified.
	 * Please put in associated hash value of the record specified by the 'before' parameter.
	 *
	 */
	beforeHash?: number

	/**
	 * Paging parameter for going to next page. After epoch time (millisecond).
	 * Return the nearest records (the immediate next page) with event time after the specified value exclusively. e.g. 1511913638679. Note: type is a long.
	 *
	 */
	after?: number

	/**
	 * Paging parameter for going to next page. After Hash (long). this needs to be specified when 'after' is specified.
	 * Please put in associated hash value of the record specified by the 'after' parameter.
	 *
	 */
	afterHash?: number

	/**
	 * Maximum number of events to return. Defaults to 20
	 */
	limit?: number
}

export type DeviceHistoryRequest = PaginationRequest & {
	locationId?: string | string[]
	deviceId?: string | string[]
	oldestFirst?: boolean
}

export class HistoryEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('history', config))
	}

	/**
	 * Queries for device events. Returns an object that supports explicit paging with next() and previous() as well
	 * as asynchronous iteration.
	 *
	 * Explicit paging:
	 * ```
	 * const result = await client.history.devices({deviceId: 'c8fc80fc-6bbb-4b74-a9fa-97acc3d5fa01'})
	 * for (const item of result.items) {
	 *     console.log(`${item.name} = ${item.value}`)
	 * }
	 * while (await next()) {
	 *     for (const item of result.items) {
	 *         console.log(`${item.name} = ${item.value}`)
	 *     }
	 * }
	 * ```
	 *
	 * Asynchronous iteration
	 * ```
	 * for await (const item of client.history.devices({deviceId: 'c8fc80fc-6bbb-4b74-a9fa-97acc3d5fa01'}) {
	 *    console.log(`${item.name} = ${item.value}`)
	 * }
	 * ```
	 *
	 * @param options query options -- deviceId, limit, before, beforeHash, after, afterHash, oldestFirst, and
	 * locationId.
	 */
	public async devices(options: DeviceHistoryRequest = {}): Promise<PaginatedList<DeviceActivity>> {
		const params: HttpClientParams = {}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		} else {
			throw new Error('Location ID is undefined')
		}
		if ('deviceId' in options && options.deviceId) {
			params.deviceId = options.deviceId
		}
		if ('limit' in options && options.limit) {
			params.limit = options.limit
		}
		if ('before' in options && options.before) {
			params.pagingBeforeEpoch = options.before
		}
		if ('beforeHash' in options && options.beforeHash) {
			params.pagingBeforeHash = options.beforeHash
		}
		if ('after' in options && options.after) {
			params.pagingAfterEpoch = options.after
		}
		if ('afterHash' in options && options.afterHash) {
			params.pagingAfterHash = options.afterHash
		}
		if ('oldestFirst' in options) {
			params.oldestFirst = `${options.oldestFirst}`
		}

		return new PaginatedList<DeviceActivity>(
			await this.client.get<PaginatedList<DeviceActivity>>('devices', params),
			this.client)
	}
}
