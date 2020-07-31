import axios from '../../__mocks__/axios'
import { Mutex } from 'async-mutex'

import {
	AuthData,
	RefreshData,
	RefreshTokenAuthenticator,
	RefreshTokenStore,
	SequentialRefreshTokenAuthenticator,
} from '../../src'
import { defaultSmartThingsURLProvider, EndpointClient } from '../../src/endpoint-client'


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

const config = {
	'urlProvider': defaultSmartThingsURLProvider,
	'authenticator': new RefreshTokenAuthenticator('asdfghjkl', tokenStore),
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
	it('request', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.request('GET', 'mypath')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('request with header overrides', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const headerOverrides = { 'Content-Type': 'overridden content type'}
		const response = await client.request('POST', 'mypath', { name: 'Bob' }, undefined, { headerOverrides })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'POST',
			'headers': {
				'Content-Type': 'overridden content type',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': { name: 'Bob' },
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.get('path2')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path2',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('get with query params', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.get('mypath', { locationId: 'XXX' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/mypath',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': {
				locationId: 'XXX',
			},
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('get absolute path', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.get('/base2/thispath')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/base2/thispath',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('get absolute url', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.get('https://api.smartthings.com/foo/bar')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/foo/bar',
			'method': 'get',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('post', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.post('myotherpath', { name: 'Bill' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/myotherpath',
			'method': 'post',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Bill',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('put', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.put('myotherpath', { name: 'Bill' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/myotherpath',
			'method': 'put',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Bill',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('patch', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.patch('path3', { name: 'Joe' })
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path3',
			'method': 'patch',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': {
				'name': 'Joe',
			},
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { status: 'ok' } }))
		const response = await client.delete('path3')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith({
			'url': 'https://api.smartthings.com/basepath/path3',
			'method': 'delete',
			'headers': {
				'Content-Type': 'application/json;charset=utf-8',
				'Accept': 'application/json',
				'Authorization': 'Bearer asdfghjkl',
				'X-ST-CORRELATION': 'AAABBBCCC',
			},
			'data': undefined,
			'params': undefined,
			'paramsSerializer': expect.anything(),
		})
		expect(response.status).toBe('ok')
		axios.request.mockReset()
	})

	it('expired token request', async () => {
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
		axios.request.mockReset()
	})

	it('expired token request with mutex', async () => {
		// TODO -- actually test mutex??
		const mutex = new Mutex()
		const mutexConfig = {
			'authenticator': new SequentialRefreshTokenAuthenticator('asdfghjkl', tokenStore, mutex),
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
		axios.request.mockReset()
	})

	it('get 404', async () => {
		axios.request.mockImplementationOnce(() => Promise.reject({response: { status: 404, data: 'Not Found' }}))
		let threwError = false
		try {
			await client.get('path2')
		} catch (error) {
			expect(error.response.status).toBe(404)
			threwError = true
		}
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(threwError).toBe(true)
		axios.request.mockReset()
	})

	it('get refresh fail', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.reject({response: { status: 401, data: 'Unauthorized' }}))
			.mockImplementationOnce(() => Promise.reject({response: { status: 500, data: 'Server error' }}))

		let threwError = false
		try {
			await client.get('path2')
		} catch (error) {
			expect(error.response.status).toBe(500)
			threwError = true
		}
		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(threwError).toBe(true)
		axios.request.mockReset()
	})
})
