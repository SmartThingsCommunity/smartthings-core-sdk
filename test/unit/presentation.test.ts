import axios from '../../__mocks__/axios'

import {NoOpAuthenticator, SmartThingsClient, PresentationDeviceConfig, PresentationDevicePresentation} from '../../src'
import deviceConfig from './data/presentation/device-config'
import presentation from './data/presentation/presentation'


const authenticator = new NoOpAuthenticator()
const client = new SmartThingsClient(authenticator, {})

const profileId = '0000-0000-0000-0000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectedRequest(path?: string, params?: any, data?: any, method = 'get'): any {
	return {
		url: `https://api.smartthings.com/${path}`,
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		data: data,
		params: params,
		paramsSerializer: expect.anything(),
	}
}

describe('Presentation',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('generate', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deviceConfig}))
		const response: PresentationDeviceConfig = await client.presentation.generate(profileId)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(`presentation/types/${profileId}/deviceconfig`, undefined))
		expect(response).toBe(deviceConfig)
	})

	it('generate with optional params', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deviceConfig}))
		const response: PresentationDeviceConfig = await client.presentation.generate(profileId,
			{ typeIntegration: 'dth' })

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(`presentation/types/${profileId}/deviceconfig`,
			{ typeIntegration: 'dth' }))
		expect(response).toBe(deviceConfig)
	})

	it('get config', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deviceConfig}))
		const response: PresentationDeviceConfig = await client.presentation.get('d8469d5c-3ca2-4601-9f21-2b7a0ccd44a5')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation/deviceconfig', {
			presentationId: 'd8469d5c-3ca2-4601-9f21-2b7a0ccd44a5' }))
		expect(response).toBe(deviceConfig)
	})

	it('get config with manufacturer', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deviceConfig}))
		const response: PresentationDeviceConfig = await client.presentation.get('d8469d5c-3ca2-4601-9f21-2b7a0ccd44a5', 'aXyz1')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation/deviceconfig', {
			presentationId: 'd8469d5c-3ca2-4601-9f21-2b7a0ccd44a5', manufacturerName: 'aXyz1' }))
		expect(response).toBe(deviceConfig)
	})

	it('get presentation', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentation}))
		const response: PresentationDevicePresentation = await client.presentation.getPresentation('d8469d5c-3ca2-4601-9f21-2b7a0ccd44a5')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation', {
			presentationId: 'd8469d5c-3ca2-4601-9f21-2b7a0ccd44a5' }))
		expect(response).toBe(presentation)
	})

	it('get presentation with manufacturer', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: presentation}))
		const response: PresentationDevicePresentation = await client.presentation.getPresentation('d8469d5c-3ca2-4601-9f21-2b7a0ccd44a5', 'aXyz1')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation', {
			presentationId: 'd8469d5c-3ca2-4601-9f21-2b7a0ccd44a5', manufacturerName: 'aXyz1' }))
		expect(response).toBe(presentation)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: deviceConfig}))
		const response: PresentationDeviceConfig = await client.presentation.create(deviceConfig)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('presentation/deviceconfig',
			undefined, deviceConfig, 'post'))
		expect(response).toBe(deviceConfig)
	})
})
