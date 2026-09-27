# Clause Branch Compatibility Council

A public GenLayer application for comparing a bounded base clause with a branch clause through validator consensus.

## Network

The target is Studio Next, chain `61997`, RPC `https://studio-dev.genlayer.com/api`. The current installed CLI (`0.39.2`) does not expose the required `studio-dev` preset; deployment remains blocked until an official compatible tool is available.

## Local checks

```text
genvm-lint contracts/main.py
pytest -q
cd frontend && npm test && npm run build
```

The frontend refuses to submit when the contract address is not configured and never reports a transaction success before finality and authoritative readback.
