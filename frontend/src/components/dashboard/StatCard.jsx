import React from 'react';

export default function StatCard({ label, value, icon }) {
  return (
    <div className="card flex items-center gap-4">
      {icon && <div className="text-primary text-2xl">{icon}</div>}
      <div>
        <div className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </div>
  );
}
