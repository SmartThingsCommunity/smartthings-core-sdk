import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	Count,
	SmartThingsClient,
	Subscription,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_installedapps_subscriptions as list,
} from './data/subscriptions/get'
import {
	post_installedapps_subscriptions as create,
} from './data/subscriptions/post'
import {
	delete_installedapps_subscriptions_one as deleteOne,
	delete_installedapps_subscriptions_all as deleteAll,
} from './data/subscriptions/delete'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
	{ locationId: '95efee9b-6073-4871-b5ba-de6642187293', installedAppId: '5336bd07-435f-4b6c-af1d-fddba55c1c24' })

describe('Subscriptions', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: Subscription[] = await client.subscriptions.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('Delete one', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteOne.response }))
		const response: Count = await client.subscriptions.delete('eventHandler')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteOne.request))
		expect(response.count).toEqual(1)
	})

	it('Delete all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteAll.response }))
		const response: Count = await client.subscriptions.delete()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteAll.request))
		expect(response.count).toEqual(3)
	})

	it('Unsubscribe', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteOne.response }))
		const response: Count = await client.subscriptions.unsubscribe('eventHandler')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteOne.request))
		expect(response.count).toEqual(1)
	})

	it('Unsubscribe all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteAll.response }))
		const response: Count = await client.subscriptions.unsubscribeAll()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteAll.request))
		expect(response.count).toEqual(3)
	})

	it('Create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: Subscription = await client.subscriptions.create(create.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})
})
