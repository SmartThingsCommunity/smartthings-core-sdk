const request = {
  'url': 'https://api.smartthings.com/installedapps/5336bd07-435f-4b6c-af1d-fddba55c1c24/subscriptions',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  }
}
const response = {
  'items': [
    {
      'id': '3a06a46a-a4cd-4cf6-88f1-2657e499e43c',
      'installedAppId': '5336bd07-435f-4b6c-af1d-fddba55c1c24',
      'sourceType': 'DEVICE',
      'device': {
        'deviceId': '5d5a44a6-8859-4574-adc7-03a28171a76d',
        'componentId': 'main',
        'capability': 'switch',
        'attribute': 'switch',
        'value': '*',
        'stateChangeOnly': true,
        'subscriptionName': 'eventHandler_0',
        'modes': []
      }
    }
  ],
  '_links': {}
}
export default {request, response}
