const request = {
  'url': 'https://api.smartthings.com/apps/sdktest-234-1582991474199',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  }
}
const response = {
  'appName': 'sdktest-234-1582991474199',
  'appId': '2778eb84-2880-47c6-a863-2a4801d7222c',
  'appType': 'WEBHOOK_SMART_APP',
  'principalType': 'LOCATION',
  'classifications': [
    'AUTOMATION'
  ],
  'displayName': 'zzz SDK Functional Test App 1582991474199',
  'description': 'Created by SDK functional testing',
  'singleInstance': true,
  'installMetadata': {},
  'owner': {
    'ownerType': 'USER',
    'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556'
  },
  'createdDate': '2020-02-29T15:51:14Z',
  'lastUpdatedDate': '2020-02-29T15:51:15Z',
  'webhookSmartApp': {
    'targetUrl': 'https://smartthings-api.ngrok.io/smartapp',
    'targetStatus': 'CONFIRMED',
    'publicKey': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi2VTBwuG99UM6MRduWlveCTLCovloGpM\r\n7j7kOv0GiD89l14e0uho3K3lk5tgThd63UNpoVfvNqg5+/ugk0rJasg+aN4KGwll4RxVaYB5MVzB\r\noCoDuHHBBR3C5ukGNcb+IsKoAYx89Pujtcmnl51FIiHVP6KJc2JYxD8ZbwAZ/TzKWLWPrdKWZpHf\r\nGhNyh8j7bau29xslfyM0VwkUtFhwRTu5r8Vj7iWVi+Wf0VyeNgRAjH2WmtD8ArPHax3Rbt+3SMot\r\nkdIiuj7bMNlHohrgs8lUKvATIbh1wVic8rNV9Zr7u18Ywq/Pzar8V+17HSKkPtHgQeQtDjH8Br54\r\nddzicwIDAQAB\n-----END PUBLIC KEY-----',
    'signatureType': 'ST_PADLOCK'
  },
  'ui': {
    'pluginUri': '',
    'dashboardCardsEnabled': false,
    'preInstallDashboardCardsEnabled': false
  }
}
export default {request, response}
