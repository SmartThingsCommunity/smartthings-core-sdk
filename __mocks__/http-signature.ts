import httpSignature from 'http-signature'


export default {
	parseRequest: jest.fn((request, options) => httpSignature.parseRequest(request, options)),
	verifySignature: jest.fn((signature, publicKey) => httpSignature.verifySignature(signature, publicKey)),
}
