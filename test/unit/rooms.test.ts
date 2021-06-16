import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Device,
	Room,
	SuccessStatusValue, Status,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms as list,
	get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_rooms as listExplicit,
	get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms_717ce958 as get,
	get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_rooms_717ce958 as explicitGet,
	get_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms_717ce958_devices as listDevices,
} from './data/rooms/get'
import {
	post_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms as create,
} from './data/rooms/post'
import {
	put_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms_f32f1b48 as update,
} from './data/rooms/put'
import {
	delete_locations_95efee9b_6073_4871_b5ba_de6642187293_rooms as deleteRoom,
	delete_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_rooms as deleteRoomExplicit,
} from './data/rooms/delete'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')
const client = new SmartThingsClient(authenticator, { locationId: '95efee9b-6073-4871-b5ba-de6642187293' })

describe('Rooms', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: Room[] = await client.rooms.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('list explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listExplicit.response }))
		const response: Room[] = await client.rooms.list('b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listExplicit.request))
		expect(response).toBe(listExplicit.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: Room = await client.rooms.get('717ce958-49c6-4448-8544-fa2da2e7592b')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('get explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: explicitGet.response }))
		const response: Room = await client.rooms.get(
			'717ce958-49c6-4448-8544-fa2da2e7592b',
			'b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(explicitGet.request))
		expect(response).toBe(explicitGet.response)
	})

	it('list devices', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listDevices.response }))
		const response: Device[] = await client.rooms.listDevices('717ce958-49c6-4448-8544-fa2da2e7592b')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listDevices.request))
		expect(response).toBe(listDevices.response.items)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: Room = await client.rooms.create({
			'name': 'Test Room',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: Room = await client.rooms.update('f32f1b48-58ab-441b-8240-10860cc52618', {
			'name': 'Test Room Renamed',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteRoom.response }))
		const response: Status = await client.rooms.delete('f32f1b48-58ab-441b-8240-10860cc52618')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteRoom.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('delete explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteRoomExplicit.response }))
		const response: Status = await client.rooms.delete(
			'f32f1b48-58ab-441b-8240-10860cc52618',
			'b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteRoomExplicit.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
