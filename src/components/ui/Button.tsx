import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { forwardRef, memo } from 'react';

interface ButtonOptions {
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
  loading?: boolean;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

export type ButtonVariant =
  | 'outline'
  | 'solid'
  | 'secondary'
  | 'primary'
  | 'danger'
  | 'success'
  | 'none'
  | 'confirm'
  | 'angel'
  | 'ghost';

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return 'text-accent bg-none border border-table-border';
    case 'secondary':
      return 'text-deep-blue bg-none';
    case 'primary':
      return 'text-primary-blue disabled:border-[#F0F2F5] disabled:text-placeholder border border-primary-blue bg-none';
    case 'none':
      return 'text-base-grey bg-none !font-normal';
    case 'danger':
      return 'text-white bg-danger';
    case 'success':
      return 'text-white bg-success';
    case 'confirm':
      return 'text-white bg-[#1ACD92]';
    case 'angel':
      return 'bg-white text-primary-blue hover:bg-primary-white/75';
    default:
      return 'bg-primary-blue text-white';
  }
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const [scope, animate] = useAnimate();

  const {
    variant = 'solid',
    className,
    onClick,
    children,
    loading,
    ...rest
  } = props;

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    animate([
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
    ]);
  };

  const merged = clsx(
    "px-2 py-3 h-fit rounded-[8px] disabled:opacity-50' text-sm font-bold justify-center w-full items-center focus:outline-none outline-none focus:ring-0 inline-flex gap-2",
    getVariant(variant),
    className,
  );

  return (
    <div className="flex" ref={scope}>
      <button
        ref={ref}
        className={merged}
        {...rest}
        onClick={(e) => onButtonClick(e)}
      >
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            ></path>
          </svg>
        ) : null}
        {children}
      </button>
    </div>
  );
});

Button.displayName = 'Button';
export default memo(Button);
