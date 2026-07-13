interface WalletConnectProps {
  onConnect: () => Promise<void> | void;
  label?: string;
}

export function WalletConnect({ onConnect, label = 'Connect Wallet' }: WalletConnectProps) {
  return (
    <button type="button" onClick={() => void onConnect()}>
      {label}
    </button>
  );
}
