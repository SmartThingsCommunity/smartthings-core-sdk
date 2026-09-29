import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import {
	GenerateSmartAppOAuthRequest,
	GenerateSmartAppOAuthResponse,
	PagedSmartApp,
	SmartAppCreateRequest,
	SmartAppCreationResponse,
	SmartAppOAuthRequest,
	SmartAppOAuthResponse,
	SmartAppResponse,
	SmartAppsEndpoint,
} from '../../src/endpoint/smartapps'


const mockAppList = [{ appId: 'appId' }] as PagedSmartApp[]
const mockApp = { appId: 'appId', appType: 'API_ONLY' } as SmartAppResponse
const mockAppCreate = { app: {} } as SmartAppCreationResponse
const mockAppOAuth = { clientName: 'clientName' } as SmartAppOAuthResponse
const mockAppOAuthGenerate = { oauthClientId: 'oauthClientId' } as GenerateSmartAppOAuthResponse

describe('SmartAppsEndpoint', () => {
	const authenticator = new NoOpAuthenticator()
	const apps = new SmartAppsEndpoint({ authenticator, urlProvider: { baseURL: 'https://example.com/baseURL' } })

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get')
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems')
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post')
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put')
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('List', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list()

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, {})
		expect(response).toStrictEqual(mockAppList)
	})

	test('List Automations', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ classification: 'AUTOMATION' })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { classification: 'AUTOMATION' })
		expect(response).toStrictEqual(mockAppList)
	})

	test('List Webhooks', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ appType: 'WEBHOOK_SMART_APP' })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { appType: 'WEBHOOK_SMART_APP' })
		expect(response).toStrictEqual(mockAppList)
	})

	test('List Lambda Automations', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ appType: 'LAMBDA_SMART_APP', classification: 'AUTOMATION' })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { appType: 'LAMBDA_SMART_APP', classification: 'AUTOMATION' })
		expect(response).toStrictEqual(mockAppList)

	})

	test('List with accountId', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ accountId: 'accountId' })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { accountId: 'accountId' })
		expect(response).toStrictEqual(mockAppList)
	})

	test('List with accountId combined with other options', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({
			accountId: 'accountId',
			appType: 'API_ONLY',
			classification: 'SERVICE',
		})

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, {
			accountId: 'accountId',
			appType: 'API_ONLY',
			classification: 'SERVICE',
		})
		expect(response).toStrictEqual(mockAppList)
	})

	test.each([undefined, ''])('List omits falsy accountId %p', async accountId => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ accountId })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, {})
		expect(response).toStrictEqual(mockAppList)
	})

	test('List Tags', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(mockAppList)
		const response = await apps.list({ tag: { industry: 'energy', region: 'North America' } })

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { 'tag:industry': 'energy', 'tag:region': 'North America' })
		expect(response).toStrictEqual(mockAppList)
	})

	test('Get', async () => {
		getSpy.mockResolvedValueOnce(mockApp)
		const response = await apps.get('appName')

		expect(getSpy).toHaveBeenCalledWith('appName')
		expect(response).toStrictEqual(mockApp)
	})

	test('Create passes accountId as a query parameter', async () => {
		postSpy.mockResolvedValueOnce(mockAppCreate)
		const createRequest = { appName: 'app' } as SmartAppCreateRequest
		const response = await apps.create(createRequest, 'accountId')

		expect(postSpy).toHaveBeenCalledWith(undefined, createRequest, { accountId: 'accountId' })
		expect(response).toStrictEqual(mockAppCreate)
	})

	test('Create passes accountId in the body through unchanged', async () => {
		postSpy.mockResolvedValueOnce(mockAppCreate)
		const createRequest = { appName: 'app' } as SmartAppCreateRequest
		const response = await apps.create(createRequest, 'paramAccountId')

		expect(postSpy).toHaveBeenCalledWith(undefined, createRequest, { accountId: 'paramAccountId' })
		expect(response).toStrictEqual(mockAppCreate)
	})

	test('Register', async () => {
		putSpy.mockResolvedValueOnce({})

		await expect(apps.register('appId')).resolves.toBeUndefined()
		expect(putSpy).toHaveBeenCalledWith('appId/register', {})
	})

	test('Update OAuth', async () => {
		putSpy.mockResolvedValueOnce(mockAppOAuth)
		const oauthRequest = { redirectUris: [] } as unknown as SmartAppOAuthRequest

		const response = await apps.updateOauth('appId', oauthRequest)

		expect(putSpy).toHaveBeenCalledWith('appId/oauth', oauthRequest)
		expect(response).toStrictEqual(mockAppOAuth)
	})

	test('Regenerate OAuth', async () => {
		postSpy.mockResolvedValueOnce(mockAppOAuthGenerate)
		const regenerateRequest = { clientName: 'clientName' } as GenerateSmartAppOAuthRequest

		const response = await apps.regenerateOauth('appId', regenerateRequest)

		expect(postSpy).toHaveBeenCalledWith('appId/oauth/generate', regenerateRequest)
		expect(response).toStrictEqual(mockAppOAuthGenerate)
	})

	test('Delete', async () => {
		deleteSpy.mockResolvedValueOnce({})

		await expect(apps.delete('appId')).resolves.toBeUndefined()
		expect(deleteSpy).toHaveBeenCalledWith('appId')
	})

	test('Delete Error', async () => {
		const error = new Error('failed')
		deleteSpy.mockRejectedValueOnce(error)

		await expect(apps.delete('appId')).rejects.toThrow(error)
	})
})
