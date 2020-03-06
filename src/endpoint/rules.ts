import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { SuccessStatusValue, Status } from '../types'


export enum ConditionAggregationMode {
	Any = 'Any',
	All = 'All',
}

export interface SimpleCondition {
	/**
	 * Unique id for the condition
	 */
	id?: string
	left: Operand
	right: Operand
	aggregation?: ConditionAggregationMode
}

export interface BetweenCondition {
	/**
	 * Unique id for the condition
	 */
	id?: string
	value: Operand
	start: Operand
	end: Operand
	aggregation?: ConditionAggregationMode
}

export interface SingleOperandCondition {
	/**
	 * Unique id for the condition
	 */
	id?: string
	left: Operand
	aggregation?: ConditionAggregationMode
}

export interface Condition {
	and?: Array<Condition>
	or?: Array<Condition>
	not?: Condition
	equals?: SimpleCondition
	greaterThan?: SimpleCondition
	greaterThanOrEquals?: SimpleCondition
	lessThan?: SimpleCondition
	lessThanOrEquals?: SimpleCondition
	between?: BetweenCondition
	changes?: SingleOperandCondition
}

export enum SubscriptionMode {
	Auto = 'Auto',
	Always = 'Always',
	Never = 'Never'
}

export enum TimeReference {
	Now = 'Now',
	Midnight = 'Midnight',
	Sunrise = 'Sunrise',
	Noon = 'Noon',
	Sunset = 'Sunset'
}

export interface TimeOperand {
	/**
	 * A java time zone ID reference
	 */
	timeZoneId?: string
	reference: TimeReference
	offset?: Interval
}

export enum OperandAggregationMode {
	None = 'None',
	Avg = 'Avg',
	Sum = 'Sum',
	Min = 'Min',
	Max = 'Max',
	Least = 'Least'
}

export interface ArrayOperand {
	operands: Array<Operand>
	aggregation?: OperandAggregationMode
}

export class MapOperand extends null<string, Operand> {

}

export interface DeviceOperand {
	devices?: Array<string>
	component: string
	capability: string
	attribute: string
	path?: string
	aggregation?: OperandAggregationMode
	subscriptionMode?: SubscriptionMode
}

export enum LocationAttribute {
	Mode = 'Mode',
	ArmState = 'ArmState'
}

export enum DayOfWeek {
	Sun = 'Sun',
	Mon = 'Mon',
	Tue = 'Tue',
	Wed = 'Wed',
	Thu = 'Thu',
	Fri = 'Fri',
	Sat = 'Sat'
}

export interface LocationOperand {
	attribute: LocationAttribute
}

export interface DateOperand {
	/**
	 * A java time zone ID reference
	 */
	timeZoneId?: string
	daysOfWeek?: Array<DayOfWeek>
	year?: number
	month?: number
	day?: number
}

export interface DateTimeOperand {
	/**
	 * A java time zone ID reference
	 */
	timeZoneId?: string
	daysOfWeek?: Array<DayOfWeek>
	year?: number
	month?: number
	day?: number
	reference: TimeReference
	offset?: Interval
}

export interface Operand {
	'_boolean'?: boolean
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

export enum IntervalUnit {
	Second = 'Second',
	Minute = 'Minute',
	Hour = 'Hour',
	Day = 'Day',
	Week = 'Week',
	Month = 'Month',
	Year = 'Year'
}

export interface Interval {
	value: Operand
	unit: IntervalUnit
}

export interface DeviceCommand {
	/**
	 * The name of the component on this device, default is 'main'. The
	 * component must be valid for the device.
	 */
	component?: string
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
	arguments?: (object | string | number)[]
}

export interface IfAction extends Condition {
	/**
	 * Unique id for the action
	 */
	id?: string
	then?: Array<Action>
	'_else'?: Array<Action>
	subscriptionMode?: SubscriptionMode
}

export interface SleepAction {
	/**
	 * Unique id for the action
	 */
	id?: string
	duration: Interval
}

export interface CommandAction {
	/**
	 * Unique id for the action
	 */
	id?: string
	devices: Array<string>
	commands: Array<DeviceCommand>
}

export interface EveryAction {
	/**
	 * Unique id for the action
	 */
	id?: string
	interval?: Interval
	specific?: TimeOperand
	actions: Array<Action>
}

export interface LocationAction {
	/**
	 * Unique id for the action
	 */
	id: string
	mode?: string
}

export interface Action {
	'if'?: IfAction
	sleep?: SleepAction
	command?: CommandAction
	every?: EveryAction
	location?: LocationAction
}

export interface RuleRequest {
	/**
	 * Name for the rule
	 */
	name: string
	actions: Array<Action>
	/**
	 * Time zone ID for this rule. This overrides the location time zone ID,
	 * but is overridden by time zone ID provided by each operand individually.
	 */
	timeZoneId?: string
}

export interface Rule extends RuleRequest {
	/**
	 * Unique id for the rule
	 */
	id: string
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
		return this.client.getPagedItems<Rule>(undefined, {locationId: this.locationId(locationId)})
	}

	/**
	 * Get a specific rule
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public get(id: string, locationId?: string): Promise<Rule> {
		return this.client.get<Rule>(id, {locationId: this.locationId(locationId)})
	}

	/**
	 * Delete a specific rule
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public async delete(id: string, locationId?: string): Promise<Status> {
		await this.client.delete(id, {locationId: this.locationId(locationId)})
		return SuccessStatusValue
	}

	/**
	 * Create a rule
	 * @param data the rule definition
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public create(data: RuleRequest, locationId?: string): Promise<Rule> {
		return this.client.post(undefined, data, {locationId: this.locationId(locationId)})
	}

	/**
	 * Update a rule
	 * @param id UUID of the rule
	 * @param data the new rule definition
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public update(id: string, data: RuleRequest, locationId?: string): Promise<Rule> {
		return this.client.put(id, data, {locationId: this.locationId(locationId)})
	}

	/**
	 * Execute a rule's actions
	 * @param id UUID of the rule
	 * @param locationId UUID of the location, If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public async execute(id: string, locationId?: string): Promise<Status> {
		await this.client.post(`execute/${id}`, undefined, {locationId: this.locationId(locationId)})
		return SuccessStatusValue
	}
}
