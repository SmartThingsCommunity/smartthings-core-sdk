import axios from '../../__mocks__/axios'
import { Mutex } from 'async-mutex'

import {
	AuthData,
	Authenticator,
	BearerTokenAuthenticator,
	NoLogLogger,
	RefreshData,
	RefreshTokenAuthenticator,
	RefreshTokenStore,
	SequentialRefreshTokenAuthenticator,
	NoOpAuthenticator,
} from '../../src'
import { defaultSmartThingsURLProvider, EndpointClient, EndpointClientConfig } from '../../src/endpoint-client'
import { AxiosRequestConfig } from 'axios'


jest.mock('axios')

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

const tokenStore = new TokenStore()
const token = 'authToken'

const config = {
	'urlProvider': defaultSmartThingsURLProvider,
	'authenticator': new RefreshTokenAuthenticator(token, tokenStore),
	'baseURL': 'https://api.smartthings.com',
	'authURL': 'https://auth.smartthings.com',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
	},
	'loggingId': 'AAABBBCCC',
}

const client = new EndpointClient('basepath', config)

describe('Endpoint Client',  () => {
	beforeAll(() => {
		axios.request.mockResolvedValue({ status: 200, data: { status: 'ok' } })
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('request', async () => {
		const response = await client.request('GET', 'mypath')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('request with header overrides', async () => {
		const headerOverrides = {
			'Content-Type': 'overridden content type',
			'X-ST-Organization': '00000000-0000-0000-0000-000000000008',
		}
		const response = await client.request('POST', 'mypath', { name: 'Bob' }, undefined, { headerOverrides })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'POST',
			'headers': {
				'Content-Type': 'overridden content type',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
				'X-ST-Organization': '00000000-0000-0000-0000-000000000008',
			},
			'data': { name: 'Bob' },
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('get', async () => {
		const response = await client.get('path2')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path2',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('get with query params', async () => {
		const response = await client.get('mypath', { locationId: 'XXX' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': {
				locationId: 'XXX',
			},
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('get absolute path', async () => {
		const response = await client.get('/base2/thispath')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/base2/thispath',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('get absolute url', async () => {
		const response = await client.get('https://api.smartthings.com/foo/bar')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/foo/bar',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('post', async () => {
		const response = await client.post('myotherpath', { name: 'Bill' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/myotherpath',
			'method': 'post',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Bill',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('put', async () => {
		const response = await client.put('myotherpath', { name: 'Bill' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/myotherpath',
			'method': 'put',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Bill',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('patch', async () => {
		const response = await client.patch('path3', { name: 'Joe' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path3',
			'method': 'patch',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Joe',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('delete', async () => {
		const response = await client.delete('path3')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path3',
			'method': 'delete',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
	})

	test('expired token request', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.reject(
				{ response: {status: 401, data: 'Unauthorized'} }))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { 'access_token': 'abcdefghijk', 'refresh_token': 'lmnopqrstuv' } }))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { status: 'ok' } }))

		const response = await client.get('mypath')
		expect(axios.request).toHaveBeenCalledTimes(3)
		expect(response.status).toBe('ok')
	})

	test('expired token request with mutex', async () => {
		// TODO -- actually test mutex??
		const mutex = new Mutex()
		const mutexConfig = {
			'authenticator': new SequentialRefreshTokenAuthenticator(token, tokenStore, mutex),
			'baseURL': 'https://api.smartthings.com',
			'authURL': 'https://auth.smartthings.com',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
			},
			'loggingId': 'AAABBBCCC',
		}
		const mutexClient = new EndpointClient('basepath', mutexConfig)

		axios.request
			.mockImplementationOnce(() => Promise.reject(
				{response: { status: 401, data: 'Unauthorized' }}))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { 'access_token': 'abcdefghijk', 'refresh_token': 'lmnopqrstuv' } }))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { status: 'ok' } }))

		const response = await mutexClient.get('mypath')
		expect(axios.request).toHaveBeenCalledTimes(3)
		expect(response.status).toBe('ok')
	})

	test('get 404', async () => {
		axios.request.mockImplementationOnce(() => Promise.reject({response: { status: 404, data: 'Not Found' }}))
		let threwError = false
		try {
			await client.get('path2')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.response.status).toBe(404)
			threwError = true
		}
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(threwError).toBe(true)
	})

	test('get refresh fail', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.reject({response: { status: 401, data: 'Unauthorized' }}))
			.mockImplementationOnce(() => Promise.reject({response: { status: 500, data: 'Server error' }}))

		let threwError = false
		try {
			await client.get('path2')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.response.status).toBe(500)
			threwError = true
		}
		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(threwError).toBe(true)
	})

	describe('request logging', () => {
		jest.spyOn(NoLogLogger.prototype, 'isDebugEnabled').mockReturnValue(true)
		const debugSpy = jest.spyOn(NoLogLogger.prototype, 'debug')

		it('partially redacts bearer token in request log', async () => {
			const bearerToken = '00000000-0000-0000-0000-000000000000'
			const config: EndpointClientConfig = {
				authenticator: new BearerTokenAuthenticator(bearerToken),
				logger: new NoLogLogger,
			}
			const bearerClient = new EndpointClient('basePath', config)

			await bearerClient.get('')

			expect(debugSpy).toBeCalled()
			expect(debugSpy).not.toBeCalledWith(expect.stringContaining(bearerToken))
			expect(debugSpy).toBeCalledWith(expect.stringContaining('Bearer 00000000'))
		})

		it('fully redacts Auth header when Bearer is not present', async () => {
			const basicAuth = Buffer.from('username:password', 'ascii').toString('base64')
			class BasicAuthenticator implements Authenticator {
				authenticate(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
					return Promise.resolve({
						...requestConfig,
						headers: {
							...requestConfig.headers,
							Authorization: `Basic ${basicAuth}`,
						},
					})
				}
			}
			const config: EndpointClientConfig = {
				authenticator: new BasicAuthenticator,
				logger: new NoLogLogger(),
			}
			const basicClient = new EndpointClient('basePath', config)

			await basicClient.get('')

			expect(debugSpy).toBeCalled()
			expect(debugSpy).not.toBeCalledWith(expect.stringContaining(basicAuth))
			expect(debugSpy).toBeCalledWith(expect.stringContaining('Authorization":"(redacted)"'))
		})

		describe('getPagedItems', () => {
			const getMock = jest.fn()
			const client = new EndpointClient('paged-thing', {
				authenticator: new NoOpAuthenticator(),
				logger: new NoLogLogger(),
			})
			client.get = getMock

			const item1 = { name: 'item-1' }
			const item2 = { name: 'item-2' }

			it('uses single get when full results returned in one go', async () => {
				getMock.mockResolvedValueOnce({
					items: [item1, item2],
				})

				expect(await client.getPagedItems()).toEqual([item1, item2])

				expect(getMock).toHaveBeenCalledTimes(1)
				expect(getMock).toHaveBeenCalledWith(undefined, undefined, undefined)
			})

			it('combines multiple pages', async () => {
				const params = { paramName: 'param-value' }
				const options = { dryRun: false }
				getMock
					.mockResolvedValueOnce({ items: [item1], _links: { next: { href: 'next-url' } } })
					.mockResolvedValueOnce({ items: [item2] })

				expect(await client.getPagedItems('first-url', params, options)).toEqual([item1, item2])

				expect(getMock).toHaveBeenCalledTimes(2)
				expect(getMock).toHaveBeenCalledWith('first-url', params, options)
				expect(getMock).toHaveBeenCalledWith('next-url', undefined, options)
			})
		})
	})
})
