import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Mode,
	SuccessStatusValue, Status,
} from '../../src'
import {expectedRequest} from './helpers/utils'


import list from './data/modes/get_locations_95efee9b-6073-4871-b5ba-de6642187293_modes'
import listExplicit from './data/modes/get_locations_b4db3e54-14f3-4bf4-b217-b8583757d446_modes'
import getCurrent from './data/modes/get_locations_95efee9b-6073-4871-b5ba-de6642187293_modes_current'
import explicitGet from './data/modes/get_locations_b4db3e54-14f3-4bf4-b217-b8583757d446_modes_current'
import create from './data/modes/post_locations_95efee9b-6073-4871-b5ba-de6642187293_modes'
import update from './data/modes/put_locations_95efee9b-6073-4871-b5ba-de6642187293_modes'
import deleteMode  from './data/modes/delete_locations_95efee9b-6073-4871-b5ba-de6642187293_modes'
import deleteModeExplicit  from './data/modes/delete_locations_b4db3e54-14f3-4bf4-b217-b8583757d446_modes'


const authenticator = new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d')
const client = new SmartThingsClient(authenticator, {locationId: '95efee9b-6073-4871-b5ba-de6642187293'})


describe('Modes',  () => {
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
