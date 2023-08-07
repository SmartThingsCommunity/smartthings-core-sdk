import {
	CommandRequest, CommandList, Command, DeviceHealthState, DeviceProfileUpdate,
	DeviceUpdate, DevicesEndpoint, Device, DeviceEvent, DevicePreferenceResponse, DeviceCreate,
	CommandResponse,
} from '../../src/endpoint/devices'
import { ConfigEntry, ConfigValueType } from '../../src/endpoint/installedapps'
import { BearerTokenAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { SuccessStatusValue } from '../../src/types'
import { PresentationDevicePresentation } from '../../src/endpoint/presentation'


const authenticator = new BearerTokenAuthenticator('00000000-0000-0000-0000-000000000000')

describe('DevicesEndpoint', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post').mockImplementation()
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put').mockImplementation()
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete').mockImplementation()
	const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()

	const locationIdMock = jest.fn<string, [string | undefined]>()
		.mockReturnValue('location-id')
	const installedAppIdMock = jest.fn<string, [string | undefined]>()
		.mockReturnValue('installed-app-id')

	const devicesEndpoint = new DevicesEndpoint({ authenticator })
	devicesEndpoint.locationId = locationIdMock
	devicesEndpoint.installedAppId = installedAppIdMock

	const deviceList = [{ listed: 'device' }] as unknown as Device[]

	describe('list', () => {
		getPagedItemsSpy.mockResolvedValue(deviceList)

		it('works without options', async () => {
			expect(await devicesEndpoint.list()).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, {},
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})

		it('includes configured locationId', async () => {
			const devices = new DevicesEndpoint({ authenticator, locationId: 'configured-location-id' })
			expect(await devices.list()).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, { locationId: 'configured-location-id' },
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})

		it.each([
			['capability', 'search-capability', { capability: 'search-capability' }],
			['locationId', 'wanted-locationId', { locationId: 'wanted-locationId' }],
			['deviceId', 'desired-deviceId', { deviceId: 'desired-deviceId' }],
			['capabilitiesMode', 'my-capabilitiesMode', { capabilitiesMode: 'my-capabilitiesMode' }],
			['includeRestricted', 's-includeRestricted', { includeRestricted: 's-includeRestricted' }],
			['accessLevel', 'search-accessLevel', { accessLevel: 'search-accessLevel' }],
			['includeHealth', true, { includeHealth: 'true' }],
			['includeStatus', true, { includeStatus: 'true' }],
			['installedAppId', 'search-installedAppId', { installedAppId: 'search-installedAppId' }],
			['max', 'search-max', { max: 'search-max' }],
			['page', 'search-page', { page: 'search-page' }],
			['type', 'search-type', { type: 'search-type' }],
		])('handles %s', async (searchKey, searchValue, expectedParams) => {
			expect(await devicesEndpoint.list({ [searchKey]: searchValue })).toBe(deviceList)

			expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
			expect(getPagedItemsSpy).toHaveBeenCalledWith(undefined, expectedParams,
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})
	})

	describe('listInLocation', () => {
		it('works on happy path', async () => {
			const devices = new DevicesEndpoint({ authenticator, locationId: 'configured-location-id' })
			const listSpy = jest.spyOn(devices, 'list').mockResolvedValue(deviceList)

			expect(await devices.listInLocation()).toBe(deviceList)

			expect(listSpy).toHaveBeenCalledTimes(1)
			expect(listSpy).toHaveBeenCalledWith({ locationId: 'configured-location-id' })
		})

		it('throws Exception when no locationId configured', async () => {
			await expect(devicesEndpoint.listInLocation()).rejects.toThrow('Location ID not defined')
		})
	})

	test('listAll', async () => {
		const listSpy = jest.spyOn(devicesEndpoint, 'list').mockResolvedValue(deviceList)

		expect(await devicesEndpoint.listAll()).toBe(deviceList)

		expect(listSpy).toHaveBeenCalledTimes(1)
		expect(listSpy).toHaveBeenCalledWith()
	})

	describe('findByCapability', () => {
		it('works on happy path', async () => {
			const devices = new DevicesEndpoint({ authenticator, locationId: 'unused-in-test' })
			devices.locationId = locationIdMock
			const listSpy = jest.spyOn(devices, 'list').mockResolvedValue(deviceList)

			expect(await devices.findByCapability('capability')).toBe(deviceList)

			expect(listSpy).toHaveBeenCalledTimes(1)
			expect(listSpy).toHaveBeenCalledWith({ locationId: 'location-id', capability: 'capability' })
			expect(locationIdMock).toHaveBeenCalledTimes(1)
			expect(locationIdMock).toHaveBeenCalledWith()
		})

		it('throws Exception when no locationId configured', async () => {
			await expect(devicesEndpoint.findByCapability('capability')).rejects.toThrow('Location ID not defined')
		})
	})

	describe('get', () => {
		it('works without options', async () => {
			const device = { my: 'device' }
			getSpy.mockResolvedValueOnce(device)

			expect(await devicesEndpoint.get('device-id')).toBe(device)

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id', {},
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})

		it('handles includeHealth', async () => {
			const device = { my: 'device' }
			getSpy.mockResolvedValueOnce(device)

			expect(await devicesEndpoint.get('device-id', { includeHealth: true })).toBe(device)

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id', { includeHealth: 'true' },
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})

		it('handles includeStatus', async () => {
			const device = { my: 'device' }
			getSpy.mockResolvedValueOnce(device)

			expect(await devicesEndpoint.get('device-id', { includeStatus: true })).toBe(device)

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id', { includeStatus: 'true' },
				{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
		})
	})

	test('delete', async () => {
		expect(await devicesEndpoint.delete('id-to-delete')).toBe(SuccessStatusValue)

		expect(deleteSpy).toHaveBeenCalledTimes(1)
		expect(deleteSpy).toHaveBeenCalledWith('id-to-delete')
	})

	describe('create', () => {
		const expectedData = {
			label: 'Living room light',
			locationId: 'location-id',
			app: {
				profileId: 'profile-id',
				installedAppId: 'installed-app-id',
				externalId: 'Th13390',
			},
		}

		it('creates app based on `DeviceCreate` type', async () => {
			const device = { new: 'device' }
			postSpy.mockResolvedValueOnce(device)

			const deviceCreate = {
				label: 'Living room light',
				app: {
					profileId: 'profile-id',
					externalId: 'Th13390',
				},
			}

			expect(await devicesEndpoint.create(deviceCreate)).toBe(device)

			expect(locationIdMock).toHaveBeenCalledTimes(1)
			expect(locationIdMock).toHaveBeenCalledWith(undefined)
			expect(installedAppIdMock).toHaveBeenCalledTimes(1)
			expect(installedAppIdMock).toHaveBeenCalledWith(undefined)
			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('', expectedData)
		})

		it('creates app based on `AlternateDeviceCreate` type', async () => {
			const device = { new: 'device' }
			postSpy.mockResolvedValueOnce(device)

			const deviceCreate = {
				label: 'Living room light',
				profileId: 'profile-id',
				locationId: 'other-location-id',
				installedAppId: 'other-installed-app-id',
				externalId: 'Th13390',
			}

			expect(await devicesEndpoint.create(deviceCreate)).toBe(device)

			expect(locationIdMock).toHaveBeenCalledTimes(1)
			expect(locationIdMock).toHaveBeenCalledWith('other-location-id')
			expect(installedAppIdMock).toHaveBeenCalledTimes(1)
			expect(installedAppIdMock).toHaveBeenCalledWith('other-installed-app-id')
			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('', expectedData)
		})

		it('throws exception for blatantly invalid input', async () => {
			await expect(devicesEndpoint.create({} as DeviceCreate)).rejects.toThrow('Invalid device creation data')

			expect(postSpy).toHaveBeenCalledTimes(0)
		})
	})

	test('update', async () => {
		const deviceUpdate = { device: 'update' } as unknown as DeviceUpdate
		const updated = { updated: 'device' }
		putSpy.mockResolvedValueOnce(updated)

		expect(await devicesEndpoint.update('device-id', deviceUpdate)).toBe(updated)

		expect(putSpy).toHaveBeenCalledTimes(1)
		expect(putSpy).toHaveBeenCalledWith('device-id', deviceUpdate)
	})

	test('updateProfile', async () => {
		const deviceProfileUpdate = { device: 'profile update' } as unknown as DeviceProfileUpdate
		const updated = { updated: 'device' }
		putSpy.mockResolvedValueOnce(updated)

		expect(await devicesEndpoint.updateProfile('device-id', deviceProfileUpdate)).toBe(updated)

		expect(putSpy).toHaveBeenCalledTimes(1)
		expect(putSpy).toHaveBeenCalledWith('device-id/profile', deviceProfileUpdate, undefined,
			{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
	})

	test('getStatus', async () => {
		const status = { component: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getStatus('device-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/status')
	})

	test('getState', async () => {
		const status = { component: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getState('device-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/status')
	})

	test('getComponentStatus', async () => {
		const status = { component: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getComponentStatus('device-id', 'component-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/components/component-id/status')
	})

	test('getComponentState', async () => {
		const status = { component: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getComponentState('device-id', 'component-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/components/component-id/status')
	})

	test('getCapabilityStatus', async () => {
		const status = { capability: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getCapabilityStatus('device-id', 'component-id', 'capability-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/components/component-id/capabilities/capability-id/status')
	})

	test('getCapabilityState', async () => {
		const status = { capability: 'status' }
		getSpy.mockResolvedValueOnce(status)

		expect(await devicesEndpoint.getCapabilityState('device-id', 'component-id', 'capability-id')).toBe(status)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/components/component-id/capabilities/capability-id/status')
	})

	describe('getHealth', () => {
		it('works on happy path', async () => {
			const deviceHealth = { deviceId: 'device-id-for-health' }
			getSpy.mockResolvedValueOnce(deviceHealth)

			expect(await devicesEndpoint.getHealth('device-id')).toBe(deviceHealth)

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id/health')
		})

		it('converts 404 to unknown status', async () => {
			getSpy.mockRejectedValueOnce({ statusCode: 404 })

			expect(await devicesEndpoint.getHealth('device-id'))
				.toEqual({ deviceId: 'device-id', state: DeviceHealthState.UNKNOWN })

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id/health')
		})

		it('passes on non-404 error', async () => {
			const error = Error('other error')
			getSpy.mockRejectedValueOnce(error)

			await expect(devicesEndpoint.getHealth('device-id')).rejects.toThrow(error)

			expect(getSpy).toHaveBeenCalledTimes(1)
			expect(getSpy).toHaveBeenCalledWith('device-id/health')
		})
	})

	const commandResponse = { results: [{ id: 'result' }] } as CommandResponse
	describe('executeCommands', () => {
		it('works on happy path', async () => {
			const command = { command: 'command-1' } as Command
			postSpy.mockResolvedValueOnce(commandResponse)

			expect(await devicesEndpoint.executeCommands('device-id', [command])).toBe(commandResponse)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [command] }, {'ordered': undefined})
		})

		it('works with true ordered param passed', async () => {
			const command = { command: 'command-1' } as Command
			postSpy.mockResolvedValueOnce(commandResponse)
			expect(await devicesEndpoint.executeCommands('device-id', [command], true)).toBe(commandResponse)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [command] }, { ordered: true })
		})

		it('works with false ordered param passed', async () => {
			const command = { command: 'command-1' } as Command
			postSpy.mockResolvedValueOnce(commandResponse)
			expect(await devicesEndpoint.executeCommands('device-id', [command], false)).toBe(commandResponse)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [command] }, {'ordered': false})
		})

		it('passes on exceptions', async () => {
			const command = { command: 'command-1' } as Command
			const error = Error('something went wrong')
			postSpy.mockRejectedValueOnce(error)

			await expect(devicesEndpoint.executeCommands('device-id', [command])).rejects.toThrow(error)

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [command] }, {'ordered': undefined})
		})
	})

	test('executeCommand', async () => {
		// create a new instance of devices so we can spy on it and not affect other tests
		const devices = new DevicesEndpoint({ authenticator })
		const executeCommandsSpy = jest.spyOn(devices, 'executeCommands')
			.mockResolvedValueOnce(commandResponse)
		const command = { command: 'command-1' } as Command

		expect(await devices.executeCommand('device-id', command)).toBe(commandResponse)

		expect(executeCommandsSpy).toHaveBeenCalledTimes(1)
		expect(executeCommandsSpy).toHaveBeenCalledWith('device-id', [command])
	})

	test('postCommands', async () => {
		const commandList: CommandList = { commands: [{ command: 'command-1' }] } as CommandList
		postSpy.mockResolvedValueOnce(commandResponse)

		expect(await devicesEndpoint.postCommands('device-id', commandList)).toBe(commandResponse)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('device-id/commands', commandList)
	})

	describe('sendCommand', () => {
		it('processes simple single command', async () => {
			const deviceConfig = {
				deviceId: 'device-id',
				componentId: 'component-id',
				// permissions is required but the sendCommand does not use it
				permissions: ['unused-permission'],
			}
			const configEntry = { valueType: ConfigValueType.DEVICE, deviceConfig }
			postSpy.mockResolvedValueOnce(commandResponse)

			expect(await devicesEndpoint.sendCommand(configEntry, 'capability-id', 'command')).toBe(commandResponse)
			const expectedCommand = {
				component: 'component-id',
				capability: 'capability-id',
				command: 'command',
				arguments: [],
			}

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [expectedCommand] })
		})

		it('builds commands from commands list', async () => {
			const deviceConfig = {
				deviceId: 'device-id',
				componentId: 'component-id',
				permissions: [],
			}
			const configEntry = { valueType: ConfigValueType.DEVICE, deviceConfig }
			const cmdList: CommandRequest[] = [
				{ capability: 'capability-id-1', command: 'command-1' },
				{ capability: 'capability-id-2', command: 'command-2', arguments: ['arg1', 'arg2'] },
			]
			postSpy.mockResolvedValueOnce(commandResponse)

			expect(await devicesEndpoint.sendCommand(configEntry, cmdList)).toBe(commandResponse)
			const expectedCommand1 = {
				component: 'component-id',
				capability: 'capability-id-1',
				command: 'command-1',
				arguments: [],
			}
			const expectedCommand2 = {
				component: 'component-id',
				capability: 'capability-id-2',
				command: 'command-2',
				arguments: ['arg1', 'arg2'],
			}

			expect(postSpy).toHaveBeenCalledTimes(1)
			expect(postSpy).toHaveBeenCalledWith('device-id/commands', { commands: [expectedCommand1, expectedCommand2] })
		})

		it('throws exception if config entry is missing device config', async () => {
			const configEntry = { valueType: ConfigValueType.DEVICE }
			await expect(devicesEndpoint.sendCommand(configEntry, 'capability-id', 'command', ['arg']))
				.rejects.toThrow('Device config not found')

			expect(postSpy).toHaveBeenCalledTimes(0)
		})
	})

	describe('sendCommands', () => {
		const sendCommandSpy = jest.spyOn(devicesEndpoint, 'sendCommand')
		const configEntry1 = { id: 'config-entry-1' }
		const configEntry2 = { id: 'config-entry-2' }

		it('does nothing given no config entries', async () => {
			expect(await devicesEndpoint.sendCommands(undefined as unknown as [], 'capability-id', 'command')).toEqual([])

			expect(sendCommandSpy).toHaveBeenCalledTimes(0)
		})

		it('uses sendCommand to send commands', async () => {
			const configEntries = [configEntry1] as unknown as ConfigEntry[]
			sendCommandSpy.mockResolvedValue(commandResponse)

			expect(await devicesEndpoint.sendCommands(configEntries, 'capability-id', 'command', ['arg']))
				.toEqual([{ status: 'fulfilled', value: commandResponse }])

			expect(sendCommandSpy).toHaveBeenCalledTimes(1)
			expect(sendCommandSpy).toHaveBeenCalledWith(configEntry1, 'capability-id', 'command', ['arg'])
		})

		it('reports all failures and results together', async () => {
			// This reflects how the method currently works but it would be nice if the user could
			// see how each individual command went.
			const configEntries = [configEntry1, configEntry2] as unknown as ConfigEntry[]
			const error = Error('Device config not found')
			sendCommandSpy.mockResolvedValueOnce(commandResponse)
			sendCommandSpy.mockRejectedValueOnce(error)

			expect(await devicesEndpoint.sendCommands(configEntries, 'capability-id', 'command'))
				.toEqual([
					{ status: 'fulfilled', value: commandResponse },
					{ status: 'rejected', reason: error },
				])

			expect(sendCommandSpy).toHaveBeenCalledTimes(2)
			expect(sendCommandSpy).toHaveBeenCalledWith(configEntry1, 'capability-id', 'command', undefined)
			expect(sendCommandSpy).toHaveBeenCalledWith(configEntry2, 'capability-id', 'command', undefined)
		})
	})

	test('createEvents', async () => {
		const events: DeviceEvent[] = [{ component: 'main' } as DeviceEvent]
		postSpy.mockImplementationOnce(async () => {
			// do nothing
		})

		const devices = new DevicesEndpoint({ authenticator })

		expect(await devices.createEvents('device-id', events)).toBe(SuccessStatusValue)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('device-id/events', { deviceEvents: events })
	})

	test('sendEvents', async () => {
		const events = { deviceEvents: [] }

		const devices = new DevicesEndpoint({ authenticator })

		await devices.sendEvents('device-id', events)

		expect(postSpy).toHaveBeenCalledTimes(1)
		expect(postSpy).toHaveBeenCalledWith('device-id/events', events)
	})

	test('getPresentation', async () => {
		const expected = {} as PresentationDevicePresentation
		getSpy.mockResolvedValueOnce(expected)

		const devices = new DevicesEndpoint({ authenticator })

		expect(await devices.getPresentation('device-id')).toBe(expected)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('/presentation', { deviceId: 'device-id' })
	})

	test('getPreferences', async () => {
		const expected = {} as DevicePreferenceResponse
		getSpy.mockResolvedValueOnce(expected)

		const devices = new DevicesEndpoint({ authenticator })

		expect(await devices.getPreferences('device-id')).toBe(expected)

		expect(getSpy).toHaveBeenCalledTimes(1)
		expect(getSpy).toHaveBeenCalledWith('device-id/preferences', undefined,
			{ headerOverrides: { Accept: 'application/vnd.smartthings+json;v=20170916' } })
	})
})
