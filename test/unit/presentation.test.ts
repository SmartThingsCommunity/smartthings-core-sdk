import axios from '../../__mocks__/axios'

import { NoOpAuthenticator, SmartThingsClient, PresentationDeviceConfig, DeviceConfigType } from '../../src'
import presentationDeviceConfiguration from './data/presentation/presentation'
import presentationDeviceConfigurationForGet from './data/presentation/presentationForGet'


const authenticator = new NoOpAuthenticator()
const client = new SmartThingsClient(authenticator, {})

const profileId = '0000-0000-0000-0000'

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

describe('Presentation',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentationDeviceConfiguration}))
		const response: PresentationDeviceConfig = await client.presentation.get(profileId)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(`presentation/types/${profileId}/deviceconfig`, undefined))
		expect(response).toBe(presentationDeviceConfiguration)
	})

	it('get with optional params', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentationDeviceConfiguration}))
		const response: PresentationDeviceConfig = await client.presentation.get(profileId, { profileId: DeviceConfigType.PROFILE })

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(`presentation/types/${profileId}/deviceconfig`, { profileId: DeviceConfigType.PROFILE }))
		expect(response).toBe(presentationDeviceConfiguration)
	})

	it('get with post', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentationDeviceConfiguration}))
		const response: PresentationDeviceConfig = await client.presentation.getOrCreate(presentationDeviceConfigurationForGet)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation/deviceconfig', undefined, presentationDeviceConfigurationForGet, 'post'))
		expect(response).toBe(presentationDeviceConfiguration)
	})

	it('create with post', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentationDeviceConfiguration}))
		const response: PresentationDeviceConfig = await client.presentation.getOrCreate(presentationDeviceConfiguration)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation/deviceconfig', undefined, presentationDeviceConfiguration, 'post'))
		expect(response).toBe(presentationDeviceConfiguration)
	})
})
