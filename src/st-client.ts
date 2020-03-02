import axios, { AxiosRequestConfig } from 'axios'

import { Authenticator } from './authenticator'
import { RESTClient, RESTClientConfig } from './rest-client'
import { AppsEndpoint } from './endpoint/apps'
import { DeviceProfilesEndpoint } from './endpoint//deviceprofiles'
import { DevicesEndpoint } from './endpoint//devices'
import { InstalledAppsEndpoint } from './endpoint//installedapps'
import { ModesEndpoint } from './endpoint//modes'
import { NotificationsEndpoint } from './endpoint//notifications'
import { LocationsEndpoint } from './endpoint//locations'
import { RoomsEndpoint } from './endpoint//rooms'
import { RulesEndpoint } from './endpoint//rules'
import { ScenesEndpoint } from './endpoint//scenes'
import { SubscriptionsEndpoint } from './endpoint//subscriptions'
import { SchedulesEndpoint } from './endpoint//schedules'
import { SmartThingsURLProvider, defaultSmartThingsURLProvider } from './endpoint-client'


export class SmartThingsClient extends RESTClient {
	public readonly apps: AppsEndpoint
	public readonly deviceprofiles: DeviceProfilesEndpoint
	public readonly devices: DevicesEndpoint
	public readonly installedApps: InstalledAppsEndpoint
	public readonly modes: ModesEndpoint
	public readonly notifications: NotificationsEndpoint
	public readonly locations: LocationsEndpoint
	public readonly rooms: RoomsEndpoint
	public readonly rules: RulesEndpoint
	public readonly scenes: ScenesEndpoint
	public readonly subscriptions: SubscriptionsEndpoint
	public readonly schedules: SchedulesEndpoint

	constructor(authenticator: Authenticator, config?: RESTClientConfig) {
		super(authenticator, config)

		this.apps = new AppsEndpoint(this.config)
		this.deviceprofiles = new DeviceProfilesEndpoint(this.config)
		this.devices = new DevicesEndpoint(this.config)
		this.installedApps = new InstalledAppsEndpoint(this.config)
		this.modes = new ModesEndpoint(this.config)
		this.notifications = new NotificationsEndpoint(this.config)
		this.locations = new LocationsEndpoint(this.config)
		this.rooms = new RoomsEndpoint(this.config)
		this.rules = new RulesEndpoint(this.config)
		this.scenes = new ScenesEndpoint(this.config)
		this.subscriptions = new SubscriptionsEndpoint(this.config)
		this.schedules = new SchedulesEndpoint(this.config)
	}

	public setLocation(id: string): SmartThingsClient {
		this.config.locationId = id
		return this
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
