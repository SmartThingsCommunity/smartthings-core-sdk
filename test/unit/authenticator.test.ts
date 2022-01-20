import axios from '../../__mocks__/axios'
import { MutexInterface } from 'async-mutex'

import {
	AuthData,
	RefreshData,
	NoOpAuthenticator,
	BearerTokenAuthenticator,
	RefreshTokenAuthenticator,
	RefreshTokenStore,
	SequentialRefreshTokenAuthenticator,
} from '../../src/authenticator'
import { defaultSmartThingsURLProvider } from '../../src/endpoint-client'


class TokenStore implements RefreshTokenStore {
	public authData?: AuthData
	getRefreshData(): Promise<RefreshData> {
		return Promise.resolve({ refreshToken: 'xxx', clientId: 'aaa', clientSecret: 'bbb' })
	}
	putAuthData (data: AuthData): Promise<void> {
		this.authData = data
		return Promise.resolve()
	}
}
describe('authenticators', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const config = { url: 'https://api.smartthings.com', headers: { Test: 'test' } }

	describe('NoOpAuthenticator', () => {
		test('authenticate returns config unchanged', async () => {
			const authenticator = new NoOpAuthenticator()
			const data = await authenticator.authenticate(config)

			expect(data).toBe(config)
		})

		test('authenticateGeneric returns empty string for token', async () => {
			const authenticator = new NoOpAuthenticator()
			const token = await authenticator.authenticateGeneric()

			expect(token).toBe('')
		})
	})

	describe('BearerTokenAuthenticator', () => {
		test('authenticate adds header with specified token', async () => {
			const authenticator = new BearerTokenAuthenticator('a-bearer-token')
			const data = await authenticator.authenticate(config)

			expect(data.url).toBe(config.url)
			expect(data.headers?.Authorization).toBe('Bearer a-bearer-token')
			expect(data.headers?.Test).toBe('test')
		})

		test('authenticateGeneric returns specified token', async () => {
			const authenticator = new BearerTokenAuthenticator('a-bearer-token')
			const token = await authenticator.authenticateGeneric()

			expect(token).toBe('a-bearer-token')
		})
	})

	describe('RefreshTokenAuthenticator', () => {
		test('authenticate adds header with specified token', async () => {
			const tokenStore = new TokenStore()
			const authenticator = new RefreshTokenAuthenticator('a-refreshable-bearer-token', tokenStore)
			const data = await authenticator.authenticate(config)

			expect(data.url).toBe(config.url)
			expect(data.headers?.Authorization).toBe('Bearer a-refreshable-bearer-token')
		})

		test('refresh updates token', async () => {
			axios.request.mockResolvedValueOnce({
				status: 200,
				data: {
					'access_token': 'the-access-token',
					'refresh_token': 'the-refresh-token',
				},
			})

			const tokenStore = new TokenStore()
			const authenticator = new RefreshTokenAuthenticator('a-refreshable-bearer-token', tokenStore)
			const endpointConfig = { urlProvider: defaultSmartThingsURLProvider, authenticator }
			await authenticator.refresh(config, endpointConfig)

			expect(axios.request).toHaveBeenCalledTimes(1)
			expect(axios.request).toHaveBeenCalledWith({
				'url': 'https://auth-global.api.smartthings.com/oauth/token',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic YWFhOmJiYg==',
					'Accept': 'application/json',
				},
				'data': 'grant_type=refresh_token&client_id=aaa&refresh_token=xxx',
			})
			expect(tokenStore.authData?.authToken).toBe('the-access-token')
			expect(tokenStore.authData?.refreshToken).toBe('the-refresh-token')
		})

		test('refresh rejects promise on failure', async () => {
			axios.request.mockResolvedValueOnce({
				status: 401,
				data: 'Authorization failed',
			})

			const tokenStore = new TokenStore()
			const authenticator = new RefreshTokenAuthenticator('a-refreshable-bearer-token', tokenStore)
			const endpointConfig = { urlProvider: defaultSmartThingsURLProvider, authenticator }
			let message
			try {
				await authenticator.refresh(config, endpointConfig)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				message = error.message
			}
			expect(axios.request).toHaveBeenCalledTimes(1)
			expect(message).toBe('error 401 refreshing token, with message Authorization failed')
		})
	})

	describe('SequentialRefreshTokenAuthenticator', () => {
		const tokenStore = new TokenStore()
		const releaseMock = jest.fn()
		const acquireMock = (jest.fn() as jest.Mock<Promise<MutexInterface.Releaser>, []>)
			.mockResolvedValue(releaseMock)
		const mutex = { acquire: acquireMock } as unknown as MutexInterface
		const authenticator = new SequentialRefreshTokenAuthenticator('a-bearer-token', tokenStore, mutex)

		test('authenticate adds header with specified token', async () => {
			const data = await authenticator.authenticate(config)

			expect(data.url).toBe(config.url)
			expect(data.headers?.Authorization).toBe('Bearer a-bearer-token')
		})

		describe('refresh', () => {
			axios.request.mockResolvedValue({
				status: 200,
				data: {
					'access_token': 'the-access-token',
					'refresh_token': 'the-refresh-token',
				},
			})

			const endpointConfig = { urlProvider: defaultSmartThingsURLProvider, authenticator }

			it('updates token', async () => {
				await authenticator.refresh(config, endpointConfig)

				expect(axios.request).toHaveBeenCalledTimes(1)
				expect(axios.request).toHaveBeenCalledWith({
					'url': 'https://auth-global.api.smartthings.com/oauth/token',
					'method': 'POST',
					'headers': {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic YWFhOmJiYg==',
						'Accept': 'application/json',
					},
					'data': 'grant_type=refresh_token&client_id=aaa&refresh_token=xxx',
				})
				expect(tokenStore.authData?.authToken).toBe('the-access-token')
				expect(tokenStore.authData?.refreshToken).toBe('the-refresh-token')
			})

			it('works on request with no existing headers', async () => {
				const configWithoutHeaders = { url: 'https://api.smartthings.com' }
				await authenticator.refresh(configWithoutHeaders, endpointConfig)

				expect(axios.request).toHaveBeenCalledTimes(1)
				expect(axios.request).toHaveBeenCalledWith({
					'url': 'https://auth-global.api.smartthings.com/oauth/token',
					'method': 'POST',
					'headers': {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic YWFhOmJiYg==',
						'Accept': 'application/json',
					},
					'data': 'grant_type=refresh_token&client_id=aaa&refresh_token=xxx',
				})
				expect(tokenStore.authData?.authToken).toBe('the-access-token')
				expect(tokenStore.authData?.refreshToken).toBe('the-refresh-token')
			})
		})

		test('acquireRefreshMutex', async () => {
			const release = await authenticator.acquireRefreshMutex()

			expect(acquireMock).toHaveBeenCalledTimes(1)
			expect(acquireMock).toHaveBeenCalledWith()

			release()
			expect(releaseMock).toHaveBeenCalledTimes(1)
			expect(releaseMock).toHaveBeenCalledWith()
		})
	})
})
