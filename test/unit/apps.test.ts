import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	App,
	AppCreationResponse,
	Status,
	SuccessStatusValue, AppOAuth, Count, SignatureType,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/apps/get_apps'
import get from './data/apps/get_apps_sdktest-234-1582991474199'
import post from './data/apps/post_apps_requireConfirmation=false&signatureType=APP_RSA'
import putSignature from './data/apps/put_apps_a01c0ba4-3ac2-4a5c-9628-c43e394c1ea2_signature-type'
import putOAuth from './data/apps/put_apps_sdktest-234-1582991474199_oauth'
import oauthGenerate from './data/apps/post_apps_sdktest-234-1582991474199_oauth_generate'
import deleteApp from './data/apps/delete_apps_sdktest-234-1582991474199'


const client = new SmartThingsClient(new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d'))

describe('Apps',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response}))
		const response: App[] = await client.apps.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('Get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: App = await client.apps.get('sdktest-234-1582991474199')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('Create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: post.response }))
		const response: AppCreationResponse = await client.apps.create(post.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(post.request))
		expect(response).toBe(post.response)
	})

	it('Update signature type', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putSignature.response }))
		const response: Status = await client.apps.updateSignatureType('a01c0ba4-3ac2-4a5c-9628-c43e394c1ea2', SignatureType.ST_PADLOCK)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(putSignature.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('Update OAuth', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putOAuth.response }))
		const response: AppOAuth = await client.apps.updateOauth('sdktest-234-1582991474199', putOAuth.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(putOAuth.request))
		expect(response).toBe(putOAuth.response)
	})

	it('Regenerate OAuth', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: oauthGenerate.response }))
		const response: AppOAuth = await client.apps.regenerateOauth('sdktest-234-1582991474199', oauthGenerate.request.data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(oauthGenerate.request))
		expect(response).toBe(oauthGenerate.response)
	})

	it('Delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteApp.response }))
		const response: Count = await client.apps.delete('sdktest-234-1582991474199')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteApp.request))
		expect(response).toEqual({count: 1})
	})
})
