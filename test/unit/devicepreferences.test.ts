import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { DevicePreference, DevicePreferenceCreate, DevicePreferencesEndpoint, PreferenceLocalization } from '../../src/endpoint/devicepreferences'
import { LocaleReference } from '../../src/types'


const MOCK_PREFERENCE_L10N = { tag: 'localeTag' } as PreferenceLocalization
const MOCK_PREFERENCE = { preferenceId: 'preferenceId' } as DevicePreference
const MOCK_PREFERENCE_LIST = [MOCK_PREFERENCE] as DevicePreference[]
const MOCK_PREFERENCE_CREATE = { preferenceType: 'type' } as unknown as DevicePreferenceCreate
const MOCK_LOCALE_LIST = [{ tag: 'tag' }] as LocaleReference[]

describe('DevicePreferencesEndpoint', () => {
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

	describe('translations', () => {
		const localeTag = 'localeTag'

		test('create', async () => {
			postSpy.mockResolvedValueOnce(MOCK_PREFERENCE_L10N)

			const response = await devicepreferences.createTranslations(preferenceId, MOCK_PREFERENCE_L10N)

			expect(postSpy).toBeCalledWith(`${preferenceId}/i18n`, MOCK_PREFERENCE_L10N)
			expect(response).toStrictEqual(MOCK_PREFERENCE_L10N)
		})

		test('create failure', async () => {
			postSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.createTranslations(preferenceId, MOCK_PREFERENCE_L10N)

			await expect(promise).rejects.toThrow(error)
		})

		test('get', async () => {
			getSpy.mockResolvedValueOnce(MOCK_PREFERENCE_L10N)

			const response = await devicepreferences.getTranslations(preferenceId, localeTag)

			expect(getSpy).toBeCalledWith(`${preferenceId}/i18n/${localeTag}`)
			expect(response).toStrictEqual(MOCK_PREFERENCE_L10N)
		})

		test('get failure', async () => {
			getSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.getTranslations(preferenceId, localeTag)

			await expect(promise).rejects.toThrow(error)
		})

		test('list', async () => {
			getPagedItemsSpy.mockResolvedValueOnce(MOCK_LOCALE_LIST)

			const response = await devicepreferences.listTranslations(preferenceId)

			expect(getPagedItemsSpy).toBeCalledWith(`${preferenceId}/i18n`)
			expect(response).toStrictEqual(MOCK_LOCALE_LIST)
		})

		test('list failure', async () => {
			getPagedItemsSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.listTranslations(preferenceId)

			await expect(promise).rejects.toThrow(error)
		})

		test('update', async () => {
			putSpy.mockResolvedValueOnce(MOCK_PREFERENCE_L10N)

			const response = await devicepreferences.updateTranslations(preferenceId, MOCK_PREFERENCE_L10N)

			expect(putSpy).toBeCalledWith(`${preferenceId}/i18n/${MOCK_PREFERENCE_L10N.tag}`, MOCK_PREFERENCE_L10N)
			expect(response).toStrictEqual(MOCK_PREFERENCE_L10N)
		})

		test('update failure', async () => {
			putSpy.mockRejectedValueOnce(error)

			const promise = devicepreferences.updateTranslations(preferenceId, MOCK_PREFERENCE_L10N)

			await expect(promise).rejects.toThrow(error)
		})
	})
})
