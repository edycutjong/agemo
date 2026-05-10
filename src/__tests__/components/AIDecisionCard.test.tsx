import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIDecisionCard } from '@/components/AIDecisionCard';
import { SEED_DECISIONS } from '@/lib/torque';

const appliedDecision = SEED_DECISIONS[0]; // PAUSE_CAMPAIGN, applied: true, confidence: 0.94
const pendingDecision = SEED_DECISIONS[2]; // ADJUST_REWARDS, applied: false, confidence: 0.76

describe('AIDecisionCard', () => {
  it('renders without crashing', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
  });

  it('shows the campaign name', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    expect(screen.getByText('Retargeting Alpha')).toBeInTheDocument();
  });

  it('shows the action with underscores replaced by spaces', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    expect(screen.getByText('PAUSE CAMPAIGN')).toBeInTheDocument();
  });

  it('shows the confidence percentage', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    expect(screen.getByText('94%')).toBeInTheDocument();
  });

  it('is collapsed by default (no reasoning visible)', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    expect(screen.queryByText(/Agent Reasoning/i)).not.toBeInTheDocument();
  });

  it('expands to show reasoning when clicked', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Agent Reasoning/i)).toBeInTheDocument();
    expect(screen.getByText(/CAC of \$12\.00/)).toBeInTheDocument();
  });

  it('shows applied status in expanded view', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Applied via Torque MCP/)).toBeInTheDocument();
  });

  it('shows pending status for unapplied decisions', () => {
    render(<AIDecisionCard decision={pendingDecision} index={1} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Pending approval/)).toBeInTheDocument();
  });

  it('shows before and after metrics when expanded', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
    // before: $500, after: $0 (budget reallocated)
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('collapses again when clicked a second time', () => {
    render(<AIDecisionCard decision={appliedDecision} index={0} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Agent Reasoning/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText(/Agent Reasoning/i)).not.toBeInTheDocument();
  });
});
