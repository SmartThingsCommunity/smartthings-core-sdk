import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Subscription,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/subscriptions/get_installedapps_5336bd07-435f-4b6c-af1d-fddba55c1c24_subscriptions'


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
})
