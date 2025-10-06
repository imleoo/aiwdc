import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    try {
      // Mock API call - replace with actual API
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      // Mock API call - replace with actual API
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        username: userData.username,
        role: 'editor',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      set({
        user: newUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateProfile: async (userData) => {
    const currentUser = get().user;
    if (!currentUser) return;

    try {
      const updatedUser = { ...currentUser, ...userData };
      set({ user: updatedUser });
    } catch (error) {
      throw error;
    }
  },
}));