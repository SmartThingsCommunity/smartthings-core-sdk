import axios from '../../__mocks__/axios'

import { BearerTokenAuthenticator } from '../../src/authenticator'
import { SmartThingsClient } from '../../src/st-client'


describe('SmartThingsClient', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('Construction with no location', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))
		expect(client.config.locationId).toBeUndefined()
	})

	it('Construction with location ID', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
			{ locationId: '95efee9b-6073-4871-b5ba-de6642187293' })
		expect(client.config.locationId).toBe('95efee9b-6073-4871-b5ba-de6642187293')
	})

	it('Construction with setLocation', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))
		client.setLocation('d52f4bd1-700b-4730-a05a-e1fbe999ee8d')
		expect(client.config.locationId).toBe('d52f4bd1-700b-4730-a05a-e1fbe999ee8d')
	})

	it('Clone with new headers', async () => {
		const client = new SmartThingsClient(
			new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))

		const client2 = client.clone({'X-ST-Organization': 'e639ddd9-8af4-4725-a491-eda77c41dc7b'})

		expect(client.config.headers).toBeDefined()
		if (client.config.headers) {
			expect(client.config.headers['X-ST-Organization']).toBeUndefined()
		}

		expect(client2.config.headers).toBeDefined()
		if (client2.config.headers) {
			expect(client2.config.headers['X-ST-Organization']).toBe('e639ddd9-8af4-4725-a491-eda77c41dc7b')
		}
	})
})
