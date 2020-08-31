import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Count } from '../types'
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
	modes?: string[]
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
	modes?: string[]

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
	deviceIds?: string[]
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
	deviceIds?: string[]
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

export interface DeviceSubscriptionOptions {
	/**
	 * When true events are received only then their attribute values have changed. When false events are received
	 * whenever they are sent. Note that some devices my only send events when the values change.
	 */
	stateChangeOnly?: boolean

	// TODO accept mode configuration settings here
	/**
	 * List of mode UUIDs. Send events only when location mode is one of these values.
	 */
	modes?: string[]
}

export class SubscriptionsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	/**
	 * Returns a list of all the subscriptions for an installed app.
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 */
	public list(installedAppId?: string): Promise<Subscription[]> {
		return this.client.getPagedItems<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions`)
	}

	/**
	 * Gets the definition of a specific subscription for the specified installed app.
	 * @param name the alphanumeric name of the subscription
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 */
	public get(name: string, installedAppId?: string): Promise<Subscription> {
		return this.client.get<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`)
	}

	/**
	 * Deletes one or more subscriptions of an installed app
	 * @param name name of the subscription to delete. If not specified then all subscriptions associated with the
	 * installed app instance are deleted.
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 */
	public delete(name?: string, installedAppId?: string): Promise<Count> {
		if (name) {
			return this.client.delete<Count>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`)
		}
		return this.client.delete<Count>(`${this.installedAppId(installedAppId)}/subscriptions`)
	}

	/**
	 * Create a subscription for an installed app instance
	 * @param data the definition of the subscription
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 */
	public create(data: SubscriptionRequest, installedAppId?: string): Promise<Subscription> {
		return this.client.put<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/`, data)
	}

	/**
	 * Update a subscription
	 * @param name the alphanumeric subscription name
	 * @param data the new subscription definition
	 * @param installedAppId the UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 */
	public update(name: string, data: SubscriptionRequest, installedAppId?: string): Promise<Subscription> {
		return this.client.put<Subscription>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`, data)
	}

	/**
	 * Deletes a subscription of an installed app
	 * @param name name of the subscription to delete. If not specified then all subscriptions associated with the
	 * installed app instance are deleted.
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 * @deprecated use delete(name) instead
	 */
	public unsubscribe(name: string, installedAppId?: string): Promise<Count> {
		return this.client.delete<Count>(`${this.installedAppId(installedAppId)}/subscriptions/${name}`)
	}

	/**
	 * Deletes all subscriptions of an installed app
	 * @param installedAppId UUID of the installed app. This parameter is not required if the client id configured
	 * with an installedAppId
	 * @deprecated use delete() instead
	 */
	public unsubscribeAll(installedAppId?: string): Promise<Count> {
		return this.client.delete<Count>(`${this.installedAppId(installedAppId)}/subscriptions`)
	}

	/**
	 * Creates device event subscriptions for one or more devices specified in a SmartApp device configuration setting.
	 * This method is intended for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId. Use the create() method if the client is not
	 * so configured.
	 * @param devices a SmartApp device configuration setting configured with one or more devices
	 * @param capability alphanumeric ID of the capability to subscribe to or '*' to subscribed to all capabilities of
	 * the devices
	 * @param attribute string defining what attribute(s) and attribute value(s) to subscribe to. Specifying an attribute
	 * name such as 'switch' subscribed to all values of the switch attribute. Specifying a name.value string such as
	 * 'switch.on' subscribed to only the on values of the switch. Specifying the wildcard '*' subscribes to all
	 * values of all attributes of the capability.
	 * @param subscriptionName the alphanumeric subscription name
	 * @param options map of options, stateChange only a modes. If not stateChangeOnly is not specified the default
	 * is true. If modes is not specified then events are sent for all modes.
	 */
	public subscribeToDevices(
			devices: ConfigEntry[],
			capability: string,
			attribute: string,
			subscriptionName: string,
			options: DeviceSubscriptionOptions = {},
	): Promise<Subscription[]> {

		const ops: Promise<Subscription>[] = []
		if (devices) {
			const segs = attribute.split('.')
			const attributeName = segs[0]
			const attributeValue = segs.length > 1 ? segs[1] : '*'
			const path = `${this.installedAppId()}/subscriptions`

			devices.forEach((item, index) => {
				if (item.deviceConfig) {
					const device: DeviceSubscriptionDetail = {
						deviceId: item.deviceConfig.deviceId,
						componentId: item.deviceConfig.componentId,
						capability: capability,
						attribute: attributeName,
						stateChangeOnly: options.stateChangeOnly !== undefined ? options.stateChangeOnly : true,
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

	/**
	 * Creates a device subscription to a specific capability for all devices in a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param capability alphanumeric ID of the capability
	 * @param attribute string defining what attribute(s) and attribute value(s) to subscribe to. Specifying an attribute
	 * name such as 'switch' subscribed to all values of the switch attribute. Specifying a name.value string such as
	 * 'switch.on' subscribed to only the on values of the switch. Specifying the wildcard '*' subscribes to all
	 * values of all attributes of the capability.
	 * @param subscriptionName the alphanumber subscription name
	 * @param options map of options, stateChange only a modes. If not stateChangeOnly is not specified the default
	 * is true. If modes is not specified then events are sent for all modes.
	 */
	public subscribeToCapability(capability: string, attribute: string, subscriptionName: string, options: DeviceSubscriptionOptions = {}): Promise<Subscription> {
		const segs = attribute.split('.')
		const attributeName = segs[0]
		const attributeValue = segs.length > 1 ? segs[1] : '*'
		const path = `${this.installedAppId()}/subscriptions`
		const capabilityDetail: CapabilitySubscriptionDetail = {
			locationId: this.locationId(),
			capability,
			attribute: attributeName,
			stateChangeOnly: options.stateChangeOnly !== undefined ? options.stateChangeOnly : true,
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

	/**
	 * Subscribes to the mode change events from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	public subscribeToModeChange(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.MODE,
			mode: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}

	/**
	 * Subscribes to device lifecycle events (i.e. create, update, and delete) from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	public subscribeToDeviceLifecycle(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.DEVICE_LIFECYCLE,
			deviceLifecycle: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}

	/**
	 * Subscribes to device health events (i.e. online and offline) from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	public subscribeToDeviceHealth(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.DEVICE_HEALTH,
			deviceHealth: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}

	/**
	 * Subscribes to security system events from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	public subscribeToSecuritySystem(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.SECURITY_ARM_STATE,
			securityArmState: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}

	/**
	 * Subscribes to hub health events from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	subscribeToHubHealth(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.HUB_HEALTH,
			hubHealth: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}

	/**
	 * Subscribes to scene lifecycle events from a location. This method is intended
	 * for use from SmartApps or API Access apps and must be called from a client configured
	 * with an installedAppId and locationId. Use the create() method if the client is not
	 * so configured.
	 * @param subscriptionName alphanumeric subscription name
	 */
	subscribeToSceneLifecycle(subscriptionName: string): Promise<Subscription> {
		const path = `${this.installedAppId()}/subscriptions`
		const body = {
			sourceType: SubscriptionSource.SCENE_LIFECYCLE,
			sceneLifecycle: {
				locationId: this.locationId(),
				subscriptionName,
			},
		}
		return this.client.post(path, body)
	}
}
