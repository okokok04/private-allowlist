import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connectWallet, detectWalletProvider, isFreighterInstalled } from '../src/lib/wallet';

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

  it('connects with Freighter when available', async () => {
    const freighter = {
      isConnected: vi.fn().mockResolvedValue(true),
      getPublicKey: vi.fn().mockResolvedValue('GBABC123')
    };

    vi.stubGlobal('freighterApi', freighter);

    await expect(connectWallet()).resolves.toBe('GBABC123');
  });

  it('detects Freighter via window.freighter', () => {
    const freighter = {
      isConnected: vi.fn().mockResolvedValue(true),
      getPublicKey: vi.fn().mockResolvedValue('GBDEF456')
    };

    vi.stubGlobal('freighter', freighter);

    expect(isFreighterInstalled()).toBe(true);
  });

  it('detects Freighter via window.Freighter', () => {
    const freighter = {
      isConnected: vi.fn().mockResolvedValue(true),
      getPublicKey: vi.fn().mockResolvedValue('GBGHI789')
    };

    vi.stubGlobal('Freighter', freighter);

    expect(isFreighterInstalled()).toBe(true);
  });

  it('returns null when no provider is available', async () => {
    await expect(connectWallet()).resolves.toBeNull();
  });
});
