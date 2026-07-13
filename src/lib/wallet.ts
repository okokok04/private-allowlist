export interface WalletProviderLike {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

export interface EthereumProviderLike extends WalletProviderLike {
  isMetaMask?: boolean;
  providers?: WalletProviderLike[];
  enable?: () => Promise<unknown>;
}

export interface FreighterLike {
  isConnected?: () => Promise<boolean>;
  getPublicKey?: () => Promise<string | null>;
  connect?: () => Promise<void>;
  request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

export function detectWalletProvider(): WalletProviderLike | null {
  const globalWindow = globalThis as typeof globalThis & {
    ethereum?: EthereumProviderLike;
    web3?: { currentProvider?: WalletProviderLike };
  };

  const ethereum = globalWindow.ethereum;
  if (ethereum?.providers && ethereum.providers.length > 0) {
    return (
      ethereum.providers.find((provider) => (provider as EthereumProviderLike).isMetaMask) ??
      ethereum.providers[0]
    );
  }

  return ethereum ?? globalWindow.web3?.currentProvider ?? null;
}

export function detectFreighter(): FreighterLike | null {
  const globalWindow = globalThis as typeof globalThis & {
    freighterApi?: FreighterLike;
    freighter?: FreighterLike;
    Freighter?: FreighterLike;
    window?: typeof globalThis & { freighterApi?: FreighterLike; freighter?: FreighterLike; Freighter?: FreighterLike };
  };

  return (
    globalWindow.freighterApi ??
    globalWindow.freighter ??
    globalWindow.Freighter ??
    globalWindow.window?.freighterApi ??
    globalWindow.window?.freighter ??
    globalWindow.window?.Freighter ??
    null
  );
}

export function isFreighterInstalled(): boolean {
  return detectFreighter() !== null;
}

export function isWalletInstalled(): boolean {
  return detectFreighter() !== null || detectWalletProvider() !== null;
}

export async function waitForFreighter(timeoutMs = 2000, intervalMs = 200): Promise<FreighterLike | null> {
  const deadline = Date.now() + timeoutMs;
  let freighter = detectFreighter();

  while (!freighter && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    freighter = detectFreighter();
  }

  return freighter;
}

async function getFreighterPublicKey(freighter: FreighterLike): Promise<string | null> {
  if (typeof freighter.connect === 'function') {
    await freighter.connect().catch(() => null);
  } else if (typeof freighter.request === 'function') {
    await freighter.request({ method: 'connect' }).catch(() => null);
  }

  const publicKey = await freighter.getPublicKey?.().catch(() => null);
  if (typeof publicKey === 'string' && publicKey.length > 0) return publicKey;

  const connected = await freighter.isConnected?.().catch(() => false);
  if (!connected) return null;

  if (typeof freighter.request === 'function') {
    const maybeKey = await freighter.request({ method: 'publicKey' }).catch(() => null);
    return typeof maybeKey === 'string' ? maybeKey : null;
  }

  return null;
}

function parseAccounts(accounts: unknown): string | null {
  if (Array.isArray(accounts) && typeof accounts[0] === 'string') return accounts[0];
  if (typeof accounts === 'string') return accounts;
  if (accounts && typeof accounts === 'object' && 'result' in accounts) {
    const resultValue = (accounts as Record<string, unknown>).result;
    if (Array.isArray(resultValue) && typeof resultValue[0] === 'string') return resultValue[0];
  }
  return null;
}

async function requestAccounts(provider: EthereumProviderLike): Promise<unknown> {
  try {
    return await provider.request({ method: 'eth_requestAccounts' });
  } catch (firstError) {
    if (typeof provider.enable === 'function') {
      return await provider.enable();
    }
    throw firstError;
  }
}

export async function connectWallet(): Promise<string | null> {
  const freighter = await waitForFreighter();
  if (freighter) {
    const publicKey = await getFreighterPublicKey(freighter);
    if (publicKey) return publicKey;
    return null;
  }

  const provider = detectWalletProvider() as EthereumProviderLike | null;
  if (!provider) return null;

  const accounts = await requestAccounts(provider).catch(() => null);
  const parsedAccount = parseAccounts(accounts);
  if (parsedAccount) return parsedAccount;

  const fallback = await provider.request({ method: 'eth_accounts' }).catch(() => null);
  return parseAccounts(fallback);
}
