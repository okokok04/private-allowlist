# Private Allowlist

A polished, Midnight-inspired demo for private allowlist access. The app shows how a user can prove membership without revealing wallet identity, personal details, or private witness data.

## What this project demonstrates
- Selective disclosure for access control
- Private membership proof flow
- End-to-end frontend + contract-style verification demo
- Automated tests and CI

## Architecture
- Frontend: React + TypeScript + Vite
- Contract logic: allowlist verification and nullifier protection
- Circuit logic: proof generation from a private witness
- Tests: Vitest with React Testing Library

## Setup
```bash
npm install
npm run dev
```

## Testing
```bash
npm run test
```

## Build
```bash
npm run build
```

## Privacy model
Observers can see that a verification occurred and that access was granted, but they cannot learn:
- wallet identity
- personal metadata
- allowlist membership details beyond the proof outcome
- the private witness

## Submission-ready roadmap
- contract logic
- circuit-style proof generation
- polished UI
- automated tests
- CI workflow
- documentation and proposal
