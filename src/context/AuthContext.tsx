import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  login: (email: string, role: UserRole, customUserObj?: Partial<User>, authToken?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('user_role') as UserRole) || 'student';
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate active session token against MongoDB database on mount
  useEffect(() => {
    const verifySession = async () => {
      const activeToken = localStorage.getItem('token');
      if (!activeToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      const res = await apiService.getMeApi();
      if (res.success && res.user) {
        setUser(res.user);
        setRole(res.user.role);
        localStorage.setItem('user_data', JSON.stringify(res.user));
        localStorage.setItem('user_role', res.user.role);
      } else {
        // If token is invalid or server connection fails, clear stored auth session
        if (res.isNetworkError) {
          // If server is temporarily offline, retain cached user session for offline view
        } else {
          logout();
        }
      }
      setIsLoading(false);
    };

    verifySession();
  }, []);

  const login = (email: string, selectedRole: UserRole, customUserObj?: Partial<User>, authToken?: string) => {
    const activeUser: User = {
      id: customUserObj?.id || `u-${Date.now()}`,
      name: customUserObj?.name || email.split('@')[0],
      email,
      role: selectedRole,
      avatar: customUserObj?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: customUserObj?.phone
    };
    const activeToken = authToken || token || `jwt-${Date.now()}`;

    setUser(activeUser);
    setRole(selectedRole);
    setToken(activeToken);

    localStorage.setItem('token', activeToken);
    localStorage.setItem('user_role', selectedRole);
    localStorage.setItem('user_data', JSON.stringify(activeUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole('student');
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : role,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
