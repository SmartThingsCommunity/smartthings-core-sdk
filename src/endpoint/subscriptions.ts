import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Count, Links } from '../types'
import { ConfigEntry } from './installedapps'


/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DeviceSubscriptionDetail {
	/**
	 * The GUID of the device that is subscribed to.
	 */
	deviceId: string
	/**
	 * The component ID on the device that is subscribed to or * for all.
	 */
	componentId?: string
	/**
	 * Name of the capability that is subscribed to or * for all.
	 */
	capability?: string
	/**
	 * Name of the capabilities attribute or * for all.
	 */
	attribute?: string
	/**
	 * A particular value for the attribute that will trigger the subscription
	 * or * for all.
	 */
	value?: any
	/**
	 * Only execute the subscription if the subscribed event is a state change
	 * from previous events.
	 */
	stateChangeOnly?: boolean
	/**
	 * A name for the subscription that will be passed to the installed app.
	 * Must be unique per installed app.
	 */
	subscriptionName?: string
	/**
	 * List of mode ID's that the subscription will execute for. If not provided
	 * then all modes will be supported.
	 */
	modes?: Array<string>
}

export interface CapabilitySubscriptionDetail {
	/**
	 * The id of the location that both the app and source device are in.
	 */
	locationId: string
	/**
	 * Name of the capability that is subscribed to.
	 */
	capability: string
	/**
	 * Name of the capabilities attribute or * for all.
	 */
	attribute?: string
	/**
	 * A particular value for the attribute that will trigger the subscription
	 * or * for all.
	 */
	value?: any
	/**
	 * Only execute the subscription if the subscribed event is a state change
	 * from previous events.
	 */
	stateChangeOnly?: boolean
	/**
	 * A name for the subscription that will be passed to the installed app.
	 * Must be unique per installed app.
	 */
	subscriptionName?: string
	/**
	 * List of modes that the subscription will execute for. If not provided
	 * then all modes will be supported.
	 */
	modes?: Array<string>

}

export interface ModeSubscriptionDetail {
	/**
	 * The GUID for the location to subscribe to mode changes.
	 */
	locationId: string
}

export interface DeviceLifecycleDetail {
	/**
	 * An array of GUIDs of devices being subscribed to. A max of 20 GUIDs are
	 * allowed.
	 */
	deviceIds?: Array<string>
	/**
	 * A name for the subscription that will be passed to the installed app.
	 */
	subscriptionName?: string
	/**
	 * The id of the location that both the app and source device are in.
	 */
	locationId?: string
}

export interface DeviceHealthDetail {
	/**
	 * An array of GUIDs of devices being subscribed to. A max of 20 GUIDs are
	 * allowed.
	 */
	deviceIds?: Array<string>
	/**
	 * A name for the subscription that will be passed to the installed app.
	 */
	subscriptionName?: string
	/**
	 * The id of the location that both the app and source device are in.
	 */
	locationId?: string
}

export interface SecurityArmStateDetail {
	/**
	 * A name for the subscription that will be passed to the installed app.
	 */
	subscriptionName?: string
	/**
	 * The id of the location that both the app and the security system are in.
	 */
	locationId: string
}

export interface HubHealthDetail {
	/**
	 * A name for the subscription that will be passed to the installed app.
	 */
	subscriptionName?: string
	/**
	 * The id of the location that both the app and hubs are in
	 */
	locationId: string
}

export interface SceneLifecycleDetail {
	/**
	 * A name for the subscription that will be passed to the installed app.
	 */
	subscriptionName?: string
	/**
	 * The id of the location that both the app and scenes are in.
	 */
	locationId: string
}
/* eslint-enable */

export enum SubscriptionSource {
	DEVICE = 'DEVICE',
	CAPABILITY = 'CAPABILITY',
	MODE = 'MODE',
	DEVICE_LIFECYCLE = 'DEVICE_LIFECYCLE',
	DEVICE_HEALTH = 'DEVICE_HEALTH',
	SECURITY_ARM_STATE = 'SECURITY_ARM_STATE',
	HUB_HEALTH = 'HUB_HEALTH',
	SCENE_LIFECYCLE = 'SCENE_LIFECYCLE',
}

export interface Subscription {
	/**
	 * The id of the subscription.
	 */
	id?: string
	/**
	 * The id of the subscribing app.
	 */
	installedAppId?: string
	sourceType?: SubscriptionSource
	device?: DeviceSubscriptionDetail
	capability?: CapabilitySubscriptionDetail
	mode?: ModeSubscriptionDetail
	deviceLifecycle?: DeviceLifecycleDetail
	deviceHealth?: DeviceHealthDetail
	securityArmState?: SecurityArmStateDetail
	hubHealth?: HubHealthDetail
	sceneLifecycle?: SceneLifecycleDetail
}

export interface SubscriptionRequest {
	sourceType: SubscriptionSource
	device?: DeviceSubscriptionDetail
	capability?: CapabilitySubscriptionDetail
	mode?: ModeSubscriptionDetail
	deviceLifecycle?: DeviceLifecycleDetail
	deviceHealth?: DeviceHealthDetail
	securityArmState?: SecurityArmStateDetail
	hubHealth?: HubHealthDetail
	sceneLifecycle?: SceneLifecycleDetail
}

export interface SubscriptionList {
	items: Subscription[]
	_links: Links
}

export interface DeviceSubscriptionOptions {
	stateChangeOnly?: boolean
	modes?: Array<string>
}

export class SubscriptionsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	public list(installedAppId?: string): Promise<SubscriptionList> {
		return this.client.get<SubscriptionList>(`${this.installedAppId(installedAppId)}/subscriptions`)
	}

	public get(name: string, installedAppId?: string): Promise<Subscription> {
		return this.client.get<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`)
	}

	public delete(name: string, installedAppId?: string): Promise<Count> {
		return this.client.delete<Count>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`)
	}

	public create(data: SubscriptionRequest, installedAppId?: string): Promise<Subscription> {
		return this.client.put<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/`, data)
	}

	public update(name: string, data: SubscriptionRequest, installedAppId?: string): Promise<Subscription> {
		return this.client.put<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`, data)
	}

	public unsubscribe(name: string): Promise<Count> {
		return this.client.delete<Count>(`${this.client.config.installedAppId}/subscriptions/${name}`)
	}

	public unsubscribeAll(): Promise<Count> {
		return this.client.delete<Count>(`${this.client.config.installedAppId}/subscriptions`)
	}

	public subscribeToDevices(devices: ConfigEntry[], capability: string, attribute: string, subscriptionName: string, options: DeviceSubscriptionOptions = {}): Promise<Subscription[]> {
		const ops: Promise<Subscription>[] = []
		if (devices) {
			const segs = attribute.split('.')
			const attributeName = segs[0]
			const attributeValue = segs.length > 1 ? segs[1] : '*'
			const path = `${this.client.config.installedAppId}/subscriptions`

			devices.forEach((item, index) => {
				if (item.deviceConfig) {
					const device: DeviceSubscriptionDetail = {
						deviceId: item.deviceConfig.deviceId,
						componentId: item.deviceConfig.componentId,
						capability: capability,
						attribute: attributeName,
						stateChangeOnly: options.stateChangeOnly ? options.stateChangeOnly : true,
						subscriptionName: `${subscriptionName}_${index}`,
						value: attributeValue,
					}
					if (options.modes) {
						device.modes = options.modes
					}
					const body = {
						sourceType: SubscriptionSource.DEVICE,
						device,
					}
					ops.push(this.client.post(path, body))
				}
			})
		}
		return Promise.all(ops)
	}

	public subscribeToCapability(capability: string, attribute: string, subscriptionName: string, options: DeviceSubscriptionOptions = {}): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const segs = attribute.split('.')
			const attributeName = segs[0]
			const attributeValue = segs.length > 1 ? segs[1] : '*'
			const path = `${this.client.config.installedAppId}/subscriptions`
			const capabilityDetail: CapabilitySubscriptionDetail = {
				locationId: this.client.config.locationId,
				capability,
				attribute: attributeName,
				stateChangeOnly: options.stateChangeOnly ? options.stateChangeOnly : true,
				subscriptionName,
				value: attributeValue,
			}
			const body = {
				sourceType: SubscriptionSource.CAPABILITY,
				capability: capabilityDetail,
			}
			if (options.modes) {
				body.capability.modes = options.modes
			}

			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}

	public subscribeToModeChange(subscriptionName: string): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const path = `${this.client.config.installedAppId}/subscriptions`
			const body = {
				sourceType: SubscriptionSource.MODE,
				mode: {
					locationId: this.client.config.locationId,
					subscriptionName,
				},
			}
			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}

	public subscribeToDeviceLifecycle(subscriptionName: string): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const path = `${this.client.config.installedAppId}/subscriptions`
			const body = {
				sourceType: SubscriptionSource.DEVICE_LIFECYCLE,
				deviceLifecycle: {
					locationId: this.client.config.locationId,
					subscriptionName,
				},
			}
			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}

	public subscribeToSecuritySystem(subscriptionName: string): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const path = `${this.client.config.installedAppId}/subscriptions`
			const body = {
				sourceType: SubscriptionSource.SECURITY_ARM_STATE,
				securityArmState: {
					locationId: this.client.config.locationId,
					subscriptionName,
				},
			}
			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}

	subscribeToHubHealth(subscriptionName: string): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const path = `${this.client.config.installedAppId}/subscriptions`
			const body = {
				sourceType: SubscriptionSource.HUB_HEALTH,
				hubHealth: {
					locationId: this.client.config.locationId,
					subscriptionName,
				},
			}
			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}

	subscribeToSceneLifecycle(subscriptionName: string): Promise<Subscription> {
		if (this.client.config.installedAppId && this.client.config.locationId) {
			const path = `${this.client.config.installedAppId}/subscriptions`
			const body = {
				sourceType: SubscriptionSource.SCENE_LIFECYCLE,
				sceneLifecycle: {
					locationId: this.client.config.locationId,
					subscriptionName,
				},
			}
			return this.client.post(path, body)
		}
		return Promise.reject(Error('Location ID and/or installedAppId are undefined'))
	}
}
