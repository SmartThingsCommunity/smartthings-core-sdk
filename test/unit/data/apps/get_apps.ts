const request = {
  'url': 'https://api.smartthings.com/apps',
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
      'appName': 'api-app-minimal-test-1571702766897-128',
      'appId': '3238e691-d3b0-4486-90e4-cc28f32b6784',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'API Access Minimal Test',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-10-22T00:06:07Z',
      'lastUpdatedDate': '2019-11-04T23:35:04Z'
    },
    {
      'appName': 'api-app-subscription-example-2-1571770714389-755',
      'appId': 'c27a69f8-57b8-498e-8704-ea62be3d32f8',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'api-app-subscription-example-2',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-10-22T18:58:34Z',
      'lastUpdatedDate': '2019-10-22T21:11:28Z'
    },
    {
      'appName': 'api-app-subscription-test-1571704633875-935',
      'appId': 'c5a19a9b-2d88-40e6-9c55-ad177c5db73d',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'api-app-subscription-test',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-10-22T00:37:14Z',
      'lastUpdatedDate': '2019-10-22T00:37:15Z'
    },
    {
      'appName': 'bob-florian-scene-control-test-20191014',
      'appId': '7941981b-91aa-451d-b063-da30ea0a775c',
      'appType': 'API_ONLY',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Simple API App Example',
      'description': 'Demonstrates basics of a SmartThings API app which authenticates with the SmartThings platform using OAuth2',
      'iconImage': {},
      'createdDate': '2019-10-14T16:47:31Z',
      'lastUpdatedDate': '2019-10-14T16:47:31Z'
    },
    {
      'appName': 'bobs-api-app-test-20191014-1',
      'appId': '85ff2561-fe8a-495f-ba68-e719c7fcf12d',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'API App Subscription Example',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-10-14T14:44:31Z',
      'lastUpdatedDate': '2019-10-21T22:28:18Z'
    },
    {
      'appName': 'scenecontroller-1565367408854-853',
      'appId': 'f56f6f71-7a2a-4cd2-8a0b-6902bf80ed89',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'Scene Controller',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-08-09T16:16:49Z',
      'lastUpdatedDate': '2019-08-09T16:16:50Z'
    },
    {
      'appName': 'scratchapisubscriptionexample-1575374507848-969',
      'appId': '02ef84da-984e-43a6-b7cc-905c88183e9e',
      'appType': 'API_ONLY',
      'classifications': [
        'CONNECTED_SERVICE'
      ],
      'displayName': 'Scratch API Subscription Example',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-12-03T12:01:48Z',
      'lastUpdatedDate': '2019-12-03T12:07:47Z'
    },
    {
      'appName': 'bob-sa-sdk-latency-v1',
      'appId': '997d4193-d768-4425-a334-78c34240785f',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'SA SDK Latency V1',
      'description': 'Simple switch reflector',
      'iconImage': {},
      'createdDate': '2020-02-24T18:20:57Z',
      'lastUpdatedDate': '2020-02-24T18:20:57Z'
    },
    {
      'appName': 'bob-sa-sdk-latency-v2',
      'appId': 'd9a6049d-06a0-4bb5-a1a8-dc47c70f2a4c',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'SA SDK Latency V2',
      'description': 'Simple switch reflector',
      'iconImage': {},
      'createdDate': '2020-02-24T18:21:36Z',
      'lastUpdatedDate': '2020-02-24T18:21:37Z'
    },
    {
      'appName': 'demohouse-1567481665364-257',
      'appId': '5598193a-bcd0-418e-bd8c-0de19d87a952',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Demo House',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-09-03T03:34:26Z',
      'lastUpdatedDate': '2019-11-20T01:13:43Z'
    },
    {
      'appName': 'demohousestaging-1575906765074-428',
      'appId': '190ad0af-9d92-4c1c-9015-afb9a0a7f272',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Demo House (staging)',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-12-09T15:52:45Z',
      'lastUpdatedDate': '2019-12-10T12:42:00Z'
    },
    {
      'appName': 'smartfloorplan-1579465520512-787',
      'appId': 'e35ab7dc-af72-4599-875a-61dcf8c00d15',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Smart Floor Plan',
      'description': 'Provides IoT device status and control on a floor plan of your home',
      'iconImage': {},
      'createdDate': '2020-01-19T20:25:21Z',
      'lastUpdatedDate': '2020-01-19T20:25:21Z'
    },
    {
      'appName': 'temp-test-lambda-app-abc123',
      'appId': '07e24fd4-6aec-4f2a-be1e-3b29da92885e',
      'appType': 'LAMBDA_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Temporary Test Lambda App',
      'description': 'A temporary test app',
      'iconImage': {},
      'createdDate': '2020-01-14T23:55:34Z',
      'lastUpdatedDate': '2020-01-14T23:55:35Z'
    },
    {
      'appName': 'closetlightdemo-1574275255572-598',
      'appId': '91e13c71-4321-4fe7-a5ad-bb4f80967ad3',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Closet Light Demo',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-11-20T18:40:56Z',
      'lastUpdatedDate': '2020-02-24T22:45:51Z'
    },
    {
      'appName': 'demohouselocal-1567511132081-776',
      'appId': 'cbfe1381-55a5-4006-aecb-786a0772122a',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Demo House (Local)',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-09-03T11:45:32Z',
      'lastUpdatedDate': '2019-10-18T20:00:56Z'
    },
    {
      'appName': 'eac2cswitch-1576157053431-231',
      'appId': '9bb91ea9-823a-4489-9d18-b1ff19513a27',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'CONNECTED_SERVICE',
        'DEVICE'
      ],
      'displayName': 'EA C2C Switch',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-12-12T13:24:13Z',
      'lastUpdatedDate': '2019-12-12T13:24:13Z'
    },
    {
      'appName': 'easimplec2c-1576155234487-109',
      'appId': '8b689e7b-eaa3-4f31-b851-2c4ecd37f3ac',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'CONNECTED_SERVICE',
        'DEVICE'
      ],
      'displayName': 'EA Simple C2C',
      'description': 'Description',
      'iconImage': {},
      'createdDate': '2019-12-12T12:53:58Z',
      'lastUpdatedDate': '2019-12-12T12:53:59Z'
    },
    {
      'appName': 'sa-sdk-functional-switch-reflector',
      'appId': '1c593873-ef7d-4665-8f0d-e1da25861e02',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Functional Test Switch Reflector',
      'description': 'Mirrors the state of one switch in another switch',
      'iconImage': {},
      'createdDate': '2020-02-27T14:46:49Z',
      'lastUpdatedDate': '2020-02-27T14:46:50Z'
    },
    {
      'appName': 'sdktest-234-1582991474199',
      'appId': '2778eb84-2880-47c6-a863-2a4801d7222c',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'zzz SDK Functional Test App 1582991474199',
      'description': 'Created by SDK functional testing',
      'iconImage': {},
      'createdDate': '2020-02-29T15:51:14Z',
      'lastUpdatedDate': '2020-02-29T15:51:15Z'
    },
    {
      'appName': 'temperatureindicator-1573489391827-189',
      'appId': 'a6193eb0-479f-4087-b96d-a80c87150647',
      'appType': 'WEBHOOK_SMART_APP',
      'classifications': [
        'AUTOMATION'
      ],
      'displayName': 'Temperature Indicator',
      'description': 'Sets the color of a light depending on a temperature',
      'iconImage': {},
      'createdDate': '2019-11-11T16:23:12Z',
      'lastUpdatedDate': '2019-11-11T16:23:13Z'
    }
  ],
  '_links': {}
}
export default {request, response}
