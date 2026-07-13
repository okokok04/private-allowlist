interface ProofButtonProps {
  onGenerate: () => void;
}

export function ProofButton({ onGenerate }: ProofButtonProps) {
  return (
    <button type="button" onClick={onGenerate}>
      Generate Proof
    </button>
  );
}
