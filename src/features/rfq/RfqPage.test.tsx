import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { RfqPage } from './RfqPage';

describe('RfqPage without a configured backend', () => {
  it('states that online submission is unavailable and does not show a fake success', () => {
    render(
      <MemoryRouter>
        <RfqPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('status')).toHaveTextContent(/Online submission is not available/i);
    expect(screen.getByRole('button', { name: /submit rfq/i })).toBeDisabled();
    expect(screen.queryByText(/Thank you/i)).not.toBeInTheDocument();
  });

  it('exposes labelled required fields', () => {
    render(
      <MemoryRouter>
        <RfqPage />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText(/Full name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scope of work/)).toBeInTheDocument();
  });
});

describe('RfqPage validation in mock mode', () => {
  it('shows field errors on submit instead of sending an empty enquiry', async () => {
    vi.stubEnv('VITE_RFQ_MOCK', 'true');
    try {
      render(
        <MemoryRouter>
          <RfqPage />
        </MemoryRouter>,
      );
      await userEvent.click(screen.getByRole('button', { name: /submit rfq/i }));
      expect(await screen.findByText(/Full name must be at least 2 characters/)).toBeInTheDocument();
      expect(screen.getByText(/Describe the scope in at least 20 characters/)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm you agree/)).toBeInTheDocument();
      expect(screen.queryByText(/Thank you/i)).not.toBeInTheDocument();
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
