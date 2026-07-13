export interface Witness {
  commitment: string;
  secret: string;
}

export interface MembershipProof {
  commitment: string;
  nullifier: string;
  proof: string;
}

export function generateMembershipProof(witness: Witness): MembershipProof {
  if (!witness.commitment || !witness.secret) {
    throw new Error('Witness is incomplete.');
  }

  return {
    commitment: witness.commitment,
    nullifier: `nullifier:${witness.secret}`,
    proof: `proof:${witness.commitment}:${witness.secret}`
  };
}
