const request = {
  'url': 'https://api.smartthings.com/rules',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  },
  'params': {
    'locationId': '95efee9b-6073-4871-b5ba-de6642187293'
  }
}
const response = {
  'items': [
    {
      'name': 'Functional Test Rule',
      'actions': [
        {
          'if': {
            'and': [],
            'or': [],
            'equals': {
              'left': {
                'string': 'open'
              },
              'right': {
                'device': {
                  'devices': [
                    '79b75c24-1ab0-487e-a046-08cb9e860c1d'
                  ],
                  'component': 'main',
                  'capability': 'contactSensor',
                  'attribute': 'contact'
                }
              }
            },
            'then': [
              {
                'command': {
                  'devices': [
                    '385931b6-0121-4848-bcc8-54cb76436de1'
                  ],
                  'commands': [
                    {
                      'component': 'main',
                      'capability': 'switch',
                      'command': 'on',
                      'arguments': []
                    }
                  ]
                }
              }
            ],
            'else': [
              {
                'command': {
                  'devices': [
                    '385931b6-0121-4848-bcc8-54cb76436de1'
                  ],
                  'commands': [
                    {
                      'component': 'main',
                      'capability': 'switch',
                      'command': 'off',
                      'arguments': []
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      'id': 'dcaa574b-9f2f-4082-a1ed-81b265c59185'
    }
  ]
}
export default {request, response}
