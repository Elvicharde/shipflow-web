import { useState } from 'react';
import { useStore } from '../stores/wizard.store';

const useWizard = () => {
    const { activeStep, setActiveStep, steps, setStepsValidity } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const previousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const validateStep = (isValid: boolean) => {
        setStepsValidity((prev) => {
            const newValidity = [...prev];
            newValidity[activeStep] = isValid;
            return newValidity;
        });
    };

    const submitWizard = async () => {
        setIsSubmitting(true);
        try {
            // Implement submission logic here
        } catch (error) {
            console.error('Error submitting wizard:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        activeStep,
        nextStep,
        previousStep,
        validateStep,
        submitWizard,
        isSubmitting,
    };
};

export default useWizard;