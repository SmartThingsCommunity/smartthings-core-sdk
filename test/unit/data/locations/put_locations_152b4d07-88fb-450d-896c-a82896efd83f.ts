const request = {
  'url': 'https://api.smartthings.com/locations/152b4d07-88fb-450d-896c-a82896efd83f',
  'method': 'put',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  },
  'data': {
    'name': 'Modified by Functional Tests',
    'latitude': 38,
    'longitude': -121,
    'regionRadius': 180,
    'temperatureScale': 'C',
    'locale': 'en_GB'
  }
}
const response = {
  'locationId': '152b4d07-88fb-450d-896c-a82896efd83f',
  'name': 'Modified by Functional Tests',
  'countryCode': 'USA',
  'latitude': 38,
  'longitude': -121,
  'regionRadius': 180,
  'temperatureScale': 'C',
  'timeZoneId': 'America/Los_Angeles',
  'locale': 'en_GB',
  'backgroundImage': null,
  'additionalProperties': {}
}
export default {request, response}
