const request = {
  'url': 'https://api.smartthings.com/locations/95efee9b-6073-4871-b5ba-de6642187293/modes/7b7ca378-03ed-419d-93c1-76d3bb41c8b3',
  'method': 'put',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  },
  'data': {
    'label': 'Mode Four'
  }
}
const response = {
  'id': '7b7ca378-03ed-419d-93c1-76d3bb41c8b3',
  'label': 'Mode Four',
  'name': 'Mode 4'
}
export default {request, response}
