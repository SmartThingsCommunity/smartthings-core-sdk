const request = {
  'url': 'https://api.smartthings.com/deviceprofiles',
  'method': 'post',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  },
  'data': {
    'name': 'Functional Test Switch',
    'components': [
      {
        'id': 'main',
        'capabilities': [
          {
            'id': 'switch',
            'version': 1
          }
        ],
        'categories': []
      }
    ],
    'metadata': {
      'vid': 'simple-switch',
      'deviceType': 'Switch',
      'ocfDeviceType': 'oic.d.switch',
      'mnmn': 'fIIT',
      'deviceTypeId': 'Switch',
      'ocfSpecVer': 'core 1.1.0',
      'mnid': 'fIIT',
      'mnId': 'fIIT'
    }
  }
}
const response = {
  'id': '149476cd-3ca9-4e62-ba40-a399e558b2bf',
  'name': 'Functional Test Switch',
  'owner': {
    'ownerType': 'USER',
    'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556'
  },
  'components': [
    {
      'label': 'main',
      'id': 'main',
      'capabilities': [
        {
          'id': 'switch',
          'version': 1
        }
      ],
      'categories': []
    }
  ],
  'metadata': {
    'vid': 'simple-switch',
    'deviceType': 'Switch',
    'ocfDeviceType': 'oic.d.switch',
    'mnmn': 'fIIT',
    'deviceTypeId': 'Switch',
    'ocfSpecVer': 'core 1.1.0',
    'mnid': 'fIIT',
    'mnId': 'fIIT'
  },
  'status': 'DEVELOPMENT'
}
export default {request, response}
