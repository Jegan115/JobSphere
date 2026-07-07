import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <label className="block text-sm">
      {label && <div className="mb-1 text-slate-700 dark:text-slate-200">{label}</div>}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 ${className}`}
        {...props}
      />
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </label>
  );
});

Input.displayName = 'Input';
export default Input;
