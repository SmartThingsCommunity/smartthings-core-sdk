import {EndpointClient} from './endpoint-client'
import {Links} from './types'


export interface PagedResult<T> {
	items: T[]
	_links?: Links
}

export class PaginatedListIterator<T> implements AsyncIterator<T> {
	private index: number

	constructor(private client: EndpointClient, private page: PagedResult<T>) {
		this.index = 0
	}

	async next(): Promise<IteratorResult<T>> {
		if (this.index < this.page.items.length) {
			let done = false
			const value = this.page.items[this.index++]
			if (this.index === this.page.items.length) {
				if (this.page?._links?.next?.href) {
					this.index = 0
					this.page = await this.client.get<PagedResult<T>>(this.page._links.next.href)
				} else {
					done = true
				}
			}
			return {done, value}
		}
		return {done: true, value: undefined}
	}
}

export class PaginatedList<T> {
	public items: Array<T>

	constructor(private page: PagedResult<T>, private client: EndpointClient ) {
		this.items = page.items
	}

	public [Symbol.asyncIterator](): PaginatedListIterator<T> {
		return new PaginatedListIterator<T>(this.client, this.page)
	}

	public hasNext(): boolean {
		return !!this.page._links?.next
	}

	public hasPrevious(): boolean {
		return !!this.page._links?.previous
	}

	public next(): Promise<boolean> {
		if (this.page._links?.next?.href) {
			return this.client.get<PagedResult<T>>(this.page._links.next.href).then(response => {
				this.items = response.items
				this.page = response
				return !!response._links?.next
			})
		}
		return Promise.reject(new Error('No next results'))
	}

	public previous(): Promise<boolean> {
		if (this.page._links?.previous) {
			return this.client.get<PagedResult<T>>(this.page._links.previous.href).then(response => {
				this.items = response.items
				this.page = response
				return !!response._links?.previous
			})
		}
		return Promise.reject(new Error('No previous results'))
	}
}
