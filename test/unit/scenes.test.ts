import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	SceneSummary,
	Status,
	SuccessStatusValue,
} from '../../src'
import { expectedRequest } from './helpers/utils'
import {
	get_scenes as listAll,
	get_scenes_locationId_95efee9b_6073_4871_b5ba_de6642187293 as listForLocation,
	get_scenes_13a63ffo as get,
} from './data/scenes/get'
import {
	post_scenes_13a63ff0_587e_45d2_8c4e_b40525f2093c_execute as execute,
} from './data/scenes/post'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'),
	{ locationId: '95efee9b-6073-4871-b5ba-de6642187293' })

const nonIsaClient = new SmartThingsClient(
	new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000'))

describe('Scenes', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List all', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listAll.response }))
		const response: SceneSummary[] = await nonIsaClient.scenes.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listAll.request))
		expect(response).toBe(listAll.response.items)
	})

	it('List for location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listForLocation.response }))
		const response: SceneSummary[] = await client.scenes.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listForLocation.request))
		expect(response).toBe(listForLocation.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: SceneSummary = await client.scenes.get('13a63ff0-587e-45d2-8c4e-b40525f2093c')
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response.sceneName).toEqual('Good Morning')
	})

	it('Execute', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: execute.response }))
		const response: Status = await client.scenes.execute('13a63ff0-587e-45d2-8c4e-b40525f2093c')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(execute.request))
		expect(response).toEqual(SuccessStatusValue)
	})

})
