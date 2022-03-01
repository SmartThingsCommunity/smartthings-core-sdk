import { Authenticator } from './authenticator'
import { EndpointClientConfig, HttpClientHeaders, SmartThingsURLProvider,
	defaultSmartThingsURLProvider, WarningFromHeader } from './endpoint-client'
import { Logger } from './logger'


export interface RESTClientConfig {
	logger?: Logger
	loggingId?: string
	version?: string
	headers?: HttpClientHeaders
	urlProvider?: SmartThingsURLProvider
	locationId?: string
	installedAppId?: string
	warningLogger?: (warnings: WarningFromHeader[] | string) => void | Promise<void>
}


// TODO:
// add site version specification and at other levels; need to support header and url versions
// server specification
export class RESTClient {
	protected static defaultHeaders: HttpClientHeaders = {
		'Content-Type': 'application/json;charset=utf-8',
		Accept: 'application/json',
	}

	public config: EndpointClientConfig

	constructor(authenticator: Authenticator, config?: RESTClientConfig) {
		const defaultConfig = {
			authenticator,
			urlProvider: defaultSmartThingsURLProvider,
			useAuth: true,
		}
		const headers = (config && config.headers)
			? { ...RESTClient.defaultHeaders, ...config.headers }
			: { ...RESTClient.defaultHeaders }
		this.config = { ...defaultConfig, ...config, headers }
	}
}
