import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('app integration', () => {
  it('renders the verification flow', () => {
    render(<App />);
    expect(screen.getByText(/Private Allowlist Access/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify membership/i })).toBeInTheDocument();
  });
});
