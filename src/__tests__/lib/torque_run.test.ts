import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runTorqueOptimization, SEED_CAMPAIGNS } from '@/lib/torque';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

// Mock MCP SDK
vi.mock('@modelcontextprotocol/sdk/client/index.js', () => {
  return {
    Client: vi.fn(),
  };
});

vi.mock('@modelcontextprotocol/sdk/client/sse.js', () => {
  return {
    SSEClientTransport: vi.fn(),
  };
});

describe('runTorqueOptimization', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv('NEXT_PUBLIC_TORQUE_MCP_URL', 'https://mock.torque.so/sse');
    
    // Default implementation for Client
    vi.mocked(Client).mockImplementation(function() {
      return {
        connect: vi.fn().mockResolvedValue(true),
        callTool: vi.fn().mockResolvedValue({ 
          optimized: true, 
          message: "Campaigns analyzed by Torque AI" 
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it('successfully runs the full optimization loop', async () => {
    const promise = runTorqueOptimization(SEED_CAMPAIGNS);
    
    // Advance all timers to skip delays
    await vi.runAllTimersAsync();
    
    const result = await promise;

    expect(result.logs.length).toBeGreaterThan(10);
    expect(result.decisions.length).toBeGreaterThan(0);
    expect(result.updatedCampaigns).toHaveLength(SEED_CAMPAIGNS.length);
    
    // Check specific updates defined in the function
    const spring = result.updatedCampaigns.find(c => c.name === "Spring DeFi Push");
    expect(spring?.budget).toBe("$1,500");
    
    const alpha = result.updatedCampaigns.find(c => c.name === "Retargeting Alpha");
    expect(alpha?.status).toBe("Paused");
    expect(alpha?.budget).toBe("$0");
  });

  it('falls back to local analysis when server connection times out', async () => {
    // Re-mock Client for this test to simulate timeout
    vi.mocked(Client).mockImplementationOnce(function() {
      return {
        connect: vi.fn().mockImplementation(() => new Promise(() => {})), // Never resolves
        callTool: vi.fn(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
    });

    const promise = runTorqueOptimization(SEED_CAMPAIGNS);
    
    // Advance timers by more than 2000ms to trigger the timeout in Promise.race
    await vi.advanceTimersByTimeAsync(2500);
    await vi.runAllTimersAsync();
    
    const result = await promise;
    
    expect(result.logs.some(l => l.includes('Torque Server unreachable'))).toBe(true);
    expect(result.decisions.length).toBeGreaterThan(0); // Still gets local decisions
  });

  it('handles errors gracefully in the catch block', async () => {
    // Re-mock Client to throw
    vi.mocked(Client).mockImplementationOnce(function() {
      throw new Error("Crash during init");
    });

    const result = await runTorqueOptimization(SEED_CAMPAIGNS);
    
    expect(result.logs.some(l => l.includes('Torque MCP Error'))).toBe(true);
    expect(result.updatedCampaigns).toEqual(SEED_CAMPAIGNS);
  });
});
