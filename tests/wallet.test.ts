import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connectWallet, detectWalletProvider } from '../src/lib/wallet';

describe('wallet adapter', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('detects an injected provider when available', () => {
    const provider = {
      request: vi.fn().mockResolvedValue(['0xabc'])
    };

    vi.stubGlobal('ethereum', provider);

    expect(detectWalletProvider()).toBe(provider);
  });

  it('connects a wallet and returns the first address', async () => {
    const provider = {
      request: vi.fn().mockResolvedValue(['0xabc'])
    };

    vi.stubGlobal('ethereum', provider);

    await expect(connectWallet()).resolves.toBe('0xabc');
  });

  it('returns null when no provider is available', async () => {
    await expect(connectWallet()).resolves.toBeNull();
  });
});
