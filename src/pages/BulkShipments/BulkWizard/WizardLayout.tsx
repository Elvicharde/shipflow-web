import { Link } from 'react-router-dom';
import React from 'react';
import Step1Upload from './Step1Upload';
import Step2MapValidation from './Step2MapValidation';
import Step3PackageValidation from './Step3PackageValidation';
import Step4Pricing from './Step4Pricing';
import useWizard from './useWizard';

const steps = [
  { label: 'Upload', component: Step1Upload },
  { label: 'Map Fields', component: Step2MapValidation },
  { label: 'Review', component: Step3PackageValidation },
  { label: 'Confirm', component: Step4Pricing },
];

const WizardLayout: React.FC = () => {
  const wizard = useWizard(steps.length);
  const { currentStep } = wizard;
  const StepComponent = steps[currentStep].component;

  return (
    <div className="max-w-[90%] mx-auto py-8 bg-white px-6 rounded-lg shadow-md">
      {/* Back to Dashboard Button */}
      <div className="mb-4 flex items-center gap-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-primary-blue hover:underline text-sm font-medium"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            className="inline-block"
          >
            <path
              d="M12.5 15l-5-5 5-5"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Dashboard
        </Link>
      </div>
      {/* Progress Bar & Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
            Current Progress
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </div>
        </div>
        <div className="flex items-center gap-4 mb-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx <= currentStep ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-400'} font-bold`}
                >
                  {idx + 1}
                </div>
                <div
                  className={`text-xs mt-1 ${idx === currentStep ? 'text-blue-700 font-semibold' : 'text-gray-400'}`}
                >
                  {step.label}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className={`h-1 rounded-full ${idx < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Step Content */}
      <StepComponent wizard={wizard} />
    </div>
  );
};

export default WizardLayout;
