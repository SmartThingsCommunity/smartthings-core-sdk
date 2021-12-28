import axios from 'axios'
import sshpk from 'sshpk'
import httpSignature from 'http-signature'
import {SmartThingsURLProvider, defaultSmartThingsURLProvider} from './endpoint-client'
import { Logger } from './logger'


export interface KeyCache {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(keyId: string): any
	set(keyId: string, keyValue: string, cacheTTL: number): void
}

export interface KeyResolverConfig {
	urlProvider?: SmartThingsURLProvider
	keyCache?: KeyCache
	keyCacheTTL?: number
}

export class HttpKeyResolver {
	private keyApiUrl: string
	private keyCache?: KeyCache
	private keyCacheTTL: number

	constructor(config?: KeyResolverConfig ) {
		this.keyApiUrl = defaultSmartThingsURLProvider.keyApiURL
		this.keyCache = undefined
		this.keyCacheTTL = (24 * 60 * 60 * 1000)
		if (config) {
			if (config.urlProvider) {
				this.keyApiUrl = config.urlProvider.keyApiURL
			}
			if (config.keyCacheTTL) {
				this.keyCacheTTL = config.keyCacheTTL || (24 * 60 * 60 * 1000)
			}
			this.keyCache = config.keyCache
		}
	}

	/**
	 * Get Public Key for specified Key ID.
	 *
	 * @param {String} keyId The Key ID as specified on Authorization header.
	 * @returns {Promise.<Object>} Promise of Public key or null if no key available.
	 */
	public async getKey(keyId: string): Promise<string | null> {
		const cache = this.keyCache
		if (!keyId) {
			return null
		}

		let publicKey = cache ? cache.get(keyId) : undefined

		if (publicKey) {
			return publicKey
		}

		const response = await axios.get(`${this.keyApiUrl}${keyId}`)
		const cert = sshpk.parseCertificate(response.data, 'pem')
		if (cert && cert.subjectKey) {
			publicKey = cert.subjectKey
		}

		if (publicKey) {
			if (cache) {
				cache.set(keyId, publicKey, this.keyCacheTTL)
			}
			return publicKey
		}

		return null
	}
}

export interface SignedHttpRequest {
	method: string
	headers: { [key: string]: string }
}

export class SignatureVerifier {
	constructor(private keyResolver: HttpKeyResolver, private logger?: Logger) {
	}

	async isAuthorized(request: SignedHttpRequest): Promise<boolean> {
		try {
			const keyResolver = this.keyResolver
			const parsed = httpSignature.parseRequest(request, undefined)
			const publicKey = await keyResolver.getKey(parsed.keyId)

			return httpSignature.verifySignature(parsed, publicKey)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (this.logger) {
				this.logger.error(error.message | error)
			}
		}
		return false
	}
}
