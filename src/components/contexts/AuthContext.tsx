import type { ISale } from '@/domain/entities/Sale';
import type { IUser } from '@/domain/entities/User';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthRepository } from '@/infrastructure/AuthRepository';

// O modelo do contexto
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  logout: () => void;
}

const authRepository = new AuthRepository();

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Ao inicializar ele já verifica o token
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem("@CentralTicket:token");
      
      if (storedToken) {
        try {
          // Opcional: Se sua API tiver um endpoint '/auth/me' que valida o token e retorna o IUser
          const userData = await authRepository.me(storedToken);
          setUser(userData as IUser);
        } catch (error) {
          // Se o token estiver expirado ou inválido, limpa tudo
          logout();
        }
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  // 5. Função global de Logout
  const logout = () => {
    localStorage.removeItem("@CentralTicket:token");
    setUser(null);
  };

  return (
    // Passamos todos os estados e funções no Value para os componentes consumirem
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  
  // Cheque de segurança
  if (context === undefined) {
    throw new Error('useAuth precisa estar dentro de AuthProvider');
  }
  
  return context;
}


// import type { ISale } from '@/domain/entities/Sale';

// import type { IUser } from '@/domain/entities/User';

// import React, { createContext, useContext, useEffect, useState } from 'react';

// import { useSalesByUid } from './useSales';

// import { useUserByUid } from './useUsers';



// // O modelo do contexto

// interface AuthContextType {

//   user: IUser | null;

//   loading: boolean;

// }



// // Criando o contexto

// const AuthContext = createContext<AuthContextType | undefined>(undefined);



// // Provider

// export function AuthProvider({ children }: { children: React.ReactNode }) {

//   const { fetchUser, user: fetchedUser, loading } = useUserByUid();

//   const [user, setUser] = useState<IUser | null>(null);



//   // Usuário teste para autenticar automaticamente

//   const userId = "5r432532"



//   useEffect(() => {

   

//     fetchUser(userId);

   

//   }, [])



//   useEffect(() => {

//     if (fetchedUser) {

//       console.log(fetchedUser);

//       setUser(fetchedUser);

//     }

//   }, [fetchedUser])



//   // useEffect(() => {

//   //   // const auth = getAuth(app);

   

//   //   // Subscribe to auth state changes

//   //   const unsubscribe = () => {

     

//   //   });

//   //   return () => unsubscribe();

//   // }, []);



//   return (

//     <AuthContext.Provider value={{ user, loading }}>

//       {children}

//     </AuthContext.Provider>

//   );

// }



// // Hook de autenticação

// export function useAuth() {

//   const context = useContext(AuthContext);

 

//   // Cheque de segurança

//   if (context === undefined) {

//     throw new Error('useAuth precisa estar dentro de AuthProvider');

//   }

 

//   return context;

// } 

