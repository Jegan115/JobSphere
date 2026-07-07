import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ROLES } from '../../constants';
import useAuth from '../../hooks/useAuth';

const linkClass = ({ isActive }) =>
  isActive
    ? 'block px-3 py-2 rounded bg-primary text-white'
    : 'block px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800';

const LINKS_BY_ROLE = {
  [ROLES.JOB_SEEKER]: [
    { to: ROUTES.DASHBOARD, label: 'Dashboard' },
    { to: ROUTES.PROFILE, label: 'Profile' },
    { to: ROUTES.APPLIED_JOBS, label: 'Applications' },
    { to: ROUTES.JOBS, label: 'Browse jobs' }
  ],
  [ROLES.EMPLOYER]: [
    { to: ROUTES.EMPLOYER_DASHBOARD, label: 'Dashboard' },
    { to: ROUTES.EMPLOYER_MANAGE_JOBS, label: 'Manage jobs' },
    { to: ROUTES.EMPLOYER_POST_JOB, label: 'Post a job' }
  ],
  [ROLES.ADMIN]: [{ to: ROUTES.ADMIN_DASHBOARD, label: 'Overview' }]
};

export default function Sidebar() {
  const { role } = useAuth();
  const links = LINKS_BY_ROLE[role] || LINKS_BY_ROLE[ROLES.JOB_SEEKER];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r hidden md:block">
      <div className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
