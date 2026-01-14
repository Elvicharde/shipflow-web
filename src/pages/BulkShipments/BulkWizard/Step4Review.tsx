import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardHook } from '@/hooks/useWizard';
import Button from '../../../components/ui/Button';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import ConfirmationComponent from '../../../components/ui/ConfirmationComponent';
import { useAppStore } from '@/app/store';
import { useGetUploadedShipments } from '@/app/api/upload-api';
import { UploadResponse, UploadResult } from '@/types';
import { bulkUpdateShippingServiceAndOption } from '@/app/api/shipments-api';
import { toast } from 'sonner';

const shippingServices = [
  { value: 'UPS', label: 'UPS' },
  { value: 'FedEx', label: 'FedEx' },
  { value: 'DHL', label: 'DHL' },
  { value: 'USPS', label: 'USPS' },
];
const shippingOptions = [
  { value: 'priority', label: 'Priority Mail' },
  { value: 'ground', label: 'Ground Shipping' },
];

function simulateCost(service: string, option: string) {
  // Simple simulation: Priority is more expensive, UPS/FedEx more expensive than USPS/DHL
  let base = option === 'priority' ? 8 : 5;
  if (service === 'UPS' || service === 'FedEx') base += 2;
  if (service === 'DHL') base += 1;
  return base + Math.random(); // Add a small random value for demo
}

const Step4Review: React.FC<{ wizard: WizardHook }> = ({ wizard }) => {
  const [isConfirm, setConfirm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Get valid shipments from upload session (same as Step3)
  const uploadResponse: UploadResponse | null = useAppStore(
    (s) => s.uploadResponse,
  );
  const sessionId = uploadResponse?.upload_session_id || 'N/A';
  const { data: sessionShipments } = useGetUploadedShipments(
    sessionId as string,
  );
  const results: UploadResult[] =
    sessionShipments?.results || uploadResponse?.results || [];
  const validResults = results.filter((row) => row.status === 'valid');
  // Track dropdown selections for each shipment
  const [selectedService, setSelectedService] = useState<
    Record<number, string>
  >({});
  const [selectedOption, setSelectedOption] = useState<Record<number, string>>(
    {},
  );

  // Pricing summary
  const total = validResults.length;
  const priority = validResults.filter(
    (row: any) =>
      (selectedOption[row.shipment_id] || 'priority') === 'priority',
  ).length;
  const ground = total - priority;
  const pricing = {
    base: total * 6,
    processing: total * 0.5,
    surcharges: total * 0.2,
    total: total * 6.7,
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Prepare payload for bulk update
      const payload = {
        upload_session_id: sessionId,
        shipments: validResults.map((row: any) => ({
          shipment_id: row.shipment_id,
          shipping_service:
            selectedService[row.shipment_id] || shippingServices[0].value,
          shipping_option:
            selectedOption[row.shipment_id] || shippingOptions[0].value,
        })),
      };
      await bulkUpdateShippingServiceAndOption(payload);
      toast.success('Shipping selections saved!');
      setSubmitting(false);
      setConfirm(false);
      navigate('/bulkshipments/bulkwizard/success');
    } catch (e) {
      setSubmitting(false);
      setConfirm(false);
      toast.error('Failed to save shipping selections. Please try again.');
      // eslint-disable-next-line no-console
      console.error('Bulk update failed', e);
    }
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
              <span className="font-semibold">#{sessionId}</span>.
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

            {/* Validated Shipments - Step 4 Table */}
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
                        Ship To Address
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Service
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Option
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {validResults.map((row: any) => {
                      const shipmentId = row.shipment_id;
                      const selectedServiceVal =
                        selectedService[shipmentId] ||
                        shippingServices[0].value;
                      const selectedOptionVal =
                        selectedOption[shipmentId] || shippingOptions[0].value;
                      const cost = simulateCost(
                        selectedServiceVal,
                        selectedOptionVal,
                      );
                      return (
                        <tr key={shipmentId} className="border-t">
                          <td className="px-3 py-2 font-medium">
                            {row.ship_to_address || '-'}
                            <div className="text-xs text-gray-400 font-normal">
                              Order {row.order_number || '-'}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <select
                              value={selectedServiceVal}
                              onChange={(e) =>
                                setSelectedService((prev) => ({
                                  ...prev,
                                  [shipmentId]: e.target.value,
                                }))
                              }
                              className="border rounded px-2 py-1 text-sm"
                            >
                              {shippingServices.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <select
                              value={selectedOptionVal}
                              onChange={(e) =>
                                setSelectedOption((prev) => ({
                                  ...prev,
                                  [shipmentId]: e.target.value,
                                }))
                              }
                              className="border rounded px-2 py-1 text-sm"
                            >
                              {shippingOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-2 font-semibold">
                            ${cost.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="text-center py-2 border-t text-blue-600 text-sm cursor-pointer hover:underline">
                  View all {total} shipments
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 justify-end">
              <Button
                variant="outline"
                className="h-9 px-4"
                onClick={wizard.prevStep}
              >
                Back
              </Button>
              <Button className="h-9 px-4" onClick={() => setConfirm(true)}>
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
              className="w-full h-9 px-4 mb-2"
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
