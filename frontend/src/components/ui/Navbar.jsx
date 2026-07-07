import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Avatar from './Avatar';
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes';
import { ROLES } from '../../constants';

const navLinkClass = ({ isActive }) =>
  isActive ? 'text-primary font-medium' : 'text-slate-600 dark:text-slate-200';

export default function Navbar() {
  const { user, isAuthenticated, role } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out');
    navigate(ROUTES.HOME);
  };

  const dashboardLink =
    role === ROLES.EMPLOYER
      ? ROUTES.EMPLOYER_DASHBOARD
      : role === ROLES.ADMIN
      ? ROUTES.ADMIN_DASHBOARD
      : ROUTES.DASHBOARD;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white dark:bg-slate-900 border-b"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-primary font-bold text-lg">
          JobSphere
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink to={ROUTES.JOBS} className={navLinkClass}>
            Jobs
          </NavLink>
          {isAuthenticated && (
            <NavLink to={dashboardLink} className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to={dashboardLink} className="flex items-center gap-2">
                <Avatar name={user.fullName} src={user.profilePicture} size={8} />
                <span className="hidden md:inline text-sm text-slate-700 dark:text-slate-200">
                  {user.fullName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="text-slate-700 dark:text-slate-200 hidden md:inline">
                Log in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}

          <button className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-200">
            <HiOutlineMenu size={22} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
