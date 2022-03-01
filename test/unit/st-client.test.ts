import axios from '../../__mocks__/axios'

import { BearerTokenAuthenticator } from '../../src/authenticator'
import { SmartThingsClient } from '../../src/st-client'


describe('SmartThingsClient', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	test('construction with no location', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))
		expect(client.config.locationId).toBeUndefined()
	})

	test('construction with location ID', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
			{ locationId: 'locationId' })
		expect(client.config.locationId).toBe('locationId')
	})

	test('construction with setLocation', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))
		client.setLocation('d52f4bd1-700b-4730-a05a-e1fbe999ee8d')
		expect(client.config.locationId).toBe('d52f4bd1-700b-4730-a05a-e1fbe999ee8d')
	})

	it('returns cloned client with new and existing headers merged', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
			{ headers: { 'User-Agent': 'userAgent', 'X-Test': 'test' } },
		)

		const headers = { 'X-ST-Organization': 'organizationId' }
		const clone = client.clone(headers)

		expect(client.config.headers).toBeDefined()
		if (client.config.headers) {
			expect(client.config.headers['X-ST-Organization']).toBeUndefined()
		}

		expect(clone.config.headers).toBeDefined()
		if (clone.config.headers) {
			expect(clone.config.headers).toEqual(expect.objectContaining(client.config.headers))
			expect(clone.config.headers['X-ST-Organization']).toBe('organizationId')
		}
	})
})
