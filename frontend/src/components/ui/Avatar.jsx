import React from 'react';

export default function Avatar({ src, name, size = 10, className = '' }) {
  const initials = name ? name.split(' ').map(n => n[0]).slice(0,2).join('') : '';
  return (
    <div className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 ${className}`} style={{ width: `${size * 4}px`, height: `${size * 4}px` }}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : <span className="text-sm font-medium text-slate-700 dark:text-slate-100">{initials}</span>}
    </div>
  );
}
