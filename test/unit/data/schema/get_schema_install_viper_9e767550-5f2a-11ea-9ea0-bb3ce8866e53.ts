const request = {
  'url': 'https://api.smartthings.com/schema/install/viper_9e767550-5f2a-11ea-9ea0-bb3ce8866e53?locationId=95efee9b-6073-4871-b5ba-de6642187293&type=oauthLink',
  'method': 'get',
  'headers': {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
    'Authorization': 'Bearer 52991afa-66e8-4af0-8d85-5c568ed5ba7d'
  }
}
const response = {
  'pageType': 'requiresLogin',
  'oAuthLink': 'https://st-schema.ngrok.io/oauth/login?client_id=15245388-2660-4a3e-a1be-1e276dba1377&redirect_uri=https%3A%2F%2Fc2c-us.smartthings.com%2Foauth%2Fcallback&response_type=code&state=eyJhbGciOiJIUzM4NCJ9.YjJlOTNlYzUtMjNlMy00NWRjLWFjYWQtZDcwYzNmMDQ0YjFkOnZpcGVyXzllNzY3NTUwLTVmMmEtMTFlYS05ZWEwLWJiM2NlODg2NmU1MzoxNTgzNDQ0NzI2NzcwOkI1RTE4QjE4LTA5MUUtNEI2Ni1CRDEwLTAxNzg3RjE3QTg3Rjplbg.vhn4g74mZ-9FH8zLvcXQgvhj3E3875KNwyKkH5qd9F23rF036jpWQ_WxNYxuJWC0'
}
export default {request, response}
