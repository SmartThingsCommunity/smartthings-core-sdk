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
	'ownerType'?: OwnerType
	/**
	 * A global identifier for owner.
	 */
	'ownerId'?: string
}

export enum PrincipalType {
	LOCATION = 'LOCATION',
	USER_LEVEL = 'USER_LEVEL',
}

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
	tag: string
}
