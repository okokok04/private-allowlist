# Private Allowlist

![CI](https://github.com/okokok04/private-allowlist/actions/workflows/ci.yml/badge.svg)

A polished Midnight-inspired demo for private allowlist access. The app shows how a user can prove membership while keeping wallet identity, personal details, and private witness data private.

## Live demo
- https://mid-eta-ochre.vercel.app

## What this project demonstrates
- Selective disclosure for access control
- Private membership proof flow
- End-to-end frontend + contract-style verification demo
- Wallet detection and connect flow
- Automated tests and CI
- Public deployment evidence for submission

## Architecture
- Frontend: React + TypeScript + Vite
- Proof logic: allowlist membership verification
- Privacy model: private witness and identity protection
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

## Public evidence
- Repository: https://github.com/okokok04/private-allowlist
- Live demo: https://mid-eta-ochre.vercel.app
- CI workflow: `.github/workflows/ci.yml`
- Submission evidence: `SUBMISSION.md`

## Media evidence
- Screenshot: capture the deployed app UI at https://mid-eta-ochre.vercel.app
- Video: record a short demo showing wallet connection, proof generation, and verification
- Guidelines: see `docs/media-guidelines.md`

## Privacy model
Observers can see that verification occurred and that access was granted, but they cannot learn:
- wallet identity
- personal metadata
- allowlist membership details beyond the proof outcome
- the private witness

## Submission readiness
- [x] Public live demo URL
- [x] GitHub repository under `okokok04`
- [x] CI workflow configured
- [x] Build passes (`npm run build`)
- [x] Tests pass (`npm run test`)
- [x] Privacy model documented
- [x] Product proposal documented
- [x] Submission evidence file created
- [x] Deployment public and accessible
- [x] Architecture described

## Notes
This repository is prepared for Level 3 submission with documented evidence, public production deployment, and a clear privacy-focused product story.
