import { BiLoaderAlt } from 'react-icons/bi';

const FormRequestLoader = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <BiLoaderAlt className="size-9 animate-spin text-primary-blue" />
      <p className="text-sm font-medium leading-[20.3px] text-black">
        {message}
      </p>
    </div>
  );
};

export default FormRequestLoader;
