import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { baseURL, endpoints } from '@/apis/api';

// Define the state shape with correct types
type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  checkAuth: () => void;
  refreshLogin: () => Promise<void>;
  scheduleTokenCheck: () => void; // Thêm scheduleTokenCheck vào đây
};

// Persist options for AuthState
type AuthPersist = PersistOptions<AuthState>;

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      token: null, // Thêm token vào trạng thái ban đầu
      loading: false,
      login: async (username: string, password: string): Promise<void> => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
          const response = await fetch(`${baseURL}${endpoints.login}`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.access);
            document.cookie = `refresh=${data.refresh}; path=/; max-age=604800`;
          }

          set({ isAuthenticated: true, token: data.access, loading: false }); // Thêm token khi đăng nhập thành công
        } catch (error) {
          console.error('Login error:', error);
          set({ isAuthenticated: false, token: null, loading: false }); // Đảm bảo token được xóa khi lỗi
          throw error;
        }
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user_info');
          document.cookie = 'refresh=; path=/; max-age=0';
        }

        set({ isAuthenticated: false, token: null }); // Đặt lại token về null khi đăng xuất
        window.location.reload();
      },
      getToken: () => {
        return typeof window !== 'undefined'
          ? localStorage.getItem('token')
          : null;
      },
      checkAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({ isAuthenticated: true, token, loading: false }); // Cập nhật cả trạng thái isAuthenticated và loading
        } else {
          set({ isAuthenticated: false, token: null, loading: false });
        }
      },
      refreshLogin: async (): Promise<void> => {
        try {
          const refreshToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('refresh='))
            ?.split('=')[1];

          if (!refreshToken) {
            throw new Error('No refresh token found');
          }

          const formData = new FormData();
          formData.append('refresh', refreshToken);

          const response = await fetch(`${baseURL}${endpoints.refresh}`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to refresh token');
          }

          const data = await response.json();

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.access);
          }

          set({ token: data.access, isAuthenticated: true });
          get().scheduleTokenCheck(); // Lập lại timer sau khi làm mới token
        } catch (error) {
          console.error('Refresh login error:', error);
          set({ isAuthenticated: false, token: null });
          get().logout(); // Đăng xuất nếu làm mới thất bại
        }
      },
      scheduleTokenCheck: () => {
        const expires = Number(localStorage.getItem('expires'));
        const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại
        const remainingTime = expires - currentTime;

        if (remainingTime > 0) {
          const refreshTime = remainingTime * 0.75 * 1000; // 3/4 thời gian còn lại

          setTimeout(async () => {
            try {
              await get().refreshLogin(); // Gọi refreshLogin khi đến thời gian làm mới
            } catch {
              get().logout(); // Đăng xuất nếu không thể làm mới
            }
          }, refreshTime);

          // Đăng xuất nếu token hết hạn
          setTimeout(() => {
            get().logout();
          }, remainingTime * 1000);
        }
      },
    }),

    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    } as AuthPersist,
  ),
);
