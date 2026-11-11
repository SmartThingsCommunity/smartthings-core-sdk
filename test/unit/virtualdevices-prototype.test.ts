import http from 'http'
import { AddressInfo } from 'net'

import { BearerTokenAuthenticator } from '../../src/authenticator'
import { VirtualDeviceStandardCreateRequest, VirtualDevicesEndpoint } from '../../src/endpoint/virtualdevices'


// use the real axios rather than the mock in __mocks__
jest.unmock('axios')

/**
 * Sends a real request through axios to a local server. Mocking the client would not catch axios
 * removing the `prototype` field from the request body.
 */
it('createStandard sends the prototype field to the server', async () => {
	let receivedBody = ''
	const server = http.createServer((request, response) => {
		const chunks: Buffer[] = []
		request.on('data', chunk => chunks.push(chunk))
		request.on('end', () => {
			receivedBody = Buffer.concat(chunks).toString()
			response.setHeader('Content-Type', 'application/json')
			response.end(JSON.stringify({ deviceId: 'new-device' }))
		})
	})
	await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))

	try {
		const { port } = server.address() as AddressInfo
		const endpoint = new VirtualDevicesEndpoint({
			authenticator: new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
			urlProvider: { baseURL: `http://127.0.0.1:${port}` },
		})
		const definition: VirtualDeviceStandardCreateRequest = {
			name: 'Living room light',
			owner: { ownerId: 'owner-id', ownerType: 'LOCATION' },
			prototype: 'SWITCH',
		}

		await endpoint.createStandard(definition)

		expect(JSON.parse(receivedBody)).toEqual(definition)
	} finally {
		await new Promise(resolve => server.close(resolve))
	}
})
