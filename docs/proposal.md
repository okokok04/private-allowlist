# Product Proposal

## Idea
Private Allowlist Access enables users to prove allowlist membership without exposing their identity.

## Why it matters
- Strong privacy story for access control
- Clear selective disclosure use case for Midnight
- Suitable for gated communities, private events, and early access programs

## Proposed experience
1. User connects wallet.
2. The app generates a private membership proof.
3. The proof is verified on-chain without leaking identity.
4. Access is granted only if the proof is valid.

## Technical scope
- React + TypeScript frontend
- Allowlist contract logic
- Membership proof circuit
- Automated tests and CI
