import isString from 'lodash.isstring'
import isDate from 'lodash.isdate'
import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { Status, SuccessStatusValue } from '../types'
import { ConfigEntry } from './installedapps'
import { Location } from './locations'


export interface CronSchedule {
	/**
	 * The cron expression for the schedule for CRON schedules. The format
	 * matches that specified by the
	 * [Quartz scheduler](http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger.html)
	 * but should not include the seconds (1st) field. The exact second will be
	 * chosen at random but will remain consistent. The years part must be less
	 * than 2 years from now.
	 */
	expression: string
	/**
	 * The timezone id for CRON schedules.
	 */
	timezone: string
}

export interface OnceSchedule {
	/**
	 * The time in millis from jan 1 1970 UTC for ONCE schedules. Must be less
	 * than 2 years from now.
	 */
	time: number
	overwrite?: boolean
}

export interface Schedule {
	/**
	 * The ID of the installed app.
	 */
	installedAppId?: string
	/**
	 * The ID of the location the installed app is in.
	 */
	locationId?: string
	/**
	 * list of scheduled execution times in millis from jan 1 1970 UTC
	 */
	scheduledExecutions?: number[]
	/**
	 * The unique per installed app name of the schedule.
	 */
	name: string
	cron?: CronSchedule
	once?: OnceSchedule
}

/**
 * Converts a date if the format returned by the SmartThings mobile client into a cron expression that runs
 * one per day
 * @param value ISO date value of the form '2020-02-08T16:35:00.000-0800' or simple 24 hour hh:ss time string of the
 * format 16:35
 */
function parseDate(value: string): string {
	try {
		if (/^[0-9-]+T[0-9][0-9]:[0-9][0-9]:/.test(value)) {
			const time = value.split('T')[1]
			const hours = time.slice(0,2)
			const minutes = time.slice(3,5)
			return `${minutes} ${hours} * * ? *`
		}
		if (/^[0-9][0-9]?:[0-9][0-9]$/.test(value)) {
			const time = value.split(':')
			return `${time[1]} ${time[0]} * * ? *`
		}
	} catch (error) {
		throw Error(`Error parsing time format '${value}' ${error}`)
	}
	throw Error(`Unsupported time format '${value}'`)
}

export class SchedulesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	/**
	 * Returns a list of schedules for an installed app
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public list(installedAppId?: string): Promise<Schedule[]> {
		return this.client.getPagedItems<Schedule>(`${this.installedAppId(installedAppId)}/schedules`)
	}

	/**
	 * Get a specific schedule
	 * @param name the alphanumeric name of the schedule
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public get(name: string, installedAppId?: string): Promise<Schedule> {
		return this.client.get<Schedule>(`${this.installedAppId(installedAppId)}/schedules/${name}`)
	}

	/**
	 * Create a schedule
	 * @param data the schedule definition
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public create(data: Schedule, installedAppId?: string): Promise<Schedule> {
		return this.client.post<Schedule>(`${this.installedAppId(installedAppId)}/schedules`, data)
	}

	/**
	 * Delete one or more schedules
	 * @param name the name of the schedule to be deleted. If not specified then all schedules of the installed app are
	 * deleted.
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public async delete(name?: string, installedAppId?: string): Promise<Status> {
		if (name) {
			await this.client.delete(`${this.installedAppId(installedAppId)}/schedules/${name}`)
		} else {
			await this.client.delete(`${this.installedAppId(installedAppId)}/schedules`)
		}
		return SuccessStatusValue
	}

	/**
	 * Create a schedule using a cron expression.
	 * @param name the name of the schedule
	 * @param expression the cron expression
	 * @param timezone optional time zone. If not specified and the client is configured with a locationId of a location
	 * that has geo-coordinates set, then the time zone of those coordinates is used. If that's not the case the time
	 * zone defaults to UTC. Note that in order for the coordinates lookup to work, the API token must include the
	 * r:locations:* scope.
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public async schedule(name: string, expression: string, timezone?: string, installedAppId?: string): Promise<Schedule> {
		if (!timezone) {
			const location: Location = await this.client.get<Location>(`/locations/${this.locationId()}`)
			timezone = location.timeZoneId || 'UTC'
		}
		const body = {
			name,
			cron: {
				expression,
				timezone,
			},
		}
		return this.create(body, installedAppId)
	}

	/**
	 * Create a schedule that runs at a specific time once per day
	 * @param name the name of the schedule
	 * @param dateOrConfig either a SmartApp date configuration setting, an ISO date string of the format
	 * '2020-02-08T16:35:00.000-0800', a 24 hour hh:mm time expression (i.e. 16:35), or a Date object.
	 * configuration setting
	 * @param timezone optional time zone. Not required if the input is a Date object. Otherwise
	 * if not specified and the client is configured with a locationId of a location
	 * that has geo-coordinates set, then the time zone of those coordinates is used. If that's not the case the time
	 * zone defaults to UTC. Note that in order for the coordinates lookup to work, the API token must include the
	 * r:locations:* scope.
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public async runDaily(name: string, dateOrConfig: (string | ConfigEntry[] | Date), timezone?: string, installedAppId?: string): Promise<Schedule> {
		let expression: string
		if (Array.isArray(dateOrConfig) && dateOrConfig[0].stringConfig && dateOrConfig[0].stringConfig.value) {
			expression = parseDate(dateOrConfig[0].stringConfig.value)
		} else if (isString(dateOrConfig)) {
			expression = parseDate(dateOrConfig)
		} else if (isDate(dateOrConfig)) {
			expression = `${dateOrConfig.getUTCMinutes()} ${dateOrConfig.getUTCHours()} * * ? *`
			timezone = 'UTC'
		} else {
			throw Error(`Invalid date format '${dateOrConfig}'`)
		}

		if (!timezone) {
			const location: Location = await this.client.get<Location>(`/locations/${this.locationId()}`)
			timezone = location.timeZoneId || 'UTC'
		}

		const data = {
			name,
			cron: {
				expression, timezone,
			},
		}
		return this.create(data, installedAppId)
	}

	/**
	 *
	 * @param name
	 * @param dateTime
	 * @param overwrite
	 * @param installedAppId
	 */
	public runOnce(name: string, dateTime: number | Date, overwrite = true, installedAppId?: string): Promise<Schedule> {
		const time: number = dateTime instanceof Date ? dateTime.getTime() : dateTime
		const body = {
			name,
			once: {
				time,
				overwrite,
			},
		}
		return this.create(body, installedAppId)
	}

	/**
	 * Creates a one-time schedule that runs after the specified period of time.
	 * @param name the name of the schedule
	 * @param delay the amount of time that should elapse before the schedule runs, in seconds
	 * @param overwrite if true then a second call with the same name that's made before the first one has run will
	 * replace the first schedule, so that only the second one runs. If false then each call to runIn will result in
	 * a schedule execution. Defaults to true.
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 */
	public runIn(name: string, delay: number, overwrite = true, installedAppId?: string): Promise<Schedule> {
		const time = Date.now() + (1000 * delay)
		const body = {
			name,
			once: {
				time,
				overwrite,
			},
		}
		return this.create(body, installedAppId)
	}

	/**
	 * Deletes the schedule with the specified name
	 * @param name the schedule name
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 * @deprecated use delete(name) instead
	 */
	public unschedule(name: string, installedAppId?: string): Promise<Status> {
		return this.delete(name, installedAppId)
	}

	/**
	 * Deletes all schedules for the installed app
	 * @param installedAppId UUID of the installed app. If the client is configured with an installed app ID then this
	 * parameter is not needed.
	 * @deprecated use delete() instead
	 */
	public unscheduleAll(installedAppId?: string): Promise<Status> {
		return this.delete(installedAppId)
	}
}
