import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'


export interface EnrolledChannel {
	channelId: string
	name: string
	description?: string

	/**
	 * ISO-8601 timestamp of creation of channel.
	 */
	createdDate?: string

	/**
	 * ISO-8601 timestamp of last modification of channel
	 */
	lastModifiedDate?: string

	/**
	 * URL to web interface to modify channel subscriptions.
	 */
	subscriptionUrl?: string
}

export interface InstalledDriver {
	driverId: string
	name: string
	description?: string
	version: string
	channelId: string
	developer: string

	/**
	 * Information on how to reach the vendor.
	 */
	vendorSupportInformation: string

	/**
	 * map of permissions and attributes used by the driver.
	 *
	 * Format:
	 *   {"permissions":{"perm1":{...}, "perm2"{...}}}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	permissions: { [name: string]: any }
}

export class HubdevicesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('hubdevices', config))
	}

	/**
	 * Install driver on a hub. The primary use case of this functionality is to install a self
	 * published driver to be included in generic discovery (e.g. scanning).
	 */
	public async installDriver(driverId: string, hubId: string, channelId: string): Promise<void> {
		return this.client.put(`${hubId}/drivers/${driverId}`, { channelId })
	}

	/**
	 * Change the driver for a device to the one specified by driverId.
	 */
	public async switchDriver(driverId: string, hubId: string, deviceId: string): Promise<void> {
		return this.client.patch(`${hubId}/childdevice/${deviceId}`, { driverId })
	}

	/**
	 * Removes a driver from being installed on a hub. This will allow the hub to clean up the
	 * deleted driver. However, all dependent devices need to be removed for cleanup to fully occur.
	 */
	public async uninstallDriver(driverId: string, hubId: string): Promise<void> {
		return this.client.delete(`${hubId}/drivers/${driverId}`)
	}

	/**
	 * List drivers installed on the hub.
	 *
	 * @param deviceId When included, limit the drivers to those marked as matching the specified device.
	 */
	public async listInstalled(hubId: string, deviceId?: string): Promise<InstalledDriver[]> {
		const params = deviceId ? { deviceId } : undefined
		return this.client.get(`${hubId}/drivers`, params)
	}

	public async getInstalled(hubId: string, driverId: string): Promise<InstalledDriver> {
		return this.client.get(`${hubId}/drivers/${driverId}`)
	}

	/**
	 * Returns the list of driver channels the hub is currently subscribed to.
	 * Currently only returns the driver channel type.
	 */
	public async enrolledChannels(hubId: string): Promise<EnrolledChannel[]> {
		return this.client.get(`${hubId}/channels`, { channelType: 'DRIVERS' })
	}
}
