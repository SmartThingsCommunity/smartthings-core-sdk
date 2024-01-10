---
"@smartthings/core-sdk": patch
---

Decouple from axios. Dependents of the core SDK no longer need to use the same version of
axios, or even use axios at all.
