# Deployment failure reconciliation — r1

Operation: `clause-branch-compatibility-council-build-deploy-r1`
Actor: actor7 (`0x8581c4a532dd3f9b163b12809b1bd089f367147f`)
RPC: `https://studio-dev.genlayer.com/api`
Chain: `61997`
Transaction hash: `0xbd2f488e329319fb530a1de59c5aac83c2d5a5f5d695690d0874d83241892e95`

Read-only `eth_getTransactionReceipt` result:
- status: `0x0`
- blockNumber: `0x0`
- revertReason: `FeeValueMustBeNonZero(1)`
- contractAddress: `null`

Fault class: DETERMINISTIC. No deployment occurred. The operation journal is retained and will not be reused.

Read-only `estimate-fees --fee-preset standard --json` returned feeValue `100000000000010352` wei. A corrected deployment may use a new operation ID with this explicit fee value.
## Deployment failure reconciliation — r2

Operation: `clause-branch-compatibility-council-build-deploy-r2`  
Transaction hash: `0x003165ca4cb7b435fd3b683d9b39a008c5e8d83d843839301169cb6b9f528645`

Read-only `eth_getTransactionReceipt` result:
- status: `0x0`
- blockNumber: `0x0`
- revertReason: `FeeValueMustBeNonZero(1)`
- contractAddress: `null`

Fault class: DETERMINISTIC. No deployment occurred. The r2 operation journal is retained and will not be reused. The preset plus explicit fee value still did not populate the deployment fee field; the toolchain's historical successful syntax includes the explicit `--fees` distribution JSON as well.

Writes submitted after the failed deployments: 0 additional writes.

## Deployment r3 — externally reconciled success

Operation: `clause-branch-compatibility-council-build-deploy-r3`
Transaction hash: `0xa2cb3147102a06c165e2e7fd5b28d3ac5866e1acbe2ab2674ea8fff7faa5f9e9`
Contract address: `0x66Cc5CbB2ABf459f75b63699fbd3cf5c8c366b2c`
Consensus: `ACCEPTED`; result `MAJORITY_AGREE`; direct RPC receipt status `0x1`; fee value `100000000000010352` wei.
The operation journal reported reconciliation required, so the CLI result was independently reconciled from the same hash. Source code in the receipt matches the local contract bytes.

This is deployment evidence only; frontend/Vercel E2E remains outstanding.
