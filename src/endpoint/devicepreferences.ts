import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { LocaleReference, LocaleTag } from '../types'
import { PreferenceType } from './devices'


/**
 * The ID of the preference
 * @pattern ^[[a-z]*([A-Z][a-z]*)*]{1,36}$
 */
export type PreferenceId = string

export interface DevicePreferenceCore {
	/**
	 * An alphanumeric English language name for this preference. Will be appended to a namespace
	 * to generate the full preference id. Camel case starting with a lowercase letter is required.
	 *
	 * Must match `^[a-z][a-zA-Z0-9]{2,23}$`, if specified. This field is ignored for updates.
	 */
	name?: string

	/**
	 * A short description for this preference.
	 */
	title: string

	/**
	 * A long description for this preference.
	 */
	description?: string
	required?: boolean
	preferenceType: PreferenceType
}

export interface IntegerDevicePreference extends DevicePreferenceCore {
	preferenceType: 'integer'
	definition: {
		/**
		 * Minimum value a preference may be set to. This must be an integer.
		 */
		minimum?: number

		/**
		 * Maximum value a preference may be set to. This must be an integer.
		 */
		maximum?: number

		/**
		 * Default value for a preference. This must be an integer.
		 */
		default?: number
	}
}

export interface NumberDevicePreference extends DevicePreferenceCore {
	preferenceType: 'number'
	definition: {
		/**
		 * Minimum value a preference may be set to.
		 */
		minimum?: number

		/**
		 * Maximum value a preference may be set to.
		 */
		maximum?: number

		/**
		 * Default value for a preference.
		 */
		default?: number
	}
}

export interface BooleanDevicePreference extends DevicePreferenceCore {
	preferenceType: 'boolean'
	definition: {
		/**
		 * Default value for a preference.
		 */
		default?: boolean
	}
}

export interface StringDevicePreference extends DevicePreferenceCore {
	preferenceType: 'string'
	definition: {
		/**
		 * Minimum length a string may be set to.
		 */
		minLength?: number

		/**
		 * Maximum length a string may be set to.
		 */
		maxLength?: number

		/**
		 * The type of a string preference. text is a normal preference, password encrypts the values,
		 * and paragraph is for documentation purposes.
		 *
		 * Default: text
		 */
		stringType?: 'text' | 'password' | 'paragraph'

		/**
		 * Default value for a preference.
		 */
		default?: string
	}
}

export interface EnumerationDevicePreference extends DevicePreferenceCore {
	preferenceType: 'enumeration'
	definition: {
		/**
		 * The available selections for an enumeration preference.
		 */
		options: {
			/**
			 * Key-Value pair mapping a key to a label. The key may be referenced in translations to
			 * support internationalization.
			 */
			[name: string]: string
		}

		default?: string
	}
}

export type DevicePreferenceBase = IntegerDevicePreference | NumberDevicePreference | BooleanDevicePreference | StringDevicePreference | EnumerationDevicePreference

export type DevicePreferenceCreate = DevicePreferenceBase & {
	/**
	 * A flag describing whether this preference is explicit, or inline. This API is for explicit
	 * so `true` is the only valid value here. It's optional so the user doesn't have to fill it in.
	 */
	explicit?: true
}

export type DevicePreference = DevicePreferenceBase  & {
	preferenceId: PreferenceId
}

export interface PreferenceLocalization {
	/** The tag of the locale as defined in [RFC bcp47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt). */
	tag: LocaleTag

	/**
	 * A localized label for the Preference
	 * @example Sensibilité au mouvement
	 */
	label: string

	/**
	 * A localized description of the Preference
	 * @example Sensibilité au mouvement
	 */
	description?: string

	/**
	 * Map of an option name to localizations. Options can only be provided
	 * to localize Enumeration type Preferences, and are required for Enumerations.
	 * The number of options in a Preference Localization must match the number
	 * of options in the Preference.
	 */
	options?: Record<string, { label: string }>
}

export class DevicePreferencesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('devicepreferences', config))
	}

	public list(namespace?: string): Promise<DevicePreference[]> {
		return this.client.getPagedItems<DevicePreference>('', namespace ? { namespace } : {})
	}

	public get(id: PreferenceId): Promise<DevicePreference> {
		return this.client.get(id)
	}

	public create(devicePreference: DevicePreferenceCreate): Promise<DevicePreference> {
		devicePreference.explicit = true
		return this.client.post(undefined, devicePreference)
	}

	public update(id: PreferenceId, devicePreference: DevicePreference): Promise<DevicePreference> {
		return this.client.put(id, devicePreference)
	}

	public createTranslations(preferenceId: PreferenceId, localization: PreferenceLocalization): Promise<PreferenceLocalization> {
		return this.client.post(`${preferenceId}/i18n`, localization)
	}

	public getTranslations(preferenceId: PreferenceId, locale: LocaleTag): Promise<PreferenceLocalization> {
		return this.client.get(`${preferenceId}/i18n/${locale}`)
	}

	public listTranslations(preferenceId: PreferenceId): Promise<LocaleReference[]> {
		return this.client.getPagedItems(`${preferenceId}/i18n`)
	}

	public updateTranslations(preferenceId: PreferenceId, localization: PreferenceLocalization): Promise<PreferenceLocalization> {
		return this.client.put(`${preferenceId}/i18n/${localization.tag}`, localization)
	}
}
