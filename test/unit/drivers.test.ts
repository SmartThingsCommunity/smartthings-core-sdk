import { NoOpAuthenticator } from '../../src/authenticator'
import { DriversEndpoint, EdgeDriverSummary } from '../../src/endpoint/drivers'
import { EndpointClient } from '../../src/endpoint-client'


describe('DriversEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete').mockImplementation()
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()
	const requestSpy = jest.spyOn(EndpointClient.prototype, 'request').mockImplementation()

	const authenticator = new NoOpAuthenticator()
	const driversEndpoint = new DriversEndpoint({ authenticator })

	test('get', async () => {
		const driver = { driverId: 'driver-id' }
		getSpy.mockResolvedValueOnce(driver)

		expect(await driversEndpoint.get('requested-driver-id')).toBe(driver)

		expect(getSpy).toHaveBeenCalledWith('requested-driver-id')
	})

	test('getRevision', async () => {
		const driver = { driverId: 'driver-id' }
		getSpy.mockResolvedValueOnce(driver)

		expect(await driversEndpoint.getRevision('requested-driver-id', 'requested-version'))

		expect(getSpy).toHaveBeenCalledWith('requested-driver-id/versions/requested-version')
	})

	test('delete', async () => {
		expect(await driversEndpoint.delete('id-to-delete')).resolves.not.toThrow

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('id-to-delete')
	})

	test('list', async () => {
		const drivers = [{ driverId: 'listed-in-channel-id' }] as EdgeDriverSummary[]
		getPagedItemsSpy.mockResolvedValueOnce(drivers)

		expect(await driversEndpoint.list()).toBe(drivers)

		expect(getPagedItemsSpy).toHaveBeenCalledWith('')
	})

	test('listDefault', async () => {
		const drivers = [{ driverId: 'listed-in-channel-id' }] as EdgeDriverSummary[]
		getPagedItemsSpy.mockResolvedValueOnce(drivers)

		expect(await driversEndpoint.listDefault()).toBe(drivers)

		expect(getPagedItemsSpy).toHaveBeenCalledWith('default')
	})

	test('upload', async () => {
		const driver = { driverId: 'driver-id' }
		requestSpy.mockResolvedValueOnce(driver)
		const archiveData = new Uint8Array(7).fill(13)

		expect(await driversEndpoint.upload(archiveData)).toBe(driver)

		expect(requestSpy).toHaveBeenCalledWith('post', 'package', archiveData, undefined,
			{ headerOverrides: { 'Content-Type': 'application/zip' } })
	})
})
