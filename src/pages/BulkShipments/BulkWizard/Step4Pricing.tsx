import React from 'react';
import { useWizard } from '../../../hooks/useWizard';
import { PricingDetails } from '../../../components/PricingDetails';
import { Button } from '../../../components/ui/Button';

const Step4Pricing: React.FC = () => {
    const { wizardState, setWizardState } = useWizard();

    const handleNext = () => {
        // Logic to proceed to the next step
        setWizardState({ ...wizardState, currentStep: wizardState.currentStep + 1 });
    };

    const handleBack = () => {
        // Logic to go back to the previous step
        setWizardState({ ...wizardState, currentStep: wizardState.currentStep - 1 });
    };

    return (
        <div className="step4-pricing">
            <h2>Pricing Details</h2>
            <PricingDetails pricingData={wizardState.pricingData} />
            <div className="button-group">
                <Button onClick={handleBack} variant="secondary">Back</Button>
                <Button onClick={handleNext} variant="primary">Next</Button>
            </div>
        </div>
    );
};

export default Step4Pricing;