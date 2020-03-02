const request = {
  'url': 'https://api.smartthings.com/apps/sdktest-234-1582991474199/oauth',
  'method': 'put',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  },
  'data': {
    'clientName': 'SDK Test App',
    'scope': [
      'i:deviceprofiles:*',
      'r:devices:*',
      'x:devices:*',
      'r:scenes:*',
      'x:scenes:*'
    ],
    'redirectUris': []
  }
}
const response = {
  'clientName': 'SDK Test App',
  'scope': [
    'i:deviceprofiles:$',
    'r:devices:$',
    'x:devices:*',
    'r:scenes:*',
    'r:devices:*',
    'i:deviceprofiles:*',
    'x:scenes:*',
    'x:devices:$'
  ],
  'redirectUris': []
}
export default {request, response}
