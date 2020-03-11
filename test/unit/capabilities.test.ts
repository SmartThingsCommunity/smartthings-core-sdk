import axios from '../../__mocks__/axios'

import { NoOpAuthenticator, SmartThingsClient, Capability, CapabilitySummary, CapabilityCreate } from '../../src'
import capability1 from './data/capabilities/capability1'
import capabilitiesList from './data/capabilities/list'
import capabilitiesList1 from './data/capabilities/list1'
import capabilitiesList2 from './data/capabilities/list2'
import capabilitiesList3 from './data/capabilities/list3'
import create1 from './data/capabilities/create1'


const authenticator = new NoOpAuthenticator()
const client = new SmartThingsClient(authenticator, {})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectedRequest(path?: string, params?: any, data?: any, method = 'get'): any {
	return {
		'url': `https://api.smartthings.com/${path}`,
		'method': method,
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		'data': data,
		'params': params,
		'paramsSerializer': expect.anything(),
	}
}

describe('Capabilities',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList}))
		const response: CapabilitySummary[] = await client.capabilities.list()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities', undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list with multiple pages', async () => {
		const expectedList = [...capabilitiesList1.items, ...capabilitiesList2.items]
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList1}))
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList2}))
		const response: CapabilitySummary[] = await client.capabilities.list()

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest('capabilities', undefined))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest('capabilities?page=1&max=200'))
		expect(response).toMatchObject(expectedList)
	})

	it('list by id with one version', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList}))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list by id with one multiple version', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList3}))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList3.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capability1}))
		const response: Capability = await client.capabilities.get('namespace.colorTemperature', 1)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/namespace.colorTemperature/1'))
		expect(response).toBe(capability1)
	})

	it('create', async () => {
		const reqData: CapabilityCreate = create1
		const resData: Capability = capability1
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: resData}))
		const response: Capability = await client.capabilities.create(reqData)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities', undefined, reqData, 'post'))
		expect(response).toBe(resData)
	})
})
