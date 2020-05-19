# SmartThings Core SDK

The SmartThings Core SDK is a wrapper designed to simplify the use of the
[SmartThings REST API](https://smartthings.developer.samsung.com/docs/api-ref/st-api.html#section/Overview)
from JavaScript and TypeScript applications. This is the very first release of this SDK and should be considered
a work in progress. Changes may still be made that are not backwardly compatible.


## Installation

```bash
npm install @smartthings/core-sdk
```

## Importing

`NodeJS`:

```javascript
const {SmartThingsClient} = require('@smartthings/core-sdk')
```

Or `ES2015`+:

```javascript
import {SmartThingsClient} from '@smartthings/core-sdk'
```

## Example Usage
Substitue your Personal Access Token (PAT) with at least the `r:locations:*` scope
for `{YOUR-PAT-TOKEN}` in the following code.
```javascript
const {SmartThingsClient, BearerTokenAuthenticator} = require('@smartthings/core-sdk')
const client = new SmartThingsClient(new BearerTokenAuthenticator('{YOUR-PAT-TOKEN}'))

client.locations.list().then(locations => {
    console.log(`Found ${locations.length} locations`)
})

```

## Reference

### Authenticators

This SDK supports multiple ways of authenticating with the SmartThings platform. The currently available authenticators
are:

* [BearerTokenAuthenticator](src/authenticator.ts#37) -- Authenticator that is instantiated with any valid bearer
token. This is the authenticator you would use with a PAT (Personal Access) Token.

* [RefreshTokenAuthenticator](src/authenticator.ts#73) -- Authenticator that is instantiated with a bearer token and
a [RefreshTokenStore](src/authenticator.ts#64) that provides methods for retrieving and storing access and refresh
tokens. When this authenticator is used the API will automatically refresh expired access tokens, save the new tokens,
and retry the original request.

* [SequentialRefreshTokenAuthenticator](src/authenticator.ts#118)

### Endpoints

* apps -- A SmartApp can be an AWS lambda function or WebHook endpoint. Like to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/apps.ts#L213), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Apps)

* capabilities - Operations to read standard capability definitions as well as create and modify custom capabilities.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/capabilities.ts#L6), link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Capabilities).

* deviceProfiles - A device profile contains the components, capabilities, and metadata (ID, name, ownership, etc.) that define a SmartThings device. Link to code interface [here], link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Device-Profiles) 

* devices - Operations to access, control, create, update, and delete devices.  Like to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/devices.ts#L69), link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Devices)

* installedApps - Apps are installed by users.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/installedapps.ts#L60), link to wiki page descripotion [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Installed-Apps)

* locations - Locations can include hubs, devices, and Automations.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/installedapps.ts#L135), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Locations)

* modes - Operations to change the current **mode** of a location.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/modes.ts#L27), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Modes)

* notifications - Operations to send push notifications to SmartThings mobile app.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/notifications.ts#L37), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Notifications3)

* rooms - Operations related to **Rooms**, a grouping of devices within a location.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/rooms.ts#L27), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Rooms)

* rules - Operations for working with Rules.  Rules allow you to create automations that can operate on SmartThings connected devices.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/rules.ts#L11), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Rules)     

* scenes - Operations to list and execute scenes.  Currently this endpoint does not support creating or updating scenes.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/scenes.ts#L56), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Scenes) 

* schedules - Operations for schedules for use in SmartApps.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/schedules.ts#L79), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Schedules) 

* schema - Operations for ST Schema connectors and installed instances, along with operations to list the devices owned by each installed instance. Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/schema.ts#L220), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Schema) 

* services - Operations to query for and subscribe to location service data, currently consisting of current weather conditions, weather forecast, and air quality data.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/services.ts#L23), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Services) 

* subscriptions -  Operations for subscribing to events, for use in SmartApps and
API Access apps.  Link to code interface [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/blob/master/src/endpoint/subscriptions.ts#L8), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Subscriptions) 

