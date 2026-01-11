import React from 'react';
import { Button } from '../../../components/ui/Button';
import { WizardHook } from '../../../hooks/useWizard';

interface Step2MapValidationProps {
  wizard: WizardHook;
}

const Step2MapValidation: React.FC<Step2MapValidationProps> = ({ wizard }) => {
  // Example: mapping logic can be handled here using wizard.mapping and wizard.setMapping
  // For demo, just show CSV data rows

  return (
    <div className="step2-map-validation">
      <h2>Map Fields</h2>
      <div className="mb-4">
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(wizard.csvData, null, 2)}
        </pre>
      </div>
      {/* Example mapping UI would go here */}
      <Button onClick={wizard.nextStep}>Next</Button>
      <Button onClick={wizard.prevStep} variant="secondary" className="ml-2">
        Back
      </Button>
    </div>
  );
};

export default Step2MapValidation;
