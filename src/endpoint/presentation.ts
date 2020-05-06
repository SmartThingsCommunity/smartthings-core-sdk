import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import {
	CapabilityVisibleCondition,
	CapabilityLabeledState,
	CapabilityGrouped,
	CapabilityDashboardAction,
	CapabilityDashboardBasicPlusItem,
	CapabilityDetailView,
	CapabilityMultiArgCommand,
	CapabilityAutomationCondition,
	CapabilityAutomationAction} from './capabilities'


export interface PresentationDeviceConfigEntry {
	component: string
	capability: string
	version?: number
	values?: {
		/**
		 * This can be either command name or attribute name.
		 */
		key: string
		/**
		 * A list of values supported among those defined in the
		 * capability alternatives. For instance, a device may not support
		 * auto for supported thermostat fan modes, so this field might be
		 * an array containing on and off.
		 */
		enabledValues?: string[]
		range?: [number, number]
		/**
		 * default: 1
		 */
		step?: number
	}[]
	visibleCondition?: CapabilityVisibleCondition
}

export interface PresentationDeviceConfigCreate {
	/**
	 * Type should be set to 'profile' for anything new.
	 *
	 * 'dth' is for backwards compatibility only
	 */
	type?: 'profile' | 'dth'
	/**
	 * Preloaded iconId or URL used to retrieve icons to be drawn on the UI
	 * client.
	 */
	iconUrl?: string
	dashboard?: {
		states: PresentationDeviceConfigEntry[]
		actions: PresentationDeviceConfigEntry[]
	}
	detailView?: PresentationDeviceConfigEntry[]
	automation?: {
		conditions: PresentationDeviceConfigEntry[]
		actions: PresentationDeviceConfigEntry[]
	}
}

export interface PresentationDPInfo {
	/**
	 * The OS of the UI Client used to show the details page. 'iOS': iOS
	 * Samsung Connect 'android': Android Samsung Connect.
	 */
	os: string
	/**
	 * This is linked to obtain the vendor-specific device details page.
	 * The device's dashboard card opens the detail view using this link
	 * when the user clicks the device card.
	 */
	dpUri: string
	/**
	 * This describes operating mode after onboarding.
	 */
	operatingMode?: 'easySetup' | 'deviceControl'
}

export interface PresentationDeviceConfig extends PresentationDeviceConfigCreate {
	/**
	 * The name of the manufacturer.
	 */
	mnmn: string
	/**
	 * A unique identifier for the presentation of a device. This can be a
	 * model number on some device integrations, but moving forward will
	 * usually be a system generated value based on a device's structure as
	 * well as its display configuration.
	 *
	 * You can ignore this field unless you are specifically designing a
	 * plugin with an external detail view.
	 */
	vid: string
	/**
	 * Information used for obtaining details page plugins on different
	 * platforms.
	 */
	dpInfo?: PresentationDPInfo[]
}


export interface PresentationDevicePresentation {
	mnmn: string
	vid: string
	/**
	 * Preloaded iconId or URL used to retrieve icons to be drawn on the UI
	 * Client.
	 */
	iconUrl?: string
	dashboard?: {
		states?: (CapabilityLabeledState & CapabilityGrouped & {
			label: string
			capability: string
			version?: number
			component: string
			visibleCondition: CapabilityVisibleCondition
		})[]
		actions?: (CapabilityDashboardAction & {
			capability: string
			version?: number
			component: string
			visibleCondition: CapabilityVisibleCondition
		})[]
		basicPlus: (CapabilityDashboardBasicPlusItem & {
			capability: string
			version?: number
			component: string
		})[]
	}
	detailView?: (CapabilityDetailView & {
		capability: string
		version?: number
		component: string
		multiArgCommand: CapabilityMultiArgCommand
		visibleCondition: CapabilityVisibleCondition
	})[]
	automation?: {
		conditions: (CapabilityAutomationCondition & {
			capability: string
			version?: number
			component: string
			visibleCondition: CapabilityVisibleCondition
		})[]
		actions: (CapabilityAutomationAction & {
			component: string
			visibleCondition: CapabilityVisibleCondition
		})[]
	}
	dpInfo?: PresentationDPInfo[]
	language?: {
		/**
		 * ICU locale
		 */
		locale: string
		poCodes: {
			label: string
			/**
			 * Po code. Should begin with "__PO_CODE" and match
			 * `/^___PO_CODE_[a-zA-Z0-9_]+$/`
			 */
			po: string
		}[]
	}[]
}

export class PresentationEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('presentation', config))
	}

	/**
	 * Get or generate a device configuration based on profile.
	 *
	 * @param extraParams deprecated.
	 */
	public generate(profileId: string, extraParams?: HttpClientParams): Promise<PresentationDeviceConfig> {
		return this.client.get<PresentationDeviceConfig>(`types/${profileId}/deviceconfig`, extraParams)
	}

	public get(vid: string): Promise<PresentationDeviceConfig> {
		return this.client.get<PresentationDeviceConfig>('deviceconfig', { vid })
	}

	/**
	 * Make an idempotent call to either create or update a device configuration
	 * based on the structure of the provided payload.
	 */
	public create(deviceConfig: PresentationDeviceConfigCreate): Promise<PresentationDeviceConfig> {
		return this.client.post<PresentationDeviceConfig>('deviceconfig', deviceConfig)
	}

	public getPresentation(vid: string): Promise<PresentationDevicePresentation> {
		return this.client.get<PresentationDevicePresentation>('', { vid })
	}
}
