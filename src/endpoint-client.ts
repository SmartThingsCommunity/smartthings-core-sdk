import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import qs from 'qs'

import { Authenticator } from './authenticator'
import { Logger, noLogLogger } from './logger'


export interface HttpClientHeaders {
	[name: string]: string
}
export type HttpClientParamValue = string | string[] | number
export interface HttpClientParams {
	[name: string]: HttpClientParamValue
}
export type HttpClientMethod =
	| 'get' | 'GET'
	| 'post' | 'POST'
	| 'put' | 'PUT'
	| 'patch' | 'PATCH'
	| 'delete' | 'DELETE'

export interface SmartThingsURLProvider {
	baseURL: string
	authURL: string
}

export const defaultSmartThingsURLProvider: SmartThingsURLProvider = {
	baseURL: 'https://api.smartthings.com',
	authURL: 'https://auth-global.api.smartthings.com/oauth/token',
}

export interface EndpointClientConfig {
	authenticator: Authenticator
	urlProvider?: SmartThingsURLProvider
	logger?: Logger
	loggingId?: string
	version?: string
	headers?: HttpClientHeaders
	locationId?: string
	installedAppId?: string
}

export interface ItemsList {
	items: []
	_links?: {
		next?: {
			href: string
		}
		previous?: {
			href: string
		}
	}
}

export default class EndpointClient {
	private logger: Logger

	constructor(public readonly basePath: string, public readonly config: EndpointClientConfig) {
		this.logger = config.logger ? config.logger : noLogLogger
	}

	public setHeader(name: string, value: string): EndpointClient {
		if (!this.config.headers) {
			this.config.headers = {}
		}
		this.config.headers[name] = value
		return this
	}

	public removeHeader(name: string): EndpointClient {
		if (this.config.headers) {
			delete this.config.headers[name]
		}
		return this
	}

	private url(path?: string): string {
		if (path) {
			if (path.startsWith('/')) {
				return `${this.config.urlProvider?.baseURL}${path}`
			} else if (path.startsWith('https://')) {
				return path
			}
			return `${this.config.urlProvider?.baseURL}/${this.basePath}/${path}`
		}
		return `${this.config.urlProvider?.baseURL}/${this.basePath}`
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	public async request<T = any, R = AxiosResponse<T>>(method: HttpClientMethod, path?: string,
			data?: any, params?: HttpClientParams): Promise<T> {

		const headers: HttpClientHeaders = this.config.headers ? { ...this.config.headers } : {}

		if (this.config.loggingId) {
			headers['X-ST-CORRELATION'] = this.config.loggingId
		}

		if (this.config.version) {
			const versionString = `application/vnd.smartthings+json;v=${this.config.version}`

			// Prepare the accept header
			if (typeof headers.Accept === 'undefined' || headers.Accept === 'application/json') {
				headers.Accept = versionString
			} else {
				headers.Accept = `${versionString}, ${headers.Accept}`
			}
		}

		let axiosConfig: AxiosRequestConfig = {
			url: this.url(path),
			method,
			headers,
			params,
			data,
			paramsSerializer: params => qs.stringify(params, { indices: false }),
		}

		axiosConfig = await this.config.authenticator.authenticate(axiosConfig)

		if (this.logger.isDebugEnabled()) {
			this.logger.debug(`making axios request: ${JSON.stringify(axiosConfig)}`)
		}
		let response
		try {
			response = await axios.request(axiosConfig)
			return response.data
		} catch (error) {
			if (error.status === 401 && this.config.authenticator.refresh) {
				if (this.config.authenticator.acquireRefreshMutex) {
					const release = await this.config.authenticator.acquireRefreshMutex()
					try {
						await this.config.authenticator.refresh(axiosConfig, this.config)
						response = await axios.request(axiosConfig)
						return response.data
					} finally {
						release()
					}
				} else {
					await this.config.authenticator.refresh(axiosConfig, this.config)
					response = await axios.request(axiosConfig)
					return response.data
				}
			}
			// Annotate message with SmartThings API error data
			if (error.response && error.response.data) {
				error.message = error.message + ': ' + JSON.stringify(error.response.data)
			}
			throw error
		}
	}

	public async get<T = any, R = AxiosResponse<T>>(path?: string, params?: HttpClientParams): Promise<T> {
		return this.request('get', path, undefined, params)
	}

	public post<T = any, R = AxiosResponse<T>>(path?: string, data?: any, params?: HttpClientParams): Promise<T> {
		return this.request('post', path, data, params)
	}

	public put<T = any, R = AxiosResponse<T>>(path?: string, data?: any, params?: HttpClientParams): Promise<T> {
		return this.request('put', path, data, params)
	}

	public patch<T = any, R = AxiosResponse<T>>(path?: string, data?: any, params?: HttpClientParams): Promise<T> {
		return this.request('patch', path, data, params)
	}

	public delete<T = any, R = AxiosResponse<T>>(path?: string, params?: HttpClientParams): Promise<T> {
		return this.request('delete', path, undefined, params)
	}

	public async getPagedItems<T = any, R = AxiosResponse<T>>(path?: string, params?: HttpClientParams): Promise<T[]> {
		let list = await this.get<ItemsList>(path, params)
		const result = list.items
		while (list._links && list._links.next) {
			list = await this.get<ItemsList>(list._links.next.href)
			result.push(...list.items)
		}
		return result
	}
	/* eslint-enable */
}
