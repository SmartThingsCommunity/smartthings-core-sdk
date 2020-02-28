import axios from '../../__mocks__/axios'

import { NoOpAuthenticator } from '../../src/authenticator'
import { SmartThingsRESTClient } from '../../src/st-rest-client'
import { App, AppCreationResponse, AppRequest } from '../../src/endpoint/apps'
import appList from './data/apps/list'
import app1 from './data/apps/app1'
import create1 from './data/apps/create1'


const authenticator = new NoOpAuthenticator()
const locationId = '2fb889a9-e163-40dd-90d7-5bf2c145af16'
const installedAppId = '0cdf204b-8a9e-4a59-b6f6-bdeb183a619f'
const config = { locationId, installedAppId }
const client = new SmartThingsRESTClient(authenticator, config)


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

describe('Apps',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		const data = appList
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data }))
		const response: App[] = await client.apps.list()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('apps'))
		expect(response).toBe(data.items)
	})

	it('get', async () => {
		const data = app1
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data }))
		const response: App = await client.apps.get('91e13c71-4321-4fe7-a5ad-bb4f80967ad3')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('apps/91e13c71-4321-4fe7-a5ad-bb4f80967ad3'))
		expect(response).toBe(data)
	})

	it('create', async () => {
		const reqData: AppRequest = create1
		const resData: App = app1
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: resData }))
		const response: AppCreationResponse = await client.apps.create(reqData)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('apps',
			{ requireConfirmation: 'false', signatureType: 'ST_PADLOCK' },
			reqData, 'post'))
		expect(response).toBe(resData)
	})
})
