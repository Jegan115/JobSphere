import React from 'react';
import clsx from 'clsx';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none';

  const variants = {
    primary: 'bg-primary text-white hover:brightness-95',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-transparent',
    subtle: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
