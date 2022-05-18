import { NoOpAuthenticator } from '../../src/authenticator'
import { Rule, RuleExecutionResponse, RuleRequest, RulesEndpoint } from '../../src/endpoint/rules'
import { EndpointClient } from '../../src/endpoint-client'


describe('RulesEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post').mockImplementation()
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put').mockImplementation()
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()

	const locationIdMock = jest.fn<string, [string | undefined]>()
		.mockReturnValue('final-location-id')

	const authenticator = new NoOpAuthenticator()
	const rulesEndpoint = new RulesEndpoint({ authenticator })
	rulesEndpoint.locationId = locationIdMock

	const rulesList = [{ id: 'listed-rule' }] as Rule[]

	test('list', async () => {
		getPagedItemsSpy.mockResolvedValueOnce(rulesList)

		expect(await rulesEndpoint.list('input-location-id')).toBe(rulesList)

		expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { locationId: 'final-location-id' })
		expect(locationIdMock).toHaveBeenCalledTimes(1)
		expect(locationIdMock).toHaveBeenCalledWith('input-location-id')
	})

	test('get', async () => {
		const rule = { id: 'rule-id' }
		getSpy.mockResolvedValueOnce(rule)

		expect(await rulesEndpoint.get('requested-rule-id', 'input-location-id')).toBe(rule)

		expect(getSpy).toHaveBeenCalledWith('requested-rule-id', { locationId: 'final-location-id' })
		expect(locationIdMock).toHaveBeenCalledTimes(1)
		expect(locationIdMock).toHaveBeenCalledWith('input-location-id')
	})

	test('delete', async () => {
		const rule = { id: 'rule-to-delete-id' }
		deleteSpy.mockResolvedValueOnce(rule)
		expect(await rulesEndpoint.delete('id-to-delete', 'input-location-id')).toBe(rule)

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('id-to-delete', { locationId: 'final-location-id' })
		expect(locationIdMock).toHaveBeenCalledTimes(1)
		expect(locationIdMock).toHaveBeenCalledWith('input-location-id')
	})

	test('create', async () => {
		const createRequest = { name: 'rule-to-create' } as RuleRequest
		const createdRule = { id: 'created-rule' } as Rule
		postSpy.mockResolvedValueOnce(createdRule)

		expect(await rulesEndpoint.create(createRequest, 'input-location-id')).toBe(createdRule)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith(undefined, createRequest, { locationId: 'final-location-id' })
	})

	test('update', async () => {
		const updateRequest = { name: 'rule-to-update' } as RuleRequest
		const updatedRule = { id: 'updated-rule' } as Rule
		putSpy.mockResolvedValueOnce(updatedRule)

		expect(await rulesEndpoint.update('input-rule-id', updateRequest, 'input-location-id')).toBe(updatedRule)

		expect(putSpy).toHaveBeenCalledTimes(1)
		expect(putSpy).toHaveBeenCalledWith('input-rule-id', updateRequest, { locationId: 'final-location-id' })
	})

	test('execute', async () => {
		const executeResponse = {} as RuleExecutionResponse
		postSpy.mockResolvedValue(executeResponse)

		expect(await rulesEndpoint.execute('id-of-rule-to-execute', 'input-location-id')).toBe(executeResponse)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('execute/id-of-rule-to-execute', undefined, { locationId: 'final-location-id' })
	})
})
