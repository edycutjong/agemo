import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBar } from '@/components/StatusBar';

describe('StatusBar', () => {
  it('renders without crashing', () => {
    render(<StatusBar />);
  });

  it('shows SYSTEM ONLINE status', () => {
    render(<StatusBar />);
    expect(screen.getByText('SYSTEM ONLINE')).toBeInTheDocument();
  });

  it('shows version number', () => {
    render(<StatusBar />);
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('shows latency metric', () => {
    render(<StatusBar />);
    expect(screen.getByText('12ms')).toBeInTheDocument();
  });

  it('shows uptime metric', () => {
    render(<StatusBar />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });
});
