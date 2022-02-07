import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { LocaleReference, Status, SuccessStatusValue } from '../types'
import { CapabilityReference, PreferenceType } from './devices'


export interface DeviceComponentRequest {
	id?: string
	capabilities?: CapabilityReference[]
	categories?: string[]
}

export interface DeviceComponent extends DeviceComponentRequest {
	/**
	 * UTF-8 label for the component. This value is generated and dependent on the locale of the request
	 */
	label?: string
}

export enum DeviceProfileStatus {
	DEVELOPMENT = 'DEVELOPMENT',
	PUBLISHED = 'PUBLISHED'
}

export interface DeviceProfilePreferenceDefinition {
	minimum?: number
	maximum?: number
	minLength?: number
	maxLength?: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default: any
	stringType?: 'text' | 'password' | 'paragraph'
	options?: { [key: string]: string }
}

export interface DeviceProfilePreferenceCore {
	title: string
	description?: string
	required?: boolean
	preferenceType: PreferenceType
}
export interface DeviceProfilePreferenceRequest extends DeviceProfilePreferenceCore {
	explicit?: boolean
	definition: DeviceProfilePreferenceDefinition
	preferenceId?: string
}

export interface DeviceProfileUpdateRequest {
	/**
	 * must have between 1 and 20 components
	 */
	components?: DeviceComponentRequest[]
	metadata?: { [key: string]: string }
	preferences?: DeviceProfilePreferenceRequest[]
}

export interface DeviceProfileCreateRequest extends DeviceProfileUpdateRequest {
	name?: string
}
export type DeviceProfileRequest = DeviceProfileCreateRequest

export interface DeviceProfilePreference extends DeviceProfilePreferenceCore {
	id?: string
}

export interface DeviceProfile extends DeviceProfileCreateRequest {
	id: string
	name: string
	components: DeviceComponent[]
	metadata?: { [key: string]: string }
	status: DeviceProfileStatus
}

export interface ComponentTranslations {
	/**
	 * Short UTF-8 text used when displaying the component.
	 */
	label: string
	/**
	 * UTF-8 text describing the component.
	 */
	description?: string
}

export interface DeviceProfileTranslations {
	tag: string
	/**
	 * A map of component ID to it's translations.
	 */
	components?: { [key: string]: ComponentTranslations }
}

export class DeviceProfilesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('deviceprofiles', config))
	}

	/**
	 * List all the device profiles belonging to the principal (i.e. user)
	 */
	public list(): Promise<DeviceProfile[]> {
		return this.client.getPagedItems<DeviceProfile>()
	}

	/**
	 * Get the definition of a specific device profile
	 * @param id UUID of the device profile
	 */
	public get(id: string): Promise<DeviceProfile> {
		return this.client.get(id)
	}

	/**
	 * Delete a device profile
	 * @param id UUID of the device profile
	 */
	public async delete(id: string): Promise<Status> {
		await this.client.delete(id)
		return SuccessStatusValue
	}

	/**
	 * Create a device profile
	 * @param data device profile definition
	 */
	public create(data: DeviceProfileCreateRequest): Promise<DeviceProfile> {
		return this.client.post(undefined, data)
	}

	/**
	 * Update a device profile
	 * @param id UUID of the device profile
	 * @param data the new device profile definition
	 */
	public update(id: string, data: DeviceProfileUpdateRequest): Promise<DeviceProfile> {
		return this.client.put(id, data)
	}

	/**
	 * Update the status of a device profile
	 * @param id UUID of the device profile
	 * @param deviceProfileStatus new device profile status
	 */
	public updateStatus(id: string, deviceProfileStatus: DeviceProfileStatus): Promise<DeviceProfile> {
		return this.client.post(`${id}/status`, {deviceProfileStatus})
	}

	/**
	 * Returns a list of the locales supported by the device profile
	 * @param id UUID of the device profile
	 */
	public listLocales(id: string): Promise<LocaleReference[]> {
		return this.client.getPagedItems(`${id}/i18n`)
	}

	/**
	 * Retrieve the translations for the specified locale
	 * @param id UUID of the device profile
	 * @param tag locale tag, e.g. 'en', 'es', or 'ko'
	 */
	public getTranslations(id: string, tag: string): Promise<DeviceProfileTranslations> {
		return this.client.get(`${id}/i18n/${tag}`)
	}

	/**
	 * Create or update the translations for a device profile
	 * @param id UUID of the device profile
	 * @param data translations
	 */
	public upsertTranslations(id: string, data: DeviceProfileTranslations): Promise<DeviceProfileTranslations> {
		return this.client.put(`${id}/i18n/${data.tag}`, data)
	}

	/**
	 * Retrieve the translations for the specified locale
	 * @param id UUID of the device profile
	 * @param tag locale tag, e.g. 'en', 'es', or 'ko'
	 */
	public async deleteTranslations(id: string, tag: string): Promise<Status> {
		await this.client.delete(`${id}/i18n/${tag}`)
		return SuccessStatusValue
	}
}
