const request = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'accept': 'application/json',
		'authorization': 'Signature keyId="/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98",signature="W8og1Vqzq8eYBWwzPapqsWKkO45lUHzDBPdML1EZRhPf5B0l9wtFGxTxqJgIFLzF38bCNo38AHlzyZQYIfx4IPNXLqHV1K3v6pXQKNLg0abWOO4VL+hx1jJ+O3+Uu7GwKraWo3nPcTdU/9xih8PdOTwlau8SkVSKNTJVyycxgjzfqJyJXR63fZZMPLdO9NJEBSLaSI6eH4Jc7Z+s6g3ib9ay6GujC5KncZOKyeLJpAPfNoUX4v6bpJz8z5DxIrz2+QlmXW2AyXFIUDTp6DTblS3G0M6WSlI+QU3xCwC2Wb/3PxcsHlKpXvvJ2ET908JXaZfpuagPYJku5Xf+nM9OIg==",headers="(request-target) digest date",algorithm="rsa-sha256"',
		'digest': 'SHA256=aLAlinhTVIeMWN5sMCEU2Jn2x27o8bOaKmuCT6YWW+w=',
		'date': 'Tue, 24 Mar 2020 13:23:37 UTC',
		'x-st-correlation': '386bce60-9484-4fdf-b746-5f7d2003799d',
		'x-b3-traceid': '98b2c93f885ab5f3',
		'x-b3-spanid': '50e6b186afb67d55',
		'x-b3-parentspanid': '98b2c93f885ab5f3',
		'x-b3-sampled': '0',
		'content-length': '567',
		'host': 'node-st.ngrok.io',
		'user-agent': 'AHC/2.1',
		'x-forwarded-proto': 'https',
		'x-forwarded-for': '52.14.19.244',
	},
}

const parsed = {
	'scheme': 'Signature',
	'params': {
		'keyId': '/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98',
		'signature': 'bqu6KxHNR5d+1nBVUAHW4K57kpFX8NBfCRWt3SOPt2yz+h2k+eYC81xPMriQtwR3votrDIZy0f1oZw8P0kOhlcujionvRk3xcYtRrR7FHVsgvzIqQMPQZ84F4BxaXnA/qWS+11fBFQHRICM3quYVDEgeVqTtqTEFHIF9WXTKVxYYcG7AI914urwiZCKa+3lWLrxsJW4AqBLXuIhFgkJ5TzYQaeW863gjJ5Vvs0RVOa3upI/Y0wF3c9L2AGsZtFfrMo8+souij3/9g4Xt9x/lbkxUwDpK5yRtbG63mV9PqIF5t4Ws4tW8sxHA9GQhBIYC2vkf+7EoQOrOFcfzHimLHA==',
		'headers': [
			'(request-target)',
			'digest',
			'date',
		],
		'algorithm': 'rsa-sha256',
	},
	'signingString': '(request-target): post /\ndigest: SHA256=hin4p0p7cm2NbwUCSTnRSMyE9QOt2gBd9WesU0Y7U/I=\ndate: Tue, 24 Mar 2020 13:11:22 UTC',
	'algorithm': 'RSA-SHA256',
	'keyId': '/pl/useast2/1b-0d-f2-69-ad-fb-1b-c4-4e-ac-5a-1f-f7-b6-dd-a9-c4-e8-c8-98',
}

const publicKey = {
	'type': 'rsa',
	'parts': [
		{
			'name': 'e',
			'data': {
				'type': 'Buffer',
				'data': [1, 0, 1],
			},
		},
		{
			'name': 'n',
			'data': {
				'type': 'Buffer',
				'data': [0, 187, 116, 17, 71, 220, 49, 113, 129, 234, 191, 129, 185, 149, 101, 130, 223, 158, 58, 127, 18, 201, 196, 101, 107, 68, 129, 199, 189, 158, 225, 202, 197, 193, 227, 41, 66, 132, 7, 0, 47, 25, 103, 224, 64, 48, 161, 92, 2, 15, 12, 153, 161, 62, 180, 53, 83, 97, 249, 5, 255, 17, 50, 152, 174, 125, 211, 85, 151, 180, 183, 181, 99, 141, 188, 50, 168, 211, 212, 107, 254, 225, 251, 113, 235, 200, 0, 205, 236, 208, 145, 29, 163, 200, 236, 25, 193, 228, 58, 78, 87, 19, 140, 254, 169, 183, 13, 42, 85, 2, 168, 94, 187, 232, 169, 200, 69, 189, 153, 37, 253, 239, 0, 163, 234, 92, 203, 161, 150, 6, 131, 173, 186, 50, 137, 112, 251, 170, 136, 251, 90, 26, 89, 128, 222, 136, 126, 72, 199, 71, 101, 115, 36, 26, 233, 232, 71, 142, 181, 197, 113, 118, 192, 2, 151, 232, 233, 176, 119, 122, 2, 180, 80, 213, 166, 238, 44, 92, 199, 120, 13, 14, 81, 164, 88, 15, 131, 204, 38, 146, 70, 174, 15, 194, 1, 173, 205, 103, 100, 13, 161, 223, 23, 139, 156, 64, 179, 255, 100, 145, 124, 185, 152, 35, 101, 168, 31, 193, 185, 173, 45, 92, 113, 68, 188, 218, 186, 108, 114, 124, 208, 138, 67, 85, 240, 148, 84, 42, 227, 204, 195, 128, 138, 19, 171, 142, 141, 250, 148, 224, 243, 88, 51, 31, 179, 165, 109],
			},
		},
	],
	'part': {
		'e': {
			'name': 'e',
			'data': {
				'type': 'Buffer',
				'data': [1, 0, 1],
			},
		},
		'n': {
			'name': 'n',
			'data': {
				'type': 'Buffer',
				'data': [0, 187, 116, 17, 71, 220, 49, 113, 129, 234, 191, 129, 185, 149, 101, 130, 223, 158, 58, 127, 18, 201, 196, 101, 107, 68, 129, 199, 189, 158, 225, 202, 197, 193, 227, 41, 66, 132, 7, 0, 47, 25, 103, 224, 64, 48, 161, 92, 2, 15, 12, 153, 161, 62, 180, 53, 83, 97, 249, 5, 255, 17, 50, 152, 174, 125, 211, 85, 151, 180, 183, 181, 99, 141, 188, 50, 168, 211, 212, 107, 254, 225, 251, 113, 235, 200, 0, 205, 236, 208, 145, 29, 163, 200, 236, 25, 193, 228, 58, 78, 87, 19, 140, 254, 169, 183, 13, 42, 85, 2, 168, 94, 187, 232, 169, 200, 69, 189, 153, 37, 253, 239, 0, 163, 234, 92, 203, 161, 150, 6, 131, 173, 186, 50, 137, 112, 251, 170, 136, 251, 90, 26, 89, 128, 222, 136, 126, 72, 199, 71, 101, 115, 36, 26, 233, 232, 71, 142, 181, 197, 113, 118, 192, 2, 151, 232, 233, 176, 119, 122, 2, 180, 80, 213, 166, 238, 44, 92, 199, 120, 13, 14, 81, 164, 88, 15, 131, 204, 38, 146, 70, 174, 15, 194, 1, 173, 205, 103, 100, 13, 161, 223, 23, 139, 156, 64, 179, 255, 100, 145, 124, 185, 152, 35, 101, 168, 31, 193, 185, 173, 45, 92, 113, 68, 188, 218, 186, 108, 114, 124, 208, 138, 67, 85, 240, 148, 84, 42, 227, 204, 195, 128, 138, 19, 171, 142, 141, 250, 148, 224, 243, 88, 51, 31, 179, 165, 109],
			},
		},
	},
	'_hashCache': {},
	'size':  2048,
}

export default {request, parsed, publicKey}
