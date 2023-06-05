# SmartThings Core SDK

The SmartThings Core SDK is a wrapper designed to simplify the use of the
[SmartThings REST API](https://developer.smartthings.com/docs/api/public)
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
For this example, you'll need to create a [Personal Access Token (PAT)](https://account.smartthings.com/tokens)
with at least the `r:locations:*` scope. Substitute it for `YOUR-PAT-HERE` in the following code:
```javascript
const {SmartThingsClient, BearerTokenAuthenticator} = require('@smartthings/core-sdk')
const client = new SmartThingsClient(new BearerTokenAuthenticator('YOUR-PAT-HERE'))

client.locations.list().then(locations => {
    console.log(`Found ${locations.length} locations`)
})

```

## Logging

There is some logging done of requests and responses made to the API. The
default logger does nothing but you can pass your own. Logging is done via a generic interface so
you can use whatever logger you want in your application.

First, write an implementation of the `Logger` interface defined in
[logger.ts](src/logger.ts)
which proxies to your logger. For example:

```javascript
import { Logger as WinstonLogger } from 'winston'
import { Logger } from '@smartthings/core-sdk'


export class WinstonLoggerProxy implements Logger {
	proxy: WinstonLogger
	level: string

	constructor(winstonLogger) {
		this.level = proxy.level
	}

	trace(message: any, ...args: any[]): void {
		// Winston doesn't have a "trace" level but it has a "silly" level in the same place.
		proxy.silly(message, args)
	}

	debug(message: any, ...args: any[]): void {
		proxy.debug(message, args)
	}

	info(message: any, ...args: any[]): void {
		proxy.info(message, args)
	}

	...

	isTraceEnabled(): boolean {
		return proxy.isSillyEnabled()
	}

	...
}
```

Then, when you create your `SmartThingsClient`, pass this in via the `config` parameter.

```javascript
const config = {
	logger: new WinstonLoggerProxy(myWinstonLoggerInstance)
}
const client = new SmartThingsClient(new BearerTokenAuthenticator('{YOUR-PAT-TOKEN}'), config)
```

## Reference

### Authenticators

This SDK supports multiple ways of authenticating with the SmartThings platform. The currently available authenticators
are:

* [BearerTokenAuthenticator](src/authenticator.ts#L55) -- Authenticator that is instantiated with any valid bearer
token. This is the authenticator you would use with a PAT (Personal Access) Token.

* [RefreshTokenAuthenticator](src/authenticator.ts#L99) -- Authenticator that is instantiated with a bearer token and
a [RefreshTokenStore](src/authenticator.ts#L86) that provides methods for retrieving and storing access and refresh
tokens. When this authenticator is used the API will automatically refresh expired access tokens, save the new tokens,
and retry the original request.

* [SequentialRefreshTokenAuthenticator](src/authenticator.ts#L151)

### Endpoints

* apps -- A SmartApp can be an AWS lambda function or WebHook endpoint. Like to code interface [here](src/endpoint/apps.ts#L267), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Apps)

* capabilities - Operations to read standard Capability definitions as well as create and modify custom Capabilities.  Link to code interface [here](src/endpoint/capabilities.ts#L763), link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Capabilities).

* deviceProfiles - A Device Profile contains the Components, Capabilities, and metadata (ID, name, ownership, etc.) that define a SmartThings Device. Link to code interface [here](src/endpoint/deviceprofiles.ts#L93), link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Device-Profiles)

* devices - Operations to access, control, create, update, and delete Devices.  Like to code interface [here](src/endpoint/devices.ts#L658), link to wiki page [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Devices)

* history - Operations to query event history. Link to code interface [here](src/endpoint/history.ts#L96).

* installedApps - Apps are installed by users.  Link to code interface [here](src/endpoint/installedapps.ts#L331), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Installed-Apps)

* locations - Locations can include Hubs, Devices, and Automations.  Link to code interface [here](src/endpoint/locations.ts#L141), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Locations)

* modes - Operations to change the current Mode of a Location.  Link to code interface [here](src/endpoint/modes.ts#L26), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Modes)

* notifications - Operations to send push notifications to SmartThings mobile app.  Link to code interface [here](src/endpoint/notifications.ts#L83), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Notifications)

* organizations - Operations to list and get Organizations. Link to code interface [here](src/endpoint/organizations.ts#L38). _Future feature. Not yet supported._

* presentation - Operations to query and create Device Configurations and Presentations. Link to code interface [here](src/endpoint/presentation.ts#L189).

* rooms - Operations related to Rooms, a grouping of Devices within a Location.  Link to code interface [here](src/endpoint/rooms.ts#L26), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Rooms)

* rules - Operations for working with Rules.  Rules allow you to create Automations that can operate on SmartThings connected Devices.  Link to code interface [here](src/endpoint/rules.ts#L351), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Rules)

* scenes - Operations to list and execute Scenes.  Currently this endpoint does not support creating or updating Scenes.  Link to code interface [here](src/endpoint/scenes.ts#L56), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Scenes)

* schedules - Operations for scheduling future executions for use in SmartApps.  Link to code interface [here](src/endpoint/schedules.ts#L80), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Schedules)

* schema - Operations for ST Schema connectors and installed instances, along with operations to list the Devices owned by each installed instance. Link to code interface [here](src/endpoint/schema.ts#L244), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Schema)

* services - Operations to query for and subscribe to location service data, currently consisting of current weather conditions, weather forecast, and air quality data.  Link to code interface [here](src/endpoint/services.ts#L499), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Services)

* subscriptions -  Operations for subscribing to events, for use in SmartApps and API Access apps.  Link to code interface [here](src/endpoint/subscriptions.ts#L213), link to wiki page description [here](https://github.com/SmartThingsCommunity/smartthings-core-sdk/wiki/Subscriptions)
