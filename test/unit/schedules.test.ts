import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	Schedule,
	SmartThingsClient,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import postDaily from './data/schedules/post_daily'
import postDailySimple from './data/schedules/post_daily_simple'
import postDailyDate from './data/schedules/post_daily_date'
import getDailyLocation from './data/schedules/get_daily_location'
import postDailyLocation from './data/schedules/post_daily_location'
import postOnce from './data/schedules/post_once'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d'),
	{locationId: '0bcbe542-d340-42a9-b00a-a2067170810e', installedAppId: '39d84b7a-edf8-4213-b256-122d90a94b3e'})

describe('Schedules',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('Run daily ISO', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: postDaily.response}))
		const response: Schedule = await client.schedules.runDaily('onSchedule', '2020-02-08T16:35:00.000-0800', 'PST')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(postDaily.request))
		expect(response).toBe(postDaily.response)
	})

	it('Run daily simple', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: postDailySimple.response}))
		const response: Schedule = await client.schedules.runDaily('onSchedule', '9:45', 'PST')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(postDailySimple.request))
		expect(response).toBe(postDailySimple.response)
	})

	it('Run daily date', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: postDailyDate.response}))
		const date: Date = new Date(Date.parse('04 Apr 2020 14:30:00 GMT'))
		const response: Schedule = await client.schedules.runDaily('onSchedule', date)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(postDailyDate.request))
		expect(response).toBe(postDailyDate.response)
	})

	it('Run daily location', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: getDailyLocation.response}))
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: postDailyLocation.response}))
		const response: Schedule = await client.schedules.runDaily('onSchedule', '2020-02-08T16:35:00.000-0800')
		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(getDailyLocation.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(postDailyLocation.request))
		expect(response).toBe(postDailyLocation.response)
	})

	it('Run once time', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: postOnce.response}))
		const response: Schedule = await client.schedules.runOnce('onOnce', 1584891000000)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(postOnce.request))
		expect(response).toBe(postOnce.response)
	})

	it('Run once Date', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: postOnce.response}))
		const response: Schedule = await client.schedules.runOnce('onOnce', new Date(1584891000000))
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(postOnce.request))
		expect(response).toBe(postOnce.response)
	})

})
