const request = {
  'url': 'https://api.smartthings.com/rules/dcaa574b-9f2f-4082-a1ed-81b265c59185',
  'method': 'delete',
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
  'name': 'Functional Test Rule Modified',
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
    },
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
                '8cfb5b5f-1683-4459-932c-9493c63da626'
              ],
              'component': 'main',
              'capability': 'motionSensor',
              'attribute': 'motion'
            }
          }
        },
        'then': [
          {
            'command': {
              'devices': [
                'b97058f4-c642-4162-8c2d-15009fdf5bfc'
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
                'b97058f4-c642-4162-8c2d-15009fdf5bfc'
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
export default {request, response}
