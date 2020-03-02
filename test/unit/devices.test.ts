import axios from '../../__mocks__/axios'

import { NoOpAuthenticator } from '../../src/authenticator'
import { SmartThingsClient } from '../../src/st-client'
import { Device } from '../../src/endpoint/devices'
import deviceList from './data/devices/list'
import deviceList1 from './data/devices/list1'
import deviceList2 from './data/devices/list2'
import device1 from './data/devices/device1'


const authenticator = new NoOpAuthenticator()
const locationId = '2fb889a9-e163-40dd-90d7-5bf2c145af16'
const installedAppId = '0cdf204b-8a9e-4a59-b6f6-bdeb183a619f'
const config = { locationId, installedAppId }
const isaClient = new SmartThingsClient(authenticator, config)
const client = new SmartThingsClient(authenticator, {})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectedRequest(path?: string, params?: any, data?: any): any {
	return {
		'url': `https://api.smartthings.com/${path}`,
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		'data': data,
		'params': params,
		'paramsSerializer': expect.anything(),
	}
}

describe('Devices',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})
	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deviceList }))
		const response: Device[] = await client.devices.list()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('devices', {}))
		expect(response).toBe(deviceList.items)
	})

	it('list with multiple pages', async () => {
		const expectedList = [...deviceList1.items, ...deviceList2.items]
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deviceList1 }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deviceList2 }))

		const response: Device[] = await client.devices.list()

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest('devices', {}))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest('devices?page=1&max=200'))
		expect(response).toMatchObject(expectedList)
	})

	it('list for a location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deviceList }))
		const response: Device[] = await isaClient.devices.list()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('devices', { locationId }))
		expect(response).toBe(deviceList.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device1 }))
		const response: Device = await isaClient.devices.get('8cfb5b5f-1683-4459-932c-9493c63da626')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('devices/8cfb5b5f-1683-4459-932c-9493c63da626' ))
		expect(response).toBe(device1)
	})
})
