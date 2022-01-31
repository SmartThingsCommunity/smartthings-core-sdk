import { NoOpAuthenticator } from '../../src/authenticator'
import { Channel, ChannelCreate, ChannelsEndpoint, ChannelUpdate, DriverChannelDetails }
	from '../../src/endpoint/channels'
import { EndpointClient } from '../../src/endpoint-client'


describe('ChannelsEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post').mockImplementation()
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put').mockImplementation()
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete').mockImplementation()
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()

	const authenticator = new NoOpAuthenticator()
	const channelsEndpoint = new ChannelsEndpoint({ authenticator })

	test('create', async () => {
		const createRequest = { name: 'channel-to-create' } as ChannelCreate
		const created = { channelId: 'created-channel' } as Channel
		postSpy.mockResolvedValueOnce(created)

		expect(await channelsEndpoint.create(createRequest)).toBe(created)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('', createRequest)
	})

	test('delete', async () => {
		expect(await channelsEndpoint.delete('id-to-delete')).resolves.not.toThrow

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('id-to-delete')
	})

	test('update', async () => {
		const updateRequest = { name: 'channel-to-update' } as ChannelUpdate
		const updated = { channelId: 'updated-channel' } as Channel
		putSpy.mockResolvedValueOnce(updated)

		expect(await channelsEndpoint.update('input-channel-id', updateRequest)).toBe(updated)

		expect(putSpy).toHaveBeenCalledTimes(1)
		expect(putSpy).toHaveBeenCalledWith('input-channel-id', updateRequest)
	})

	test('get', async () => {
		const channel = { channelId: 'channel-id' }
		getSpy.mockResolvedValueOnce(channel)

		expect(await channelsEndpoint.get('requested-channel-id')).toBe(channel)

		expect(getSpy).toHaveBeenCalledWith('requested-channel-id')
	})

	test('getDriverChannelMetaInfo', async () => {
		const driver = { driverId: 'driver-id' }
		getSpy.mockResolvedValueOnce(driver)

		expect(await channelsEndpoint.getDriverChannelMetaInfo('requested-channel-id', 'requested-driver-id'))
			.toBe(driver)

		expect(getSpy).toHaveBeenCalledWith('requested-channel-id/drivers/requested-driver-id/meta')
	})

	describe('list', () => {
		const channelList = [{ channelId: 'listed-channel' }] as Channel[]
		getPagedItemsSpy.mockResolvedValue(channelList)

		it('works without options', async () => {
			expect(await channelsEndpoint.list()).toBe(channelList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith('', {})
		})

		it.each([
			['subscriberType', 'HUB', { type: 'HUB' }],
			['includeReadOnly', true, { includeReadOnly: 'true' }],
		])('handles %s', async (searchKey, searchValue, expectedParams) => {
			expect(await channelsEndpoint.list({ [searchKey]: searchValue })).toBe(channelList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith('', expectedParams)
		})

		it('works with both subscriber id and type', async () => {
			expect(await channelsEndpoint.list({ subscriberType: 'HUB', subscriberId: 'subscriber-id' })).toBe(channelList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith('', { type: 'HUB', subscriberId: 'subscriber-id' })
		})

		it('throws exception when subscriber id included without type', async () => {
			await expect(channelsEndpoint.list({ subscriberId: 'subscriber-id' })).rejects
				.toThrow('specifying a subscriberId requires also specifying a subscriberType')

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(0)
		})
	})

	test('listAssignedDrivers', async () => {
		const driverChannelDetailList = [{ driverId: 'listed-in-channel-id' }] as DriverChannelDetails[]
		getPagedItemsSpy.mockResolvedValueOnce(driverChannelDetailList)

		expect(await channelsEndpoint.listAssignedDrivers('channel-id')).toBe(driverChannelDetailList)

		expect(getPagedItemsSpy).toHaveBeenCalledWith('channel-id/drivers')
	})

	test('assignDriver', async () => {
		const details = { driverId: 'assigned-driver' } as DriverChannelDetails
		postSpy.mockResolvedValueOnce(details)

		expect(await channelsEndpoint.assignDriver('channel-id', 'driver-id', 'version')).toBe(details)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('channel-id/drivers', { driverId: 'driver-id', version: 'version' })
	})

	test('unassignDriver', async () => {
		expect(channelsEndpoint.unassignDriver('channel-id', 'driver-id')).resolves.not.toThrow

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('channel-id/drivers/driver-id')
	})

	test('enrollHub', async () => {
		postSpy.mockResolvedValueOnce({ unused: 'value' })

		expect(channelsEndpoint.enrollHub('channel-id', 'hub-id')).resolves.not.toThrow

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('channel-id/hubs/hub-id')
	})

	test('unenrollHub', async () => {
		expect(channelsEndpoint.unenrollHub('channel-id', 'hub-id')).resolves.not.toThrow

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('channel-id/hubs/hub-id')
	})
})
