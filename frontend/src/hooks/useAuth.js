import { useSelector } from 'react-redux';

export default function useAuth() {
  const { user, status, initialized, error } = useSelector((state) => state.auth);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: status === 'loading',
    initialized,
    error,
    role: user?.role || null
  };
}
