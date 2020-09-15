import axios from '../../__mocks__/axios'

import {
	BearerTokenAuthenticator,
	SmartThingsClient,
	DeviceProfile, DeviceProfileStatus, SuccessStatusValue, Status,
} from '../../src'
import {expectedRequest} from './helpers/utils'


import list from './data/deviceprofiles/get_deviceprofiles'
import get from './data/deviceprofiles/get_deviceprofiles_96406249-c14c-4d0e-8dd2-f62fbe381e78'
import create from './data/deviceprofiles/post_deviceprofiles'
import update from './data/deviceprofiles/put_deviceprofiles_149476cd-3ca9-4e62-ba40-a399e558b2bf'
import updateStatus from './data/deviceprofiles/post_deviceprofiles_149476cd-3ca9-4e62-ba40-a399e558b2bf_status'
import deleteProfile  from './data/deviceprofiles/delete_deviceprofiles_149476cd-3ca9-4e62-ba40-a399e558b2bf'
import getLocales from './data/deviceprofiles/get_deviceprofiles_3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb_i18n'
import putTranslations from './data/deviceprofiles/put_deviceprofiles_3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb_i18n_fr'
import deleteTranslations from './data/deviceprofiles/delete_deviceprofiles_3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb_i18n_fr'


const authenticator = new BearerTokenAuthenticator('52991afa-66e8-4af0-8d85-5c568ed5ba7d')
const client = new SmartThingsClient(authenticator, {})


describe('Device Profiles',  () => {
	afterEach(() => {
		axios.request.mockReset()
	})

	it('list', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: list.response }))
		const response: DeviceProfile[] = await client.deviceProfiles.list()
		expect(axios.request).toHaveBeenCalledTimes(1)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(list.request))
		expect(response).toBe(list.response.items)
	})

	it('get', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: get.response }))
		const response: DeviceProfile = await client.deviceProfiles.get('96406249-c14c-4d0e-8dd2-f62fbe381e78')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(get.request))
		expect(response).toBe(get.response)
	})

	it('create', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: create.response }))
		const response: DeviceProfile = await client.deviceProfiles.create({
			'name': 'Functional Test Switch',
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
					],
					'categories': [],
				},
			],
			'metadata': {
				'vid': 'simple-switch',
				'deviceType': 'Switch',
				'ocfDeviceType': 'oic.d.switch',
				'mnmn': 'fIIT',
				'deviceTypeId': 'Switch',
				'ocfSpecVer': 'core 1.1.0',
				'mnid': 'fIIT',
				'mnId': 'fIIT',
			},
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(create.request))
		expect(response).toBe(create.response)
	})

	it('update', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: update.response }))
		const response: DeviceProfile = await client.deviceProfiles.update('149476cd-3ca9-4e62-ba40-a399e558b2bf', {
			'components': [
				{
					'id': 'main',
					'capabilities': [
						{
							'id': 'switch',
							'version': 1,
						},
						{
							'id': 'switchLevel',
							'version': 1,
						},
					],
					'categories': [],
				},
			],
			'metadata': {
				'vid': 'simple-dimmer',
				'deviceType': 'Light',
				'ocfDeviceType': 'oic.d.light',
				'mnmn': 'fIIT',
				'deviceTypeId': 'Light',
				'ocfSpecVer': 'core 1.1.0',
				'mnid': 'fIIT',
				'mnId': 'fIIT',
			},
		})
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(update.request))
		expect(response).toBe(update.response)
	})

	it('update status', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: updateStatus.response }))
		const response: DeviceProfile = await client.deviceProfiles.updateStatus('149476cd-3ca9-4e62-ba40-a399e558b2bf', DeviceProfileStatus.PUBLISHED)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(updateStatus.request))
		expect(response).toBe(updateStatus.response)
	})

	it('delete', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteProfile.response }))
		const response: Status = await client.deviceProfiles.delete('149476cd-3ca9-4e62-ba40-a399e558b2bf')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteProfile.request))
		expect(response).toEqual(SuccessStatusValue)
	})

	it('get locales', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: getLocales.response }))
		const response = await client.deviceProfiles.listLocales('3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(getLocales.request))
		expect(response).toBe(getLocales.response.items)
	})

	it('Create a new translation', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: putTranslations.response }))

		const data = {
			'tag': 'fr',
			'components': {
				'main': {
					'label': 'Alimentation Principale',
					'description': 'Contrôle l\'alimentation de toutes les prises',
				},
				'outlet1': {
					'label': 'Sortie Un',
					'description': 'Prise de courant commutable 1',
				},
				'outlet2': {
					'label': 'Sortie Deux',
					'description': 'Prise de courant commutable 2',
				},
			},
		}

		const response = await client.deviceProfiles.upsertTranslations('3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb', data)
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(putTranslations.request))
		expect(response).toBe(putTranslations.response)
	})

	it('delete translations', async () => {
		axios.request.mockImplementationOnce(() => Promise.resolve({ status: 200, data: deleteTranslations.response }))
		const response: Status = await client.deviceProfiles.deleteTranslations('3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb', 'fr')
		expect(axios.request).toHaveBeenCalledWith(expectedRequest(deleteTranslations.request))
		expect(response).toEqual(SuccessStatusValue)
	})
})
