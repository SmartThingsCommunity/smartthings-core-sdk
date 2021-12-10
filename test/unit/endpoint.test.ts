import { Endpoint, EndpointClient } from '../../src'


describe('Endpoint', () => {
	const client = { config: {
		locationId: 'default-location-id',
		installedAppId: 'default-installed-app-id',
	} } as unknown as EndpointClient
	const endpoint = new Endpoint(client)

	describe('locationId', () => {
		it('returns result passed in when defined', () => {
			expect(endpoint.locationId('passed-in-location-id')).toEqual('passed-in-location-id')
		})

		it('falls back on default location id', () => {
			expect(endpoint.locationId()).toEqual('default-location-id')
		})

		it('throws exception when no location id available', () => {
			client.config.locationId = undefined
			expect(() => endpoint.locationId()).toThrow('Location ID not defined')
		})
	})

	describe('installedAppId', () => {
		it('returns result passed in when defined', () => {
			expect(endpoint.installedAppId('passed-in-installed-app-id')).toEqual('passed-in-installed-app-id')
		})

		it('falls back on default installed app id', () => {
			expect(endpoint.installedAppId()).toEqual('default-installed-app-id')
		})

		it('throws exception when no installed app id available', () => {
			client.config.installedAppId = undefined
			expect(() => endpoint.installedAppId()).toThrow('Installed App ID not defined')
		})
	})
})
