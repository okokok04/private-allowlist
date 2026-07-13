# Product Proposal

## Idea
Private Allowlist Access enables users to prove membership without exposing their wallet identity or private witness data. The goal is to create an access control flow that protects user privacy while still validating allowlist membership.

## Problem statement
Current allowlist access flows often require wallet addresses or public metadata that can reveal user identity. This project demonstrates a privacy-preserving alternative for gated access and early release experiences.

## Why it matters
- Strong privacy story for access control
- Clear selective disclosure use case for Midnight
- Seamless UX for gated communities, private events, and early access programs
- Demonstrates how privacy-preserving proofs can be integrated in a frontend application

## Proposed experience
1. User connects a browser wallet.
2. The app generates a private membership proof from a private witness.
3. The proof is verified without leaking wallet identity.
4. Access is granted only when the proof is valid.

## User flow
- Wallet detection and connect
- Proof generation request
- Proof verification result shown in the UI
- Access state updated based on verification outcome

## Technical scope
- React + TypeScript frontend
- Browser wallet support and detection
- Proof generation logic for private allowlist membership
- Verification logic to validate proofs
- Automated tests and GitHub Actions CI

## Privacy model
- Only proof validity is revealed to observers
- Wallet address and private witness are never exposed
- The app preserves selective disclosure and limits metadata

## Submission readiness
This proposal is backed by a running Vercel deployment, an automated CI workflow, and documented submission evidence in `SUBMISSION.md`.
