import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BulkWizard from '../../pages/BulkShipments/BulkWizard/WizardLayout';

describe('BulkWizard', () => {
    test('renders the upload step', () => {
        render(<BulkWizard />);
        const uploadStep = screen.getByText(/upload/i);
        expect(uploadStep).toBeInTheDocument();
    });

    test('navigates to the next step on button click', () => {
        render(<BulkWizard />);
        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);
        const mapValidationStep = screen.getByText(/map validation/i);
        expect(mapValidationStep).toBeInTheDocument();
    });

    test('navigates back to the previous step', () => {
        render(<BulkWizard />);
        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);
        const backButton = screen.getByRole('button', { name: /back/i });
        fireEvent.click(backButton);
        const uploadStep = screen.getByText(/upload/i);
        expect(uploadStep).toBeInTheDocument();
    });

    test('displays validation errors', () => {
        render(<BulkWizard />);
        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);
        const validationError = screen.getByText(/validation error/i);
        expect(validationError).toBeInTheDocument();
    });
});