import axios from '../../__mocks__/axios'
import { Mutex } from 'async-mutex'

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
describe('Authenticators', () => {
	const config = { url: 'https://api.smartthings.com', headers: { Test: 'test' } }

	it('NoOpAuthenticator authenticate', async () => {
		const authenticator = new NoOpAuthenticator()
		const data = await authenticator.authenticate(config)

		expect(data).toBe(config)
	})

	it('NoOpAuthenticator generic authenticate', async () => {
		const authenticator = new NoOpAuthenticator()
		const token = await authenticator.authenticateGeneric()

		expect(token).toBe('')
	})

	it('BearerTokenAuthenticator authenticate', async () => {
		const authenticator = new BearerTokenAuthenticator('xxxyyyzzz')
		const data = await authenticator.authenticate(config)

		expect(data.url).toBe(config.url)
		expect(data.headers.Authorization).toBe('Bearer xxxyyyzzz')
		expect(data.headers.Test).toBe('test')
	})

	it('BearerTokenAuthenticator generic authenticate', async () => {
		const authenticator = new BearerTokenAuthenticator('xxxyyyzzz')
		const token = await authenticator.authenticateGeneric()

		expect(token).toBe('xxxyyyzzz')
	})

	it('RefreshTokenAuthenticator authenticate', async () => {
		const tokenStore = new TokenStore()
		const authenticator = new RefreshTokenAuthenticator('xxxyyy111', tokenStore)
		const data = await authenticator.authenticate(config)

		expect(data.url).toBe(config.url)
		expect(data.headers.Authorization).toBe('Bearer xxxyyy111')
	})

	it('RefreshTokenAuthenticator refresh', async () => {

		axios.request.mockImplementationOnce(() =>
			Promise.resolve(
				{
					status: 200,
					data: {
						'access_token': 'abcdefghijk',
						'refresh_token': 'lmnopqrstuv',
					},
				},
			),
		)

		const tokenStore = new TokenStore()
		const authenticator = new RefreshTokenAuthenticator('xxxyyy111', tokenStore)
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
		expect(tokenStore.authData?.authToken).toBe('abcdefghijk')
		expect(tokenStore.authData?.refreshToken).toBe('lmnopqrstuv')
		axios.request.mockReset()
	})

	it('RefreshTokenAuthenticator refresh fail', async () => {

		axios.request.mockImplementationOnce(() =>
			Promise.resolve(
				{
					status: 401,
					data: 'Authorization failed',
				},
			),
		)

		const tokenStore = new TokenStore()
		const authenticator = new RefreshTokenAuthenticator('xxxyyy111', tokenStore)
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
		axios.request.mockReset()
	})

	it('SequentialRefreshTokenAuthenticator authenticate', async () => {
		const tokenStore = new TokenStore()
		const mutex = new Mutex()
		const authenticator = new SequentialRefreshTokenAuthenticator('xxxyyy222', tokenStore, mutex)
		const data = await authenticator.authenticate(config)

		expect(data.url).toBe(config.url)
		expect(data.headers.Authorization).toBe('Bearer xxxyyy222')
	})

	it('SequentialRefreshTokenAuthenticator refresh', async () => {

		axios.request.mockImplementationOnce(() =>
			Promise.resolve(
				{
					status: 200,
					data: {
						'access_token': 'qwertyuiop',
						'refresh_token': 'asdfghjkl;',
					},
				},
			),
		)

		const tokenStore = new TokenStore()
		const mutex = new Mutex()
		const authenticator = new SequentialRefreshTokenAuthenticator('xxxyyy222', tokenStore, mutex)
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
		expect(tokenStore.authData?.authToken).toBe('qwertyuiop')
		expect(tokenStore.authData?.refreshToken).toBe('asdfghjkl;')

		const release = await authenticator.acquireRefreshMutex()
		release()

		axios.request.mockReset()
	})

})
