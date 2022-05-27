import axios, { AxiosRequestConfig } from 'axios'

import { Authenticator } from './authenticator'
import { RESTClient, RESTClientConfig } from './rest-client'
import { AppsEndpoint } from './endpoint/apps'
import { CapabilitiesEndpoint } from './endpoint/capabilities'
import { DevicePreferencesEndpoint } from './endpoint/devicepreferences'
import { DeviceProfilesEndpoint } from './endpoint/deviceprofiles'
import { ChannelsEndpoint } from './endpoint/channels'
import { DevicesEndpoint } from './endpoint/devices'
import { DriversEndpoint } from './endpoint/drivers'
import { HistoryEndpoint } from './endpoint/history'
import { HubdevicesEndpoint } from './endpoint/hubdevices'
import { InstalledAppsEndpoint } from './endpoint/installedapps'
import { ModesEndpoint } from './endpoint/modes'
import { LocationsEndpoint } from './endpoint/locations'
import { NotificationsEndpoint } from './endpoint/notifications'
import { OrganizationsEndpoint } from './endpoint/organizations'
import { PresentationEndpoint } from './endpoint/presentation'
import { RoomsEndpoint } from './endpoint/rooms'
import { RulesEndpoint } from './endpoint/rules'
import { ScenesEndpoint } from './endpoint/scenes'
import { SubscriptionsEndpoint } from './endpoint/subscriptions'
import { SchedulesEndpoint } from './endpoint/schedules'
import { SchemaEndpoint } from './endpoint/schema'
import { ServicesEndpoint } from './endpoint/services'
import { VirtualDevicesEndpoint } from './endpoint/virtualdevices'
import { SmartThingsURLProvider, defaultSmartThingsURLProvider, HttpClientHeaders } from './endpoint-client'


export class SmartThingsClient extends RESTClient {
	public readonly apps: AppsEndpoint
	public readonly capabilities: CapabilitiesEndpoint
	public readonly channels: ChannelsEndpoint
	public readonly devicePreferences: DevicePreferencesEndpoint
	public readonly deviceProfiles: DeviceProfilesEndpoint
	public readonly devices: DevicesEndpoint
	public readonly drivers: DriversEndpoint
	public readonly history: HistoryEndpoint
	public readonly hubdevices: HubdevicesEndpoint
	public readonly installedApps: InstalledAppsEndpoint
	public readonly modes: ModesEndpoint
	public readonly notifications: NotificationsEndpoint
	public readonly organizations: OrganizationsEndpoint
	public readonly locations: LocationsEndpoint
	public readonly presentation: PresentationEndpoint
	public readonly rooms: RoomsEndpoint
	public readonly rules: RulesEndpoint
	public readonly scenes: ScenesEndpoint
	public readonly subscriptions: SubscriptionsEndpoint
	public readonly schedules: SchedulesEndpoint
	public readonly schema: SchemaEndpoint
	public readonly services: ServicesEndpoint
	public readonly virtualDevices: VirtualDevicesEndpoint

	constructor(authenticator: Authenticator, config?: RESTClientConfig) {
		super(authenticator, config)

		this.apps = new AppsEndpoint(this.config)
		this.capabilities = new CapabilitiesEndpoint(this.config)
		this.channels = new ChannelsEndpoint(this.config)
		this.devicePreferences = new DevicePreferencesEndpoint(this.config)
		this.deviceProfiles = new DeviceProfilesEndpoint(this.config)
		this.devices = new DevicesEndpoint(this.config)
		this.drivers = new DriversEndpoint(this.config)
		this.history = new HistoryEndpoint(this.config)
		this.hubdevices = new HubdevicesEndpoint(this.config)
		this.installedApps = new InstalledAppsEndpoint(this.config)
		this.locations = new LocationsEndpoint(this.config)
		this.modes = new ModesEndpoint(this.config)
		this.notifications = new NotificationsEndpoint(this.config)
		this.organizations = new OrganizationsEndpoint(this.config)
		this.presentation = new PresentationEndpoint(this.config)
		this.rooms = new RoomsEndpoint(this.config)
		this.rules = new RulesEndpoint(this.config)
		this.scenes = new ScenesEndpoint(this.config)
		this.subscriptions = new SubscriptionsEndpoint(this.config)
		this.schedules = new SchedulesEndpoint(this.config)
		this.schema = new SchemaEndpoint(this.config)
		this.services = new ServicesEndpoint(this.config)
		this.virtualDevices = new VirtualDevicesEndpoint(this.config)
	}

	public setLocation(id: string): SmartThingsClient {
		this.config.locationId = id
		return this
	}

	/**
	 * @param headers http headers to be merged with existing client headers
	 */
	public clone(headers?: HttpClientHeaders): SmartThingsClient {
		const config: RESTClientConfig = { ...this.config, headers: { ...this.config.headers, ...headers } }
		return new SmartThingsClient(this.config.authenticator, config)
	}
}

export class SmartThingsOAuthClient {
	private authURL: string

	constructor(private clientId: string, private clientSecret: string,
			private redirectUri: string, urlProvider?: SmartThingsURLProvider) {
		this.authURL = urlProvider?.authURL || defaultSmartThingsURLProvider.authURL
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async redeemCode(authCode: string): Promise<any> {
		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')}`,
			'Accept': 'application/json',
		}

		const axiosConfig: AxiosRequestConfig = {
			url: this.authURL,
			method: 'POST',
			headers,
			data: `grant_type=authorization_code&code=${authCode}&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`,
		}

		const response = await axios.request(axiosConfig)
		if (response.status > 199 && response.status < 300) {
			return response.data
		}
		throw Error(`error ${response.status} with message ${response.data}`)
	}
}
