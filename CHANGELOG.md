## [5.1.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v5.1.0...v5.1.1) (2022-08-03)


### Bug Fixes

* update virtual device fields ([264bc1b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/264bc1b4880618a5b0b750307151d2274881d90c))

## [5.1.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v5.0.0...v5.1.0) (2022-07-21)


### Features

* added userEmail and app links fields to ST schema apps ([237c1a0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/237c1a071819aec9595259db8339b60664478f3a))


### Bug Fixes

* correct type of JSON schema v4 items property ([e33f37b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/e33f37bc9fb9a032748422f334f767efc48d2b9c))

## [5.0.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v4.2.0...v5.0.0) (2022-06-13)


### ⚠ BREAKING CHANGES

* **apps:** Most of the request/response models related to apps will need to be updated.

Anything using `App` will need to be changed to either `AppResponse` (if used with GET)
or `PagedApp` (if used with LIST). AppEndpoints that previously returned `Count` or `Status` now
return an empty Promise.

### Bug Fixes

* **apps:** update models to match API spec ([84c41b3](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/84c41b326bbc6b10128c2dfcf84c5985e38f60d5)), closes [#89](https://github.com/SmartThingsCommunity/smartthings-core-sdk/issues/89)

## [4.2.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v4.1.0...v4.2.0) (2022-06-01)


### Features

* add hubdevices endpoints ([1bcdf62](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/1bcdf627e1017a32e69eebe31a5b489af92c4e7d))

## [4.1.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v4.0.0...v4.1.0) (2022-05-23)


### Features

* added support for virtual devices ([383c03e](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/383c03ec5cf16f30aad09c816e2ae46681dc5240))

## [4.0.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.6.0...v4.0.0) (2022-05-19)


### ⚠ BREAKING CHANGES

* **rules:** Updated rules model objects have been significantly updated.

### Bug Fixes

* **rules:** update rules model objects to match current API ([28b04ec](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/28b04ec4d00ff7e6553ff650128637d358b3de6a))

## [3.6.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.5.0...v3.6.0) (2022-04-27)


### Features

* add support for listing drivers in default channel ([ef92829](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/ef928295b714c697be7d5f6c504a15f9b74c44a6))

## [3.5.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.4.1...v3.5.0) (2022-04-13)


### Features

* update device models ([9f8a4dc](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/9f8a4dcbb8467c1653fa75943c359eb10276e424))

### [3.4.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.4.0...v3.4.1) (2022-04-01)


### Performance Improvements

* replace underscore with lodash modules ([8429815](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/8429815b17b7f6ce29ed18ecd9fe045a9285ec92))

## [3.4.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.3.0...v3.4.0) (2022-03-02)


### Features

* **SmartThingsClient:** merge headers during clone ([e85e7e6](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/e85e7e64b69e68dfad0f266c199f70394a302a74))

## [3.3.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.2.0...v3.3.0) (2022-02-11)


### Features

* **locations:** return allowed permissions ([6adc6a5](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/6adc6a5946b50930bf67fb36c7125c1e50260bf5))

## [3.2.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.1.1...v3.2.0) (2022-02-11)


### Features

* add support for logging RFC 2068 warning headers ([854a3f2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/854a3f27e706d2a3d6de71a317b6f4c0c840a355))

### [3.1.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.1.0...v3.1.1) (2022-02-04)


### Bug Fixes

* **rules:** correct IfAction 'else' property ([0bd562a](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/0bd562a26cd945b942f0b2823abc671c61fb7581)), closes [#128](https://github.com/SmartThingsCommunity/smartthings-core-sdk/issues/128)

## [3.1.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v3.0.0...v3.1.0) (2022-02-01)


### Features

* add channels and drivers endpoints ([9e5616c](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/9e5616c0ab7ebd1a64b2eeda5bf92fd2991c3fef))

## [3.0.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v2.1.1...v3.0.0) (2022-01-21)


### ⚠ BREAKING CHANGES

* the return type of RulesEndpoint.execute is different

### Bug Fixes

* fix return type of rules execute function; update dependencies ([ecb8e3b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/ecb8e3bcac200916e8bf21e982768b1ffce275e3))

### [2.1.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v2.1.0...v2.1.1) (2022-01-18)


### Bug Fixes

* **devicepreferences:** unwrap paged items in response ([cfd832b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/cfd832bb1708e6e08b8bda861630eabe915136f4))

## [2.1.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v2.0.1...v2.1.0) (2022-01-06)


### Features

* **devicepreferences:** expand i18n support ([e5b4d15](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/e5b4d15d3d7dc8a8de9caecfb544ee6f18fe2c25))

### [2.0.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v2.0.0...v2.0.1) (2022-01-05)


### Bug Fixes

* corrected childDevices type in Device model object ([216e5cc](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/216e5cc25b43780210019db566a57c30bf3091ff))

## [2.0.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.12.1...v2.0.0) (2021-12-28)


### ⚠ BREAKING CHANGES

* DevicesEndpoint.sendCommands was modified to return a list of all results
using Promise.allSettled instead of failing completely on any failure.
* The return types of some devices model objects changed, in particular the
methods for executing commands. In some cases, what was being returned by
the API was lost.

### Features

* update typescript, update devices sendCommands to return all results ([bb7532c](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/bb7532c11e75603ca0a421a2656d70c780b4a2e6))


### Bug Fixes

* update devices model objects ([2b64e0a](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/2b64e0a017c847ef1f73957bce374426a65bc4f9))

### [1.12.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.12.0...v1.12.1) (2021-12-10)


### Bug Fixes

* **devicepreferences:** rename translations methods ([f360329](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/f3603294b5e0dfe2e8da58fac32ff814c730923e))

## [1.12.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.11.0...v1.12.0) (2021-12-08)


### Features

* **devicepreferences:** initial suppport for i18n ([08d776b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/08d776b92cb0e4c0900168f64fe1cb090d61bda9))

## [1.11.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.10.1...v1.11.0) (2021-11-23)


### Features

* Added support for Organizations ([348b830](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/348b8303ad853636bbcc22bfc2b90f48ef4beff2))

### [1.10.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.10.0...v1.10.1) (2021-10-11)


### Bug Fixes

* scrub auth before logging requests ([5fba629](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/5fba629f39437853c398f6df4d920ec6ef8c138a))

## [1.10.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.9.0...v1.10.0) (2021-09-07)


### Features

* Added command to regenerate schema oauth credentials ([58b1f62](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/58b1f6258c3ca96410b0d12b8f1969a37780bb92))

## [1.9.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.8.1...v1.9.0) (2021-07-14)


### Features

* add support for device preferences CRUD operations ([bb6abf2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/bb6abf27701e94f7b105c609a6a9bba2e477db45))

### [1.8.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.8.0...v1.8.1) (2021-06-15)


### Bug Fixes

* remove invalid Windows filenames ([2276914](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/22769142f943b2aae0208568a81267445f275e3d))

## [1.8.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.7.0...v1.8.0) (2021-06-10)


### Features

* Added method to retrieve device preference values ([7ee91eb](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/7ee91eba678cadf1345fce0b0ef7843ba1a662f2))

## [1.7.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.6.1...v1.7.0) (2021-05-24)


### Features

* **Authenticator:** add client agnostic auth function ([110c402](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/110c402aa9b4835f16eddfd7cd9b4dea11d14ec0))

### [1.6.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.6.0...v1.6.1) (2021-05-20)


### Bug Fixes

* added missing capability translations methods ([b86a6e6](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/b86a6e6131b734a2b83b071fc6bdebd400087b56))

## [1.6.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.5.0...v1.6.0) (2021-05-14)


### Features

* add types for preferences in device profiles types ([ccbe1bb](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/ccbe1bb283d4a9f85377dbd6308454931dd09db1))

## [1.5.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.4.1...v1.5.0) (2021-05-13)


### Features

* Added device includeHealth and includeStatus options ([b2d2fa2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/b2d2fa2e749be6a64250ea5baf4fad41911c49c1))

### [1.4.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.4.0...v1.4.1) (2021-05-11)


### Bug Fixes

* **deps:** npm audit ([fff2000](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/fff20003952900a1d300ee8a4af062c4259bee04))

## [1.4.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.3.3...v1.4.0) (2021-04-13)


### Features

* Added new restrictionTier attribute to installedapps ([0831b55](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/0831b55d2e3dc1639b6821d9493ffa26d320efe7))

### [1.3.3](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.3.2...v1.3.3) (2021-01-06)


### Bug Fixes

* npm audit ([893e47b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/893e47b9ddfdae18a463b11fa39e1bc7fa5e1729))

### [1.3.2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.3.1...v1.3.2) (2020-12-09)


### Bug Fixes

* Added missing second parameter to presentation.get() ([8e32abd](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/8e32abd78f2b946deb21326232836ca845561286))

### [1.3.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.3.0...v1.3.1) (2020-12-03)


### Bug Fixes

* enable no-floating-promises lint rule and fix issue found ([2f7210d](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/2f7210d820e35fa1c184bcfe530ab9020e02a3e3))

## [1.3.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.2.0...v1.3.0) (2020-11-16)


### Features

* Added devices.updateProfile method ([0b6680f](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/0b6680f87af9a293513586847bbe06ced6db03df))

## [1.2.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.1.3...v1.2.0) (2020-10-27)


### Features

* Added new conditions and actions ([d8fae71](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/d8fae712b39e2c611b2b5d7a1f8f9e524e439900))

### [1.1.3](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.1.2...v1.1.3) (2020-10-08)


### Bug Fixes

* Accept installedAppId in devices list query ([ddf12ab](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/ddf12abb4702a8a7a0f41feba5de0758357f2ab1))

### [1.1.2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.1.1...v1.1.2) (2020-09-16)


### Bug Fixes

* remove ambiguous log method ([688195b](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/688195b450d3850221e5d38b91c9b8058ce6e73a))

### [1.1.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.1.0...v1.1.1) (2020-09-16)


### Bug Fixes

* Use POST rather than PUT for subscriptions.create ([1d24bf9](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/1d24bf94de33d590f85258c3945cdde1c9e848b0))

## [1.1.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v1.0.0...v1.1.0) (2020-09-15)


### Features

* Added localization support for capabilities and device profiles ([aaeca2a](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/aaeca2aa197369096b4813234e37da7eaea437c8))

## [1.0.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.7.0...v1.0.0) (2020-09-15)


### ⚠ BREAKING CHANGES

* previous change to replace vid with presentationId

### Features

* Force a release and updated README ([aa52dcf](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/aa52dcfb2e3f433e3a612f8459c10b01395ac280))

## [0.7.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.6.0...v0.7.0) (2020-09-10)


### Features

* Add patch property to device configs ([8fb41b8](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/8fb41b86a2b426c9f28543ef8d2848a220f0c865))

## [0.6.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.5.1...v0.6.0) (2020-09-02)


### Features

* Added options to apps list method ([c2dcac8](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/c2dcac862148af31e5b502a3cefc3a145ba5bfbd))
* support searching by device integration type when listing devices ([a17dcc1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/a17dcc127005866188234b4b16557363de814076))


### Bug Fixes

* can be set `stateChangeOnly` false ([db85732](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/db85732ad4b5d02ab10e389d159a9a9f7734db93))

### [0.5.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.5.0...v0.5.1) (2020-08-26)


### Bug Fixes

* bring device types in-line with API docs ([65db4f6](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/65db4f6e550ad61b6037b7b6b77958853e138191))

## [0.5.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.4.0...v0.5.0) (2020-08-12)


### Features

* Added history endpoints ([0b1e963](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/0b1e96325ac79c9b5f9e1a2a278b06ed607a1b0b))

## [0.4.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.3.1...v0.4.0) (2020-08-05)


### Features

* support header overrides in EndpointClient ([6aec3d4](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/6aec3d40f1cb72fcca7e4f9e2478502e4f37618a))

### [0.3.1](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.3.0...v0.3.1) (2020-07-22)


### Bug Fixes

* export EndpointClient class normally so it can be used directly outside SDK ([be3c48d](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/be3c48d75b991da89bf8fc8706800725be8a2adb))

## [0.3.0](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.2.14...v0.3.0) (2020-07-13)


### Features

* allow CapabilityCreate to accept params ([96ce5cd](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/96ce5cd5dc2885bd8a85c59215dfd87cdf2988e7))

### [0.2.14](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.2.12...v0.2.14) (2020-06-26)

### [0.2.12](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/v0.0.3...v0.2.12) (2020-06-23)


### Features

* Added class for verification of webhook request signatures ([e8d00f2](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/e8d00f28d3b7d86b916fa8f9d7eebd6be246304f))


### Bug Fixes

* Catch missing/corrupted header exception in signature auth test ([ebce235](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/ebce2352311cd72e67703a22a526ca3d947ebe96))
* correct spelling of SchemaCreateResponse ([99e3751](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/99e3751c6cb3775b25d11c66b9571b1dd6c43e4a))
* Corrected error in device.create() ([6f8b1a7](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/6f8b1a7a0d91c825c6286b1bfd5c4bd32d2714b9))
* Corrected error in device.createEvents() ([8344dfb](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/8344dfba9a3f859d8a5123fdb8f2dc85cf4e8b07))

### [0.0.3](https://github.com/SmartThingsCommunity/smartthings-core-sdk/compare/579fb4c51bd3a149551facff09eb025a69b74e12...v0.0.3) (2020-03-19)


### Features

* Added runOnce scheduling method and fixed subscription bug ([579fb4c](https://github.com/SmartThingsCommunity/smartthings-core-sdk/commit/579fb4c51bd3a149551facff09eb025a69b74e12))
