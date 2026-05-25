import { useEffect, useState } from 'react';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockUserRepository } from '@/infrastructure/mocks/MockUserRepository';
import type { IUser } from '@/domain/entities/User';
import type { ISale } from '@/domain/entities/Sale';
import { UserRepository } from '@/infrastructure/UserRepository';

// Instanciamos fora para não recriar a cada renderização
const repo = new MockUserRepository();

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await repo.getAll();  // é uma promise, ent precisa do try catch e await
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, users, loading };
}

export function useUserByUid() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId: string) => {
    try {
      setLoading(true);
      const data = await repo.getByUid(userId);
      setUser(data);
    } catch (error) {
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
      console.error("Erro ao salvar novo usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSaveUser, loading };
}

export function useUpdateUserById() {
  const [loading, setLoading] = useState(false);

  const fetchSalesById = async (userId: string, newSale: ISale) => {
    try {
      setLoading(true);
      await repo.updateSalesById(userId, newSale);
    } catch (error) {
      console.error("Erro ao salvar novo usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSalesById, loading };
}