import { beforeEach, describe, expect, it } from 'vitest';
import { addMember, resetDemoState, verifyProof } from '../contracts/allowlist/contract';

describe('allowlist contract', () => {
  beforeEach(() => {
    resetDemoState();
  });

  it('allows owner to add a member', () => {
    expect(addMember('commitment-456', 'owner')).toBe(true);
  });

  it('accepts a valid proof', () => {
    expect(
      verifyProof({
        commitment: 'commitment-123',
        nullifier: 'n1',
        proof: 'p1'
      })
    ).toBe(true);
  });

  it('rejects an invalid proof', () => {
    expect(
      verifyProof({
        commitment: 'unknown',
        nullifier: 'n1',
        proof: 'p1'
      })
    ).toBe(false);
  });

  it('rejects unauthorized add-member requests', () => {
    expect(addMember('commitment-789', 'stranger')).toBe(false);
  });

  it('rejects reused nullifiers', () => {
    expect(
      verifyProof({
        commitment: 'commitment-123',
        nullifier: 'n1',
        proof: 'p1'
      })
    ).toBe(true);

    expect(
      verifyProof({
        commitment: 'commitment-123',
        nullifier: 'n1',
        proof: 'p1'
      })
    ).toBe(false);
  });
});
