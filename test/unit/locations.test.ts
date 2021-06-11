import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Location, LocationItem,
	SuccessStatusValue, Status,
} from '../../src'
import {expectedRequest} from './helpers/utils'


import list from './data/locations/get_locations'
import get from './data/locations/get_locations_95efee9b-6073-4871-b5ba-de6642187293'
import explicitGet from './data/locations/get_locations_b4db3e54-14f3-4bf4-b217-b8583757d446'
import create from './data/locations/post_locations'
import update from './data/locations/put_locations_152b4d07-88fb-450d-896c-a82896efd83f'
import deleteLocation  from './data/locations/delete_locations_152b4d07-88fb-450d-896c-a82896efd83f'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')
const client = new SmartThingsClient(authenticator, {locationId: '95efee9b-6073-4871-b5ba-de6642187293'})


describe('Locations',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: LocationItem[] = await client.locations.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('explicit get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: explicitGet.response }))
		const response: Location = await client.locations.get('b4db3e54-14f3-4bf4-b217-b8583757d446')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(explicitGet.request))
		expect(response).toBe(explicitGet.response)
	})

	it('implicit get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: Location = await client.locations.get()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: Location = await client.locations.create({
			'countryCode': 'USA',
			'name': 'Created by Functional Tests',
			'latitude': 37,
			'longitude': -122,
			'regionRadius': 100,
			'temperatureScale': 'F',
			'locale': 'en_US',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: Location = await client.locations.update('152b4d07-88fb-450d-896c-a82896efd83f', {
			'name': 'Modified by Functional Tests',
			'latitude': 38,
			'longitude': -121,
			'regionRadius': 180,
			'temperatureScale': 'C',
			'locale': 'en_GB',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteLocation.response }))
		const response: Status = await client.locations.delete('152b4d07-88fb-450d-896c-a82896efd83f')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteLocation.request))
		expect(response).toEqual(SuccessStatusValue)
	})

})
