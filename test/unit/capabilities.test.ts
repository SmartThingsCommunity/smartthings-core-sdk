import axios from '../../__mocks__/axios'

import { NoOpAuthenticator, SmartThingsClient, Capability, CapabilitySummary, CapabilityCreate, CapabilityNamespace, HttpClientParams } from '../../src'
import capability1 from './data/capabilities/capability1'
import capabilitiesList from './data/capabilities/list'
import capabilitiesList1 from './data/capabilities/list1'
import capabilitiesList2 from './data/capabilities/list2'
import capabilitiesList3 from './data/capabilities/list3'
import standardCapabilitiesList from './data/capabilities/listStandard'
import namespacesList from './data/capabilities/listNamespaces'
import create1 from './data/capabilities/create1'
import getLocales from './data/capabilities/locales'
import putTranslations from './data/capabilities/translations'


const authenticator = new NoOpAuthenticator()
const client = new SmartThingsClient(authenticator, {})

const testNamespace = 'testNamespace'

const data = {
	'tag': 'fr',
	'label': 'Output Modulation',
	'attributes': {
		'outputModulation': {
			'label': 'La modulation de sortie',
			'description': 'Power supply output modulation, i.e. AC frequency or DC',
			'displayTemplate': '{{attribute}} de {{device.label}} est de {{value}}',
			'i18n': {
				'value': {
					'50hz': {
						'label': '50 Hz',
					},
					'60hz': {
						'label': '60 Hz',
					},
					'400hz': {
						'label': '400 Hz',
					},
					'dc': {
						'label': 'DC',
					},
				},
			},
		},
	},
	'commands': {
		'setOutputModulation': {
			'label': 'Set Output Modulation',
			'description': 'Set the output modulation to the specified value',
			'arguments': {
				'outputModulation': {
					'i18n': {},
					'label': 'Output Modulation',
					'description': 'The desired output modulation',
				},
			},
		},
	},
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectedRequest(path?: string, params?: any, data?: any, method = 'get'): any {
	return {
		'url': `https://api.smartthings.com/${path}`,
		'method': method,
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		'data': data,
		'params': params,
		'paramsSerializer': expect.anything(),
	}
}

describe('Capabilities',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList}))
		const response: CapabilitySummary[] = await client.capabilities.list(testNamespace)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(`capabilities/namespaces/${testNamespace}`, undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list with multiple pages', async () => {
		const expectedList = [...capabilitiesList1.items, ...capabilitiesList2.items]
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList1}))
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList2}))
		const response: CapabilitySummary[] = await client.capabilities.list(testNamespace)

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(`capabilities/namespaces/${testNamespace}`, undefined))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(`capabilities/namespaces/${testNamespace}?page=1&max=200`))
		expect(response).toMatchObject(expectedList)
	})

	it('list by id with one version', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList}))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList.items)
	})

	it('list by id with one multiple versions', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: capabilitiesList3}))
		const response: CapabilitySummary[] = await client.capabilities.listVersions('switch')

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/switch', undefined))
		expect(response).toBe(capabilitiesList3.items)
	})

	it('list namespaces', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: namespacesList}))
		const response: CapabilityNamespace[] = await client.capabilities.listNamespaces()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/namespaces', undefined))
		expect(response).toBe(namespacesList)
	})

	it('list standard capabilities', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({status: 200, data: standardCapabilitiesList}))
		const response: CapabilitySummary[] = await client.capabilities.listStandard()

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities', undefined))
		expect(response).toBe(standardCapabilitiesList.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: capability1}))
		const response: Capability = await client.capabilities.get('namespace.colorTemperature', 1)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/namespace.colorTemperature/1'))
		expect(response).toBe(capability1)
	})

	it('create', async () => {
		const reqData: CapabilityCreate = create1
		const resData: Capability = capability1
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: resData}))
		const response: Capability = await client.capabilities.create(reqData)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities', undefined, reqData, 'post'))
		expect(response).toBe(resData)
	})

	it('create with params', async () => {
		const reqData: CapabilityCreate = create1
		const resData: Capability = capability1
		axios.request.mockImplementationOnce(() => Promise.resolve({status: 200, data: resData}))
		const params: HttpClientParams = {'namespace': 'namespace'}
		const response: Capability = await client.capabilities.create(reqData, params)

		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities', params, reqData, 'post'))
		expect(response).toBe(resData)
	})

	it('get locales', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getLocales }))
		const response = await client.capabilities.listLocales('bobflorian.outputModulation', 1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, undefined))
		expect(response).toBe(getLocales.items)
	})

	it('Create a new translation', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putTranslations }))

		const response = await client.capabilities.createTranslations('bobflorian.outputModulation', 1, data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, data, 'post'))
		expect(response).toBe(putTranslations)
	})

	describe('upsert', () => {
		it('is happy with create when it works', async () => {
			axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putTranslations }))

			const response = await client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, data)
			expect(axios.request).toHaveBeenCalledTimes(1)
			expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, data, 'post'))
			expect(response).toBe(putTranslations)
		})

		it('calls update when create fails because of pre-existing translation', async () => {
			axios.request
				.mockRejectedValueOnce({ message: '... Localization already exists ...' })
				.mockResolvedValueOnce({ status: 200, data: putTranslations })

			const response = await client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, data)
			expect(axios.request).toHaveBeenCalledTimes(2)
			expect(axios.request).toHaveBeenCalledWith(expectedRequest('capabilities/bobflorian.outputModulation/1/i18n', undefined, data, 'post'))
			expect(response).toBe(putTranslations)
		})

		it('passed on other creation errors', async () => {
			const error = Error('something bad happened')
			axios.request.mockRejectedValueOnce(error)

			const promise = client.capabilities.upsertTranslations('bobflorian.outputModulation', 1, data)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			expect(promise).rejects.toThrow(error)
		})
	})
})
