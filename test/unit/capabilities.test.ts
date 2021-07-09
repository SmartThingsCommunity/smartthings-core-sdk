import axios from '../../__mocks__/axios'
import { NoOpAuthenticator, SmartThingsClient, Capability, CapabilitySummary, CapabilityCreate, CapabilityNamespace, HttpClientParams } from '../../src'
import {
	get_capability as capability1,
	list_capabilities as capabilitiesList,
	list_capabilities_1 as capabilitiesList1,
	list_capabilities_2 as capabilitiesList2,
	list_capabilities_3 as capabilitiesList3,
	list_standard as standardCapabilitiesList,
	list_namespaces as namespacesList,
	get_locales as getLocales,
} from './data/capabilities/get'
import { put_translations as putTranslations } from './data/capabilities/put'
import { post_capability as create1 } from './data/capabilities/post'
import { buildRequest } from './helpers/utils'


const authenticator = new NoOpAuthenticator()
const client = new SmartThingsClient(authenticator, {})

const testNamespace = 'testNamespace'

describe('Capabilities', () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilitiesList }))
		const response: CapabilitySummary[] = await client.capabilities.list(testNamespace)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest(`capabilities/namespaces/${testNamespace}`, undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list with multiple pages', async () => {
		const expectedList = [...capabilitiesList1.items, ...capabilitiesList2.items]
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilitiesList1 }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilitiesList2 }))
		const response: CapabilitySummary[] = await client.capabilities.list(testNamespace)

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, buildRequest(`capabilities/namespaces/${testNamespace}`, undefined))
		expect(axios.request).toHaveBeenNthCalledWith(2, buildRequest(`capabilities/namespaces/${testNamespace}?page=1&max=200`))
		expect(response).toMatchObject(expectedList)
	})

	it('list by id with one version', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilitiesList }))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list by id with one multiple versions', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capabilitiesList3 }))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList3.items)
	})

	it('list namespaces', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: namespacesList }))
		const response: CapabilityNamespace[] = await client.capabilities.listNamespaces()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/namespaces', undefined))
		expect(response).toBe(namespacesList)
	})

	it('list standard capabilities', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: standardCapabilitiesList }))
		const response: CapabilitySummary[] = await client.capabilities.listStandard()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities', undefined))
		expect(response).toBe(standardCapabilitiesList.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: capability1 }))
		const response: Capability = await client.capabilities.get('namespace.colorTemperature', 1)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/namespace.colorTemperature/1'))
		expect(response).toBe(capability1)
	})

	it('create', async () => {
		const reqData: CapabilityCreate = create1
		const resData: Capability = capability1
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: resData }))
		const response: Capability = await client.capabilities.create(reqData)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities', undefined, reqData, 'post'))
		expect(response).toBe(resData)
	})

	it('create with params', async () => {
		const reqData: CapabilityCreate = create1
		const resData: Capability = capability1
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: resData }))
		const params: HttpClientParams = { 'namespace': 'namespace' }
		const response: Capability = await client.capabilities.create(reqData, params)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities', params, reqData, 'post'))
		expect(response).toBe(resData)
	})

	it('get locales', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getLocales }))
		const response = await client.capabilities.listLocales('bobflorian.outputModulation', 1)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, undefined))
		expect(response).toBe(getLocales.items)
	})

	it('Create a new translation', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putTranslations }))

		const response = await client.capabilities.createTranslations('bobflorian.outputModulation', 1, putTranslations)
		expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, putTranslations, 'post'))
		expect(response).toBe(putTranslations)
	})

	describe('upsert', () => {
		it('is happy with create when it works', async () => {
			axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putTranslations }))

			const response = await client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, putTranslations)
			expect(axios.request).toHaveBeenCalledTimes(1)
			expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, putTranslations, 'post'))
			expect(response).toBe(putTranslations)
		})

		it('calls update when create fails because of pre-existing translation', async () => {
			axios.request
				.mockRejectedValueOnce({ message: '... Localization already exists ...' })
				.mockResolvedValueOnce({ status: 200, data: putTranslations })

			const response = await client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, putTranslations)
			expect(axios.request).toHaveBeenCalledTimes(2)
			expect(axios.request).toHaveBeenCalledWith(buildRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, putTranslations, 'post'))
			expect(response).toBe(putTranslations)
		})

		it('passed on other creation errors', async () => {
			const error = Error('something bad happened')
			axios.request.mockRejectedValueOnce(error)

			const promise = client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, putTranslations)
			await expect(promise).rejects.toThrow(error)
		})
	})
})
