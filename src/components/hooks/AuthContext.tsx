import type { ISale } from '@/domain/entities/Sale';
import type { IUser } from '@/domain/entities/User';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSalesByUid } from './useSales';
import { useUserByUid } from './useUsers';

// 1. Define the shape of the Context
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
}

// 2. Create the Context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. The Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, user: fetchedUser, loading } = useUserByUid();
  const [user, setUser] = useState<IUser | null>(null);

  // Usuário teste para autenticar automaticamente
  const userId = "5r432532"


  

  useEffect(() => {
    
    fetchUser(userId);
    
  }, [])

  useEffect(() => {
    if (fetchedUser) {
      console.log(fetchedUser);
      setUser(fetchedUser);
    }
  }, [fetchedUser])

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
    throw new Error('useAuth precisa estar dentro de AuthProvider');
  }
  
  return context;
}
