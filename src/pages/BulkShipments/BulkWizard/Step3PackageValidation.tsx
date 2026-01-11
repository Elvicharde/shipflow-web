import React from 'react';
import { WizardHook } from '../../../hooks/useWizard';

interface Step3PackageValidationProps {
  wizard: WizardHook;
}

const Step3PackageValidation: React.FC<Step3PackageValidationProps> = ({
  wizard,
}) => {
  // Example: use wizard.validation and wizard.setValidation for package validation logic
  return (
    <div>
      <h2>Package Validation</h2>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-4">
        {JSON.stringify(wizard.csvData, null, 2)}
      </pre>
      {/* Example validation UI would go here */}
      <button
        onClick={wizard.prevStep}
        className="mr-2 px-4 py-2 bg-gray-200 rounded"
      >
        Back
      </button>
      <button
        onClick={wizard.nextStep}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step3PackageValidation;
