import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Mode,
	SuccessStatusValue, Status,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_locations_95efee9b_6073_4871_b5ba_de6642187293_modes as list,
	get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_modes as listExplicit,
	get_locations_95efee9b_6073_4871_b5ba_de6642187293_modes_current as getCurrent,
	get_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_modes_current as explicitGet,
} from './data/modes/get'
import {
	post_locations_95efee9b_6073_4871_b5ba_de6642187293_modes as create,
} from './data/modes/post'
import {
	put_locations_95efee9b_6073_4871_b5ba_de6642187293_modes as update,
	put_locations_95efee9b_6073_4871_b5ba_de6642187293_modes_current as setCurrent,
} from './data/modes/put'
import {
	delete_locations_95efee9b_6073_4871_b5ba_de6642187293_modes as deleteMode,
	delete_locations_b4db3e54_14f3_4bf4_b217_b8583757d446_modes as deleteModeExplicit,
} from './data/modes/delete'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')
const client = new SmartThingsClient(authenticator, { locationId: '95efee9b-6073-4871-b5ba-de6642187293' })

describe('Modes', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: Mode[] = await client.modes.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('list explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listExplicit.response }))
		const response: Mode[] = await client.modes.list('b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listExplicit.request))
		expect(response).toBe(listExplicit.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: Mode = await client.modes.get('ab7d4dc0-c0de-4276-a5dc-6b3a230f1bc7')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toEqual({
			'id': 'ab7d4dc0-c0de-4276-a5dc-6b3a230f1bc7',
			'label': 'Home',
			'name': 'Home',
		})
	})

	it('get current implicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getCurrent.response }))
		const response: Mode = await client.modes.getCurrent()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getCurrent.request))
		expect(response).toBe(getCurrent.response)
	})

	it('get current explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: explicitGet.response }))
		const response: Mode = await client.modes.getCurrent('b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(explicitGet.request))
		expect(response).toBe(explicitGet.response)
	})

	it('set current implicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: setCurrent.response }))
		const response: Mode = await client.modes.setCurrent('7b7ca378-03ed-419d-93c1-76d3bb41c8b3')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(setCurrent.request))
		expect(response).toBe(setCurrent.response)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: Mode = await client.modes.create({
			'label': 'Mode 4',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: Mode = await client.modes.update('7b7ca378-03ed-419d-93c1-76d3bb41c8b3', {
			'label': 'Mode Four',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteMode.response }))
		const response: Status = await client.modes.delete('7b7ca378-03ed-419d-93c1-76d3bb41c8b3')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteMode.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('delete explicit', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteModeExplicit.response }))
		const response: Status = await client.modes.delete(
			'7b7ca378-03ed-419d-93c1-76d3bb41c8b3',
			'b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteModeExplicit.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
