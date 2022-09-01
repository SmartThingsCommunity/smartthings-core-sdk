import { NoOpAuthenticator } from '../../src/authenticator'
import { HubdevicesEndpoint } from '../../src/endpoint/hubdevices'
import { EndpointClient } from '../../src/endpoint-client'



describe('HubdevicesEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put').mockImplementation()
	const patchSpy = jest.spyOn(EndpointClient.prototype, 'patch').mockImplementation()
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')

	const authenticator = new NoOpAuthenticator()
	const hubdevicesEndpoint = new HubdevicesEndpoint({ authenticator })

	test('get', async () => {
		putSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.get('hub-id')).resolves.not.toThrow()

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('hub-id')
	})

	test('getCharacteristics', async () => {
		putSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.getCharacteristics('hub-id')).resolves.not.toThrow()

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('hub-id/characteristics')
	})

	test('installDriver', async () => {
		putSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.installDriver('driver-id', 'hub-id', 'channel-id')).resolves.not.toThrow()

		expect(putSpy).toHaveBeenCalledTimes(1)
		expect(putSpy).toHaveBeenCalledWith('hub-id/drivers/driver-id', { channelId: 'channel-id' })
	})

	describe('switchDriver', () => {
		it('calls patch with driver id', async () => {
			patchSpy.mockImplementationOnce(() => Promise.resolve())

			await expect(hubdevicesEndpoint.switchDriver('driver-id', 'hub-id', 'device-id'))
				.resolves.not.toThrow()

			expect(patchSpy).toHaveBeenCalledTimes(1)
			expect(patchSpy).toHaveBeenCalledWith('hub-id/childdevice/device-id',
				{ driverId: 'driver-id' }, undefined)
		})

		it('includes forceUpdate query parameter when specified', async () => {
			patchSpy.mockImplementationOnce(() => Promise.resolve())

			await expect(hubdevicesEndpoint.switchDriver('driver-id', 'hub-id', 'device-id', true))
				.resolves.not.toThrow()

			expect(patchSpy).toHaveBeenCalledTimes(1)
			expect(patchSpy).toHaveBeenCalledWith('hub-id/childdevice/device-id',
				{ driverId: 'driver-id' }, { forceUpdate: 'true' })
		})
	})

	test('uninstallDriver', async () => {
		deleteSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.uninstallDriver('driver-id', 'hub-id')).resolves.not.toThrow()

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('hub-id/drivers/driver-id')
	})

	describe('listInstalled', () => {
		it('allows for no device', async () => {
			getSpy.mockImplementationOnce(() => Promise.resolve())

			await expect(hubdevicesEndpoint.listInstalled('hub-id')).resolves.not.toThrow()

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('hub-id/drivers', undefined)
		})

		it('includes device when specified', async () => {
			getSpy.mockImplementationOnce(() => Promise.resolve())

			await expect(hubdevicesEndpoint.listInstalled('hub-id', 'device-id')).resolves.not.toThrow()

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('hub-id/drivers', { deviceId: 'device-id' })
		})
	})

	test('getInstalled', async () => {
		getSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.getInstalled('hub-id', 'driver-id')).resolves.not.toThrow()

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('hub-id/drivers/driver-id')
	})

	test('enrolledChannels', async () => {
		getSpy.mockImplementationOnce(() => Promise.resolve())

		await expect(hubdevicesEndpoint.enrolledChannels('hub-id')).resolves.not.toThrow()

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('hub-id/channels', { channelType: 'DRIVERS' })
	})
})
