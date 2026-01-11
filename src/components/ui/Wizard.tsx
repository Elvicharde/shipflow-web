import React from 'react';

const Wizard: React.FC<{ currentStep: number; totalSteps: number; onNext: () => void; onBack: () => void; }> = ({ currentStep, totalSteps, onNext, onBack }) => {
    return (
        <div className="wizard">
            <div className="wizard-steps">
                {Array.from({ length: totalSteps }, (_, index) => (
                    <div key={index} className={`wizard-step ${index === currentStep ? 'active' : ''}`}>
                        Step {index + 1}
                    </div>
                ))}
            </div>
            <div className="wizard-navigation">
                <button onClick={onBack} disabled={currentStep === 0}>
                    Back
                </button>
                <button onClick={onNext} disabled={currentStep === totalSteps - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Wizard;