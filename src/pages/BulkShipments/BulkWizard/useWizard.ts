import { useState } from 'react';

export interface WizardHook {
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  imported: boolean;
  simulateImport: (file: File) => void;
  csvFile: File | null;
  csvData: any[];
  setMapping: (mapping: any) => void;
  mapping: any;
  setValidation: (validation: any) => void;
  validation: any;
  setPricing: (pricing: any) => void;
  pricing: any;
}

const useWizard = (stepsLength: number): WizardHook => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imported, setImported] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<any>({});
  const [validation, setValidation] = useState<any>({});
  const [pricing, setPricing] = useState<any>({});

  const goToStep = (step: number) => setCurrentStep(step);
  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, stepsLength - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Dummy simulation for import
  const simulateImport = (file: File) => {
    setImported(false);
    setTimeout(() => {
      setCsvFile(file);
      setCsvData([
        {
          customer_full_name: 'Alice Johnson',
          phone_mobile: '+1 (555) 912-3456',
          shipping_address_1: '123 Maple St',
        },
        {
          customer_full_name: 'Bob Smith',
          phone_mobile: '+1 (555) 912-9876',
          shipping_address_1: '456 Oak Rd',
        },
        {
          customer_full_name: 'Charlie Davis',
          phone_mobile: '+1 (555) 612-4433',
          shipping_address_1: '789 Pine Ln',
        },
      ]);
      setImported(true);
      nextStep();
    }, 1200);
  };

  return {
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    imported,
    simulateImport,
    csvFile,
    csvData,
    setMapping,
    mapping,
    setValidation,
    validation,
    setPricing,
    pricing,
  };
};

export default useWizard;
