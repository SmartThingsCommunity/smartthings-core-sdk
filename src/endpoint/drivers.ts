import { Endpoint } from '../endpoint'
import { EndpointClient, EndpointClientConfig } from '../endpoint-client'


export interface EdgeClientClusters {
	/**
	 * List of 16-bit cluster identifiers for client clusters.
	 *
	 * values are integers.
	 */
	client?: number[]

	/**
	 * List of 16-bit cluster identifiers for server clusters.
	 *
	 * values are integers.
	 */
	server?: number[]
}

export interface EdgeDeviceIntegrationProfileKey {
	/**
	 * This is not yet marked as required in the API docs but it is.
	 */
	id: string

	/**
	 * Major Version of the integration profile
	 *
	 * Value is 64 bit integer.
	 * This is not yet marked as required in the API docs but it is.
	 */
	majorVersion: number
}

export interface EdgeZigbeeGenericFingerprint {
	clusters?: EdgeClientClusters

	/**
	 * Device Identifiers associated with a generic zigbee fingerprint
	 *
	 * values are integers
	 */
	deviceIdentifiers?: number[]

	/**
	 * Device profiles associated with a generic zigbee fingerprint
	 *
	 * values are integers
	 */
	zigbeeProfiles?: number[]

	deviceIntegrationProfileKey?: EdgeDeviceIntegrationProfileKey
}

export interface EdgeZigbeeManufacturerFingerprint {
	/**
	 * Reported manufacturer of the device
	 *
	 * 0-32 characters
	 */
	manufacturer?: string

	/**
	 * Reported model of the device
	 *
	 * 0-32 characters
	 */
	model?: string

	deviceIntegrationProfileKey?: EdgeDeviceIntegrationProfileKey
}

export interface EdgeCommandClasses {
	/**
	 * List of 8-bit command class identifiers to match regardless of controlled or supported
	 */
	either?: number[]

	/**
	 * List of 8-bit command class identifiers that are controlled
	 */
	controlled?: number[]

	/**
	 * List of 8-bit command class identifiers that are supported
	 */
	supported?: number[]
}

export interface EdgeZWaveGenericFingerprint {
	/**
	 * 8-bit indicator for the generic type of the device
	 *
	 * integer 0 - 255
	 */
	genericType?: number

	/**
	 * List of reported command classes
	 *
	 * values are integers
	 */
	specificType?: number[]

	commandClasses?: EdgeCommandClasses

	deviceIntegrationProfileKey?: EdgeDeviceIntegrationProfileKey
}

export interface EdgeZWaveManufacturerFingerprint {
	/**
	 * 16-bit manufacturer defined product type
	 *
	 * integer 0 - 65535
	 */
	productType: number

	/**
	 * 16-bit manufacturer identifier assigned by the Z-Wave Specification
	 *
	 * integer 0 - 65535
	 */
	manufacturerId?: number

	/**
	 * 16-bit manufacturer defined product identifier
	 *
	 * integer 0 - 65535
	 */
	productId?: number

	deviceIntegrationProfileKey?: EdgeDeviceIntegrationProfileKey
}

export interface EdgeDriverFingerprint {
	id: string // string <^[a-zA-Z0-9 _/\\\-()\\[\\]{}\.]{1,36}$> (FingerprintId)
	type: 'ZIGBEE_MANUFACTURER' | 'DTH' | 'ZWAVE_MANUFACTURER'

	/**
	 * Label assigned to device at join time. If this is not set the driver name is used.
	 *
	 * <^[a-zA-Z0-9 _\/\\-()\[\]{}\.]{1,50}$>
	 */
	deviceLabel?: string

	zigbeeGeneric?: EdgeZigbeeGenericFingerprint
	zigbeeManufacturer?: EdgeZigbeeManufacturerFingerprint
	zwaveGeneric?: EdgeZWaveGenericFingerprint
	zwaveManufacturer?: EdgeZWaveManufacturerFingerprint
}

export interface EdgePermissionAttributes {
	[name: string]: unknown
}

export interface EdgeDriverPermissions {
	name: string
	attributes: EdgePermissionAttributes
}

export interface EdgeDriverSummary {
	driverId: string

	/**
	 * The name of the driver
	 *
	 * ^[a-zA-Z0-9 _\/\\-()\[\]{}\.]{1,50}$
	 */
	name: string

	/**
	 * A user-scoped package key used to look up the respective driver record.
	 *
	 * ^[a-zA-Z0-9 _/\\\-()\\[\\]{}\.]{1,36}$
	 */
	packageKey: string

	deviceIntegrationProfiles: EdgeDeviceIntegrationProfileKey[]

	permissions?: EdgeDriverPermissions[]

	/**
	 * The version of the driver revision being returned.
	 *
	 * This is not yet marked as required in the API docs but it is.
	 */
	version: string
}

export interface EdgeDriver extends EdgeDriverSummary {
	fingerprints?: EdgeDriverFingerprint[]
}

export class DriversEndpoint extends Endpoint {
	constructor(config: EndpointClientConfig) {
		super(new EndpointClient('drivers', config))
	}

	public async get(id: string): Promise<EdgeDriver> {
		return this.client.get(id)
	}

	public async getRevision(id: string, version: string): Promise<EdgeDriver> {
		return this.client.get(`${id}/versions/${version}`)
	}

	public async delete(id: string): Promise<void> {
		await this.client.delete(id)
	}

	public async list(): Promise<EdgeDriverSummary[]> {
		return this.client.getPagedItems('')
	}

	/**
	 * List drivers in the default channel. (The default channel in this context is a channel
	 * that users do not need to subscribe to.)
	 */
	public async listDefault(): Promise<EdgeDriverSummary[]> {
		return this.client.getPagedItems('default')
	}

	/**
	 * Uploads the zipped package represented by archiveData.
	 */
	public async upload(archiveData: Uint8Array): Promise<EdgeDriver> {
		return this.client.request('post', 'package', archiveData, undefined,
			{ headerOverrides: { 'Content-Type': 'application/zip' } })
	}
}
