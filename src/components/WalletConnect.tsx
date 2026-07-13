interface WalletConnectProps {
  onConnect: () => Promise<void> | void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  return (
    <button type="button" onClick={() => void onConnect()}>
      Connect Wallet
    </button>
  );
}
