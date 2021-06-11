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
import { expectedRequest } from './helpers/utils'
import { delete_apps_sdktest_234_1582991474199 as deleteApp } from './data/apps/delete'
import {
	get_apps as list,
	get_apps_automation as listAutomations,
	get_apps_lambda_automations as listLambdaAutomations,
	get_apps_sdktest_234_1582991474199 as get,
	get_apps_tags as listTags,
	get_apps_webhook as listWebhooks,
} from './data/apps/get'
import {
	post_apps_requireConfirmation_false_signatureType_APP_RSA as post,
	post_apps_sdktest_234_1582991474199_oauth_generate as oauthGenerate,
} from './data/apps/post'
import {
	put_apps_a01c0ba4_3ac2_4a5c_9628_c43e394c1ea2_signature_type as putSignature,
	put_apps_sdktest_234_1582991474199_oauth as putOAuth,
} from './data/apps/put'


const client = new SmartThingsClient(new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))

describe('Apps', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listAutomations.response }))
		const response: App[] = await client.apps.list({ classification: AppClassification.AUTOMATION })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listAutomations.request))
		expect(response).toBe(listAutomations.response.items)
	})

	it('List Automations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: App[] = await client.apps.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('List Webhooks', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listWebhooks.response }))
		const response: App[] = await client.apps.list({ appType: AppType.WEBHOOK_SMART_APP })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listWebhooks.request))
		expect(response).toBe(listWebhooks.response.items)
	})

	it('List Lambda Automations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listLambdaAutomations.response }))
		const response: App[] = await client.apps.list({ appType: AppType.LAMBDA_SMART_APP, classification: AppClassification.AUTOMATION })
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listLambdaAutomations.request))
		expect(response).toBe(listLambdaAutomations.response.items)
	})

	it('List Tags', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listTags.response }))
		const response: App[] = await client.apps.list({ tag: { industry: 'energy', region: 'North America' } })
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
		expect(response).toEqual({ count: 1 })
	})
})
