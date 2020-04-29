import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	ConfigValueType,
	InstallConfigurationStatus,
	InstalledApp,
	InstalledAppConfigItem,
	InstalledAppConfiguration,
	InstalledAppResponse,
	InstalledAppStatus,
	InstalledAppType,
	SmartThingsClient,
	Status,
	SuccessStatusValue,
	TokenInformation,
} from '../../src'
import {expectedRequest} from './helpers/utils'


import list from './data/installedapps/get_installedapps'
import listInLocation from './data/installedapps/get_installedapps_locationId=95efee9b-6073-4871-b5ba-de6642187293'
import listOfAType from './data/installedapps/get_installedapps_installedAppType=WEBHOOK_SMART_APP'
import listWithAStatus from './data/installedapps/get_installedapps_installedAppStatus=AUTHORIZED'
import get from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c'
import getConfigs from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs'
import getConfigsNoAuth
	from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs_noauth'
import getAuthorizedConfigs
	from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs_configurationStatus_authorized'
import getAuthorizedConfig
	from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs_authorized'
import getRevokedConfig
	from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs_revoked'
import getStagedConfig from './data/installedapps/get_installedapps_40593b6d-e062-436a-b17e-86ea3f1d979c_configs_staged'
import create from './data/installedapps/post_installedapps'
import update from './data/installedapps/put_installedapps_e09af197-4a51-42d9-8fd9-a39a67049d4a'
import updateConfig from './data/installedapps/put_installedapps_e09af197-4a51-42d9-8fd9-a39a67049d4a_configs'
import deleteIsa from './data/installedapps/delete_installedapps_5336bd07-435f-4b6c-af1d-fddba55c1c24'
import listConfigs from './data/installedapps/get_installedapps_e09af197-4a51-42d9-8fd9-a39a67049d4a_configs_'
import tokenInfo from './data/installedapps/get_installedapps_me'


const authenticator = new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d')
const client = new SmartThingsClient(authenticator, {})


describe('Installed Apps',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: InstalledApp[] = await client.installedApps.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('list in location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listInLocation.response }))
		const response: InstalledApp[] = await client.installedApps.list({locationId: '95efee9b-6073-4871-b5ba-de6642187293'})
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listInLocation.request))
		expect(response).toBe(listInLocation.response.items)
	})

	it('list of a type', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listOfAType.response }))
		const response: InstalledApp[] = await client.installedApps.list({
			installedAppType: [
				InstalledAppType.WEBHOOK_SMART_APP,
				InstalledAppType.LAMBDA_SMART_APP,
			]})
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listOfAType.request))
		expect(response).toBe(listOfAType.response.items)
	})

	it('list with a status', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listWithAStatus.response }))
		const response: InstalledApp[] = await client.installedApps.list({
			installedAppStatus: InstalledAppStatus.AUTHORIZED,
			deviceId: 'e3893344-372d-46f5-bd3f-e98a5da6cf8d',
		})
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listWithAStatus.request))
		expect(response).toBe(listWithAStatus.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: InstalledApp = await client.installedApps.get('40593b6d-e062-436a-b17e-86ea3f1d979c')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: InstalledAppResponse = await client.installedApps.create({
			'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
			'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
			'installedAppType': InstalledAppType.WEBHOOK_SMART_APP,
			'configurationStatus': InstallConfigurationStatus.DONE,
			'config': {
				'triggerSwitch': [
					{
						'valueType': ConfigValueType.DEVICE,
						'deviceConfig': {
							'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
							'componentId': 'main',
							'permissions': [
								'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
							],
						},
					},
				],
				'targetSwitch': [
					{
						'valueType': ConfigValueType.DEVICE,
						'deviceConfig': {
							'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
							'componentId': 'main',
							'permissions': [
								'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
								'x:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
							],
						},
					},
				],
			},
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: InstalledApp = await client.installedApps.update('e09af197-4a51-42d9-8fd9-a39a67049d4a', {
			'displayName': 'Updated Functional Test Switch Reflector',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('update config', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: updateConfig.response }))
		const response: InstalledAppConfiguration = await client.installedApps.updateConfiguration('e09af197-4a51-42d9-8fd9-a39a67049d4a', {config: {
			'triggerSwitch': [
				{
					'valueType': ConfigValueType.DEVICE,
					'deviceConfig': {
						'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
						'componentId': 'main',
						'permissions': [
							'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
						],
					},
				},
			],
			'targetSwitch': [
				{
					'valueType': ConfigValueType.DEVICE,
					'deviceConfig': {
						'deviceId': 'b97058f4-c642-4162-8c2d-15009fdf5bfc',
						'componentId': 'main',
						'permissions': [
							'r:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
							'x:devices:b97058f4-c642-4162-8c2d-15009fdf5bfc',
						],
					},
				},
				{
					'valueType': ConfigValueType.DEVICE,
					'deviceConfig': {
						'deviceId': '8cfb5b5f-1683-4459-932c-9493c63da626',
						'componentId': 'main',
						'permissions': [
							'r:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
							'x:devices:8cfb5b5f-1683-4459-932c-9493c63da626',
						],
					},
				},
				{
					'valueType': ConfigValueType.DEVICE,
					'deviceConfig': {
						'deviceId': '46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
						'componentId': 'main',
						'permissions': [
							'r:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
							'x:devices:46c38b7c-81bc-4e65-80be-dddf1fdd45b8',
						],
					},
				},
			],
		}})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(updateConfig.request))
		expect(response).toBe(updateConfig.response)
	})

	it('list configurations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listConfigs.response }))
		const response: InstalledAppConfigItem[] = await client.installedApps.listConfigurations('e09af197-4a51-42d9-8fd9-a39a67049d4a')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listConfigs.request))
		expect(response).toEqual(listConfigs.response.items)
	})

	it('get configuration', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getRevokedConfig.response }))
		const response: InstalledAppConfiguration = await client.installedApps.getConfiguration(
			'40593b6d-e062-436a-b17e-86ea3f1d979c', '52764f0b-6bfa-4771-8e31-f5e59ebdbf24')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getRevokedConfig.request))
		expect(response).toEqual(getRevokedConfig.response)
	})

	it('get latest configuration', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getConfigs.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getStagedConfig.response }))

		const response: InstalledAppConfiguration | undefined = await client.installedApps.getLatestConfiguration('40593b6d-e062-436a-b17e-86ea3f1d979c')

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(getConfigs.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(getStagedConfig.request))

		expect(response).toBeDefined
		if (response) {
			expect(response.configurationId).toEqual('fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d')
			expect(response).toEqual(getStagedConfig.response)
		}
	})

	it('get authorized configuration', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getAuthorizedConfigs.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getAuthorizedConfig.response }))

		const response: InstalledAppConfiguration | undefined = await client.installedApps.getAuthorizedConfiguration('40593b6d-e062-436a-b17e-86ea3f1d979c')

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(getAuthorizedConfigs.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(getAuthorizedConfig.request))

		expect(response).toBeDefined
		if (response) {
			expect(response.configurationId).toEqual('e9428d01-6710-45f0-85a4-e31e51d011fe')
			expect(response).toEqual(getAuthorizedConfig.response)
		}
	})

	it('get current configuration', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getAuthorizedConfigs.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getAuthorizedConfig.response }))

		const response: InstalledAppConfiguration | undefined = await client.installedApps.getCurrentConfiguration('40593b6d-e062-436a-b17e-86ea3f1d979c')

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(getAuthorizedConfigs.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(getAuthorizedConfig.request))

		expect(response).toBeDefined
		if (response) {
			expect(response.configurationId).toEqual('e9428d01-6710-45f0-85a4-e31e51d011fe')
			expect(response).toEqual(getAuthorizedConfig.response)
		}
	})

	it('get current configuration noauth', async () => {
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getConfigsNoAuth.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getConfigs.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getStagedConfig.response }))

		const response: InstalledAppConfiguration | undefined = await client.installedApps.getCurrentConfiguration('40593b6d-e062-436a-b17e-86ea3f1d979c')

		expect(axios.request).toHaveBeenCalledTimes(3)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(getAuthorizedConfigs.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(getConfigs.request))
		expect(axios.request).toHaveBeenNthCalledWith(3, expectedRequest(getStagedConfig.request))

		expect(response).toBeDefined
		if (response) {
			expect(response.configurationId).toEqual('fd9b9bbd-c635-4d87-b4ff-f577a6b14a1d')
			expect(response).toEqual(getStagedConfig.response)
		}
	})

	it('token info', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: tokenInfo.response }))
		const response: TokenInformation = await client.installedApps.tokenInfo()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(tokenInfo.request))
		expect(response).toBe(tokenInfo.response)
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteIsa.response }))
		const response: Status = await client.installedApps.delete('5336bd07-435f-4b6c-af1d-fddba55c1c24')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteIsa.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
