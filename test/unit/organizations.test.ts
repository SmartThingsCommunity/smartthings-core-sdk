import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	OrganizationResponse,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_organizations as list,
	get_an_organization as get,
} from './data/organizations/get'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')
const client = new SmartThingsClient(authenticator)

describe('Organizations', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: list.response}))
		const response: OrganizationResponse[] = await client.organizations.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('explicit get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: get.response}))
		const response: OrganizationResponse = await client.organizations.get('00000000-0000-0000-0000-000000000000')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})
})
