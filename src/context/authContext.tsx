import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const getToken = useAuthStore((state) => state.getToken);

  return { isAuthenticated, loading, login, logout, getToken };
};
