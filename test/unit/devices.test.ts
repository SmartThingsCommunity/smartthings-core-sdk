import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	Device, DeviceStatus, DeviceHealth, SuccessStatusValue, Status, ConfigValueType,
} from '../../src'
import {expectedRequest} from './helpers/utils'


import listPage1 from './data/devices/get_devices'
import listPage2 from './data/devices/get_devices_page_1_max_200'
import locationList from './data/devices/get_devices_locationId=95efee9b-6073-4871-b5ba-de6642187293'
import get from './data/devices/get_devices_385931b6-0121-4848-bcc8-54cb76436de1'
import getStatus from './data/devices/get_devices_385931b6-0121-4848-bcc8-54cb76436de1_status'
import getCapabilityStatus from './data/devices/get_devices_385931b6-0121-4848-bcc8-54cb76436de1_components_main_capabilities_colorTemperature_status'
import getComponent1Status from './data/devices/get_devices_46c38b7c-81bc-4e65-80be-dddf1fdd45b8_components_outlet1_status'
import getComponent2Status from './data/devices/get_devices_46c38b7c-81bc-4e65-80be-dddf1fdd45b8_components_outlet2_status'
import getHealth from './data/devices/get_devices_385931b6-0121-4848-bcc8-54cb76436de1_health'
import turnOn1 from './data/devices/post_devices_385931b6-0121-4848-bcc8-54cb76436de1_commands'


const authenticator = new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d')
const locationId ='95efee9b-6073-4871-b5ba-de6642187293'
const isaClient = new SmartThingsClient(authenticator, {locationId})
const client = new SmartThingsClient(authenticator, {})


describe('Devices',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	// it('list', async () => {
	// 	axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deviceList }))
	// 	const response: Device[] = await client.devices.list()
	//
	// 	expect(axios.request).toHaveBeenCalledTimes(1)
	// 	expect(axios.request).toHaveBeenCalledWith(expectedRequest('devices', {}))
	// 	expect(response).toBe(deviceList.items)
	// })
	//
	it('list with multiple pages', async () => {
		const expectedList = [...listPage1.response.items, ...listPage2.response.items]
		axios.request
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listPage1.response }))
			.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listPage2.response }))

		const response: Device[] = await client.devices.list()

		expect(axios.request).toHaveBeenCalledTimes(2)
		expect(axios.request).toHaveBeenNthCalledWith(1, expectedRequest(listPage1.request))
		expect(axios.request).toHaveBeenNthCalledWith(2, expectedRequest(listPage2.request))
		expect(response).toMatchObject(expectedList)
	})

	it('list for an explicit location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: locationList.response}))
		const response: Device[] = await client.devices.list({locationId: locationId})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(locationList.request))
		expect(response).toBe(locationList.response.items)
	})

	it('list for an implicit location', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: locationList.response}))
		const response: Device[] = await isaClient.devices.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(locationList.request))
		expect(response).toBe(locationList.response.items)
	})

	it('list for an implicit location 2', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: locationList.response}))
		const response: Device[] = await isaClient.devices.listInLocation()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(locationList.request))
		expect(response).toBe(locationList.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: Device = await client.devices.get('385931b6-0121-4848-bcc8-54cb76436de1')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('getStatus', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getStatus.response }))
		const response: DeviceStatus = await client.devices.getStatus('385931b6-0121-4848-bcc8-54cb76436de1')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getStatus.request))
		expect(response).toBe(getStatus.response)
	})

	it('getCapabilityStatus', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getCapabilityStatus.response }))
		const response: DeviceStatus = await client.devices.getCapabilityStatus('385931b6-0121-4848-bcc8-54cb76436de1', 'main', 'colorTemperature')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getCapabilityStatus.request))
		expect(response).toBe(getCapabilityStatus.response)
	})

	it('getComponent1Status', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getComponent1Status.response }))
		const response: DeviceStatus = await client.devices.getComponentStatus('46c38b7c-81bc-4e65-80be-dddf1fdd45b8', 'outlet1')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getComponent1Status.request))
		expect(response).toBe(getComponent1Status.response)
	})

	it('getComponent2Status', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getComponent2Status.response }))
		const response: DeviceStatus = await client.devices.getComponentStatus('46c38b7c-81bc-4e65-80be-dddf1fdd45b8', 'outlet2')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getComponent2Status.request))
		expect(response).toBe(getComponent2Status.response)
	})

	it('getHealth', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getHealth.response }))
		const response: DeviceHealth = await client.devices.getHealth('385931b6-0121-4848-bcc8-54cb76436de1')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getHealth.request))
		expect(response).toBe(getHealth.response)
	})

	it('executeCommand', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const response: Status = await client.devices.executeCommand('385931b6-0121-4848-bcc8-54cb76436de1', {
			component: 'main',
			capability: 'switch',
			command: 'on',
			arguments: [],
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('executeCommands', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const response: Status = await client.devices.executeCommands('385931b6-0121-4848-bcc8-54cb76436de1', [{
			component: 'main',
			capability: 'switch',
			command: 'on',
			arguments: [],
		}])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('executeCommands', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const response: Status = await client.devices.executeCommands('385931b6-0121-4848-bcc8-54cb76436de1', [{
			component: 'main',
			capability: 'switch',
			command: 'on',
			arguments: [],
		}])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('postCommands', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const response: Status = await client.devices.postCommands('385931b6-0121-4848-bcc8-54cb76436de1', {commands: [{
			component: 'main',
			capability: 'switch',
			command: 'on',
			arguments: [],
		}]})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('sendCommands', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const configEntry = {
			'valueType': ConfigValueType.DEVICE,
			'deviceConfig': {
				'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
				'componentId': 'main',
				'permissions': [
					'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
					'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
				],
			},
		}
		const response: Status[] = await client.devices.sendCommands([configEntry], 'switch', 'on', [])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response.length).toEqual(1)
		expect(response[0]).toBe(SuccessStatusValue)
	})

	it('sendCommand', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const configEntry = {
			'valueType': ConfigValueType.DEVICE,
			'deviceConfig': {
				'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
				'componentId': 'main',
				'permissions': [
					'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
					'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
				],
			},
		}
		const response: Status = await client.devices.sendCommand(configEntry, 'switch', 'on', [])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})

	it('sendCommand list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: turnOn1.response }))
		const configEntry = {
			'valueType': ConfigValueType.DEVICE,
			'deviceConfig': {
				'deviceId': '385931b6-0121-4848-bcc8-54cb76436de1',
				'componentId': 'main',
				'permissions': [
					'r:devices:385931b6-0121-4848-bcc8-54cb76436de1',
					'x:devices:385931b6-0121-4848-bcc8-54cb76436de1',
				],
			},
		}
		const cmdList = [
			{
				capability: 'switch',
				command: 'on',
			},
		]
		const response: Status = await client.devices.sendCommand(configEntry, cmdList, 'on', [])
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(turnOn1.request))
		expect(response).toBe(SuccessStatusValue)
	})
})
