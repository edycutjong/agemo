import { describe, it, expect } from 'vitest';
import {
  SEED_CAMPAIGNS,
  SEED_FUNNEL,
  SEED_DECISIONS,
  SEED_JOURNEYS,
} from '@/lib/torque';

describe('SEED_CAMPAIGNS', () => {
  it('has 3 campaigns', () => {
    expect(SEED_CAMPAIGNS).toHaveLength(3);
  });

  it('each campaign has required fields', () => {
    for (const c of SEED_CAMPAIGNS) {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('status');
      expect(c).toHaveProperty('budget');
      expect(c).toHaveProperty('cac');
      expect(c).toHaveProperty('roi');
    }
  });

  it('Spring DeFi Push is Active with positive ROI', () => {
    const c = SEED_CAMPAIGNS.find(x => x.name === 'Spring DeFi Push');
    expect(c?.status).toBe('Active');
    expect(c?.roi).toMatch(/^\+/);
  });

  it('Retargeting Alpha is Paused with negative ROI', () => {
    const c = SEED_CAMPAIGNS.find(x => x.name === 'Retargeting Alpha');
    expect(c?.status).toBe('Paused');
    expect(c?.roi).toMatch(/^-/);
  });
});

describe('SEED_FUNNEL', () => {
  it('has 4 stages', () => {
    expect(SEED_FUNNEL).toHaveLength(4);
  });

  it('first stage is Impressions at 100%', () => {
    expect(SEED_FUNNEL[0].name).toBe('Impressions');
    expect(SEED_FUNNEL[0].percentage).toBe(100);
  });

  it('percentages decrease through the funnel', () => {
    for (let i = 1; i < SEED_FUNNEL.length; i++) {
      expect(SEED_FUNNEL[i].percentage).toBeLessThan(SEED_FUNNEL[i - 1].percentage);
    }
  });

  it('each stage has a color', () => {
    for (const stage of SEED_FUNNEL) {
      expect(stage.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe('SEED_DECISIONS', () => {
  it('has 5 decisions', () => {
    expect(SEED_DECISIONS).toHaveLength(5);
  });

  it('each decision has required fields', () => {
    for (const d of SEED_DECISIONS) {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('timestamp');
      expect(d).toHaveProperty('campaignName');
      expect(d).toHaveProperty('action');
      expect(d).toHaveProperty('reasoning');
      expect(d).toHaveProperty('confidence');
      expect(d).toHaveProperty('applied');
      expect(d).toHaveProperty('beforeMetrics');
      expect(d).toHaveProperty('afterMetrics');
    }
  });

  it('confidence values are between 0 and 1', () => {
    for (const d of SEED_DECISIONS) {
      expect(d.confidence).toBeGreaterThan(0);
      expect(d.confidence).toBeLessThanOrEqual(1);
    }
  });

  it('first two decisions are applied', () => {
    expect(SEED_DECISIONS[0].applied).toBe(true);
    expect(SEED_DECISIONS[1].applied).toBe(true);
  });

  it('remaining decisions are pending', () => {
    for (const d of SEED_DECISIONS.slice(2)) {
      expect(d.applied).toBe(false);
    }
  });
});

describe('SEED_JOURNEYS', () => {
  it('has 20 journey entries', () => {
    expect(SEED_JOURNEYS).toHaveLength(20);
  });

  it('each journey has a userId and steps array', () => {
    for (const j of SEED_JOURNEYS) {
      expect(j.userId).toMatch(/^user_\d{3}$/);
      expect(Array.isArray(j.steps)).toBe(true);
      expect(j.steps.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('each step has stage, timestamp, and action', () => {
    for (const j of SEED_JOURNEYS) {
      for (const step of j.steps) {
        expect(step).toHaveProperty('stage');
        expect(step).toHaveProperty('timestamp');
        expect(step).toHaveProperty('action');
      }
    }
  });
});
