import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { MutexInterface } from 'async-mutex'

import { EndpointClientConfig } from './endpoint-client'


/**
 * Implement this interface to implement a process for handling authentication.
 *
 * This is not meant to be a "service" in the traditional sense because
 * implementors are not expected to be stateless.
 */
export interface Authenticator {
	login?(): Promise<void>
	logout?(): Promise<void>
	refresh?(requestConfig: AxiosRequestConfig, clientConfig: EndpointClientConfig): Promise<void>
	acquireRefreshMutex?(): Promise<MutexInterface.Releaser>

	/**
	 * Performs required authentication steps to add credentials to the axios config, typically via Bearer Auth headers.
	 * Expected to call other functions such as @see refresh as needed to return valid credentials.
	 *
	 * @param requestConfig AxiosRequestConfig to add credentials to and return otherwise unmodified
	 */
	authenticate(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig>

	/**
	 * Performs required authentication steps and returns credentials as a string value
	 * Expected to perform any required steps (such as token refresh) needed to return valid credentials.
	 *
	 * @returns {string} valid auth token
	 */
	authenticateGeneric?(): Promise<string>
}


/**
 * For use in tests or on endpoints that don't need any authentication.
 */
export class NoOpAuthenticator implements Authenticator {
	authenticate(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
		return Promise.resolve(requestConfig)
	}

	authenticateGeneric(): Promise<string> {
		return Promise.resolve('')
	}
}


/**
 * A simple bearer token authenticator that knows nothing about refreshing
 * or logging in our out. If the token is expired, it simply won't work.
 */
export class BearerTokenAuthenticator implements Authenticator {
	constructor(public token: string) {
		// simple
	}

	authenticate(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
		return Promise.resolve({
			...requestConfig,
			headers: {
				...requestConfig.headers,
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	authenticateGeneric(): Promise<string> {
		return Promise.resolve(this.token)
	}
}

export interface AuthData {
	authToken: string
	refreshToken: string
}

export interface RefreshData {
	refreshToken: string
	clientId: string
	clientSecret: string
}

export interface RefreshTokenStore {
	getRefreshData(): Promise<RefreshData>
	putAuthData(data: AuthData): Promise<void>
}

/**
 * An authenticator that supports refreshing of the access token using a refresh token by loading
 * the refresh token, client ID, and client secret from a token store, performing the refresh, and
 * storing the new tokens.
 *
 * Note that corruption of the refresh token is unlikely but possible if two of the same
 * authenticators refresh the same token at the same time.
 */
export class RefreshTokenAuthenticator implements Authenticator {
	constructor(public token: string, private tokenStore: RefreshTokenStore) {
		// simple
	}

	authenticate(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
		return Promise.resolve({
			...requestConfig,
			headers: {
				...requestConfig.headers,
				Authorization: `Bearer ${this.token}`,
			},
		})
	}

	async refresh(requestConfig: AxiosRequestConfig, clientConfig: EndpointClientConfig): Promise<void> {
		const refreshData: RefreshData = await this.tokenStore.getRefreshData()
		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + Buffer.from(`${refreshData.clientId}:${refreshData.clientSecret}`, 'ascii').toString('base64'),
			'Accept': 'application/json',
		}

		const axiosConfig: AxiosRequestConfig = {
			url: clientConfig.urlProvider?.authURL,
			method: 'POST',
			headers,
			data: `grant_type=refresh_token&client_id=${refreshData.clientId}&refresh_token=${refreshData.refreshToken}`,
		}

		const response: AxiosResponse = await axios.request(axiosConfig)
		if (response.status > 199 && response.status < 300) {
			const authData: AuthData = {
				authToken: response.data.access_token,
				refreshToken: response.data.refresh_token,
			}
			this.token = authData.authToken
			requestConfig.headers = { ...(requestConfig.headers ?? {}), Authorization: `Bearer ${this.token}` }
			return this.tokenStore.putAuthData(authData)
		}

		throw Error(`error ${response.status} refreshing token, with message ${response.data}`)
	}
}

/**
 * A an authenticator that works like RefreshTokenAuthenticator but which can use a mutex to help
 * prevent corruption of the refresh token.
 *
 * Note that while `acquireRefreshMutex` is provided for you to use the mutex, the mutex is not
 * automatically used.
 */
export class SequentialRefreshTokenAuthenticator extends RefreshTokenAuthenticator {
	constructor(token: string, tokenStore: RefreshTokenStore, private refreshMutex: MutexInterface) {
		super(token, tokenStore)
	}

	acquireRefreshMutex(): Promise<MutexInterface.Releaser> {
		return this.refreshMutex.acquire()
	}
}
