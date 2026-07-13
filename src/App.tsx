import { useEffect, useMemo, useState } from 'react';
import { verifyProof, type AllowlistProof } from '../contracts/allowlist/contract';
import { generateMembershipProof } from '../contracts/allowlist/circuits';
import { connectWallet, isFreighterInstalled, isWalletInstalled } from './lib/wallet';
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
  const [isFreighterDetected, setIsFreighterDetected] = useState(false);
  const [isWalletDetected, setIsWalletDetected] = useState(false);
  const [isEmbeddedBrowser, setIsEmbeddedBrowser] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [proofSummary, setProofSummary] = useState('Awaiting proof generation.');

  const canAccess = useMemo(() => isVerified, [isVerified]);

  const refreshDetection = () => {
    setIsFreighterDetected(isFreighterInstalled());
    setIsWalletDetected(isWalletInstalled());
    setIsEmbeddedBrowser(/Code\/|Electron\//i.test(navigator.userAgent));
  };

  useEffect(() => {
    refreshDetection();
    const interval = window.setInterval(refreshDetection, 2000);
    return () => window.clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setStatus('Connecting wallet…');
    const connectedAddress = await connectWallet();
    if (!connectedAddress) {
      setStatus('No wallet detected. Install Freighter or MetaMask, unlock it, then refresh and try again.');
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
          This Midnight-inspired demo shows how selective disclosure can prove allowlist membership while keeping the user private. Use a Freighter-enabled browser for the wallet experience.
        </p>
        <div className="action-row">
          <WalletConnect onConnect={handleConnect} label="Connect Wallet" />
          <ProofButton onGenerate={handleGenerateProof} />
          <button type="button" onClick={handleVerify}>
            Verify Membership
          </button>
        </div>
        <div className="wallet-hint">
          {isEmbeddedBrowser ? (
            <span>
              This page is running inside VS Code / Electron. Open the app in a real browser like Chrome or Edge so Freighter/MetaMask can inject.
            </span>
          ) : isWalletDetected ? (
            <span>Injected wallet detected. Click Connect Wallet to authorize.</span>
          ) : (
            <span>
              No wallet detected. Install Freighter or MetaMask in a regular browser and refresh this page.
            </span>
          )}
          <div className="wallet-actions">
            <button type="button" className="retry-button" onClick={refreshDetection}>
              Check Again
            </button>
            <button type="button" className="retry-button" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
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
