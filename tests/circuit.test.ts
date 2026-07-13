import { describe, expect, it } from 'vitest';
import { generateMembershipProof } from '../contracts/allowlist/circuits';

describe('membership circuit', () => {
  it('creates proof from a valid witness', () => {
    const proof = generateMembershipProof({ commitment: 'abc', secret: 'secret' });
    expect(proof.commitment).toBe('abc');
    expect(proof.nullifier).toContain('nullifier');
    expect(proof.proof).toContain('proof');
  });

  it('rejects incomplete witness', () => {
    expect(() => generateMembershipProof({ commitment: '', secret: 'secret' })).toThrow('Witness is incomplete.');
  });
});
