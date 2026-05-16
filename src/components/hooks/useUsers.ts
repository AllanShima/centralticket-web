import { useEffect, useState } from 'react';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockUserRepository } from '@/infrastructure/mocks/MockUserRepository';
import type { IUser } from '@/domain/entities/User';

// Instanciamos fora para não recriar a cada renderização
const repo = new MockUserRepository();

export function useUserByUid() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId: string) => {
    try {
      setLoading(true);
      const data = await repo.getByUid(userId);  // é uma promise, ent precisa do try catch e await
      setUser(data);
    } catch (error) {
      toast.error("Erro ao buscar usuário:", {description: String(error)});
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, user, loading };
}


export function useSaveUser() {
  const [loading, setLoading] = useState(false);

  const fetchSaveUser = async (user: IUser) => {
    try {
      setLoading(true);
      await repo.save(user);
    } catch (error) {
      toast.error("Erro ao salvar novo usuário:", {description: String(error)});
      console.error("Erro ao salvar novo usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSaveUser, loading };
}