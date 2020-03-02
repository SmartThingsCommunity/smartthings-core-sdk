import {SignatureType} from '../../../../src'


const request = {
	'url': 'https://api.smartthings.com/apps/a01c0ba4-3ac2-4a5c-9628-c43e394c1ea2/signature-type',
	'method': 'put',
	'headers': {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json',
		'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
	},
	'data': {
		'signatureType': SignatureType.ST_PADLOCK
	}
}
const response = {}
export default {request, response}
