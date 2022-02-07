import { Mutex } from 'async-mutex'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { AuthData, Authenticator, BearerTokenAuthenticator, NoOpAuthenticator, RefreshData,
	RefreshTokenAuthenticator, RefreshTokenStore, SequentialRefreshTokenAuthenticator }
	from '../../src/authenticator'
import { defaultSmartThingsURLProvider, EndpointClient, EndpointClientConfig, parseWarningHeader } from '../../src/endpoint-client'
import { NoLogLogger } from '../../src/logger'


jest.mock('axios')
jest.mock('qs')

describe('parseWarningHeader', () => {
	it.each([
		['empty string', '', []],
		['invalid string', 'invalid warning header', 'invalid warning header'],
		[
			'invalid string noticed by inner match',
			'invalid299 - "warning text"',
			'invalid299 - "warning text"',
		],
		[
			'single simple warning',
			'299 - "warning text"',
			[{ code: 299, agent: '-', text: 'warning text' }],
		],
		[
			'single simple warning with agent',
			'299 example.com:8080 "warning text"',
			[{ code: 299, agent: 'example.com:8080', text: 'warning text' }],
		],
		[
			'single simple warning with date',
			'299 - "warning text" "Mon, 07 Feb 2021 9:28:17 CST"',
			[{ code: 299, agent: '-', text: 'warning text', date: 'Mon, 07 Feb 2021 9:28:17 CST' }],
		],
		[
			'single warning with commas in message',
			'299 - "warning, text!" "Mon, 07 Feb 2021 9:28:17 CST"',
			[{ code: 299, agent: '-', text: 'warning, text!', date: 'Mon, 07 Feb 2021 9:28:17 CST' }],
		],
		[
			'multiple simple warnings',
			'299 - "warning text",199 - "another warning"',
			[
				{ code: 299, agent: '-', text: 'warning text' },
				{ code: 199, agent: '-', text: 'another warning' },
			],
		],
		[
			'complex example',
			'299 - "warning text" "Mon, 07 Feb 2021 9:28:17 CST",299 - "behold, another warning"',
			[
				{ code: 299, agent: '-', text: 'warning text', date: 'Mon, 07 Feb 2021 9:28:17 CST' },
				{ code: 299, agent: '-', text: 'behold, another warning' },
			],
		],
	])('parses %s', (_name, header, expected) => {
		expect(parseWarningHeader(header)).toEqual(expected)
	})
})

describe('EndpointClient',  () => {
	const mockRequest = axios.request as jest.Mock<Promise<AxiosResponse>, [AxiosRequestConfig]>
	mockRequest.mockResolvedValue({ status: 200, data: { status: 'ok' } } as AxiosResponse)

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

	let client: EndpointClient

	const configWithoutHeaders = {
		urlProvider: defaultSmartThingsURLProvider,
		authenticator: new RefreshTokenAuthenticator(token, tokenStore),
		baseURL: 'https://api.smartthings.com',
		authURL: 'https://auth.smartthings.com',
	}
	const headers = {
		'Content-Type': 'application/json;charset=utf-8',
		Accept: 'application/json',
	}
	const buildClient = (config: EndpointClientConfig = { ...configWithoutHeaders, headers }): EndpointClient =>
		new EndpointClient('base/path', { ...config, headers: { ...config.headers }})

	beforeEach(() => {
		client = buildClient()
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('setHeader', () => {
		it('adds header to config', () => {
			client.setHeader('NewHeader', 'header value')

			expect(client.config.headers?.NewHeader).toBe('header value')
		})

		it('works when no previous headers set', () => {
			const client = new EndpointClient('base/path', { ...configWithoutHeaders })
			client.setHeader('NewHeader', 'header value')

			expect(client.config.headers?.NewHeader).toBe('header value')
		})
	})

	describe('removeHeader', () => {
		it('removes header from config', () => {
			client.setHeader('NewHeader', 'header value')

			expect(client.config.headers?.NewHeader).toBe('header value')

			client.removeHeader('NewHeader')

			expect(client.config.headers?.NewHeader).toBeUndefined()
		})

		it('ignores undefined headers', () => {
			client.removeHeader('NewHeader')

			expect(client.config.headers?.NewHeader).toBeUndefined()
		})
	})

	describe('request', () => {
		it('submits basic request', async () => {
			const response = await client.request('GET', 'my/path')

			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'GET',
				headers: {
					...headers,
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')

			const stringifyMock = (qs.stringify as jest.Mock<string, [unknown]>)
				.mockReturnValue('stringified parameters')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const paramsSerializer = mockRequest.mock.calls[0][0].paramsSerializer as (params: any) => string

			expect(paramsSerializer).toBeDefined()
			expect(paramsSerializer({ param: 'value' })).toBe('stringified parameters')

			expect(stringifyMock).toHaveBeenCalledTimes(1)
			expect(stringifyMock).toHaveBeenCalledWith({ param: 'value' }, { indices: false })
		})

		it('adds accept header for version', async () => {
			const client = buildClient({
				...configWithoutHeaders,
				version: 'api-version',
				headers: { Accept: 'accept-header' },
			})
			const response = await client.request('GET', 'my/path')

			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'GET',
				headers: {
					Accept: 'application/vnd.smartthings+json;v=api-version, accept-header',
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('includes version along with accept header', async () => {
			const client = buildClient({ ...configWithoutHeaders, version: 'api-version' })
			const response = await client.request('GET', 'my/path')

			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'GET',
				headers: {
					Accept: 'application/vnd.smartthings+json;v=api-version',
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('adds header overrides to headers submitted', async () => {
			const headerOverrides = {
				'Content-Type': 'overridden content type',
				'X-ST-Organization': '00000000-0000-0000-0000-000000000008',
			}
			const response = await client.request('POST', 'my/path', { name: 'Bob' }, undefined, { headerOverrides })
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'POST',
				headers: {
					'Content-Type': 'overridden content type',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
					'X-ST-Organization': '00000000-0000-0000-0000-000000000008',
				},
				data: { name: 'Bob' },
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('includes logging id when specified', async () => {
			const client = buildClient({ ...configWithoutHeaders, loggingId: 'request-logging-id' })
			const response = await client.request('GET', 'my/path')
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'X-ST-CORRELATION': 'request-logging-id',
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('calls warningLogger when included and needed', async () => {
			const warningLogger = jest.fn()
			client = buildClient({ ...configWithoutHeaders, warningLogger })
			mockRequest.mockResolvedValueOnce({
				status: 200,
				data: { status: 'ok' },
				headers: { warning: '299 - "Danger, Will Robinson! Danger!"' },
			} as AxiosResponse)
			const response = await client.request('GET', 'my/path')
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')

			expect(warningLogger).toHaveBeenCalledTimes(1)
			expect(warningLogger).toHaveBeenCalledWith([{
				code: 299,
				agent: '-',
				text: 'Danger, Will Robinson! Danger!',
			}])
		})

		it('is okay with no warningLogger', async () => {
			mockRequest.mockResolvedValueOnce({
				status: 200,
				data: { status: 'ok' },
				headers: { warning: 'warning message in header' },
			} as AxiosResponse)

			expect(client.request('GET', 'my/path')).resolves.not.toThrow
		})

		it('returns dryRunReturnValue in dry run mode', async () => {
			const dryRunReturnValue = { usually: 'very similar to the input' }
			const response = await client.request('GET', 'my/path', undefined, undefined, {
				dryRun: true,
				dryRunReturnValue,
			})
			expect(mockRequest).toHaveBeenCalledTimes(0)
			expect(response).toBe(dryRunReturnValue)
		})

		it('throws error in dry run mode when return value not specified', async () => {
			await expect(client.request('GET', 'my/path', undefined, undefined, {
				dryRun: true,
			})).rejects.toThrow('skipping request; dry run mode')
			expect(mockRequest).toHaveBeenCalledTimes(0)
		})
	})

	describe('get', () => {
		it('submits basic request', async () => {
			const response = await client.get('path2')
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/path2',
				method: 'get',
				headers: {
					...headers,
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('includes query params when specified', async () => {
			const response = await client.get('my/path', { locationId: 'XXX' })
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base/path/my/path',
				method: 'get',
				headers: {
					...headers,
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: {
					locationId: 'XXX',
				},
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('skips base path with absolute path', async () => {
			const response = await client.get('/base2/this/path')
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/base2/this/path',
				method: 'get',
				headers: {
					...headers,
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})

		it('skips base URL and path with absolute URL', async () => {
			const response = await client.get('https://api.smartthings.com/absolute/url')
			expect(mockRequest).toHaveBeenCalledTimes(1)
			expect(mockRequest).toHaveBeenCalledWith({
				url: 'https://api.smartthings.com/absolute/url',
				method: 'get',
				headers: {
					...headers,
					Authorization: `Bearer ${token}`,
				},
				data: undefined,
				params: undefined,
				paramsSerializer: expect.any(Function),
			})
			expect(response.status).toBe('ok')
		})
	})

	test('post', async () => {
		const response = await client.post('myotherpath', { name: 'Bill' })
		expect(mockRequest).toHaveBeenCalledTimes(1)
		expect(mockRequest).toHaveBeenCalledWith({
			url: 'https://api.smartthings.com/base/path/myotherpath',
			method: 'post',
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
			data: {
				name: 'Bill',
			},
			params: undefined,
			paramsSerializer: expect.any(Function),
		})
		expect(response.status).toBe('ok')
	})

	test('put', async () => {
		const response = await client.put('myotherpath', { name: 'Bill' })
		expect(mockRequest).toHaveBeenCalledTimes(1)
		expect(mockRequest).toHaveBeenCalledWith({
			url: 'https://api.smartthings.com/base/path/myotherpath',
			method: 'put',
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
			data: {
				name: 'Bill',
			},
			params: undefined,
			paramsSerializer: expect.any(Function),
		})
		expect(response.status).toBe('ok')
	})

	test('patch', async () => {
		const response = await client.patch('path3', { name: 'Joe' })
		expect(mockRequest).toHaveBeenCalledTimes(1)
		expect(mockRequest).toHaveBeenCalledWith({
			url: 'https://api.smartthings.com/base/path/path3',
			method: 'patch',
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
			data: {
				name: 'Joe',
			},
			params: undefined,
			paramsSerializer: expect.any(Function),
		})
		expect(response.status).toBe('ok')
	})

	test('delete', async () => {
		const response = await client.delete('path3')
		expect(mockRequest).toHaveBeenCalledTimes(1)
		expect(mockRequest).toHaveBeenCalledWith({
			url: 'https://api.smartthings.com/base/path/path3',
			method: 'delete',
			headers: {
				...headers,
				Authorization: `Bearer ${token}`,
			},
			data: undefined,
			params: undefined,
			paramsSerializer: expect.any(Function),
		})
		expect(response.status).toBe('ok')
	})

	test('expired token request', async () => {
		mockRequest
			.mockImplementationOnce(() => Promise.reject(
				{ response: {status: 401, data: 'Unauthorized'} }))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { access_token: 'my-access-token', refresh_token: 'my-refresh-token' } } as AxiosResponse))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { status: 'ok' } } as AxiosResponse))

		const response = await client.get('my/path')
		expect(mockRequest).toHaveBeenCalledTimes(3)
		expect(response.status).toBe('ok')
	})

	test('expired token request with mutex', async () => {
		// TODO -- actually test mutex??
		const mutex = new Mutex()
		const mutexConfig = {
			authenticator: new SequentialRefreshTokenAuthenticator(token, tokenStore, mutex),
			baseURL: 'https://api.smartthings.com',
			authURL: 'https://auth.smartthings.com',
			headers: { ...headers },
		}
		const mutexClient = buildClient(mutexConfig)

		mockRequest
			.mockImplementationOnce(() => Promise.reject(
				{response: { status: 401, data: 'Unauthorized' }}))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { access_token: 'my-access-token', refresh_token: 'my-refresh-token' } } as AxiosResponse))
			.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, data: { status: 'ok' } } as AxiosResponse))

		const response = await mutexClient.get('my/path')
		expect(mockRequest).toHaveBeenCalledTimes(3)
		expect(response.status).toBe('ok')
	})

	test('get 404', async () => {
		mockRequest.mockImplementationOnce(() => Promise.reject({response: { status: 404, data: 'Not Found' }}))
		let threwError = false
		try {
			await client.get('path2')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			expect(error.response.status).toBe(404)
			threwError = true
		}
		expect(mockRequest).toHaveBeenCalledTimes(1)
		expect(threwError).toBe(true)
	})

	test('get refresh fail', async () => {
		mockRequest
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
		expect(mockRequest).toHaveBeenCalledTimes(2)
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
