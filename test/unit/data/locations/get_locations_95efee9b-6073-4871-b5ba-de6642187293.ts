const request = {
  'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  }
}
const response = {
  'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
  'name': 'Test Location',
  'countryCode': 'USA',
  'latitude': 37.402418282078415,
  'longitude': -122.04800345246598,
  'regionRadius': 150,
  'temperatureScale': 'F',
  'timeZoneId': 'America/Los_Angeles',
  'locale': 'en_US',
  'backgroundImage': null,
  'additionalProperties': {}
}
export default {request, response}
