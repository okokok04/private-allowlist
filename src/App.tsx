import { useMemo, useState } from 'react';
import { verifyProof, type AllowlistProof } from '../contracts/allowlist/contract';
import { generateMembershipProof } from '../contracts/allowlist/circuits';
import { connectWallet } from './lib/wallet';
import { ProofButton } from './components/ProofButton';
import { StatusCard } from './components/StatusCard';
import { WalletConnect } from './components/WalletConnect';

const demoProof: AllowlistProof = {
  commitment: 'commitment-123',
  nullifier: 'nullifier-123',
  proof: 'proof-abc'
};

function App() {
  const [status, setStatus] = useState('Connect your wallet to continue.');
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [proofSummary, setProofSummary] = useState('Awaiting proof generation.');

  const canAccess = useMemo(() => isVerified, [isVerified]);

  const handleConnect = async () => {
    setIsLoading(true);
    setStatus('Connecting wallet…');
    const connectedAddress = await connectWallet();
    if (!connectedAddress) {
      setStatus('No wallet provider was detected.');
      setIsLoading(false);
      return;
    }

    setIsConnected(true);
    setAddress(connectedAddress);
    setStatus(`Wallet connected: ${connectedAddress.slice(0, 8)}...`);
    setIsLoading(false);
  };

  const handleGenerateProof = () => {
    if (!isConnected) {
      setStatus('Connect your wallet first.');
      return;
    }

    setIsLoading(true);
    setStatus('Generating private proof…');

    const proof = generateMembershipProof({ commitment: 'commitment-123', secret: 'demo-secret' });
    setProofSummary(`Proof created for commitment ${proof.commitment}`);
    setStatus('Proof generated. Submit it to the allowlist contract.');
    setIsLoading(false);
  };

  const handleVerify = () => {
    if (!isConnected) {
      setStatus('Connect your wallet first.');
      return;
    }

    setIsLoading(true);
    setStatus('Verifying proof…');

    const result = verifyProof(demoProof);
    setStatus(result ? 'Access granted via private proof.' : 'Proof rejected.');
    setIsVerified(result);
    setIsLoading(false);
  };

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Private Allowlist Access</p>
        <h1>Prove membership without revealing identity.</h1>
        <p className="subtext">
          This Midnight-inspired demo shows how selective disclosure can prove allowlist membership while keeping the user private.
        </p>
        <div className="action-row">
          <WalletConnect onConnect={handleConnect} />
          <ProofButton onGenerate={handleGenerateProof} />
          <button type="button" onClick={handleVerify}>
            Verify Membership
          </button>
        </div>
        <div className={`status ${canAccess ? 'success' : isLoading ? 'loading' : 'info'}`}>
          {isLoading ? '⏳ ' : ''}
          {status}
        </div>
        <div className="proof-box">
          <strong>Wallet:</strong> {address ?? 'Not connected'}
        </div>
        <div className="proof-box">{proofSummary}</div>
        <div className="card-grid">
          <StatusCard title="Privacy" description="Reveal access, not identity." />
          <StatusCard title="Proof" description="Membership is proven without exposing your wallet." />
          <StatusCard title="Flow" description="Connect → Prove → Verify → Access." />
        </div>
      </section>
    </main>
  );
}

export default App;
