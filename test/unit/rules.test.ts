import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Rule,
	Status,
	SuccessStatusValue,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/rules/get_rules_locationId=95efee9b-6073-4871-b5ba-de6642187293'
import get from './data/rules/get_rules_dcaa574b-9f2f-4082-a1ed-81b265c59185'
import create from './data/rules/post_rules_locationId=95efee9b-6073-4871-b5ba-de6642187293'
import update from './data/rules/put_rules_dcaa574b-9f2f-4082-a1ed-81b265c59185'
import execute from './data/rules/post_rules_execute_437f4243-389a-4299-b5ed-059edbf08b16'
import deleteRule from './data/rules/delete_rules_dcaa574b-9f2f-4082-a1ed-81b265c59185'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
	{locationId: '95efee9b-6073-4871-b5ba-de6642187293'})

describe('Rules',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response}))
		const response: Rule[] = await client.rules.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('Get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: Rule = await client.rules.get('dcaa574b-9f2f-4082-a1ed-81b265c59185')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('Create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: Rule = await client.rules.create(create.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('Update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: Rule = await client.rules.update('dcaa574b-9f2f-4082-a1ed-81b265c59185', update.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('Execute', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: execute.response }))
		const response: Status = await client.rules.execute('437f4243-389a-4299-b5ed-059edbf08b16')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(execute.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteRule.response }))
		const response: Status = await client.rules.delete('dcaa574b-9f2f-4082-a1ed-81b265c59185')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteRule.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
