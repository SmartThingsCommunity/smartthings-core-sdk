# SmartThings Core SDK

The SmartThings Core SDK is a wrapper designed to simplify the use of the
[SmartThings REST API](https://smartthings.developer.samsung.com/docs/api-ref/st-api.html#section/Overview)
from JavaScript and TypeScript applications. This is the very first release of this SDK and should be considered
a work in progress. Changes may still be made that are not backwardly compatible.

If you are developing a SmartApp or API Access app using NodeJS you should continue to use the
[SmartApp NodeJS SDK](https://github.com/SmartThingsCommunity/smartapp-sdk-nodejs) for now. We will
be releasing a new version of that SDK soon that uses this Core SDK for making REST API calls.

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

* [apps](src/endpoint/apps.ts#L203) -- CRUD (Create, Read, Update, Delete) operations for SmartApps and API Access apps

* [capabilities](src/endpoint/apps.ts#L111) -- Operations to read standard capability definitions as well as create and
modify custom capabilities

* [deviceProfiles](src/endpoint/deviceprofiles.ts#L49) -- CRUD operations for device profiles. Changes made with this
API are currently not reflected in the Developer Workspace, so for the most part creating and modifying capabilities
should still be done there.

* [devices](src/endpoint/devices.ts#L205) -- Operations to access, control, create, update, and delete devices. These
operations include the ability to query for device statue and send commands to devices.

* [installedApps](src/endpoint/installedapps.ts#L324) -- CRUD operations for installed app instances. In most cases apps
are installed by users and these operations are not explicitly called, but they may be useful for creating developer
tools and automating tests.

* [locations](src/endpoint/locations.ts#L33) -- CRUD operations for locations

* [modes](src/endpoint/locations.ts#L26) -- CRUD operations for modes along with the ability to change the current mode
of a location.

* [notifications](src/endpoint/notifications.ts#L83) -- Operations to send push notifications to SmartThings mobile app
clients.

* [rooms](src/endpoint/rooms.ts#L26) -- CRUD operations for rooms along with the ability to query for the devices in
a room.

* [rules](src/endpoint/rules.ts#L275) -- CRUD operations for rules along with the ability to execute a rule.

* [scenes](src/endpoint/scenes.ts#L56) -- Operations to list and execute scenes. Currently does not support the creation
and updating of scenes.

* [schedules](src/endpoint/schedules.ts#L79) -- CRUD operations for schedules for use in SmartApps.

* [schema](src/endpoint/schema.ts#L220) - CRUD operations for ST Schema connectors and installed instances, along with
operations to list the devices owned by each installed instance.

* [services](src/endpoint/services.ts#L499) - Operations to query for and subscribe to location service data, currently
consisting of current weather conditions, weather forecast, and air quality data.

* [subscriptions](src/endpoint/subscriptions.ts#L213) -- Operations for subscribing to events, for use in SmartApps and
API Access apps.
