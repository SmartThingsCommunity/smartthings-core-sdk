import axios, { AxiosRequestConfig } from 'axios'
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
	keyApiURL: string
}

export const defaultSmartThingsURLProvider: SmartThingsURLProvider = {
	baseURL: 'https://api.smartthings.com',
	authURL: 'https://auth-global.api.smartthings.com/oauth/token',
	keyApiURL: 'https://key.smartthings.com',
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

	/**
	 * You can use this to supply a method that can log RFC 2068 warning headers.
	 *
	 * The messages are parsed into `WarningFromHeader` but if for any reason that parsing
	 * fails, the headers are simply returned as a comma-separated string.
	 */
	warningLogger?: (warnings: WarningFromHeader[] | string) => void | Promise<void>
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

export interface EndpointClientRequestOptions <T> {
	headerOverrides?: HttpClientHeaders
	dryRun?: boolean
	dryRunReturnValue?: T
}

/**
 * Convert to string and scrub sensitive values like auth tokens
 * Meant to be used before logging the request
 */
function scrubConfig(config: AxiosRequestConfig): string {
	const message = JSON.stringify(config)
	const bearerRegex = /"(Bearer [0-9a-f]{8})[0-9a-f-]{28}"/i

	if (bearerRegex.test(message)) {
		return message.replace(bearerRegex, '"$1-xxxx-xxxx-xxxx-xxxxxxxxxxxx"')
	} else { // assume there is some other auth format and redact the entire header value
		const authHeaderRegex = /"(Authorization":")([\s\S]*)"/i
		return message.replace(authHeaderRegex, '"$1(redacted)"')
	}
}

export interface WarningFromHeader {
	code: number
	agent: string
	text: string
	date?: string
}

/**
 * Parses Axios comma-joined warning headers into individual warnings. If, for any reason, the
 * header string cannot be parsed, it will be returned unchanged.
 *
 * This method does not handle escaped quotes inside quoted strings.
 */
export const parseWarningHeader = (header: string): WarningFromHeader[] | string => {
	if (header === '') {
		return []
	}

	const warnings = header.match(/[^, ]+ [^, ]+ "[^"]+"( "[^"]+")?/g)
	if (!warnings) {
		return header
	}
	let failed = false
	const retVal = warnings.map(warning => {
		const fields = warning.match(/^(?<code>\d+) (?<agent>[^ ]+) "(?<text>.*?)"( "(?<date>.*?)")?$/)
		if (!fields) {
			failed = true
			return { code: 1, agent: '-', text: 'unused' }
		}
		const { code, agent, text, date } = fields.groups as
			{ code: string; agent: string; text: string; date?: string }
		return { code: parseInt(code), agent, text, date }
	})
	return failed ? header : retVal
}

export class EndpointClient {
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
	public async request<T = any>(method: HttpClientMethod, path?: string,
			data?: any, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
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
			headers: options?.headerOverrides ? { ...headers, ...options.headerOverrides } : headers,
			params,
			data,
			paramsSerializer: params => qs.stringify(params, { indices: false }),
		}

		axiosConfig = await this.config.authenticator.authenticate(axiosConfig)

		if (this.logger.isDebugEnabled()) {
			this.logger.debug(`making axios request: ${scrubConfig(axiosConfig)}`)
		}
		if (options?.dryRun) {
			if (options.dryRunReturnValue) {
				return options.dryRunReturnValue
			}
			throw new Error('skipping request; dry run mode')
		}
		try {
			const response = await axios.request(axiosConfig)
			if (this.logger.isTraceEnabled()) {
				this.logger.trace(`axios response ${response.status}: data=${JSON.stringify(response.data)}`)
			}
			if (response.headers?.warning && this.config.warningLogger) {
				// warningLogger allows for return of a promise or just void for flexibility
				// it's not important to us here that it finish.
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				this.config.warningLogger(parseWarningHeader(response.headers.warning))
			}
			return response.data
		} catch (error: any) {
			if (this.logger.isTraceEnabled()) {
				if (error.response) {
					// server responded with non-200 response code
					this.logger.trace(`axios response ${error.response.status}: data=${JSON.stringify(error.response.data)}`)
				} else if (error.request) {
					// server never responded
					this.logger.trace(`no response from server for request ${JSON.stringify(error.request)}`)
				} else {
					this.logger.trace(`error making request: ${error.message}`)
				}
			}
			if (error.response && error.response.status === 401 && this.config.authenticator.refresh) {
				if (this.config.authenticator.acquireRefreshMutex) {
					const release = await this.config.authenticator.acquireRefreshMutex()
					try {
						await this.config.authenticator.refresh(axiosConfig, this.config)
						const response = await axios.request(axiosConfig)
						return response.data
					} finally {
						release()
					}
				} else {
					await this.config.authenticator.refresh(axiosConfig, this.config)
					const response = await axios.request(axiosConfig)
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

	public async get<T = any>(path?: string, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
		return this.request('get', path, undefined, params, options)
	}

	public post<T = any>(path?: string, data?: any, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
		return this.request('post', path, data, params, options)
	}

	public put<T = any>(path?: string, data?: any, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
		return this.request('put', path, data, params, options)
	}

	public patch<T = any>(path?: string, data?: any, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
		return this.request('patch', path, data, params, options)
	}

	public delete<T = any>(path?: string, params?: HttpClientParams, options?: EndpointClientRequestOptions<T>): Promise<T> {
		return this.request('delete', path, undefined, params, options)
	}

	public async getPagedItems<T = any>(path?: string, params?: HttpClientParams, options?: EndpointClientRequestOptions<ItemsList>): Promise<T[]> {
		let list = await this.get<ItemsList>(path, params, options)
		const result = list.items
		while (list._links && list._links.next) {
			list = await this.get<ItemsList>(list._links.next.href, undefined, options)
			result.push(...list.items)
		}
		return result
	}
	/* eslint-enable */
}
