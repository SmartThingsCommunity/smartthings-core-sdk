import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig, HttpClientParams } from '../endpoint-client'
import { Status } from '../types'


export interface SceneSummary {
	/**
	 * The unique identifier of the Scene
	 */
	sceneId?: string
	/**
	 * The user-defined name of the Scene
	 */
	sceneName?: string
	/**
	 * The name of the icon
	 */
	sceneIcon?: string
	/**
	 * The color of the icon
	 */
	sceneColor?: string
	/**
	 * Location of the Scene
	 */
	locationId?: string
	/**
	 * The unique identifier of the user that created the scene
	 */
	createdBy?: string
	/**
	 * The date the scene was created
	 */
	createdDate?: Date
	/**
	 * The date the scene was last updated
	 */
	lastUpdatedDate?: Date
	/**
	 * The date the scene was last executed
	 */
	lastExecutedDate?: Date
	/**
	 * Whether or not this scene can be edited by the logged in user using the version of the app that made the request
	 */
	editable?: boolean
	apiVersion?: string
}

export interface SceneListOptions {
	locationId?: string[]
	max?: number
	page?: number
}

export class ScenesEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('scenes', config))
	}

	/**
	 * Returns a list of scenes filterd by the specified options. If a location ID is included in the options or the
	 * client has been configured with a location ID, then only the scenes in that location are returned. If there is
	 * no locationId configured or specified, then the scenes in all locations accessible to the principal are returned.
	 * @param options optional filtering options accepting the location Id
	 */
	public list(options: SceneListOptions = {}): Promise<SceneSummary[]> {
		const params: HttpClientParams = {}
		if ('locationId' in options && options.locationId) {
			params.locationId = options.locationId
		} else if (this.client.config.locationId) {
			params.locationId = this.client.config.locationId
		}
		return this.client.getPagedItems<SceneSummary>(undefined, params)
	}

	/**
	 * Get a specific scene
	 * @param id UUID of the scene
	 */
	public async get(id: string): Promise<SceneSummary> {
		const list: SceneSummary[] = await this.client.getPagedItems<SceneSummary>()
		if (list) {
			const item = list.find(it => it.sceneId === id)
			if (item) {
				return item
			}
		}
		throw Error(`Scene ${id} not found`)
	}

	/**
	 * Execute the actions specified in a scene
	 * @param id
	 */
	public execute(id: string): Promise<Status> {
		return this.client.post(`${id}/execute`)
	}
}
