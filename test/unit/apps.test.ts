import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { AppClassification, AppCreateRequest, AppCreationResponse, AppOAuthRequest, AppOAuthResponse, AppResponse, AppsEndpoint, AppType, GenerateAppOAuthRequest, GenerateAppOAuthResponse, PagedApp, SignatureType } from '../../src/endpoint/apps'


const MOCK_APP_LIST = [{ appId: 'appId' }] as PagedApp[]
const MOCK_APP = { appId: 'appId', appType: AppType.WEBHOOK_SMART_APP } as AppResponse
const MOCK_APP_CREATE = { app: {} } as AppCreationResponse
const MOCK_APP_OAUTH = { clientName: 'clientName' } as AppOAuthResponse
const MOCK_APP_OAUTH_GENERATE = { oauthClientId: 'oauthClientId' } as GenerateAppOAuthResponse

describe('AppsEndpoint', () => {
	const authenticator = new NoOpAuthenticator()
	const apps = new AppsEndpoint({ authenticator })

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get')
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems')
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post')
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put')
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('List', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_APP_LIST)
		const response = await apps.list()

		expect(getPagedItemsSpy).toBeCalledWith(undefined, {})
		expect(response).toStrictEqual(MOCK_APP_LIST)
	})

	test('List Automations', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_APP_LIST)
		const response = await apps.list({ classification: AppClassification.AUTOMATION })

		expect(getPagedItemsSpy).toBeCalledWith(undefined, { classification: 'AUTOMATION' })
		expect(response).toStrictEqual(MOCK_APP_LIST)
	})

	test('List Webhooks', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_APP_LIST)
		const response = await apps.list({ appType: AppType.WEBHOOK_SMART_APP })

		expect(getPagedItemsSpy).toBeCalledWith(undefined, { appType: 'WEBHOOK_SMART_APP' })
		expect(response).toStrictEqual(MOCK_APP_LIST)
	})

	test('List Lambda Automations', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_APP_LIST)
		const response = await apps.list({ appType: AppType.LAMBDA_SMART_APP, classification: AppClassification.AUTOMATION })

		expect(getPagedItemsSpy).toBeCalledWith(undefined, { appType: 'LAMBDA_SMART_APP', classification: 'AUTOMATION' })
		expect(response).toStrictEqual(MOCK_APP_LIST)

	})

	test('List Tags', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_APP_LIST)
		const response = await apps.list({ tag: { industry: 'energy', region: 'North America' } })

		expect(getPagedItemsSpy).toBeCalledWith(undefined, { 'tag:industry': 'energy', 'tag:region': 'North America' })
		expect(response).toStrictEqual(MOCK_APP_LIST)
	})

	test('Get', async () => {
		getSpy.mockResolvedValueOnce(MOCK_APP)
		const response = await apps.get('appName')

		expect(getSpy).toBeCalledWith('appName')
		expect(response).toStrictEqual(MOCK_APP)
	})

	test('Create', async () => {
		postSpy.mockResolvedValueOnce(MOCK_APP_CREATE)
		const createRequest = { appName: 'app' } as AppCreateRequest
		const response = await apps.create(createRequest)

		expect(postSpy).toBeCalledWith(undefined, createRequest, {})
		expect(response).toStrictEqual(MOCK_APP_CREATE)
	})

	test('Update signature type', async () => {
		putSpy.mockResolvedValueOnce({})

		await expect(apps.updateSignatureType('appId', SignatureType.ST_PADLOCK)).resolves.toBeUndefined()
		expect(putSpy).toBeCalledWith('appId/signature-type', { signatureType: 'ST_PADLOCK' })
	})

	test('Register', async () => {
		putSpy.mockResolvedValueOnce({})

		await expect(apps.register('appId')).resolves.toBeUndefined()
		expect(putSpy).toBeCalledWith('appId/register')
	})

	test('Update OAuth', async () => {
		putSpy.mockResolvedValueOnce(MOCK_APP_OAUTH)
		const oauthRequest = { redirectUris: [] } as unknown as AppOAuthRequest

		const response = await apps.updateOauth('appId', oauthRequest)

		expect(putSpy).toBeCalledWith('appId/oauth', oauthRequest)
		expect(response).toStrictEqual(MOCK_APP_OAUTH)
	})

	test('Regenerate OAuth', async () => {
		postSpy.mockResolvedValueOnce(MOCK_APP_OAUTH_GENERATE)
		const regenerateRequest = { clientName: 'clientName' } as GenerateAppOAuthRequest

		const response = await apps.regenerateOauth('appId', regenerateRequest)

		expect(postSpy).toBeCalledWith('appId/oauth/generate', regenerateRequest)
		expect(response).toStrictEqual(MOCK_APP_OAUTH_GENERATE)
	})

	test('Delete', async () => {
		deleteSpy.mockResolvedValueOnce({})

		await expect(apps.delete('appId')).resolves.toBeUndefined()
		expect(deleteSpy).toBeCalledWith('appId')
	})

	test('Delete Error', async () => {
		const error = new Error('failed')
		deleteSpy.mockRejectedValueOnce(error)

		await expect(apps.delete('appId')).rejects.toThrow(error)
	})
})
