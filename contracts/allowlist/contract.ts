export interface AllowlistProof {
  commitment: string;
  nullifier: string;
  proof: string;
}

const allowlistMembers = new Set<string>(['commitment-123']);
const usedNullifiers = new Set<string>();

export function resetDemoState(): void {
  allowlistMembers.clear();
  usedNullifiers.clear();
  allowlistMembers.add('commitment-123');
}

export function verifyProof(proof: AllowlistProof): boolean {
  if (!allowlistMembers.has(proof.commitment)) return false;
  if (!proof.nullifier || !proof.proof) return false;
  if (usedNullifiers.has(proof.nullifier)) return false;

  usedNullifiers.add(proof.nullifier);
  return true;
}

export function addMember(commitment: string, actor: string): boolean {
  if (actor !== 'owner') return false;
  if (allowlistMembers.has(commitment)) return false;
  allowlistMembers.add(commitment);
  return true;
}
