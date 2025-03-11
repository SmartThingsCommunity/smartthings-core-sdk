import { AxiosRequestConfig } from 'axios'


export function expectedRequest(config: AxiosRequestConfig): AxiosRequestConfig<object> {
	return {
		data: undefined,
		params: undefined,
		...config,
		paramsSerializer: expect.objectContaining({ serialize: expect.any(Function) }),
	}
}

export function buildRequest(path?: string, params?: unknown, data?: object, method = 'get'): AxiosRequestConfig<object> {
	return {
		url: `https://api.smartthings.com/${path}`,
		method: method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
		},
		data: data,
		params: params,
		paramsSerializer: expect.objectContaining({ serialize: expect.any(Function) }),
	}
}
