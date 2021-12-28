import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'
import { SuccessStatusValue, Status } from '../types'


export interface TimeValue {
	value: string
}

export interface NumericValue {
	value: number
	unit: string
}

export interface UnitlessNumericValue {
	value: number
}

export interface StringValue {
	value: string
}

export interface ServiceLocationInfo {
	locationId: string
	subscriptions: Array<ServiceLocationInfoSubscriptions>
	latitude: number
	longitude: number
	city: string
}

export interface ServiceLocationInfoSubscriptions {
	subscriptionId: string
	/**
	 * DIRECT or EXECUTION delivery, default to DIRECT
	 */
	type: string
	/**
	 * JEXL expression string
	 */
	predicate: string
	subscribedCapabilities: Array<string>
}

export interface ServiceNewSubscription {
	/**
	 * location ID
	 */
	locationId: string
	/**
	 * subscription ID created
	 */
	subscriptionId: string
}

export enum ServiceCapabilitiesEnum {
	weather = 'weather',
	airQuality = 'airQuality',
	forecast = 'forecast',
	airQualityForecast = 'airQualityForecast'
}

export enum ServiceSubscriptionType {
	DIRECT = 'DIRECT',
	EXECUTION = 'EXECUTION'
}

interface ServiceCapabilitiesResponse {
	name: Array<ServiceCapabilitiesEnum>
}

export interface ServiceSubscriptionBody {
	/**
	 * InstalledApp ID
	 */
	isaId: string
	/**
	 * DIRECT or EXECUTION delivery, defaults to DIRECT
	 */
	type?: ServiceSubscriptionType
	/**
	 * capability name(s)
	 */
	capabilities: Array<ServiceCapabilitiesEnum>
	/**
	 * JEXL formatted expression referencing attributes from the requested capabilities. For example, to receive a
	 * weather event whenever the temperature is greater than 4 degrees celsius, you would use this expression:
	 *
	 *     'weather.temperature.value > 4'
	 *
	 * You would then expect to receive an event whenever the temperature was above 4 degrees. You'd receive this event
	 * every 20 minutes while the condition is met, not only when the threshold is crossed. The event data will include
	 * all of the capability data, not just the property used in the condition. So, for example, if you were also
	 * interested in the feels like temperature and relative humidity whenever the temperature was above 4 degrees,
	 * you would not need to create subscriptions for each of them.
	 *
	 * See https://commons.apache.org/proper/commons-jexl/reference/syntax.html
	 */
	predicate?: string
}

export interface ServiceSubscriptionRequest {
	capabilities: Array<ServiceCapabilitiesEnum>
	predicate?: string
	type?: ServiceSubscriptionType
}

export interface AirQualityData {
	airQualityIndex: NumericValue
	o3Amount: NumericValue
	o3Index: UnitlessNumericValue
	no2Amount: NumericValue
	no2Index: UnitlessNumericValue
	so2Amount: NumericValue
	so2Index: UnitlessNumericValue
	coAmount: NumericValue
	coIndex: UnitlessNumericValue
	pm10Amount: NumericValue
	pm10Index: UnitlessNumericValue
	pm25Amount: NumericValue
	pm25Index: UnitlessNumericValue
}

export interface WeatherForecast {
	vendor: NumericValue
	version: NumericValue
	precip1Hour: NumericValue
	precipMin1Hour: NumericValue
	precipMax1Hour: NumericValue
	precip2Hour: NumericValue
	precipMin2Hour: NumericValue
	precipMax2Hour: NumericValue
	precip3Hour: NumericValue
	precipMin3Hour: NumericValue
	precipMax3Hour: NumericValue
	precip4Hour: NumericValue
	precipMin4Hour: NumericValue
	precipMax4Hour: NumericValue
	precip5Hour: NumericValue
	precipMin5Hour: NumericValue
	precipMax5Hour: NumericValue
	precip6Hour: NumericValue
	precipMin6Hour: NumericValue
	precipMax6Hour: NumericValue
	precip7Hour: NumericValue
	precipMin7Hour: NumericValue
	precipMax7Hour: NumericValue
	precip8Hour: NumericValue
	precipMin8Hour: NumericValue
	precipMax8Hour: NumericValue
	precip9Hour: NumericValue
	precipMin9Hour: NumericValue
	precipMax9Hour: NumericValue
	precip10Hour: NumericValue
	precipMin10Hour: NumericValue
	precipMax10Hour: NumericValue
	precip11Hour: NumericValue
	precipMin11Hour: NumericValue
	precipMax11Hour: NumericValue
	precip12Hour: NumericValue
	precipMin12Hour: NumericValue
	precipMax12Hour: NumericValue
	precip24Hour: NumericValue
	snow1Hour: NumericValue
	snowMin1Hour: NumericValue
	snowMax1Hour: NumericValue
	snow2Hour: NumericValue
	snowMin2Hour: NumericValue
	snowMax2Hour: NumericValue
	snow3Hour: NumericValue
	snowMin3Hour: NumericValue
	snowMax3Hour: NumericValue
	snow4Hour: NumericValue
	snowMin4Hour: NumericValue
	snowMax4Hour: NumericValue
	snow5Hour: NumericValue
	snowMin5Hour: NumericValue
	snowMax5Hour: NumericValue
	snow6Hour: NumericValue
	snowMin6Hour: NumericValue
	snowMax6Hour: NumericValue
	snow7Hour: NumericValue
	snowMin7Hour: NumericValue
	snowMax7Hour: NumericValue
	snow8Hour: NumericValue
	snowMin8Hour: NumericValue
	snowMax8Hour: NumericValue
	snow9Hour: NumericValue
	snowMin9Hour: NumericValue
	snowMax9Hour: NumericValue
	snow10Hour: NumericValue
	snowMin10Hour: NumericValue
	snowMax10Hour: NumericValue
	snow11Hour: NumericValue
	snowMin11Hour: NumericValue
	snowMax11Hour: NumericValue
	snow12Hour: NumericValue
	snowMin12Hour: NumericValue
	snowMax12Hour: NumericValue
	snow24Hour: NumericValue
	temperature1Hour: NumericValue
	temperature2Hour: NumericValue
	temperature3Hour: NumericValue
	temperature4Hour: NumericValue
	temperature5Hour: NumericValue
	temperature6Hour: NumericValue
	temperature7Hour: NumericValue
	temperature8Hour: NumericValue
	temperature9Hour: NumericValue
	temperature10Hour: NumericValue
	temperature11Hour: NumericValue
	temperature12Hour: NumericValue
}
/* Example:
	{
        "temperatureAmount4hour": {
            "value": 13,
            "unit": "C"
        },
        "temperatureAmount10hour": {
            "value": 12,
            "unit": "C"
        },
        "snow24hour": {
            "value": 0,
            "unit": "cm"
        },
        "temperatureAmount6hour": {
            "value": 14,
            "unit": "C"
        },
        "temperatureAmount9hour": {
            "value": 13,
            "unit": "C"
        },
        "precip1hour": {
            "value": 0,
            "unit": "mm"
        },
        "temperatureAmount3hour": {
            "value": 12,
            "unit": "C"
        },
        "temperatureAmount11hour": {
            "value": 11,
            "unit": "C"
        },
        "version": {
            "value": "v3.0"
        },
        "temperatureAmount1hour": {
            "value": 9,
            "unit": "C"
        },
        "temperatureAmount5hour": {
            "value": 14,
            "unit": "C"
        },
        "snow1hour": {
            "value": 0,
            "unit": "cm"
        },
        "vendor": {
            "value": "TheWeatherChannel"
        },
        "temperatureAmount8hour": {
            "value": 14,
            "unit": "C"
        },
        "temperatureAmount7hour": {
            "value": 14,
            "unit": "C"
        },
        "precip24hour": {
            "value": 7.62,
            "unit": "mm"
        },
        "temperatureAmount2hour": {
            "value": 11,
            "unit": "C"
        },
        "temperatureAmount12hour": {
            "value": 10,
            "unit": "C"
        },
        "snow6hour": {
            "value": 0,
            "unit": "cm"
        },
        "precip6hour": {
            "value": 0,
            "unit": "mm"
        }
	}
 */

export interface AirQualityForecast {
	pm10Index1Hour: UnitlessNumericValue
	pm10Index2Hour: UnitlessNumericValue
	pm10Index3Hour: UnitlessNumericValue
	pm10Index4Hour: UnitlessNumericValue
	pm10Index5Hour: UnitlessNumericValue
	pm10Index6Hour: UnitlessNumericValue
	pm10Index7Hour: UnitlessNumericValue
	pm10Index8Hour: UnitlessNumericValue
	pm10Index9Hour: UnitlessNumericValue
	pm10Index10Hour: UnitlessNumericValue
	pm10Index11Hour: UnitlessNumericValue
	pm10Index12Hour: UnitlessNumericValue
	pm10Amount1Hour: NumericValue
	pm10Amount2Hour: NumericValue
	pm10Amount3Hour: NumericValue
	pm10Amount4Hour: NumericValue
	pm10Amount5Hour: NumericValue
	pm10Amount6Hour: NumericValue
	pm10Amount7Hour: NumericValue
	pm10Amount8Hour: NumericValue
	pm10Amount9Hour: NumericValue
	pm10Amount10Hour: NumericValue
	pm10Amount11Hour: NumericValue
	pm10Amount12Hour: NumericValue
	pm25Index1Hour: UnitlessNumericValue
	pm25Index2Hour: UnitlessNumericValue
	pm25Index3Hour: UnitlessNumericValue
	pm25Index4Hour: UnitlessNumericValue
	pm25Index5Hour: UnitlessNumericValue
	pm25Index6Hour: UnitlessNumericValue
	pm25Index7Hour: UnitlessNumericValue
	pm25Index8Hour: UnitlessNumericValue
	pm25Index9Hour: UnitlessNumericValue
	pm25Index10Hour: UnitlessNumericValue
	pm25Index11Hour: UnitlessNumericValue
	pm25Index12Hour: UnitlessNumericValue
	pm25Amount1Hour: NumericValue
	pm25Amount2Hour: NumericValue
	pm25Amount3Hour: NumericValue
	pm25Amount4Hour: NumericValue
	pm25Amount5Hour: NumericValue
	pm25Amount6Hour: NumericValue
	pm25Amount7Hour: NumericValue
	pm25Amount8Hour: NumericValue
	pm25Amount9Hour: NumericValue
	pm25Amount10Hour: NumericValue
	pm25Amount11Hour: NumericValue
	pm25Amount12Hour: NumericValue
}
/* Example:
	{
        "o3Amount": {
            "value": 59.52,
            "unit": "μg/m^3"
        },
        "coAmount": {
            "value": 254.88,
            "unit": "μg/m^3"
        },
        "pm25Index": {
            "value": 9
        },
        "no2Amount": {
            "value": 27.54
        },
        "coIndex": {
            "value": 2
        },
        "pm25Amount": {
            "value": 2.89,
            "unit": "μg/m^3"
        },
        "pm10Index": {
            "value": 5
        },
        "expirationTime": {
            "value": 1585238400000
        },
        "so2Amount": {
            "value": 7.13,
            "unit": "μg/m^3"
        },
        "so2Index": {
            "value": 4
        },
        "pm10Amount": {
            "value": 4.72,
            "unit": "μg/m^3"
        },
        "o3Index": {
            "value": 29
        },
        "no2Index": {
            "value": 13
        },
        "airQualityIndex": {
            "value": 29,
            "unit": "CAQI"
        }
    }
 */

export interface WeatherData {
	cloudCeiling: NumericValue
	cloudCoverPhrase: StringValue
	iconCode: NumericValue
	conditionState: NumericValue
	relativeHumidity: NumericValue
	sunriseTimeLocal: TimeValue
	sunsetTimeLocal: TimeValue
	temperature: NumericValue
	temperatureFeelsLike: NumericValue
	uvDescription: StringValue
	uvIndex: UnitlessNumericValue
	visibility: NumericValue
	windDirection: NumericValue
	windDirectionCardinal: StringValue
	windGust: NumericValue
	windSpeed: NumericValue
	wxPhraseLong: StringValue
}
/* Example:
	 {
		"cloudCoverPhrase": {
			"value": "Partly Cloudy"
		},
		"visibility": {
			"value": 16.09,
			"unit": "Km"
		},
		"windDirectionCardinal": {
			"value": "SE"
		},
		"version": {
			"value": "v3.0"
		},
		"wxPhraseLong": {
			"value": "Fair"
		},
		"sunriseTimeLocal": {
			"value": 1585231306000
		},
		"sunsetTimeLocal": {
			"value": 1585275955000
		},
		"vendor": {
			"value": "TheWeatherChannel"
		},
		"expirationTime": {
			"value": 1585236009000
		},
		"relativeHumidity": {
			"value": 84,
			"unit": "%"
		},
		"temperature": {
			"value": 6,
			"unit": "C"
		},
		"uvDescription": {
			"value": "Low"
		},
		"iconCode": {
			"value": 34
		},
		"windDirection": {
			"value": 130,
			"unit": "°"
		},
		"conditionState": {
			"value": "CLEAR"
		},
		"uvIndex": {
			"value": 0
		},
		"windSpeed": {
			"value": 3,
			"unit": "Km/h"
		},
		"temperatureFeelsLike": {
			"value": 6,
			"unit": "C"
		}
	}
 */

export interface ServiceCapabilityData {
	locationId: string
	airQuality?: AirQualityData
	forecast?: WeatherForecast
	airQualityForecast?: AirQualityForecast
	weather?: WeatherData
}
/* Example:
	{
		"locationId": "8d17bc64-1a98-4cf5-9428-4408783a2121",
		"airQuality": {...},
		"forecast": {...},
		"weather": {...}
    }
 */

export class ServicesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('services/coordinate/locations', config))
	}

	/**
	 * Returns the location's city, latitude, longitude, and list of location services subscriptions, if any
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public getLocationServiceInfo(locationId?: string): Promise<ServiceLocationInfo> {
		return this.client.get<ServiceLocationInfo>(`${this.locationId(locationId)}`)
	}

	/**
	 * Returns the list of location service capability names available for this location. Currently airQuality,
	 * forecast, and weather, for locations have have geo-coordinates set
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public getServiceCapabilities(locationId?: string): Promise<ServiceCapabilitiesEnum[]> {
		return this.client.get<ServiceCapabilitiesResponse>(`${this.locationId(locationId)}/capabilities`)
			.then(response => {
				return response.name
			})
	}

	/**
	 * Subscribe to changes in any location service capability value
	 * @param params the subscription definition
	 * @param installedAppId UUID of the installed app instance. If the client is configured with an installedAppId this
	 * parameter can be omitted
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public createSubscription(
			params: ServiceSubscriptionRequest,
			installedAppId?: string,
			locationId?: string): Promise<ServiceNewSubscription>
	{
		const data = {
			type: ServiceSubscriptionType.DIRECT,
			isaId: this.installedAppId(installedAppId),
			...params,
		}
		return this.client.post<ServiceNewSubscription>(`${this.locationId(locationId)}/subscriptions`, data)
	}

	/**
	 * Update a location service subscription.
	 * @param id UUID of the subscription
	 * @param params the subscription definition
	 * @param installedAppId UUID of the installed app instance. If the client is configured with an installedAppId this
	 * parameter can be omitted
	 * @param locationId UUID of the location. If the client is configured with a location ID this parameter
	 * can be omitted
	 */
	public updateSubscription(
			id: string, params: ServiceSubscriptionRequest,
			installedAppId?: string,
			locationId?: string): Promise<ServiceNewSubscription>
	{
		const data = {
			type: ServiceSubscriptionType.DIRECT,
			isaId: this.installedAppId(installedAppId),
			...params,
		}
		return this.client.put<ServiceNewSubscription>(`${this.locationId(locationId)}/subscriptions/${id}`, data)
	}

	public async deleteSubscription(id: string, installedAppId?: string, locationId?: string): Promise<Status> {
		// TODO - remove when API returns 200 on delete when there are no subscriptions
		try {
			await this.client.delete(
				`${this.locationId(locationId)}/subscriptions/${id}`,
				{isaId: this.installedAppId(installedAppId)})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if ( !(error.response.status === 400 &&
				error.response.data.error &&
				error.response.data.error.message === 'Installed App ID is not found') )
			{
				throw error
			}
		}
		return SuccessStatusValue
	}

	public async deleteSubscriptions(installedAppId?: string, locationId?: string): Promise<Status> {
		// TODO - remove when API returns 200 on delete when there are no subscriptions
		try {
			await this.client.delete(
				`${this.locationId(locationId)}/subscriptions`,
				{isaId: this.installedAppId(installedAppId)})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if ( !(error.response.status === 400 &&
				error.response.data.error &&
				error.response.data.error.message === 'Installed App ID is not found') )
			{
				throw error
			}
		}
		return SuccessStatusValue
	}

	/**
	 *
	 * @param capability Comma separated string of capabilities (weather, airQuality, forecast, airQualityForcast).
	 * For example, \&quot;weather,airQuality\&quot;
	 * @param locationId
	 */
	public getCapability(capability: ServiceCapabilitiesEnum, locationId?: string): Promise<ServiceCapabilityData> {
		return this.client.get<ServiceCapabilityData>(
			`${this.locationId(locationId)}/capabilities`,
			{name: capability})
	}

	/**
	 *
	 * @param capabilities Comma separated string of capabilities (weather, airQuality, forecast, airQualityForcast).
	 * For example, \&quot;weather,airQuality\&quot;
	 * @param locationId
	 */
	public getCapabilities(capabilities: ServiceCapabilitiesEnum[], locationId?: string): Promise<ServiceCapabilityData> {
		const capabilityList = capabilities.join(',')
		return this.client.get<ServiceCapabilityData>(
			`${this.locationId(locationId)}/capabilities`,
			{name: capabilityList})
	}
}
