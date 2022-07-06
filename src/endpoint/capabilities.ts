import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { LocaleReference, Status, SuccessStatusValue } from '../types'


export enum CapabilitySchemaPropertyName {
	VALUE = 'value',
	UNIT = 'unit',
	DATA = 'data'
}

export enum CustomCapabilityStatus {
	PROPOSED = 'proposed',
	LIVE = 'live',
	DEPRECATED = 'deprecated',
	DEAD = 'dead'
}

export interface CapabilitySummary {
	id: string
	version: number
	status?: string
}

export interface CapabilityDataSchema {
	type: string
	additionalProperties?: boolean
	required?: string[]
	properties?: { [name: string]: CapabilityJSONSchema }
}

export interface CapabilityUnitSchema {
	type?: string
	enum?: string[]
	default?: string
}

export interface CapabilityJSONSchema {
	type?: string
	minimum?: number
	maximum?: number
	minLength?: number
	maxLength?: number
	enum?: string[]
	propertyName?: unknown
	properties?: { [name: string]: CapabilityJSONSchema }
	items?: CapabilityJSONSchema | CapabilityJSONSchema[]
	title?: string
}

export interface CapabilityAttributeProperties {
	value: CapabilityJSONSchema
	unit?: CapabilityUnitSchema
	data?: CapabilityDataSchema
}

export interface CapabilityEnumCommand {
	command: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any
}

export interface CapabilityAttributeSchema {
	title?: string
	type: string
	properties: CapabilityAttributeProperties
	additionalProperties: boolean
	required?: CapabilitySchemaPropertyName[]
}

export interface CapabilityAttribute {
	schema: CapabilityAttributeSchema
	setter?: string
	enumCommands?: CapabilityEnumCommand[]
}

export interface CapabilityArgument {
	name: string
	optional?: boolean
	schema: CapabilityJSONSchema
}

export interface CapabilityCommand {
	name: string // ^[[a-z]*([A-Z][a-z]*)*]{1,36}$
	arguments?: CapabilityArgument[]
}

export interface CapabilityUpdate {
	/**
	 * Attributes listed by name.
	 *
	 * Attribute name must be camel case starting with a lowercase letter. *ONLY* letters
	 * are allowed (no numbers or special characters).
	 */
	attributes?: { [name: string]: CapabilityAttribute } // name: lower camel case, max 36 characters, NO numbers special characters

	/**
	 * Commands listed by name.
	 *
	 * Command name must be camel case starting with a lowercase letter. *ONLY* letters
	 * are allowed (no numbers or special characters).
	 *
	 * The command name inside each command must match the key used here.
	 *
	 * {
	 *     ...
	 *     "commands": [
	 *         "commandName": {           <-- must match name value below
	 *             "name": "commandName", <-- Must match key above
	 *             ...
	 *         }
	 *     ]
	 * }
	 */
	commands?: { [name: string]: CapabilityCommand } // name: lower camel case
}

export interface CapabilityCreate extends CapabilityUpdate {
	name: string // ^[[a-zA-Z0-9]{1}][[a-zA-Z0-9 ]+]{1,35}$
}

export interface Capability extends CapabilityCreate {
	id?: string
	version?: number
	status?: CustomCapabilityStatus
}

export interface CapabilityNamespace {
	name: string
	ownerType: string
	ownerId: string
}

export interface CapabilityAlternative {
	/**
	 * The attribute value or command (argument) name to be shown in this
	 * alternative string.
	 */
	key: string
	/**
	 * The string that shows whether the property value is equal to the 'key'
	 * value.
	 */
	value: string
	/**
	 * Active components are shown colorfully while inactive ones are shown
	 * dimmed in the UI. For example, the "motion sensor" capability might use
	 * active for "detected" inactive for "clear" so that a user can see
	 * the "detected" state easily.
	 *
	 * Default: "active"
	 */
	type?: 'active' | 'inactive'
	/**
	 * Additional description for each value. This description is shown in
	 * the detail view or automation under this particular key.
	 */
	description?: string
}

export interface CapabilityBasicState {
	/**
	 * This contains strings corresponding to each possible value of the
	 * property. The strings must be human-readable so that the UI Client
	 * can show these strings as user options.
	 */
	alternatives?: CapabilityAlternative[]
}

export interface CapabilityLabeledState extends CapabilityBasicState {
	/**
	 * This displays a string. This can be a formatted string with variables.
	 *
	 * Example: {{attribute.value}} {{attribute.unit}}
	 */
	label?: string
}

export interface CapabilityGrouped {
	/**
	 * The group name to which this belongs. Some complex devices can be
	 * shown grouped dashboard card. This is used for grouping states
	 * and actions in the dashboard.
	 */
	group?: string
}

export enum CapabilityPresentationOperator {
	CONTAINS = 'CONTAINS',
	DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
	EQUALS = 'EQUALS',
	DOES_NOT_EQUAL = 'DOES_NOT_EQUAL',
	GREATER_THAN = 'GREATER_THAN',
	GREATER_THAN_OR_EQUALS = 'GREATER_THAN_OR_EQUALS',
	LESS_THAN = 'LESS_THAN',
	LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS',
}

export interface CapabilityPushButton {
	command: string
	argument?: string
}

export interface CapabilityToggleSwitchCommand {
	/**
	 * To specify separate commands with no arguments for on and off, use the
	 * “on” and “off” fields respectively. To specify a single command, use
	 * “name” for the command and the “on” and “off” fields for the arguments.
	 */
	command: {
		name?: string
		on: string
		off: string
	}
}

export interface CapabilityDashboardToggleSwitch extends CapabilityToggleSwitchCommand {
	state?: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		on: string
		off: string
	}
}

export interface CapabilityToggleSwitch extends CapabilityToggleSwitchCommand {
	state?: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		on: string
		off: string
	} & CapabilityLabeledState
}

export interface CapabilityPlayPause {
	/**
	 * To specify separate commands for play and pause, use the “play” and
	 * “pause” fields respectively. To specify a single command, use “name”
	 * for the command and the “play” and “pause” fields for the arguments.
	 */
	command: {
		name?: string
		play: string
		pause: string
	}
	state: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		/**
		 * The value of "attribute" which indicates playing state. When the
		 * attribute value equals to this then UI will show playing state.
		 */
		play: string
		/**
		 * The value of "attribute" which indicates paused state. When the
		 * attribute value equals to this then UI will show paused state.
		 */
		pause: string
	} & CapabilityBasicState
}

export interface CapabilityPlayStop {
	/**
	 * To specify separate commands for play and stop, use the “play” and
	 * “pause” fields respectively. To specify a single command, use “name”
	 * for the command and the “play” and “pause” fields for the arguments.
	 */
	command: {
		name?: string
		play: string
		stop: string
	}
	state: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		/**
		 * The value of "attribute" which indicates playing state. When the
		 * attribute value equals to this then UI will show playing state.
		 */
		play: string
		/**
		 * The value of "attribute" which indicates stopped state. When the
		 * attribute value equals to this then UI will show stopped state.
		 */
		stop: string
	} & CapabilityBasicState
}

export interface CapabilitySlider {
	range: [number, number]
	step?: number
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
	 */
	unit?: string
	/**
	 * The command which will set the value of the slider. The value is given
	 * as its only argument.
	 */
	command?: string
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
	 */
	value?: string
}

export interface CapabilityList {
	command?: {
		name?: string
		/**
		 * This contains strings corresponding to each possible value of the
		 * property. The strings must be human-readable so that the UI Client
		 * can show these strings as user options.
		 */
		alternatives: CapabilityAlternative[]
		/**
		 * The attribute name specified in supportedValues is an array that has
		 * values supported at runtime.
		 */
		supportedValues?: string
	}
	state?: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value?: string
	} & CapabilityLabeledState
}

export interface CapabilityTextField {
	command: string
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
	 */
	value?: string
	range?: [number, number]
}

export interface CapabilityNumberField {
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
	 */
	value?: string
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
	 */
	unit?: string
	command: string
	range?: [number, number]
}

export interface CapabilityStepper {
	/**
	 * To specify a single command, use "command" for the command
	 * and the "increase" and "decrease" fields for the arguments.
	 * To specify separate commands, leave "command" out and
	 * specify the "increase" and "decrease commands in their
	 * respective fields.
	 */
	command: {
		name?: string
		increase?: string
		decrease?: string
	}
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
	 */
	value?: string
	step: number
	range: [number, number]
}

export interface CapabilityDashboardAction extends CapabilityGrouped {
	/**
	 * Specify the type of UI component to use to display this action.
	 * The corresponding field must also be included. For example,
	 * if you specify "switch" here, you must also include the
	 * "switch" key for this action.
	 */
	displayType: string
	pushButton?: CapabilityPushButton
	toggleSwitch?: CapabilityDashboardToggleSwitch
	switch?: CapabilityDashboardToggleSwitch
	standbyPowerSwitch?: CapabilityDashboardToggleSwitch
	playPause?: CapabilityPlayPause
	playStop?: CapabilityPlayStop
}

export interface CapabilityVisibleCondition {
	/**
	 * The component that controls the visibility of this component.
	 * This can be another component or this one.
	 */
	capability: string
	/**
	 * The integer version of the capability.
	 *
	 * default: 1
	 */
	version?: number
	component?: string
	/**
	 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
	 */
	value: string
	operator: CapabilityPresentationOperator
	/**
	 * The value that the visible condition evaluates against.
	 */
	operand: string
}

export interface CapabilityDashboardBasicPlusItem {
	/**
	 * Specify the type of UI component to use to display this action.
	 * The corresponding field must also be included. For example,
	 * if you specify "stepper" here, you must also include the
	 * "stepper" key for this action.
	 */
	displayType: string
	stepper?: CapabilityStepper
	/**
	 * Including a basicPlus item with the "feature" display type adds
	 * a shortcut item to the UI which will display the desired detail
	 * view.
	 */
	feature?: {
		/**
		 * The feature name of the detail view. For example, if the
		 * feature is specified as "cooking", the "cooking" detail
		 * view is launched when the user clicks the button.
		 */
		key: string
		/**
		 * The alternative string of given "key" value.
		 */
		value: string
	}[]
	/**
	 * This resource is shown when the condition in the
	 * visibleCondition is met. If this key is omitted, the component is
	 * always visible.
	 */
	visibleCondition?: CapabilityVisibleCondition
}

export interface CapabilityDashboard {
	states?: (CapabilityLabeledState & CapabilityGrouped & {
		label: string
	})[]
	actions?: CapabilityDashboardAction[]
	basicPlus?: CapabilityDashboardBasicPlusItem[]
}

export interface CapabilityDetailView {
	label: string
	/**
	 * Specify the type of UI component to use to display this action.
	 * The corresponding field must also be included. For example,
	 * if you specify "switch" here, you must also include the
	 * "switch" key for this action.
	 */
	displayType: string
	toggleSwitch?: CapabilityToggleSwitch
	standbyPowerSwitch?: CapabilityToggleSwitch
	switch?: CapabilityToggleSwitch
	slider?: CapabilitySlider
	pushButton?: CapabilityPushButton
	playPause?: CapabilityPlayPause
	playStop?: CapabilityPlayStop
	list?: CapabilityList
	textField?: CapabilityTextField
	numberField?: CapabilityNumberField
	stepper?: CapabilityStepper
	state: CapabilityLabeledState & {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+)
		 */
		unit?: string
	}
}

export interface CapabilityAutomationCondition {
	label: string
	/**
	 * Specify the type of UI component to use to display this action.
	 * The corresponding field must also be included. For example,
	 * if you specify "slider" here, you must also include the
	 * "slider" key for this action.
	 */
	displayType: string
	slider?: {
		range: [number, number]
		step?: number
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
		 */
		unit?: string
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
	}
	list?: {
		/**
		 * This contains strings corresponding to each possible value of the
		 * property. The strings must be human-readable so that the UI Client
		 * can show these strings as user options.
		 */
		alternatives: CapabilityAlternative[]
		/**
		 * The attribute name specified in supportedValues is an array
		 * that has values supported at runtime.
		 */
		supportedValues?: string
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value?: string
	}
	numberField?: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
		 */
		unit?: string
		range?: [number, number]
	}
	textField?: {
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.value)+
		 */
		value: string
		range?: [number, number]
	}
	/**
	 * The effect used to emphasize this resource widget. If set to
	 * true and this object has alternatives, a list will appear
	 * without a label.
	 *
	 * default: false
	 */
	emphasis?: boolean
}

export interface CapabilityMultiArgCommand {
	command: string
	arguments: {
		/**
		 * Specify the type of UI component to use to display this action.
		 * The corresponding field must also be included. For example,
		 * if you specify "switch" here, you must also include the
		 * "switch" key for this action.
		 */
		displayType: string
		switch?: {
			/**
			 * argument name of command
			 */
			name: string
			/**
			 * value for "on"
			 */
			on: string
			/**
			 * value for "off"
			 */
			off: string
		}
		slider?: {
			range: [number, number]
			step: number // default: 1
			/**
			 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
			 */
			unit?: string
			/**
			 * Argument name of command
			 */
			name: string
		}
		list?: {
			alternatives: CapabilityAlternative[]
			supportedValues?: string
			name: string
		}
		textField?: {
			name: string
			range?: [number, number]
		}
		numberField?: {
			name: string
			range?: [number, number]
		}
	}[]
}

export interface CapabilityAutomationAction {
	label: string
	/**
	 * Specify the type of UI component to use to display this action.
	 * The corresponding field must also be included. For example,
	 * if you specify "slider" here, you must also include the
	 * "slider" key for this action.
	 */
	displayType: string
	slider?: {
		range: [number, number]
		step: number
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
		 */
		unit?: string
		command: string
	}
	list?: {
		alternatives: CapabilityAlternative[]
		supportedValues?: string
		command?: string
	}
	textField?: {
		command: string
		range?: [number, number]
	}
	numberField?: {
		command: string
		/**
		 * (^[[a-z]*([A-Z][a-z]*)*){1,36}(\.unit)+
		 */
		unit?: string
		range?: [number, number]
	}
	multiArgCommand?: CapabilityMultiArgCommand
	/**
	 * The effect used to emphasize this resource widget. If set to
	 * true and this object has alternatives, a list will appear
	 * without a label.
	 *
	 * default: false
	 */
	emphasis?: boolean
}

export interface CapabilityAutomation {
	conditions?: CapabilityAutomationCondition[]
	actions?: CapabilityAutomationAction[]
}

export interface CapabilityPresentationUpdate {
	dashboard?: CapabilityDashboard
	detailView?: CapabilityDetailView[]
	automation?: CapabilityAutomation
}

export interface CapabilityPresentationCreate extends CapabilityPresentationUpdate {
	id: string
	version: number // integer
}

export interface CapabilityPresentation extends CapabilityPresentationUpdate {
	id: string
	version: number // integer
}

export interface CapabilityLocalizationI18n {
	/**
	 * The localized substitution for the argument value
	 */
	label: string
}

export interface CapabilityLocalizationArguments {
	/**
	 * Map of argument values to localizations
	 */
	i18n?: { [key: string]: CapabilityLocalizationI18n }

	/**
	 * The localized version of the argument name
	 */
	label?: string

	/**
	 * A localized description of what the argument represents
	 */
	description?: string
}

export interface CapabilityLocalizationCommands {
	/**
	 * The localized version of the command name
	 */
	label?: string

	/**
	 * A localized description of what the command does
	 */
	description?: string

	/**
	 * Map of argument names to localizations
	 */
	arguments?: { [key: string]: CapabilityLocalizationArguments }
}

export interface CapabilityLocalizationAttributes {
	/**
	 * The localized version of the label value
	 */
	label?: string

	/**
	 * A localized description of what the attribute represents
	 */
	description?: string

	/**
	 * A template string for the text that will be displayed regarding the attribute state.
	 */
	displayTemplate?: string

	/**
	 * Map of state property (value, unit, etc..) to localization mapping
	 */
	i18n?: { [key: string]: { [key: string]: CapabilityLocalizationI18n & { description?: string } } }
}

export interface CapabilityLocalization {
	tag: string

	/**
	 * A localized label for the capability
	 */
	label?: string

	/**
	 * A localized description of the capability
	 */
	description?: string

	/**
	 * Map of attribute name to localizations
	 */
	attributes?: { [key: string]: CapabilityLocalizationAttributes }

	/**
	 * Map of command name to localizations
	 */
	commands?: { [key: string]: CapabilityLocalizationCommands }
}

export class CapabilitiesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('capabilities', config))
	}

	/**
	 * Get a list of custom capabilities for the given namespace.
	 */
	public async list(namespace: string): Promise<CapabilitySummary[]> {
		return this.client.getPagedItems<CapabilitySummary>(`namespaces/${namespace}`)
	}

	public async listNamespaces(): Promise<CapabilityNamespace[]> {
		return this.client.get<CapabilityNamespace[]>('namespaces')
	}

	/**
	 * Gets a list of standard capabilities.
	 */
	public async listStandard(): Promise<CapabilitySummary[]> {
		return this.client.getPagedItems<CapabilitySummary>()
	}

	public async listVersions(capabilityId: string): Promise<CapabilitySummary[]> {
		return this.client.getPagedItems<CapabilitySummary>(capabilityId)
	}

	public get(capabilityId: string, capabilityVersion: number): Promise<Capability> {
		return this.client.get<Capability>(`${capabilityId}/${capabilityVersion}`)
	}

	public create(capability: CapabilityCreate, params?: HttpClientParams): Promise<Capability> {
		return this.client.post(undefined, capability, params)
	}

	public update(capabilityId: string, capabilityVersion: number, capability: CapabilityUpdate): Promise<Capability> {
		return this.client.put(`${capabilityId}/${capabilityVersion}`, capability)
	}

	public async delete(capabilityId: string, capabilityVersion: number): Promise<Status> {
		await this.client.delete(`${capabilityId}/${capabilityVersion}`)
		return SuccessStatusValue
	}

	public async getPresentation(capabilityId: string, capabilityVersion: number): Promise<CapabilityPresentation> {
		return this.client.get(`${capabilityId}/${capabilityVersion}/presentation`)
	}

	public async createPresentation(capabilityId: string, capabilityVersion: number, presentation: CapabilityPresentationCreate): Promise<CapabilityPresentation> {
		return this.client.post(`${capabilityId}/${capabilityVersion}/presentation`, presentation)
	}

	public async updatePresentation(capabilityId: string, capabilityVersion: number, presentation: CapabilityPresentationUpdate): Promise<CapabilityPresentation> {
		return this.client.put(`${capabilityId}/${capabilityVersion}/presentation`, presentation)
	}

	/**
	 * Returns a list of the locales supported by the device profile
	 * @param capabilityId UUID of the device profile
	 * @param capabilityVersion version number of the capability, starting with 1
	 */
	public listLocales(capabilityId: string, capabilityVersion: number): Promise<LocaleReference[]> {
		return this.client.getPagedItems(`${capabilityId}/${capabilityVersion}/i18n`)
	}

	/**
	 *
	 * @param capabilityId ID of the capability
	 * @param tag locale tag, e.g. 'en', 'es', or 'ko'
	 * @param capabilityVersion version number of the capability, starting with 1
	 */
	public getTranslations(capabilityId: string, capabilityVersion: number, tag: string): Promise<CapabilityLocalization> {
		return this.client.get(`${capabilityId}/${capabilityVersion}/i18n/${tag}`)
	}

	/**
	 * Create the translations for a capability
	 * @param capabilityId ID of the capability
	 * @param capabilityVersion version number of the capability, starting with 1
	 * @param data translations
	 */
	public createTranslations(capabilityId: string, capabilityVersion: number, data: CapabilityLocalization): Promise<CapabilityLocalization> {
		return this.client.post(`${capabilityId}/${capabilityVersion}/i18n`, data)
	}

	/**
	 * Update the translations for a capability
	 * @param capabilityId ID of the capability
	 * @param capabilityVersion version number of the capability, starting with 1
	 * @param data translations
	 */
	public updateTranslations(capabilityId: string, capabilityVersion: number, data: CapabilityLocalization): Promise<CapabilityLocalization> {
		return this.client.put(`${capabilityId}/${capabilityVersion}/i18n/${data.tag}`, data)
	}

	/**
	 * Create or update the translations for a capability
	 * @param capabilityId ID of the capability
	 * @param capabilityVersion version number of the capability, starting with 1
	 * @param data translations
	 */
	public async upsertTranslations(capabilityId: string, capabilityVersion: number, data: CapabilityLocalization): Promise<CapabilityLocalization> {
		try {
			return await this.createTranslations(capabilityId, capabilityVersion, data)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.message?.includes('Localization already exists')) {
				return this.updateTranslations(capabilityId, capabilityVersion, data)
			}
			throw error
		}
	}

	/**
	 * Retrieve the translations for the specified locale
	 * @param capabilityId ID of the capability
	 * @param capabilityVersion version number of the capability, starting with 1
	 * @param tag locale tag, e.g. 'en', 'es', or 'ko'
	 */
	public deleteTranslations(capabilityId: string, capabilityVersion: number, tag: string): Promise<Status> {
		return this.client.delete(`${capabilityId}/${capabilityVersion}/i18n/${tag}`)
	}
}
