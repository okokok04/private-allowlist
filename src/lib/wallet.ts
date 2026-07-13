export interface WalletProviderLike {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

export function detectWalletProvider(): WalletProviderLike | null {
  const globalWindow = globalThis as typeof globalThis & { ethereum?: WalletProviderLike };
  return globalWindow.ethereum ?? null;
}

export async function connectWallet(): Promise<string | null> {
  const provider = detectWalletProvider();
  if (!provider) return null;

  const result = await provider.request({ method: 'eth_requestAccounts' });
  const accounts = Array.isArray(result) ? result : [];
  return typeof accounts[0] === 'string' ? accounts[0] : null;
}
