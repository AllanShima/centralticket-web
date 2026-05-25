import { useEffect, useState } from 'react';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockUserRepository } from '@/infrastructure/mocks/MockUserRepository';
import type { IUser } from '@/domain/entities/User';
import type { ISale } from '@/domain/entities/Sale';
import { UserRepository } from '@/infrastructure/UserRepository';
import type { RegisterRequest } from '@/domain/requests/RegisterRequest';
import { AuthRepository } from '@/infrastructure/AuthRepository';
import type { LoginRequest } from '@/domain/requests/LoginRequest';


const repo = new AuthRepository();

// export function useValidate() {
//   const [result, setResult] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const fetchTest = async () => {
//     try {
//       setLoading(true);
//       const data = await repo.test();
//       setResult(data);
//     } catch (error) {
//       console.error("Erro ao executar teste:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchTest, result, loading };
// }

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const fetchLogin = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      await repo.login(credentials);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { fetchLogin, loading };
}

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const fetchRegister = async (credentials: RegisterRequest) => {
    try {
      setLoading(true);
      await repo.register(credentials);
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return { fetchRegister, loading };
}