import { SHIPMENT_VALIDATION_DATA } from '@/utils/shipmentValidationSeed';
import { useState } from 'react';

export interface WizardHook {
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  imported: boolean;
  setImported: (imported: boolean) => void;
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
  csvData: any[];
  setCsvData: (data: any[]) => void;
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

  return {
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    imported,
    setImported,
    csvFile,
    setCsvFile,
    csvData,
    setCsvData,
    setMapping,
    mapping,
    setValidation,
    validation,
    setPricing,
    pricing,
  };
};

export default useWizard;
