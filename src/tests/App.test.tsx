import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the main application', () => {
    render(<App />);
    const linkElement = screen.getByText(/welcome to shipflow/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    render(<App />);
    const dashboardLink = screen.getByText(/dashboard/i);
    const bulkShipmentsLink = screen.getByText(/bulk shipments/i);
    const settingsLink = screen.getByText(/settings/i);
    expect(dashboardLink).toBeInTheDocument();
    expect(bulkShipmentsLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });
});