import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'


export type ConditionAggregationMode = 'Any' | 'All'

export interface SimpleCondition {
	left: RuleOperand
	right: RuleOperand
	aggregation?: ConditionAggregationMode
}

export interface BetweenCondition {
	value: RuleOperand
	start: RuleOperand
	end: RuleOperand
	aggregation?: ConditionAggregationMode
}

/**
 * A condition that returns true when its evaluation resolves to true and the previous evaluation
 * resolved to false.
 */
export interface ChangesCondition extends BasicCondition {
	id: string
	operand?: RuleOperand
}

/**
 * A condition that returns true if its evaluation would return true within the specified duration.
 */
export interface WasCondition extends BasicCondition {
	id: string
	operand?: RuleOperand
	duration: RuleInterval
}

/**
 * A condition that returns true if its evaluation is true after the specified duration.
 */
export interface RemainsCondition extends BasicCondition {
	id: string
	duration: RuleInterval
	operand?: RuleOperand
}

export interface BasicCondition {
	and?: RuleCondition[]
	or?: RuleCondition[]
	not?: RuleCondition
	equals?: SimpleCondition
	greaterThan?: SimpleCondition
	greaterThanOrEquals?: SimpleCondition
	lessThan?: SimpleCondition
	lessThanOrEquals?: SimpleCondition
	between?: BetweenCondition
}

export interface RuleCondition {
	and?: RuleCondition[]
	or?: RuleCondition[]
	not?: RuleCondition
	equals?: SimpleCondition
	greaterThan?: SimpleCondition
	greaterThanOrEquals?: SimpleCondition
	lessThan?: SimpleCondition
	lessThanOrEquals?: SimpleCondition
	between?: BetweenCondition
	changes?: ChangesCondition
	remains?: RemainsCondition
	was?: WasCondition
}

export type TimeReference = 'Now' | 'Midnight' | 'Sunrise' | 'Noon' | 'Sunset'
export type DateReference = 'Today'
export type OperandAggregationMode = 'None'
export type TriggerMode = 'Auto' | 'Always' | 'Never'

export interface ArrayOperand {
	operands: RuleOperand[]
	aggregation?: OperandAggregationMode
}

export interface MapOperand {
	[name: string]: RuleOperand | undefined
}

export interface DeviceOperand {
	devices: string[]
	component: string
	capability: string
	attribute: string
	path?: string
	aggregation?: OperandAggregationMode
	trigger?: TriggerMode
}

export type LocationAttribute  = 'FineDust' | 'FineDustIndex' | 'Humidity' | 'Mode' | 'Security' | 'Temperature' | 'TemperatureC' | 'TemperatureF' | 'UltraFineDust' | 'UltraFineDustIndex' | 'Weather' | 'WeatherAlertSeverity'

export type DayOfWeek = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export interface LocationOperand {
	/**
	 * Required for User level rule, optional for Location level in request. Will always be present
	 * in response for both.
	 */
	locationId?: string
	attribute: LocationAttribute
	trigger?: TriggerMode
}

export interface DateOperand {
	/**
	 * A java time zone ID reference.
	 */
	timeZoneId?: string
	daysOfWeek?: DayOfWeek[]
	year?: number
	month?: number
	day?: number
	reference?: DateReference
}

export interface TimeOperand {
	/**
	 * A java time zone ID reference.
	 */
	timeZoneId?: string

	daysOfWeek?: DayOfWeek[]

	/**
	 * default: Midnight
	 */
	reference: TimeReference

	offset?: RuleInterval
}

export interface DateTimeOperand {
	/**
	 * A java time zone ID reference.
	 */
	timeZoneId?: string

	/**
	 * Location ID for location actions.
	 */
	locationId?: string

	daysOfWeek?: DayOfWeek[]
	year?: number
	month?: number
	day?: number

	/**
	 * default: Midnight
	 */
	reference: TimeReference

	offset?: RuleInterval
}

export interface RuleOperand {
	'boolean'?: boolean
	decimal?: number
	integer?: number
	string?: string
	array?: ArrayOperand
	map?: MapOperand
	device?: DeviceOperand
	location?: LocationOperand
	date?: DateOperand
	time?: TimeOperand
	datetime?: DateTimeOperand
}

export type IntervalUnit = 'Second' | 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month' | 'Year'

export interface RuleInterval {
	value: RuleOperand
	unit: IntervalUnit
}

export interface DeviceCommand {
	/**
	 * The name of the component on this device, default is 'main'. The
	 * component must be valid for the device.
	 */
	component: string

	/**
	 * Capability that this command relates to. This must be a capability of the
	 * component.
	 */
	capability: string

	/**
	 * Name of the command, this must be valid for the capability.
	 */
	command: string

	/**
	 * Arguments of the command. All the required arguments defined in the
	 * capability's command argument definition must be provided. The type of
	 * the arguments are dependent on the type of the capability's command
	 * argument. Please refer to the capabilities definition at
	 * https://smartthings.developer.samsung.com/develop/api-ref/capabilities.html
	 */
	arguments?: RuleOperand[]
}

export interface IfActionSequence{
	then?: RuleSequence
	'else'?: RuleSequence
}

export interface IfAction extends RuleCondition {
	then?: RuleAction[]
	'else'?: RuleAction[]

	/**
	 * The sequence in which the actions are to be executed.
	 */
	sequence?: IfActionSequence
}

export interface SleepAction {
	duration: RuleInterval
}

export interface CommandSequence {
	commands?: RuleSequence
	devices?: RuleSequence
}

export interface CommandAction {
	devices: string[]
	commands: DeviceCommand[]
	sequence?: CommandSequence
}

export interface EveryAction {
	interval?: RuleInterval
	specific?: DateTimeOperand
	actions: RuleAction[]
	sequence?: RuleActionSequence
}

export interface LocationAction {
	/**
	 * locationId is required for "User level rule". (It's optional for "Location level rule".)
	 *
	 * <^(?:([0-9a-fA-F]{32})|([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}))$>
	 */
	locationId: string

	mode?: string
}

export type RuleAction = { 'if': IfAction } | { sleep: SleepAction } | { command: CommandAction } | { every: EveryAction } | { location: LocationAction }

export type RuleSequence = 'Serial' | 'Parallel'
export interface RuleActionSequence {
	actions?: RuleSequence
}

export interface RuleRequest {
	/**
	 * The name for the Rule. Limit 100 characters.
	 */
	name: string

	actions: RuleAction[]

	/**
	 * The sequence in which the actions are to be executed (i.e. Serial (default) or Parallel).
	 */
	sequence?: RuleActionSequence

	/**
	 * Time zone ID for this rule. This overrides the location time zone ID,
	 * but is overridden by time zone ID provided by each operand individually.
	 */
	timeZoneId?: string
}

export type RuleOwnerType = 'Location' | 'User'
export type RuleStatus = 'Enabled' | 'Disabled'
export type RuleExecutionLocation = 'Cloud' | 'Local'
export type RuleCreator = 'SMARTTHINGS' | 'ARB' | 'RECIPE' | 'UNDEFINED'

export interface Rule extends RuleRequest {
	/**
	 * Unique id for the rule.
	 */
	id: string

	ownerType: RuleOwnerType
	ownerId: string
	dateCreated: string
	dateUpdated: string
	status?: RuleStatus
	executionLocation?: RuleExecutionLocation
	creator?: RuleCreator
}

export type ExecutionResult = 'Success' | 'Failure' | 'Ignored'

export type IfExecutionResult = 'True' | 'False'
export interface IfActionExecutionResult {
	result: IfExecutionResult
}

/**
 * The result of a location action execution.
 */
export interface LocationActionExecutionResult {
	result: ExecutionResult
	locationId: string
}

export type CommandExecutionResult = 'Success' | 'Failure' | 'Offline'
export interface CommandActionExecutionResult {
	result: CommandExecutionResult
	deviceId: string
}

export interface SleepActionExecutionResult {
	result: ExecutionResult
}

export interface ActionExecutionResult {
	actionId: string
	if?: IfActionExecutionResult
	location?: LocationActionExecutionResult
	command?: CommandActionExecutionResult[]
	sleep?: SleepActionExecutionResult
}

/**
 * The result of a Rule execution.
 */
export interface RuleExecutionResponse {
	executionId: string
	id: string
	result: ExecutionResult
	actions?: ActionExecutionResult[]
}

export class RulesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('rules', config))
	}

	/**
	 * List the rules for a location and the access token principal. The principal is the user in the case of a
	 * PAT (personal access) token or the installed app in the case of a SmartApp token. The rules belonging to one
	 * principal cannot see the rules belonging to another principal.
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public list(locationId?: string): Promise<Rule[]> {
		return this.client.getPagedItems<Rule>(undefined, { locationId: this.locationId(locationId) })
	}

	/**
	 * Get a specific rule
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public get(id: string, locationId?: string): Promise<Rule> {
		return this.client.get<Rule>(id, { locationId: this.locationId(locationId) })
	}

	/**
	 * Delete a specific rule
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public async delete(id: string, locationId?: string): Promise<Rule> {
		return this.client.delete(id, { locationId: this.locationId(locationId) })
	}

	/**
	 * Create a rule
	 * @param data the rule definition
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public create(data: RuleRequest, locationId?: string): Promise<Rule> {
		return this.client.post(undefined, data, { locationId: this.locationId(locationId) })
	}

	/**
	 * Update a rule
	 * @param id UUID of the rule
	 * @param data the new rule definition
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public update(id: string, data: RuleRequest, locationId?: string): Promise<Rule> {
		return this.client.put(id, data, { locationId: this.locationId(locationId) })
	}

	/**
	 * Execute a rule's actions
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public async execute(id: string, locationId?: string): Promise<RuleExecutionResponse> {
		return this.client.post(`execute/${id}`, undefined, { locationId: this.locationId(locationId) })
	}
}
