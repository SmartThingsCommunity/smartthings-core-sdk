import axios from '../../__mocks__/axios'
import httpSignature from '../../__mocks__/http-signature'
import { KeyCache, HttpKeyResolver, SignatureVerifier } from '../../src'
import { keyId, publicKey } from './data/signature/models'
import {
	get_certificate as cert,
	get_certificate_parsed as parsedCert,
} from './data/signature/get'
import {
	post_verify as verify,
	post_verify_parsed as verifyParsed,
} from './data/signature/post'


class MockKeyCache implements KeyCache {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(public keyId?: string, public keyValue?: any, public cacheTTL?: number) {

	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get(keyId: string): any {
		return this.keyId === keyId ? this.keyValue : undefined
	}

	public set(keyId: string, keyValue: string, cacheTTL: number): void {
		this.keyId = keyId
		this.keyValue = keyValue
		this.cacheTTL = cacheTTL
	}
}
describe('ST Padlock', () => {

	it('HTTP no cache', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, data: cert }))
		const resolver = new HttpKeyResolver()
		const key = await resolver.getKey(keyId)
		expect(axios.get).toHaveBeenCalledWith(`https://key.smartthings.com${keyId}`)
		expect(JSON.parse(JSON.stringify(key))).toEqual(parsedCert.subjectKey)
	})

	it('HTTP no cache custom URL', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, data: cert }))
		const resolver = new HttpKeyResolver({
			urlProvider: {
				baseURL: 'https://api.smartthings.com',
				authURL: 'https://auth-global.api.smartthings.com/oauth/token',
				keyApiURL: 'https://keys.smartthingsdev.com',
			},
		})
		const key = await resolver.getKey(keyId)
		expect(axios.get).toHaveBeenCalledWith(`https://keys.smartthingsdev.com${keyId}`)
		expect(JSON.parse(JSON.stringify(key))).toEqual(parsedCert.subjectKey)
	})

	it('HTTP resolver cache hit', async () => {
		const keyCache = new MockKeyCache(
			'/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98',
			'yyyyy')
		const resolver = new HttpKeyResolver({ keyCache: keyCache })
		const key = await resolver.getKey(
			'/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98')
		expect(key).toEqual('yyyyy')
	})

	it('HTTP resolver cache miss', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, data: cert }))
		const keyCache = new MockKeyCache(
			'/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-99',
			'yyyyy')
		const resolver = new HttpKeyResolver({ keyCache: keyCache })
		const key = await resolver.getKey(keyId)
		expect(axios.get).toHaveBeenCalledWith(`https://key.smartthings.com${keyId}`)
		expect(JSON.parse(JSON.stringify(key))).toEqual(parsedCert.subjectKey)
		expect(keyCache.cacheTTL).toEqual(24 * 60 * 60 * 1000)
	})

	it('HTTP resolver cache miss custom TTL', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200, data: cert }))
		const keyCache = new MockKeyCache(
			'/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-99',
			'yyyyy')
		const resolver = new HttpKeyResolver({ keyCache: keyCache, keyCacheTTL: 3600 * 1000 })
		const key = await resolver.getKey(keyId)
		expect(axios.get).toHaveBeenCalledWith(`https://key.smartthings.com${keyId}`)
		expect(JSON.parse(JSON.stringify(key))).toEqual(parsedCert.subjectKey)
		expect(keyCache.cacheTTL).toEqual(60 * 60 * 1000)
	})

	it('Verify authorized', async () => {
		httpSignature.parseRequest.mockImplementationOnce(() => verifyParsed)
		httpSignature.verifySignature.mockImplementationOnce(() => true)
		const keyCache = new MockKeyCache(
			'/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98',
			publicKey)
		const resolver = new HttpKeyResolver({ keyCache: keyCache })
		const verifier = new SignatureVerifier(resolver)
		const authorized = await verifier.isAuthorized(verify)
		expect(authorized).toEqual(true)
	})
})
