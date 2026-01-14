import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  token: string | null;
  setAuth: (auth: { userId: string; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  token: null,
  setAuth: ({ userId, token }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    set({ userId, token });
  },
  logout: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    sessionStorage.clear();
    set({ userId: null, token: null });
  },
}));
