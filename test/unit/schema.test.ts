import {
	SmartThingsClient,
	SchemaApp,
	SchemaAppRequest,
	Status,
	SuccessStatusValue,
	InstalledSchemaApp,
	EndpointClient,
	SchemaCreateResponse,
	NoOpAuthenticator,
} from '../../src'


const client = new SmartThingsClient(new NoOpAuthenticator())

describe('Schema', () => {
	const getSpy = jest.spyOn(EndpointClient.prototype, 'get')
	const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')
	const postSpy = jest.spyOn(EndpointClient.prototype, 'post')
	const putSpy = jest.spyOn(EndpointClient.prototype, 'put')

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('List', async () => {
		const list = [{endpointAppId: 'endpoint_app_id'}] as SchemaApp[]
		getSpy.mockResolvedValueOnce({endpointApps: list})
		const response = await client.schema.list()
		expect(getSpy).toHaveBeenCalledWith('apps')
		expect(response).toStrictEqual(list)
	})

	it('Get app', async () => {
		const app = {endpointAppId: 'endpoint_app_id'}
		getSpy.mockResolvedValueOnce(app)
		const response = await client.schema.get('endpoint_app_id')
		expect(getSpy).toHaveBeenCalledWith('apps/endpoint_app_id')
		expect(response).toBe(app)
	})

	it('Create app', async () => {
		const app = { appName: 'Test app' } as SchemaAppRequest
		postSpy.mockResolvedValueOnce(app)

		const response = await client.schema.create(app)

		expect(postSpy).toHaveBeenCalledWith('apps', app, undefined, undefined)
		expect(response).toStrictEqual(app)
	})

	it('Create app with organization', async () => {
		const app = { appName: 'Test app' } as SchemaAppRequest
		postSpy.mockResolvedValueOnce(app)

		const response = await client.schema.create(app, 'organization-id')

		expect(postSpy).toHaveBeenCalledWith(
			'apps',
			app,
			undefined,
			{ headerOverrides: { 'X-ST-Organization': 'organization-id' }},
		)
		expect(response).toStrictEqual(app)
	})

	it('Update app', async () => {
		const app = { appName: 'Test app (modified)' } as SchemaAppRequest
		const id = 'schema-app-id'
		putSpy.mockResolvedValueOnce(app)

		const response: Status = await client.schema.update(id, app as SchemaAppRequest)

		expect(putSpy).toHaveBeenCalledWith(`apps/${id}`, app, undefined, undefined)
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Update app with organization', async () => {
		const app = { appName: 'Test app (modified)' } as SchemaAppRequest
		const id = 'schema-app-id'
		putSpy.mockResolvedValueOnce(app)

		const response: Status = await client.schema.update(id, app as SchemaAppRequest, 'organization-id')

		expect(putSpy).toHaveBeenCalledWith(
			`apps/${id}`,
			app, undefined,
			{ headerOverrides: { 'X-ST-Organization': 'organization-id' }},
		)
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Regenerate OAuth', async () => {
		const app = { endpointAppId: 'schema-app-id', stClientId: 'xxx', stClientSecret: 'yyy' } as SchemaCreateResponse
		postSpy.mockResolvedValueOnce(app)
		const response = await client.schema.regenerateOauth('schema-app-id')
		expect(postSpy).toHaveBeenCalledWith('oauth/stclient/credentials', { endpointAppId: 'schema-app-id' })
		expect(response).toStrictEqual(app)
	})

	it('Get page', async () => {
		const page = { pageType: 'requiresLogin' }
		getSpy.mockResolvedValueOnce(page)
		const response = await client.schema.getPage('schema-app-id', 'location_id')
		expect(getSpy).toHaveBeenCalledWith('install/schema-app-id?locationId=location_id&type=oauthLink')
		expect(response).toStrictEqual(page)
	})

	it('List installed apps', async () => {
		const list = [{ isaId: 'isa_id'}]
		getSpy.mockResolvedValueOnce({installedSmartApps: list})
		const response = await client.schema.installedApps('location_id')
		expect(getSpy).toHaveBeenCalledWith('installedapps/location/location_id')
		expect(response).toStrictEqual(list)
	})

	it('List installed apps empty', async () => {
		const list: InstalledSchemaApp[] = []
		getSpy.mockResolvedValueOnce(undefined)
		const response = await client.schema.installedApps('location_id')
		expect(getSpy).toHaveBeenCalledWith('installedapps/location/location_id')
		expect(response).toStrictEqual(list)
	})


	it('Get installed app', async () => {
		const app = { isaId: 'isa_id'}
		getSpy.mockResolvedValueOnce(app)
		const response = await client.schema.getInstalledApp('isa_id')
		expect(getSpy).toHaveBeenCalledWith('installedapps/isa_id')
		expect(response).toStrictEqual(app)
	})

	it('Delete installed app', async () => {
		deleteSpy.mockResolvedValueOnce(undefined)
		const response = await client.schema.deleteInstalledApp('isa_id')
		expect(deleteSpy).toHaveBeenCalledWith('installedapps/isa_id')
		expect(response).toEqual(SuccessStatusValue)
	})

	it('Delete app', async () => {
		deleteSpy.mockResolvedValueOnce(undefined)
		const response = await client.schema.delete('endpoint_app_id')
		expect(deleteSpy).toHaveBeenCalledWith('apps/endpoint_app_id')
		expect(response).toEqual(SuccessStatusValue)
	})

})
