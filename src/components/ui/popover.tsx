import * as React from 'react';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
}

export const Popover: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen((o) => !o),
          });
        }
        if (child.type === PopoverContent) {
          return open
            ? React.cloneElement(child, { onClose: () => setOpen(false) })
            : null;
        }
        return child;
      })}
    </div>
  );
};

export const PopoverTrigger: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

export const PopoverContent: React.FC<
  PopoverProps & { onClose?: () => void }
> = ({ children, className, align = 'end', onClose }) => (
  <div
    className={`absolute z-10 mt-2 rounded-md border bg-white shadow-lg ${className || ''} ${align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
    tabIndex={-1}
    onBlur={onClose}
  >
    {children}
  </div>
);

export default Popover;
