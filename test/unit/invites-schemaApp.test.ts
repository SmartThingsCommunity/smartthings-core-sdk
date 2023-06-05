import { NoOpAuthenticator } from '../../src/authenticator'
import { EndpointClient } from '../../src/endpoint-client'
import { InvitesSchemaAppEndpoint, SchemaAppInvitation } from '../../src/endpoint/invites-schemaApp'


afterEach(() => {
	jest.clearAllMocks()
})

const postSpy = jest.spyOn(EndpointClient.prototype, 'post').mockImplementation()
const getPagedItemsSpy = jest.spyOn(EndpointClient.prototype, 'getPagedItems').mockImplementation()
const deleteSpy = jest.spyOn(EndpointClient.prototype, 'delete')
const getSpy = jest.spyOn(EndpointClient.prototype, 'get').mockImplementation()
const putSpy = jest.spyOn(EndpointClient.prototype, 'put').mockImplementation()

const authenticator = new NoOpAuthenticator()
const invitesEndpoint = new InvitesSchemaAppEndpoint( {authenticator})

test('create', async () => {
	const invitationId = { invitationId: 'my-invitation-id' }
	const createData = { schemaAppId: 'schema-app-id' }

	postSpy.mockResolvedValueOnce(invitationId)

	expect(await invitesEndpoint.create(createData)).toBe(invitationId)

	expect(postSpy).toHaveBeenCalledTimes(1)
	expect(postSpy).toHaveBeenCalledWith('', createData)
})

test('list', async () => {
	const invitations = [{ id: 'my-invitation-id' } as SchemaAppInvitation]

	getPagedItemsSpy.mockResolvedValueOnce(invitations)

	expect(await invitesEndpoint.list('schema-app-id')).toBe(invitations)

	expect(getPagedItemsSpy).toHaveBeenCalledTimes(1)
	expect(getPagedItemsSpy).toHaveBeenCalledWith('', { schemaAppId: 'schema-app-id' })
})

test('revoke', async () => {
	await expect(invitesEndpoint.revoke('schema-app-id')).resolves.not.toThrow()

	expect(deleteSpy).toHaveBeenCalledTimes(1)
	expect(deleteSpy).toHaveBeenCalledWith('schema-app-id')
})

test('getAcceptanceStatus', async () => {
	const status = [{ description: 'invitation description', isAccepted: true }]

	getSpy.mockResolvedValueOnce(status)

	expect(await invitesEndpoint.getAcceptanceStatus('invitation-id')).toBe(status)

	expect(getSpy).toHaveBeenCalledTimes(1)
	expect(getSpy).toHaveBeenCalledWith('checkAcceptance', { invitationId: 'invitation-id' })
})

test('accept', async () => {
	const schemaAppId = { schemaAppId: 'schema-app-id' }

	putSpy.mockResolvedValueOnce(schemaAppId)

	expect(await invitesEndpoint.accept('short-code')).toBe(schemaAppId)

	expect(putSpy).toHaveBeenCalledTimes(1)
	expect(putSpy).toHaveBeenCalledWith('short-code/accept')
})
