import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	ServiceCapabilitiesEnum,
	ServiceSubscriptionType,
	SmartThingsClient,
	SuccessStatusValue,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_info as info,
	get_info_explicit as explicitInfo,
	get_capabilities as capabilities,
	get_capabilities_weather as weather,
	get_capabilities_weather_forecast as forecast,
} from './data/services/get'
import {
	post_subscription as createSubscription,
	post_subscription_explicit as createSubscriptionExplicit,
	post_subscription_execution as createSubscriptionExecution,
} from './data/services/post'
import {
	delete_subscription as deleteSubscription,
	delete_subscriptions as deleteSubscriptions,
} from './data/services/delete'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'), {
		locationId: '95efee9b-6073-4871-b5ba-de6642187293',
		installedAppId: '881c4ddf-5399-4576-8ff6-df9f582e737a',
	})

describe('Services', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('Implicit location info', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: info.response }))
		const response = await client.services.getLocationServiceInfo()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(info.request))
		expect(response).toBe(info.response)
	})

	it('Explicit location info', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: explicitInfo.response }))
		const response = await client.services.getLocationServiceInfo('ea451fc7-067f-4cff-a935-f8b66db2e530')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(explicitInfo.request))
		expect(response).toBe(explicitInfo.response)
	})

	it('Get service capabilities', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilities.response }))
		const response = await client.services.getServiceCapabilities()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(capabilities.request))
		expect(response).toBe(capabilities.response.name)
	})

	it('Get weather data', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: weather.response }))
		const response = await client.services.getCapability(ServiceCapabilitiesEnum.weather)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(weather.request))
		expect(response).toBe(weather.response)
	})

	it('Get weather and forecast data', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: forecast.response }))
		const response = await client.services.getCapabilities([ServiceCapabilitiesEnum.weather, ServiceCapabilitiesEnum.forecast])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(forecast.request))
		expect(response).toBe(forecast.response)
	})

	it('Create subscription', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: createSubscription.response }))
		const response = await client.services.createSubscription({
			'capabilities': [ServiceCapabilitiesEnum.weather],
			'predicate': 'weather.temperature.value <= 12',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(createSubscription.request))
		expect(response).toBe(createSubscription.response)
	})

	it('Create subscription explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: createSubscriptionExplicit.response }))
		const response = await client.services.createSubscription({
			'capabilities': [ServiceCapabilitiesEnum.weather],
			'predicate': 'weather.temperature.value <= 12',
		}, '43357bf4-2687-4f9f-8ae6-5ba92c745cab')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(createSubscriptionExplicit.request))
		expect(response).toBe(createSubscriptionExplicit.response)
	})

	it('Create subscription execution', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: createSubscriptionExecution.response }))
		const response = await client.services.createSubscription({
			'type': ServiceSubscriptionType.EXECUTION,
			'capabilities': [ServiceCapabilitiesEnum.weather],
			'predicate': 'weather.temperature.value <= 12',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(createSubscriptionExecution.request))
		expect(response).toBe(createSubscriptionExecution.response)
	})

	it('Delete subscription', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteSubscription.response }))
		const response = await client.services.deleteSubscription('43357bf4-2687-4f9f-8ae6-5ba92c745cab')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteSubscription.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Delete subscriptions', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteSubscriptions.response }))
		const response = await client.services.deleteSubscriptions()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteSubscriptions.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	// TODO remove when this error is no longer thrown when there are no subscriptions
	it('Delete subscriptions when none', async () => {
		axios.request.mockImplementationOnce(() => Promise.reject({
			message: 'Request failed with status code 400',
			response: {
				status: 400,
				data: {
					'requestId': '00b5064d-491b-4c37-b582-ddde769f1bfc',
					'error': {
						'message': 'Installed App ID is not found',
						'status': 400,
						'code': 'ERR_BAD_REQUEST',
						'details': [],
					},
				},
			},
		}))
		const response = await client.services.deleteSubscriptions()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteSubscriptions.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
