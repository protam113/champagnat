'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useAuth } from '@/context/authContext';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { UserContextType, UserInfo } from '@/types/types';

// Initialize UserContext with the defined type
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userRoleId, setUserRoleId] = useState<number | null>(null); // Store the role ID
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getToken } = useAuth();
  const userInfoFetchedRef = useRef(false);

  // Cache user info in localStorage
  const cacheUserInfo = (data: UserInfo) => {
    try {
      localStorage.setItem('user_info', JSON.stringify(data));
    } catch (error) {
      console.error('Error caching user info:', error);
    }
  };

  // Retrieve cached user info from localStorage
  const getCachedUserInfo = (): UserInfo | null => {
    const cachedData = localStorage.getItem('user_info');
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as UserInfo;
      } catch (error) {
        console.error('Error parsing cached user info:', error);
        localStorage.removeItem('user_info');
        return null;
      }
    }
    return null;
  };

  // Fetch user info from API
  const fetchUserInfo = useCallback(async () => {
    if (userInfoFetchedRef.current) return;

    setLoading(true);

    const cachedData = getCachedUserInfo();
    if (cachedData) {
      setUserInfo(cachedData);
      setUserRoleId(
        cachedData.role && typeof cachedData.role.id === 'number'
          ? cachedData.role.id
          : null,
      );
      userInfoFetchedRef.current = true;
      setLoading(false);
      console.log('User info from cache:', cachedData);
      return;
    }

    const token = await getToken();

    if (!token) {
      setUserInfo(null);
      setUserRoleId(null);
      setLoading(false);
      return;
    }

    try {
      if (!endpoints.currentUser) {
        throw null;
      }
      const response = await handleAPI(
        endpoints.currentUser,
        'GET',
        null,
        token,
      );

      const userData: UserInfo = response;

      const roleId =
        userData.role && userData.role.id ? Number(userData.role.id) : null;
      setUserRoleId(roleId);
      cacheUserInfo(userData);
    } catch (err: any) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const value: UserContextType = {
    userInfo,
    userRoleId,
    loading,
    error,
    refreshUserInfo: fetchUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
