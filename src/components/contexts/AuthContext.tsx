import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthRepository } from '@/infrastructure/AuthRepository';
import type { MeDto } from '@/domain/Dtos/MeDto';
import type { RefreshTokenDto } from '@/domain/Dtos/RefreshTokenDto';
import { jwtDecode } from "jwt-decode";

// O modelo do contexto
interface AuthContextType {
  user: MeDto | null;
  loading: boolean;
  logout: () => void;
}

const authRepository = new AuthRepository();

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      
      if (storedToken) {
        try {
          // Tenta pegar os dados do usuário com o token atual
          const userData = await authRepository.me(storedToken);
          setUser(userData as MeDto);
        } catch (error) {
          // --- O TOKEN EXPIROU! VAMOS TENTAR O REFRESH ---
          
          const storedRefreshToken = localStorage.getItem("@CentralTicket:refreshToken");

          if (storedRefreshToken) {
            try {
              
              const decoded: any = jwtDecode(storedToken);
              const userId = decoded.id; // ou decoded.sub, depende de como configuraram os Claims na API

              const newRefreshTokens: RefreshTokenDto = await authRepository.refreshToken(userId, storedRefreshToken);   
              
              await refreshNewTokens(newRefreshTokens);

              const retryUserData = await authRepository.me(newRefreshTokens.accessToken);
              setUser(retryUserData as MeDto);

            } catch (refreshError) {
              // Se o refresh token também falhou, limpa tudo
              logout();
            }
          } else {
            // Se não tinha nem refresh token guardado, limpa a sessão
            logout();
          }
        }
      }
      setLoading(false); 
    }
    
    loadStorageData();
  }, []);


  // função local pra trocar os tokens
  const refreshNewTokens = async (tokens: RefreshTokenDto) => {
    localStorage.setItem("@CentralTicket:accessToken", tokens.accessToken);
    localStorage.setItem("@CentralTicket:refreshToken", tokens.refreshToken);
  }

  // 5. Função global de Logout
  const logout = () => {
    localStorage.removeItem("@CentralTicket:accessToken");
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

