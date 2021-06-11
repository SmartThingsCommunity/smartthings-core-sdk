import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_locationId_3749dfe2 as locationData,
	get_locationId_3749dfe2_deviceId_10c6404e as oneDevice,
	get_locationId_3749dfe2_deviceId_10c6404e_limit_100 as devicePage1,
	get_before_1586706273717_beforeHash_522760516_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage2,
	get_before_1586632115210_beforeHash_1616446854_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage3,
	get_before_1586451734677_beforeHash_1684222844_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage4,
	get_before_1586343545266_beforeHash_3425541790_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage5,
	get_before_1586225856303_beforeHash_1249966020_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage6,
	get_before_1586212326280_beforeHash_1673058589_limit_100_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_10c6404e as devicePage7,
	get_locationId_3749dfe2_limit_10 as limit10,
	get_locationId_3749dfe2_oldestFirst_true as oldestFirst,
	get_locationId_3749dfe2_after_1586816886525 as after,
	get_locationId_3749dfe2_before_1586816887118 as before,
	get_locationId_3749dfe2_after_1586816914302_afterHash_3867841901 as afterHash,
	get_locationId_3749dfe2_before_1586816914302_beforeHash_1829332710 as beforeHash,
	get_locationId_3d1fb8b0_limit_10_oldestFirst_true as otherLocation,
	get_locationId_3749dfe2_deviceId_c8fc80fc as device2Page1,
	get_before_1596811099116_beforeHash_342510660_limit_20_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_c8fc80fc as device2Page2,
	get_after_1596813799499_afterHash_1424849460_limit_20_oldestFirst_false_offset_0_locationId_3749dfe2_deviceId_c8fc80fc as device2Page1B,
} from './data/history/get'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')
const locationId = '3749dfe2-441e-45e6-a461-1fd3cef3dba6'
const client = new SmartThingsClient(authenticator, { locationId })

describe('History', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('All devices', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: locationData.response }))
		const response = await client.history.devices()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(locationData.request))
		expect(response.items.length).toEqual(20)
		expect(response.hasNext()).toEqual(true)
	})

	it('One device', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: oneDevice.response }))
		const response = await client.history.devices({ deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578' })
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

		const response = await client.history.devices({ deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578', limit: 100 })
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
		const response = await client.history.devices({ deviceId: '10c6404e-69cf-4456-80f4-b7995f6b3578', limit: 100 })
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
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: limit10.response }))
		await client.history.devices({ limit: 10 })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(limit10.request))
	})

	it('Oldest first', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: oldestFirst.response }))
		await client.history.devices({ oldestFirst: true })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(oldestFirst.request))
	})

	it('After', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: after.response }))
		await client.history.devices({ after: 1586816886525 })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(after.request))
	})

	it('Before', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: before.response }))
		await client.history.devices({ before: 1586816887118 })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(before.request))
	})

	it('After with hash', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: afterHash.response }))
		await client.history.devices({ after: 1586816914302, afterHash: 3867841901 })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(afterHash.request))
	})

	it('Before with hash', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: beforeHash.response }))
		await client.history.devices({ before: 1586816914302, beforeHash: 1829332710 })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(beforeHash.request))
	})

	it('Other location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: otherLocation.response }))
		await client.history.devices({ locationId: '3d1fb8b0-3d67-4453-bf82-b290034e9be8', limit: 10, oldestFirst: true })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(otherLocation.request))
	})

	it('Previous page', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page1.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page2.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: device2Page1B.response }))

		const response = await client.history.devices({ deviceId: 'c8fc80fc-6bbb-4b74-a9fa-97acc3d5fc05' })
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
