import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe('SiteHeader services menu', () => {
  it('opens from the Services button and exposes expanded state', async () => {
    renderHeader();
    const trigger = screen.getByRole('button', { name: /services/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = document.getElementById(trigger.getAttribute('aria-controls') as string);
    expect(menu).not.toBeNull();
    expect(within(menu as HTMLElement).getByRole('link', { name: /Switchyard Works up to 220 kV/i })).toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    renderHeader();
    const trigger = screen.getByRole('button', { name: /services/i });
    await userEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('closes when the user clicks outside', async () => {
    renderHeader();
    const trigger = screen.getByRole('button', { name: /services/i });
    await userEvent.click(trigger);
    await userEvent.click(document.body);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks the active route with aria-current', () => {
    renderHeader('/projects');
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('has a mobile menu toggle that closes on Escape', async () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(toggle);
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
  });
});
