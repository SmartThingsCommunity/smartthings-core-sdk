import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { EdgeDriver } from './drivers'


export interface ChannelBase {
	name: string
	description: string
	termsOfServiceUrl: string
}

export interface ChannelCreate extends ChannelBase {
	type?: 'DRIVER'
}

export interface Channel extends ChannelCreate {
	channelId: string
	createdDate: string
	lastModifiedDate: string
}

export type ChannelUpdate = ChannelBase

export type SubscriberType = 'HUB'
export interface ListOptions {
	/**
	 * Filter channels by subscriber type.
	 */
	subscriberType?: SubscriberType

	/**
	 * Filter channels based on the subscriber id (e.g. hub id).
	 *
	 * Requires `subscriberType` to also be specified.
	 */
	subscriberId?: string

	/**
	 * Include channels that have been subscribed to as well as user-owned channels.
	 */
	includeReadOnly?: boolean
}

export interface DriverChannelDetails {
	channelId: string
	driverId: string
	version: string
	createdDate: string
	lastModifiedDate: string
}

export class ChannelsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('distchannels', config))
	}

	public async create(data: ChannelCreate): Promise<Channel> {
		return this.client.post('', data)
	}

	public async delete(id: string): Promise<void> {
		await this.client.delete(id)
	}

	public async update(id: string, data: ChannelUpdate): Promise<Channel> {
		return this.client.put(id, data)
	}

	public async get(id: string): Promise<Channel> {
		return this.client.get(id)
	}

	public async getDriverChannelMetaInfo(channelId: string, driverId: string): Promise<EdgeDriver> {
		return this.client.get(`${channelId}/drivers/${driverId}/meta`)
	}

	public async list(options: ListOptions = {}): Promise<Channel[]> {
		const params: HttpClientParams = {}
		if (options.subscriberType) {
			params.type = options.subscriberType
		}
		if (options.subscriberId) {
			if (!options.subscriberType) {
				throw Error('specifying a subscriberId requires also specifying a subscriberType')
			}
			params.subscriberId = options.subscriberId
		}
		if (typeof(options.includeReadOnly) === 'boolean') {
			params.includeReadOnly = options.includeReadOnly.toString()
		}
		return this.client.getPagedItems('', params)
	}

	public async listAssignedDrivers(channelId: string): Promise<DriverChannelDetails[]> {
		return this.client.getPagedItems(`${channelId}/drivers`)
	}

	/**
	 * Assign or publish a driver to a channel.
	 *
	 * NOTE: This method also works to update the driver version assigned to a channel.
	 */
	public async assignDriver(channelId: string, driverId: string, version: string): Promise<DriverChannelDetails> {
		return this.client.post(`${channelId}/drivers`, { driverId, version })
	}

	public async unassignDriver(channelId: string, driverId: string): Promise<void> {
		await this.client.delete(`${channelId}/drivers/${driverId}`)
	}

	public async enrollHub(channelId: string, hubId: string): Promise<void> {
		await this.client.post(`${channelId}/hubs/${hubId}`)
	}

	public async unenrollHub(channelId: string, hubId: string): Promise<void> {
		await this.client.delete(`${channelId}/hubs/${hubId}`)
	}
}
