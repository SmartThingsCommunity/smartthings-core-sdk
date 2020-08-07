import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
} from '../../src'
import {expectedRequest} from './helpers/utils'

import locationData from './data/history/get_locationId=3749dfe2'
import oneDevice from './data/history/get_locationId=3749dfe2&deviceId=10c6404e'
import devicePage1 from './data/history/get_locationId=3749dfe2&deviceId=10c6404e&limit=100'
import devicePage2 from './data/history/get?before=1586706273717&beforeHash=522760516&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import devicePage3 from './data/history/get?before=1586632115210&beforeHash=1616446854&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import devicePage4 from './data/history/get?before=1586451734677&beforeHash=1684222844&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import devicePage5 from './data/history/get?before=1586343545266&beforeHash=3425541790&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import devicePage6 from './data/history/get?before=1586225856303&beforeHash=1249966020&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import devicePage7 from './data/history/get?before=1586212326280&beforeHash=1673058589&limit=100&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=10c6404e'
import limit10 from './data/history/get_locationId=3749dfe2&limit=10'
import oldestFirst from './data/history/get_locationId=3749dfe2&oldestFirst=true'
import after from './data/history/get_locationId=3749dfe2&after=1586816886525'
import before from './data/history/get_locationId=3749dfe2&before=1586816887118'
import afterHash from './data/history/get_locationId=3749dfe2&after=1586816914302&afterHash=3867841901'
import beforeHash from './data/history/get_locationId=3749dfe2&before=1586816914302&beforeHash=1829332710'
import otherLocation from './data/history/get_locationId=3d1fb8b0&limit=10&oldestFirst=true'
import device2Page1 from './data/history/get_locationId=3749dfe2&deviceId=c8fc80fc'
import device2Page2 from './data/history/get?before=1596811099116&beforeHash=342510660&limit=20&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=c8fc80fc'
import device2Page1B from './data/history/get?after=1596813799499&afterHash=1424849460&limit=20&oldestFirst=false&offset=0&locationId=3749dfe2&deviceId=c8fc80fc'


const authenticator = new BearerTokenAuthenticator('0bd82516-23d1-4a86-9c89-75a2369ab70e')
const locationId ='3749dfe2-441e-45e6-a461-1fd3cef3dba6'
const client = new SmartThingsClient(authenticator, {locationId})


describe('History',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('All devices', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: locationData.response}))
		const response = await client.history.devices()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(locationData.request))
		expect(response.items.length).toEqual(20)
		expect(response.hasNext()).toEqual(true)
	})

	it('One device', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: oneDevice.response}))
		const response = await client.history.devices({deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578'})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(oneDevice.request))
		expect(response.items.length).toEqual(20)
		expect(response.hasNext()).toEqual(true)
	})

	it('Explicit paging', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage1.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage2.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage3.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage4.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage5.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage6.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage7.response }))

		const response = await client.history.devices({deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578', limit: 100})
		await response.next()
		await response.next()
		await response.next()
		await response.next()
		await response.next()
		await response.next()

		expect(axios.request).toHaveBeenCalledTimes(7)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(devicePage1.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(devicePage2.request))
		expect(axios.request).toHaveBeenNthCalledWith(3, expectedRequest(devicePage3.request))
		expect(axios.request).toHaveBeenNthCalledWith(4, expectedRequest(devicePage4.request))
		expect(axios.request).toHaveBeenNthCalledWith(5, expectedRequest(devicePage5.request))
		expect(axios.request).toHaveBeenNthCalledWith(6, expectedRequest(devicePage6.request))
		expect(axios.request).toHaveBeenNthCalledWith(7, expectedRequest(devicePage7.request))
		expect(response.items.length).toEqual(0)
		expect(response.hasNext()).toEqual(false)
	})

	it('Asynchronous iteration', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage1.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage2.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage3.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage4.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage5.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage6.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: devicePage7.response }))

		const expectedItems = [
			...devicePage1.response.items,
			...devicePage2.response.items,
			...devicePage3.response.items,
			...devicePage4.response.items,
			...devicePage5.response.items,
			...devicePage6.response.items,
			...devicePage7.response.items,
		]
		const response = await client.history.devices({deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578', limit: 100})
		let count = 0
		for await (const x of response) {
			expect(x).toBe(expectedItems[count])
			count++
		}

		expect(axios.request).toHaveBeenCalledTimes(7)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(devicePage1.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(devicePage2.request))
		expect(axios.request).toHaveBeenNthCalledWith(3, expectedRequest(devicePage3.request))
		expect(axios.request).toHaveBeenNthCalledWith(4, expectedRequest(devicePage4.request))
		expect(axios.request).toHaveBeenNthCalledWith(5, expectedRequest(devicePage5.request))
		expect(axios.request).toHaveBeenNthCalledWith(6, expectedRequest(devicePage6.request))
		expect(axios.request).toHaveBeenNthCalledWith(7, expectedRequest(devicePage7.request))
		expect(count).toEqual(expectedItems.length)
	})

	it('Limit 10', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: limit10.response}))
		await client.history.devices({limit: 10})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(limit10.request))
	})

	it('Oldest first', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: oldestFirst.response}))
		await client.history.devices({oldestFirst: true})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(oldestFirst.request))
	})

	it('After', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: after.response}))
		await client.history.devices({after: 1586816886525})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(after.request))
	})

	it('Before', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: before.response}))
		await client.history.devices({before: 1586816887118})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(before.request))
	})

	it('After with hash', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: afterHash.response}))
		await client.history.devices({after: 1586816914302, afterHash: 3867841901})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(afterHash.request))
	})

	it('Before with hash', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: beforeHash.response}))
		await client.history.devices({before: 1586816914302, beforeHash: 1829332710})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(beforeHash.request))
	})

	it('Other location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: otherLocation.response}))
		await client.history.devices({locationId: '3d1fb8b0-3d67-4453-bf82-b290034e9be8', limit: 10, oldestFirst: true})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(otherLocation.request))
	})

	it('Previous page', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page1.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page2.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page1B.response }))

		const response = await client.history.devices({deviceId: 'c8fc80fc-6bbb-4b74-a9fa-97acc3d5fc05'})
		const firstItem = response.items[0]

		await response.next()

		await response.previous()
		expect(response.items[0]).toStrictEqual(firstItem)

		expect(axios.request).toHaveBeenCalledTimes(3)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(device2Page1.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(device2Page2.request))
		expect(axios.request).toHaveBeenNthCalledWith(3, expectedRequest(device2Page1B.request))
	})


})
