import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  login: (userData: any, token: string, redirectTo?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on component mount
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: any, token: string, redirectTo?: string) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
    
    // Role-based navigation
    if (redirectTo) {
      window.location.href = redirectTo;
    } else if (userData.role === 'admin') {
      window.location.href = '/admin';
    } else if (userData.role === 'staff') {
      window.location.href = '/staff';
    } else if (userData.role === 'client') {
      window.location.href = '/client';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
      role: user?.role || null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
