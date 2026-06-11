import { useEffect, useState } from 'react';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockUserRepository } from '@/infrastructure/mocks/MockUserRepository';
import type { IUser } from '@/domain/entities/User';
import type { ISale } from '@/domain/entities/Sale';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import type { RegisterRequest } from '@/domain/requests/RegisterRequest';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import type { LoginRequest } from '@/domain/requests/LoginRequest';
import type { MeDto } from '@/domain/Dtos/MeDto';


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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { fetchRegister, loading };
}

// retorna o id e o nome do usuário logado
export function useMe() {
  const storedToken = localStorage.getItem("@CentralTicket:accessToken");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MeDto>();

  const fetchMe = async () => {
    try {
      if (!storedToken) {
        throw new Error("Token não encontrado, usuário deslogado?");
      }
      setLoading(true);
      setData(await repo.me(storedToken));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }
  return { fetchMe, data, loading };
}