const request = {
  'url': 'https://api.smartthings.com/devices/46c38b7c-81bc-4e65-80be-dddf1fdd45b8/components/outlet2/status',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  }
}
const response = {
  'switch': {
    'switch': {
      'value': 'off'
    }
  }
}
export default {request, response}
