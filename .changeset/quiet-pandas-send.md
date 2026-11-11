---
"@smartthings/core-sdk": patch
---

Manually serialize data for `virtualDevices.createStandard`. (Recent axios versions strip the `prototype` field from request bodies.)
