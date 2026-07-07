import React from 'react';

export default function EmptyState({ title = 'Nothing here yet', description, action }) {
  return (
    <div className="card text-center py-12">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
