# SPEC LOCK — Clause Branch Compatibility Council

Baseline: Research dossier R1, SHA-256 3115afbc055cb44c25a2a588ccc09239724a0de3fbaf5780a8f311c2b3e25a88.

## Scope
One contract and one public frontend for one clause pair at a time, maximum 32 records. No external data source, credentials, admin panel, or secondary dashboard.

## Contract
Single contract with `create_pair`, `freeze_pair`, `evaluate_pair`, `retry_pair`; views `get_pair`, `get_decision`, `list_pairs`. State: OPEN -> FROZEN -> COMPATIBLE|CONDITIONAL|INCOMPATIBLE|UNRESOLVED. Owner/challenger permissions, expected-revision CAS, creator+nonce idempotency, immutable journal, 16 KiB aggregate input cap.

Nondeterministic output is canonical JSON `{v, decision, reason_code, evidence_hash}`. Unknown keys, duplicate keys, malformed UTF-8, floats/NaN, disagreement, or invalid evidence fail closed to no mutation / UNRESOLVED according to the dossier.

## Frontend
Wallet discovery and chain 61997 validation, one canonical wallet store, explicit transaction phases, bounded polling, retained hash on ambiguity, and authoritative readback only after FINALIZED + FINISHED_WITH_RETURN. RPC matrix: landing 0; explicit list/detail 1 each; writes <=6 bounded requests; hidden-tab polling disabled.

## Tests and evidence
Schema boundaries, permissions, state/revision errors, prompt-injection fixture, changed-result-field, disagreement/UNKNOWN, retry cooldown, duplicate nonce, finality/readback mismatch, wallet/wrong-chain, transaction lifecycle, build/lint, public-copy and secret scans.

## Runtime / release
Use Studio Next RPC `https://studio-dev.genlayer.com/api`, chain 61997, `studioDevnet`, `studio-dev`. Probe installed runtime before code. No signing or deployment before governed PRE_DEPLOY and exact evidence. GitHub public tree only; Vercel target remains the connected account and is not touched before post-deploy gates.

## Experience lookup
Targeted search of `E:\Genlayer\experience\Task Build Experience.md` found applicable guidance for nondeterministic consensus (2026-08-07), untrusted receipt/JSON boundaries (2026-08-08), and frontend transaction reconciliation (2026-08-08). These map to canonical-result equality + disagreement fail-closed, lossless receipt parsing/bigint-safe handling, retained hashes, and authoritative state readback. Regression tests above cover each control. Vercel provenance guidance is deferred until VERCEL scope.

## Allowed files
All files under this build workspace needed for contract, frontend, tests, manifests, public README and verification evidence.

## Forbidden files
Secrets, private keys, keystores, `.env`, internal prompts, chat transcripts, governance source, anonymous review packages, research drafts, logs, caches, screenshots, build output, and unrelated projects.
