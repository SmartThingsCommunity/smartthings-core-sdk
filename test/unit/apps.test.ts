import axios from '../../__mocks__/axios'
import {
	App,
	AppClassification,
	AppCreationResponse,
	AppOAuth,
	AppType,
	BearerTokenAuthenticator,
	Count,
	SignatureType,
	SmartThingsClient,
	Status,
	SuccessStatusValue,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/apps/get_apps'
import listAutomations from './data/apps/get_apps_automation'
import listLambdaAutomations from './data/apps/get_apps_lambda_automations'
import listWebhooks from './data/apps/get_apps_webhook'
import listTags from './data/apps/get_apps_tags'
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
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listAutomations.response}))
		const response: App[] = await client.apps.list({classification: AppClassification.AUTOMATION})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listAutomations.request))
		expect(response).toBe(listAutomations.response.items)
	})

	it('List Automations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response}))
		const response: App[] = await client.apps.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('List Webhooks', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listWebhooks.response}))
		const response: App[] = await client.apps.list({appType: AppType.WEBHOOK_SMART_APP})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listWebhooks.request))
		expect(response).toBe(listWebhooks.response.items)
	})

	it('List Lambda Automations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listLambdaAutomations.response}))
		const response: App[] = await client.apps.list({appType: AppType.LAMBDA_SMART_APP, classification: AppClassification.AUTOMATION})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listLambdaAutomations.request))
		expect(response).toBe(listLambdaAutomations.response.items)
	})

	it('List Tags', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listTags.response}))
		const response: App[] = await client.apps.list({tag: {industry: 'energy', region: 'North America'}})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listTags.request))
		expect(response).toBe(listTags.response.items)
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
