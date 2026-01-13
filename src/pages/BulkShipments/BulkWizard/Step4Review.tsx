import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardHook } from '@/hooks/useWizard';
import Button from '../../../components/ui/Button';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import ConfirmationComponent from '../../../components/ui/ConfirmationComponent';

const Step4Review: React.FC<{ wizard: WizardHook }> = ({ wizard }) => {
  // Demo state for dialog
  const [isConfirm, setConfirm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Demo batch and pricing data
  const batchId = '2904-B';
  const total = 150;
  const priority = 80;
  const ground = 70;
  const pricing = {
    base: 420,
    processing: 40,
    surcharges: 15,
    total: 475,
  };
  const validatedShipments = [
    {
      recipient: 'Johnathan Miller',
      order: '#88321',
      service: 'PRIORITY',
      destination: 'New York, NY',
      cost: 12.45,
    },
    {
      recipient: 'Sarah Jenkins',
      order: '#88322',
      service: 'GROUND',
      destination: 'Austin, TX',
      cost: 8.2,
    },
    {
      recipient: 'Logistics Corp',
      order: '#88323',
      service: 'GROUND',
      destination: 'Seattle, WA',
      cost: 15.9,
    },
  ];

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirm(false);
      navigate('/bulkshipments/bulkwizard/success');
      // Here you would trigger label download, etc.
    }, 1800);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        {/* Stepper/Progress */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-700">
              Step 4: Final Review
            </div>
            <div className="text-gray-500 text-xs">
              Ready to ship! Please review your batch details and pricing before
              final submission.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              Stage 4 of 4
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">
              Confirm Batch Submission
            </h2>
            <div className="text-gray-500 mb-6">
              Review {total} validated shipments for Batch{' '}
              <span className="font-semibold">#{batchId}</span>.
            </div>

            {/* Batch Summary */}
            <div className="mb-6">
              <div className="font-semibold mb-2">Batch Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
                  <div className="text-2xl font-bold">{total}</div>
                  <div className="text-xs text-gray-500">Total Shipments</div>
                </div>
                <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {priority}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    ⚡ Priority Service
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">
                    {ground}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-600">&#128230;</span> Ground
                    Service
                  </div>
                </div>
              </div>
            </div>

            {/* Validated Shipments */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Validated Shipments</div>
                <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded font-semibold">
                  ALL VALIDATED
                </span>
              </div>
              <div className="bg-white border rounded-lg">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">
                        Recipient
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Service
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Destination
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {validatedShipments.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2 font-medium">
                          {row.recipient}
                          <div className="text-xs text-gray-400 font-normal">
                            Order {row.order}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${row.service === 'PRIORITY' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                          >
                            {row.service}
                          </span>
                        </td>
                        <td className="px-3 py-2">{row.destination}</td>
                        <td className="px-3 py-2 font-semibold">
                          ${row.cost.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-center py-2 border-t text-blue-600 text-sm cursor-pointer hover:underline">
                  View all {total} shipments
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={wizard.prevStep}>
                Back to Validation
              </Button>
              <Button
                className="bg-blue-600 text-white font-semibold"
                onClick={() => setConfirm(true)}
              >
                Submit {total} Shipments
              </Button>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="font-semibold mb-2">Pricing Summary</div>
              <div className="flex justify-between text-sm mb-1">
                <span>Base Shipping ({total})</span>
                <span>${pricing.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Processing Fees</span>
                <span>${pricing.processing.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Surcharges</span>
                <span>${pricing.surcharges.toFixed(2)}</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between text-base font-bold">
                <span>Total Cost</span>
                <span className="text-blue-700">
                  ${pricing.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-xs text-blue-800">
              Funds will be deducted from your ShipStream balance upon
              submission. Estimated delivery dates are guaranteed.
            </div>
            <Button
              className="w-full bg-blue-600 text-white font-semibold mb-2"
              onClick={() => setConfirm(true)}
            >
              Submit {total} Shipments
            </Button>
            <div className="text-xs text-gray-500 text-center">
              By clicking submit, you agree to our{' '}
              <a href="#" className="underline">
                Shipping Terms
              </a>
              .
            </div>
            <div className="bg-white border rounded-lg p-3 mt-4 text-xs">
              <div className="font-semibold mb-1">Need Help?</div>
              If you notice any discrepancies in the batch totals, you can still
              return to the validation step.
              <br />
              <a href="#" className="text-blue-600 underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="loader mb-2"></div>
              <div className="font-semibold">Submitting batch...</div>
            </div>
          ) : (
            <ConfirmationComponent
              handleConfirm={handleSubmit}
              message="You are about to submit this batch for label generation. Are you sure you want to proceed?"
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
      {/* Loader/Success simulation */}
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <div className="loader mb-2"></div>
            <div className="font-semibold">Submitting batch...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4Review;
