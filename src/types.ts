export interface Link {
	href: string
}

export interface Links {
	next?: Link
	previous?: Link
}

export interface Count {
	count: number
}

export enum OwnerType {
	USER = 'USER',
	SYSTEM = 'SYSTEM',
	IMPLICIT = 'IMPLICIT',
}

export interface Owner {
	/**
	 * The account type which owns the specific domain item.
	 */
	ownerType: OwnerType
	/**
	 * A global identifier for owner.
	 */
	ownerId: string
}

// New SmartApps can only be `LOCATION` but pre-existing SmartApps might have other values.
export const principalTypeValues = ['LOCATION'] as const
export type PrincipalType = typeof principalTypeValues[number]
export const viewPrincipalTypeValues = [...principalTypeValues, 'USER_LEVEL', 'ACCOUNT_LEVEL'] as const
export type ViewPrincipalType = typeof viewPrincipalTypeValues[number]

export interface Status {
	status: string
}

export const SuccessStatusValue = {
	status: 'success',
}

export interface IconImage {
	url?: string
}

export interface LocaleReference {
	/** The tag of the locale as defined in [RFC bcp47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt). */
	tag: LocaleTag
}

/**
 * The tag of the locale as defined in [RFC bcp47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt).
 * @example en
 */
export type LocaleTag = string

/**
 * The default SDK response for APIs that return empty JSON bodies
 */
export type SuccessResponse = Promise<void>
