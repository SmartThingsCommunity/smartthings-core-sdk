import axios from '../../__mocks__/axios'
import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	SchemaApp, SchemaPage,
	Status,
	SuccessStatusValue, InstalledSchemaApp,
} from '../../src'
import {expectedRequest} from './helpers/utils'
import list from './data/schema/get_schema_apps'
import get from './data/schema/get_schema_apps_viper_4cb1e740-d415-11e9-8250-8f49824a9876'
import create from './data/schema/post_schema_apps'
import update from './data/schema/put_schema_apps_viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53'
import getAuthorized from './data/schema/get_schema_install_viper_4cb1e740-d415-11e9-8250-8f49824a9876'
import getUnauthorized from './data/schema/get_schema_install_viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53'
import listInstalledApps from './data/schema/get_schema_installedapps_location_95efee9b-6073-4871-b5ba-de6642187293'
import getInstalledApp from './data/schema/get_schema_installedapps_df5dd5f2-7080-4c0b-8bbb-1b64e05ccbd5'
import deleteInstalledApp from './data/schema/delete_schema_installedapps_b2e93ec5-23e3-45dc-acad-d70c3f044b1d'
import deleteApp from './data/schema/delete_schema_apps_viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53'


const client = new SmartThingsClient(
	new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d'))

describe('Schema',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('List', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response}))
		const response: SchemaApp[] = await client.schema.list()
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.endpointApps)
	})

	it('Get app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response}))
		const response: SchemaApp = await client.schema.get('viper_4cb1e740-d415-11e9-8250-8f49824a9876')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('Create app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response}))
		const response: SchemaApp = await client.schema.create({
			'appName': 'Functional Test Schema App',
			'partnerName': 'Functional Test',
			'hostingType': 'lambda',
			'oAuthAuthorizationUrl': 'https://st-schema.ngrok.io/oauth/login',
			'oAuthClientId': '15245388-2660-4a3e-a1be-1e276dba1377',
			'oAuthClientSecret': '90459b40-cc1a-4f4e-8a50-0b8bca9892b4',
			'oAuthTokenUrl': 'https://st-schema.ngrok.io/oauth/token',
			'icon': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYU2Cs',
			'lambdaArn': 'arn:aws:lambda:us-east-1:084870046141:function:st-virtual-devices'
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('Update app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response}))
		const response: Status = await client.schema.update('viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53', {
			'appName': 'Functional Test Schema App (Modified)',
			'partnerName': 'Functional Test (Modified)',
			'icon': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYUxyz',
			'icon2x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYUxyz',
			'icon3x': 'https://catalog3rd.samsungiotcloud.com/devws/j2fF9Fg3oClYUxyz',
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Get authorized page', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getAuthorized.response}))
		const response: SchemaPage = await client.schema.getPage('viper_4cb1e740-d415-11e9-8250-8f49824a9876', '95efee9b-6073-4871-b5ba-de6642187293')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getAuthorized.request))
		expect(response).toEqual(getAuthorized.response)
	})

	it('Get unauthorized page', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getUnauthorized.response}))
		const response: SchemaPage = await client.schema.getPage('viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53', '95efee9b-6073-4871-b5ba-de6642187293')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getUnauthorized.request))
		expect(response).toEqual(getUnauthorized.response)
	})

	it('List installed apps', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: listInstalledApps.response}))
		const response: InstalledSchemaApp[] = await client.schema.installedApps('95efee9b-6073-4871-b5ba-de6642187293')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(listInstalledApps.request))
		expect(response).toBe(listInstalledApps.response.installedSmartApps)
	})

	it('Get installed app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getInstalledApp.response}))
		const response: InstalledSchemaApp = await client.schema.getInstalledApp('df5dd5f2-7080-4c0b-8bbb-1b64e05ccbd5')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getInstalledApp.request))
		expect(response).toBe(getInstalledApp.response)
	})

	it('Delete installed app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteInstalledApp.response}))
		const response: Status = await client.schema.deleteInstalledApp('b2e93ec5-23e3-45dc-acad-d70c3f044b1d')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteInstalledApp.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Delete app', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteApp.response}))
		const response: Status = await client.schema.delete('viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteApp.request))
		expect(response).toEqual(SuccessStatusValue)
	})

})
