import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { LocationItem, Location, LocationsEndpoint, LocationCreate, LocationUpdate } from '../../src/endpoint/locations'
import { SuccessStatusValue } from '../../src/types'


const MOCK_LOCATION_LIST = [{ name: 'locationItem' }] as LocationItem[]
const MOCK_LOCATION = { name: 'location' } as Location
const MOCK_LOCATION_CREATE = { name: 'locationCreate' } as LocationCreate
const MOCK_LOCATION_UPDATE = { name: 'locationUpdate' } as LocationUpdate

describe('LocationsEndpoint', () => {
	const authenticator = new NoOpAuthenticator()
	const locationId = 'locationId'
	const locations = new LocationsEndpoint({ authenticator, locationId })

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get')
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems')
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post')
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put')
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('list', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(MOCK_LOCATION_LIST)

		const response = await locations.list()

		expect(response).toStrictEqual(MOCK_LOCATION_LIST)
	})

	test('explicit get', async () => {
		getSpy.mockResolvedValueOnce(MOCK_LOCATION)

		const response = await locations.get('explicitId')

		expect(getSpy).toBeCalledWith('explicitId', expect.objectContaining({ allowed: 'false' }))
		expect(response).toStrictEqual(MOCK_LOCATION)
	})

	test('implicit get', async () => {
		getSpy.mockResolvedValueOnce(MOCK_LOCATION)

		const response = await locations.get()

		expect(getSpy).toBeCalledWith(locationId, expect.objectContaining({ allowed: 'false' }))
		expect(response).toStrictEqual(MOCK_LOCATION)
	})

	it('accepts "allowed" query parameter', async () => {
		getSpy.mockResolvedValueOnce(MOCK_LOCATION)

		const response = await locations.get(locationId, { allowed: true })

		expect(getSpy).toBeCalledWith(locationId, expect.objectContaining({ allowed: 'true' }))
		expect(response).toStrictEqual(MOCK_LOCATION)
	})

	test('create', async () => {
		postSpy.mockResolvedValueOnce(MOCK_LOCATION)

		const response = await locations.create(MOCK_LOCATION_CREATE)

		expect(postSpy).toBeCalledWith(undefined, MOCK_LOCATION_CREATE)
		expect(response).toStrictEqual(MOCK_LOCATION)
	})

	test('update', async () => {
		putSpy.mockResolvedValueOnce(MOCK_LOCATION)

		const response = await locations.update(locationId, MOCK_LOCATION_UPDATE)

		expect(putSpy).toBeCalledWith(locationId, MOCK_LOCATION_UPDATE)
		expect(response).toStrictEqual(MOCK_LOCATION)
	})

	test('delete', async () => {
		deleteSpy.mockResolvedValueOnce({})

		const response = await locations.delete(locationId)

		expect(deleteSpy).toBeCalledWith(locationId)
		expect(response).toStrictEqual(SuccessStatusValue)
	})
})
