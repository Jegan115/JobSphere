import React from 'react';
import Avatar from '../../components/ui/Avatar';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const fields = [
    ['Full name', user.fullName],
    ['Email', user.email],
    ['Role', user.role],
    ['Phone', user.phone || '—'],
    ['Location', user.location || '—'],
    ...(user.role === 'employer' ? [['Company', user.companyName || '—'], ['Website', user.website || '—']] : []),
    ...(user.role === 'jobSeeker' ? [['Skills', user.skills?.join(', ') || '—']] : [])
  ];

  return (
    <div className="max-w-2xl">
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user.fullName} src={user.profilePicture} size={16} />
          <div>
            <h1 className="text-xl font-semibold">{user.fullName}</h1>
            <p className="text-sm text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>

        <dl className="divide-y divide-slate-100 dark:divide-slate-700">
          {fields.map(([label, value]) => (
            <div key={label} className="py-3 flex justify-between text-sm">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-slate-800 dark:text-slate-100 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs text-slate-400">
          Profile editing isn't available yet — the backend doesn't have an update-profile endpoint. This is a
          good next feature to add (PUT /api/auth/me) if you'd like help with it.
        </p>
      </div>
    </div>
  );
}
