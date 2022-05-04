import { Device, DeviceEvent }  from '../../src/endpoint/devices'
import {
	VirtualDeviceCreateRequest,
	VirtualDeviceStandardCreateRequest,
	VirtualDevicesEndpoint,
} from '../../src/endpoint/virtualdevices'
import { BearerTokenAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')

describe('VirtualDevicesEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const postSpy = jest.spyOn(EndpointClient.prototype, 'post').mockImplementation()
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()

	const virtualDevicesEndpoint = new VirtualDevicesEndpoint({ authenticator })

	const deviceList = [{ listed: 'device' }] as unknown as Device[]

	describe('list', () => {
		getPagedItemsSpy.mockResolvedValue(deviceList)

		it('works without options', async () => {
			expect(await virtualDevicesEndpoint.list()).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, {})
		})

		it('includes configured locationId', async () => {
			const devices = new VirtualDevicesEndpoint({ authenticator, locationId: 'configured-location-id' })
			expect(await devices.list()).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { locationId: 'configured-location-id' })
		})

		it('include wanted locationId', async () => {
			expect(await virtualDevicesEndpoint.list({ locationId: 'wanted-locationId' })).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { locationId: 'wanted-locationId' })
		})
	})

	describe('create', () => {
		it('creates from device profile ID', async () => {
			const device = { new: 'device' }
			postSpy.mockResolvedValueOnce(device)

			const deviceCreate: VirtualDeviceCreateRequest = {
				owner: {
					ownerId: 'owner-id',
					ownerType: 'LOCATION',
				},
				name: 'Living room light',
				roomId: 'room-id',
				deviceProfileId: 'profile-id',
			}

			const expectedData = deviceCreate

			expect(await virtualDevicesEndpoint.create(deviceCreate)).toBe(device)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('', expectedData)
		})

		it('creates from device profile definition', async () => {
			const device = { new: 'device' }
			postSpy.mockResolvedValueOnce(device)

			const deviceCreate: VirtualDeviceCreateRequest = {
				owner: {
					ownerId: 'owner-id',
					ownerType: 'LOCATION',
				},
				name: 'Living room light',
				roomId: 'room-id',
				deviceProfile: {
					'components': [
						{
							'id': 'main',
							'capabilities': [
								{
									'id': 'switch',
									'version': 1,
								},
							],
							'categories': [],
						},
					],
				},
			}

			const expectedData = deviceCreate

			expect(await virtualDevicesEndpoint.create(deviceCreate)).toBe(device)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('', expectedData)
		})
	})

	describe('createStandard', () => {
		it('creates from prototype', async () => {
			const device = {new: 'device'}
			postSpy.mockResolvedValueOnce(device)

			const deviceCreate: VirtualDeviceStandardCreateRequest = {
				owner: {
					ownerId: 'owner-id',
					ownerType: 'LOCATION',
				},
				name: 'Living room light',
				roomId: 'room-id',
				prototype: 'SWITCH',
			}

			const expectedData = deviceCreate

			expect(await virtualDevicesEndpoint.createStandard(deviceCreate)).toBe(device)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('prototypes', expectedData)
		})
	})

	test('createEvents', async () => {
		const events: DeviceEvent[] = [{ component: 'main' } as DeviceEvent]
		postSpy.mockResolvedValueOnce([true])

		expect(await virtualDevicesEndpoint.createEvents('device-id', events)).toStrictEqual([true])

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('device-id/events', { deviceEvents: events })
	})
})
