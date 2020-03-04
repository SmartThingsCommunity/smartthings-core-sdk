const request = {
  'url': 'https://api.smartthings.com/locations',
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
      'locationId': '55445e89-23df-40f1-99db-4aa8f1995dcf',
      'name': 'General Testing'
    },
    {
      'locationId': '8572417a-748e-43cd-bf61-5d80a77902a9',
      'name': 'Aria'
    },
    {
      'locationId': 'ae19304f-034b-4c14-9bef-b35375385c7b',
      'name': 'First Look Test'
    },
    {
      'locationId': '49036240-f18c-46f4-b47f-6be473c80a9b',
      'name': 'MV Office'
    },
    {
      'locationId': '95efee9b-6073-4871-b5ba-de6642187293',
      'name': 'Test Location'
    },
    {
      'locationId': '8d17bc64-1a98-4cf5-9428-4408783a2121',
      'name': 'Smart Floor Plan'
    },
    {
      'locationId': 'b4db3e54-14f3-4bf4-b217-b8583757d446',
      'name': 'Location 1/22'
    },
    {
      'locationId': 'e1b473ab-a831-4a55-b8ec-189a599740bc',
      'name': 'Icon Trst'
    }
  ],
  '_links': null
}
export default {request, response}
