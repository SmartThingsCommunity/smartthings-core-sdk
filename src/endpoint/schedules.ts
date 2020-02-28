import { Endpoint } from '../endpoint'
import EndpointClient, { EndpointClientConfig } from '../endpoint-client'
import { Links, Status, SuccessStatusValue } from '../types'
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
	scheduledExecutions?: Array<number>
	/**
	 * The unique per installed app name of the schedule.
	 */
	name: string
	cron?: CronSchedule
	once?: OnceSchedule
}

export interface SchedulePagedResult {
	items: Schedule[]
	_links: Links
}

function parseDate(value: string): string {
	// 2020-02-08T16:35:00.000-0800
	try {
		const time = value.split('T')[1]
		const hours = time.slice(0,2)
		const minutes = time.slice(3,5)
		return `${minutes} ${hours} * * ? *`
	} catch (error) {
		throw Error(`Invalid time format '${value}' ${error}`)
	}
}

export class SchedulesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('installedapps', config))
	}

	public async list(installedAppId?: string): Promise<Schedule[]> {
		const result = await this.client.get<SchedulePagedResult>(`${this.installedAppId(installedAppId)}/schedules`)
		return result.items ? result.items : []
	}

	public get(name: string, installedAppId?: string): Promise<Schedule> {
		return this.client.get<Schedule>(`${this.installedAppId(installedAppId)}/schedules/${name}`)
	}

	public create(data: Schedule, installedAppId?: string): Promise<Schedule> {
		return this.client.post<Schedule>(`${this.installedAppId(installedAppId)}/schedules`, data)
	}

	public async delete(name?: string, installedAppId?: string): Promise<Status> {
		if (name) {
			await this.client.delete(`${this.installedAppId(installedAppId)}/schedules/${name}`)
		} else {
			await this.client.delete(`${this.installedAppId(installedAppId)}/schedules`)
		}
		return SuccessStatusValue
	}

	public schedule(name: string, expression: string, timezone = 'UTC'): Promise<Schedule> {
		const body = {
			name,
			cron: {
				expression,
				timezone,
			},
		}
		return this.create(body)
	}

	// Accepts time setting, Date object, or ISO string
	public async runDaily(name: string, dateOrConfig: (string | ConfigEntry[]), timezone?: string): Promise<Schedule> {
		let date: string
		if (Array.isArray(dateOrConfig) && dateOrConfig[0].stringConfig && dateOrConfig[0].stringConfig.value) {
			date = dateOrConfig[0].stringConfig.value
		} else if (typeof(dateOrConfig) === 'string') {
			date = dateOrConfig
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
				expression: parseDate(date),
				timezone:  timezone,
			},
		}
		return this.create(data)
	}

	public runIn(name: string, delay: number, overwrite = true): Promise<Schedule> {
		const time = Date.now() + (1000 * delay)
		const body = {
			name,
			once: {
				time,
				overwrite,
			},
		}
		return this.create(body)
	}

	public unschedule(name: string): Promise<Status> {
		return this.delete(name)
	}

	public unscheduleAll(): Promise<Status> {
		return this.delete()
	}
}
