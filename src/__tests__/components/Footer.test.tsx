import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('displays the Agemo branding', () => {
    render(<Footer />);
    expect(screen.getByText(/AGEMO/)).toBeInTheDocument();
  });

  it('mentions Torque MCP', () => {
    render(<Footer />);
    expect(screen.getByText(/Torque MCP/)).toBeInTheDocument();
  });

  it('mentions Colosseum Frontier Hackathon', () => {
    render(<Footer />);
    expect(screen.getByText(/Colosseum Frontier Hackathon/)).toBeInTheDocument();
  });

  it('renders a footer element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
