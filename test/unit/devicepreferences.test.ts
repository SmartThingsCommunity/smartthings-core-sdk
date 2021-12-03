import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { DevicePreference, DevicePreferenceCreate, DevicePreferencesEndpoint, PreferenceLocalization } from '../../src/endpoint/devicepreferences'


jest.mock('../../src/endpoint-client')

const MOCK_PREFERENCE_L10N = {} as PreferenceLocalization
const MOCK_PREFERENCE_LIST = [] as DevicePreference[]
const MOCK_PREFERENCE = {} as DevicePreference
const MOCK_PREFERENCE_CREATE = {} as DevicePreferenceCreate

describe('devicepreferences', () => {
	const authenticator = new NoOpAuthenticator()
	const devicepreferences = new DevicePreferencesEndpoint({ authenticator })

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get')
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems')
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post')
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put')

	const error = Error('something bad happened')
	const preferenceId = 'preferenceId'

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('list', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_PREFERENCE_LIST)

		const response = await devicepreferences.list()

		expect(response).toStrictEqual(MOCK_PREFERENCE_LIST)
	})

	test('list with namespace', async () => {
		const namespace = 'namespace'
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_PREFERENCE_LIST)

		const response = await devicepreferences.list(namespace)

		expect(getPagedItemsSpy).toBeCalledWith('', expect.objectContaining({ namespace }))
		expect(response).toStrictEqual(MOCK_PREFERENCE_LIST)
	})

	test('list failure', async () => {
		getPagedItemsSpy.mockRejectedValueOnce(error)

		const promise = devicepreferences.list()

		await expect(promise).rejects.toThrow(error)
	})

	test('get', async () => {
		getSpy.mockResolvedValueOnce(MOCK_PREFERENCE)

		const response = await devicepreferences.get(preferenceId)

		expect(getSpy).toBeCalledWith(preferenceId)
		expect(response).toStrictEqual(MOCK_PREFERENCE)
	})

	test('get failure', async () => {
		getSpy.mockRejectedValueOnce(error)

		const promise = devicepreferences.get(preferenceId)

		await expect(promise).rejects.toThrow(error)
	})

	test('create', async () => {
		postSpy.mockResolvedValueOnce(MOCK_PREFERENCE)

		const response = await devicepreferences.create(MOCK_PREFERENCE_CREATE)

		expect(postSpy).toBeCalledWith(undefined, MOCK_PREFERENCE_CREATE)
		expect(response).toStrictEqual(MOCK_PREFERENCE)
	})

	test('create failure', async () => {
		postSpy.mockRejectedValueOnce(error)

		const promise = devicepreferences.create(MOCK_PREFERENCE_CREATE)

		await expect(promise).rejects.toThrow(error)
	})

	test('update', async () => {
		putSpy.mockResolvedValueOnce(MOCK_PREFERENCE)

		const response = await devicepreferences.update(preferenceId, MOCK_PREFERENCE)

		expect(putSpy).toBeCalledWith(preferenceId, MOCK_PREFERENCE)
		expect(response).toStrictEqual(MOCK_PREFERENCE)
	})

	test('update failure', async () => {
		putSpy.mockRejectedValueOnce(error)

		const promise = devicepreferences.update(preferenceId, MOCK_PREFERENCE)

		await expect(promise).rejects.toThrow(error)
	})

	describe('localizations', () => {
		const localeTag = 'localeTag'

		test('create', async () => {
			postSpy.mockResolvedValueOnce(MOCK_PREFERENCE_L10N)

			const response = await devicepreferences.createLocalization(preferenceId, MOCK_PREFERENCE_L10N)

			expect(postSpy).toBeCalledWith(`${preferenceId}/i18n`, MOCK_PREFERENCE_L10N)
			expect(response).toStrictEqual(MOCK_PREFERENCE)
		})

		test('create failure', async () => {
			postSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.createLocalization(preferenceId, MOCK_PREFERENCE_L10N)

			await expect(promise).rejects.toThrow(error)
		})

		test('get', async () => {
			getSpy.mockResolvedValueOnce(MOCK_PREFERENCE_L10N)

			const response = await devicepreferences.getLocalization(preferenceId, localeTag)

			expect(getSpy).toBeCalledWith(`${preferenceId}/i18n/${localeTag}`)
			expect(response).toStrictEqual(MOCK_PREFERENCE_L10N)
		})

		test('get failure', async () => {
			getSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.getLocalization(preferenceId, localeTag)

			await expect(promise).rejects.toThrow(error)
		})
	})
})
