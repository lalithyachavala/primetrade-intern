import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        ref={ref}
        className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error.message as any}</p>}
    </div>
  );
});
TextField.displayName = 'TextField';
export default TextField;
