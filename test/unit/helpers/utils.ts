// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function expectedRequest(config: any): any {
	return { data: undefined, params: undefined, ...config, paramsSerializer: expect.any(Function) }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildRequest(path?: string, params?: any, data?: any, method = 'get'): any {
	return {
		url: `https://api.smartthings.com/${path}`,
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		data: data,
		params: params,
		paramsSerializer: expect.anything(),
	}
}
