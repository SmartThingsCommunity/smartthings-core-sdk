import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	Count,
	SmartThingsClient,
	Subscription,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/subscriptions/get_installedapps_subscriptions'
import deleteOne from './data/subscriptions/delete_installedapps_subscriptions_one'
import deleteAll from './data/subscriptions/delete_installedapps_subscriptions_all'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d'),
	{locationId: '95efee9b-6073-4871-b5ba-de6642187293', installedAppId: '5336bd07-435f-4b6c-af1d-fddba55c1c24'})

describe('Subscriptions',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: list.response}))
		const response: Subscription[] = await client.subscriptions.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('Delete one', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deleteOne.response}))
		const response: Count = await client.subscriptions.delete('eventHandler')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteOne.request))
		expect(response.count).toEqual(1)
	})

	it('Delete all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deleteAll.response}))
		const response: Count = await client.subscriptions.delete()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteAll.request))
		expect(response.count).toEqual(3)
	})

	it('Unsubscribe', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deleteOne.response}))
		const response: Count = await client.subscriptions.unsubscribe('eventHandler')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteOne.request))
		expect(response.count).toEqual(1)
	})

	it('Unsubscribe all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deleteAll.response}))
		const response: Count = await client.subscriptions.unsubscribeAll()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteAll.request))
		expect(response.count).toEqual(3)
	})
})
