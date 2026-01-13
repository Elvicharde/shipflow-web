import { BiLoaderAlt } from 'react-icons/bi';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface LoaderProps {
  message?: string;
  ariaTitle?: string;
  ariaDesc?: string;
}

const LoaderComponent = (props: LoaderProps) => {
  return (
    <AlertDialogContent className="h-48.5 max-w-87.25! items-center rounded-2xl">
      <div className="flex flex-col items-center gap-y-2">
        <BiLoaderAlt className="size-9 animate-spin text-primary-blue" />
        <p className="text-sm font-medium leading-[20.3px] text-black">
          {props.message}
        </p>
        <VisuallyHidden>
          <AlertDialogTitle>{props.ariaTitle}</AlertDialogTitle>
          <AlertDialogDescription>{props.ariaDesc}</AlertDialogDescription>
        </VisuallyHidden>
      </div>
    </AlertDialogContent>
  );
};

export default LoaderComponent;
