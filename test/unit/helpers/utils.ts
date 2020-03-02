// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function expectedRequest(config: any): any {
	return {data: undefined, params: undefined, ...config, paramsSerializer: expect.anything()}
}
