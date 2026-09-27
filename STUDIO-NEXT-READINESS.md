# Studio Next readiness probe — 2026-09-27

- Endpoint: `https://studio-dev.genlayer.com/api`
- JSON-RPC method: `eth_chainId`
- Result: `0xf22d` (decimal 61997)
- Writes submitted: 0
- CLI: `genlayer 0.39.2`; built-in networks omit `studio-dev` and `network info` fails with `Unknown network: studio-dev`.
- Decision: endpoint is reachable and returns the required chain, but the installed official CLI cannot target it by the required preset. No signing or deployment performed.
