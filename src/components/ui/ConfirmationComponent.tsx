import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import Button from './Button';

const ConfirmationComponent = ({
  message,
  handleConfirm,
}: {
  message: string;
  handleConfirm: () => void;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="outline">Cancel</Button>
        </AlertDialogCancel>
        <Button
          onClick={handleConfirm}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          Continue
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmationComponent;
