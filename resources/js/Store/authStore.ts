import create from 'zustand';
import { User } from '../Types/User';

interface LoginData {
    // Define your login data structure
    email: string;
    [key: string]: any;
}

interface AuthStore {
  user: User | null;
  permissions: string[];
  roles: string[];
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    permissions: [],
    roles: [],
    isAuthenticated: false,
    theme: 'light',
    login: async (credentials) => {
        // Implement your login logic here
        // For now, we'll just simulate a login
        const user: User = {
            id: 1,
            name: 'Test User',
            email: credentials.email,
        };
        set({ user, isAuthenticated: true, roles: ['user'], permissions: ['read'] });
    },
    logout: () => {
        set({ user: null, isAuthenticated: false, roles: [], permissions: [] });
    },
    toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
    },
    hasPermission: (permission) => {
        return get().permissions.includes(permission);
    },
    hasRole: (role) => {
        return get().roles.includes(role);
    }
}));
