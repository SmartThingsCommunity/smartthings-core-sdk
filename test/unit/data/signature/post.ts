export const post_verify = {
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

export const post_verify_parsed = {
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
