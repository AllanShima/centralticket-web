import type { IUser } from '@/domain/entities/User';
import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Define the shape of the Context
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
}

// 2. Create the Context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. The Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Usuário teste para autenticar automaticamente
  const authUser: IUser = {
    id: "5r432532",
    name: "Alanzoka",
    email: "alanzoka@gmail.com",
    password: "Seilamano", // Opcional dependendo de onde for usada (ex: frontend)
    sales: [],
    createdAt: new Date
  }

  useEffect(() => {
    setUser(authUser);
    setLoading(false);
  }, [])

  // useEffect(() => {
  //   // const auth = getAuth(app);
    
  //   // Subscribe to auth state changes
  //   const unsubscribe = () => {
      
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. The Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  // Safety check: ensure the hook is used within the Provider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
