import axios from '../../__mocks__/axios'

import { NoOpAuthenticator, SmartThingsClient } from '../../src'

import { integerPreference, minimalIntegerPreference, preferencesList } from './data/devicepreferences/get'
import { buildRequest } from './helpers/utils'
import { integerPreferenceCreate } from './data/devicepreferences/post'


describe('devicepreferences', () => {
	const authenticator = new NoOpAuthenticator()
	const client = new SmartThingsClient(authenticator, {})

	const error = Error('something bad happened')

	afterEach(() => {
		axios.request.mockReset()
	})

	test('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: preferencesList }))

		const response = await client.devicePreferences.list()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences', {}))
		expect(response).toBe(preferencesList.items)
	})

	test('list with namespace', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: preferencesList }))

		const response = await client.devicePreferences.list('my-namespace')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences', { namespace: 'my-namespace'}))
		expect(response).toBe(preferencesList.items)
	})

	test('list failure', async () => {
		axios.request.mockRejectedValueOnce(error)

		const promise = client.devicePreferences.list()

		await expect(promise).rejects.toThrow(error)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences', {}))
	})

	test('get minimal', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: minimalIntegerPreference }))

		const response = await client.devicePreferences.get('my-id')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences/my-id'))
		expect(response).toBe(minimalIntegerPreference)
	})

	test('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: integerPreference }))

		const response = await client.devicePreferences.get('my-id')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences/my-id'))
		expect(response).toBe(integerPreference)
	})

	test('get failure', async () => {
		axios.request.mockRejectedValueOnce(error)

		const promise = client.devicePreferences.get('my-id')

		await expect(promise).rejects.toThrow(error)
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences/my-id'))
	})

	test('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: integerPreference }))

		const response = await client.devicePreferences.create(integerPreferenceCreate)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences', undefined, integerPreferenceCreate, 'post'))
		expect(response).toBe(integerPreference)
	})

	test('create failure', async () => {
		axios.request.mockRejectedValueOnce(error)

		const promise = client.devicePreferences.create(integerPreferenceCreate)

		await expect(promise).rejects.toThrow(error)
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences', undefined, integerPreferenceCreate, 'post'))
	})

	test('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: integerPreference }))

		const response = await client.devicePreferences.update('my-id', minimalIntegerPreference)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences/my-id', undefined, minimalIntegerPreference, 'put'))
		expect(response).toBe(integerPreference)
	})

	test('update failure', async () => {
		axios.request.mockRejectedValueOnce(error)

		const promise = client.devicePreferences.update('my-id', minimalIntegerPreference)

		await expect(promise).rejects.toThrow(error)
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('devicepreferences/my-id', undefined, minimalIntegerPreference, 'put'))
	})
})
