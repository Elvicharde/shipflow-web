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
  isDelete
}: {
  message: string;
  handleConfirm: () => void;
  isDelete?: boolean;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="primary" className="h-9! w-20!">Cancel</Button>
        </AlertDialogCancel>
        <Button
          onClick={handleConfirm}
          className={`${isDelete ? 'bg-[#D42620] hover:bg-[#B2221B]' : 'bg-blue-600 hover:bg-blue-700'} text-white cursor-pointer h-9! w-24!`}
        >
          Continue
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmationComponent;
