import React from 'react';
import { Button } from '../../../components/ui/Button';
import { WizardHook } from '../../../hooks/useWizard';

interface Step4PricingProps {
  wizard: WizardHook;
}

const Step4Pricing: React.FC<Step4PricingProps> = ({ wizard }) => {
  // Example: use wizard.pricing and wizard.setPricing for pricing logic
  return (
    <div className="step4-pricing">
      <h2>Pricing Details</h2>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-4">
        {JSON.stringify(wizard.pricing, null, 2)}
      </pre>
      {/* Example pricing UI would go here */}
      <div className="button-group">
        <Button onClick={wizard.prevStep} variant="secondary">
          Back
        </Button>
        <Button
          onClick={wizard.nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Step4Pricing;
