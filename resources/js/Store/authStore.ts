import create from 'zustand';
import axios from 'axios';

interface AuthStore {
  user: any;
  permissions: string[];
  roles: string[];
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  permissions: [],
  roles: [],
  isAuthenticated: false,
  theme: 'light',
  login: async (credentials) => {
    const { data } = await axios.post('/login', credentials);
    set({ user: data.user, permissions: data.permissions, roles: data.roles, isAuthenticated: true });
  },
  logout: async () => {
    await axios.post('/logout');
    set({ user: null, permissions: [], roles: [], isAuthenticated: false });
  },
  toggleTheme: () => {
    set({ theme: get().theme === 'light' ? 'dark' : 'light' });
  },
  hasPermission: (permission) => {
    return get().permissions.includes(permission);
  },
  hasRole: (role) => {
    return get().roles.includes(role);
  },
}));

export default useAuthStore;
