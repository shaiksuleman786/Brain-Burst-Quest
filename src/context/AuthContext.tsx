import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/quiz';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('quiz_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app this would be an API call
      const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete (userWithoutPassword as any).password;
        setUser(userWithoutPassword);
        localStorage.setItem('quiz_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Mock registration - in real app this would be an API call
      const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date(),
      };

      users.push(newUser);
      localStorage.setItem('quiz_users', JSON.stringify(users));

      const userWithoutPassword = { ...newUser };
      delete (userWithoutPassword as any).password;
      setUser(userWithoutPassword);
      localStorage.setItem('quiz_user', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};