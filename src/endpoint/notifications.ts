import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'


export enum NotificationRequestType {
	ALERT = 'ALERT',
	SUGGESTED_ACTION = 'SUGGESTED_ACTION',
	EVENT_LOGGING = 'EVENT_LOGGING',
	AUTOMATION_INFO = 'AUTOMATION_INFO',
}

export interface NotificationMessage {
	title?: string
	body?: string
}

export interface NotificationItem {
	[localeCode: string]: NotificationMessage
}

export interface ReplacementsObject {
	key?: string
	value?: string
}

export enum DeepLinkType {
	device = 'device',
	installedApp = 'installedApp',
	location = 'location'
}

export interface DeepLink {
	type: DeepLinkType
	id: string
}

export interface NotificationRequest {
	/**
	 * The target location of sending push message.
	 */
	locationId?: string

	/**
	 * The notification indicator type. The type determines the type of alerts
	 * the user sees on the device.
	 */
	type: NotificationRequestType

	/**
	 * The title and content that you want to display with the push message.
	 * Individual supported language sets may be added in the form of ISO
	 * standard {language code}_{country code} and are shown to a user
	 * according to the settings of the mobile device. If you add a default
	 * set here, you can set the default language when it does not match with
	 * the actual setting.
	 */
	messages: NotificationItem[]

	/**
	 * Supports the ability to replace the custom variable in a title or body.
	 * The format of 'key' must be of the form ${...}. If you want to show the
	 * location nickname that the platform has, put it as the form of
	 * ${System.locationNickname} in the title or body.
	 */
	replacements?: ReplacementsObject[]

	/**
	 * Supports the ability to launch the specific plugin on your SmartThings app.
	 */
	deepLink?: DeepLink

	/**
	 * Notification image url.
	 */
	imageUrl?: string
}

export interface NotificationResponse {
	code: number
	message: string
}

export class NotificationsEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('notification', config))
	}

	/**
	 * Sends a push notification to mobile apps belonging to the location
	 * @param data the notification request. If the client has been configured with a location ID it can be omitted
	 * from this request.
	 */
	public async create(data: NotificationRequest): Promise<NotificationResponse> {
		data.locationId = this.locationId(data.locationId)
		return this.client.post(undefined, data)
	}
}
