import { EndpointClient } from './endpoint-client'


export class Endpoint {
	constructor(protected client: EndpointClient) {

	}

	protected locationId(id?: string): string {
		const result = id || this.client.config.locationId
		if (result) {
			return result
		}
		throw Error('Location ID not defined')
	}

	protected installedAppId(id?: string): string {
		const result = id || this.client.config.installedAppId
		if (result) {
			return result
		}
		throw Error('Installed App ID not defined')
	}
}
