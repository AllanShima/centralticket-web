import { useState } from 'react';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import type { IUser } from '@/domain/entities/User';
import type { ISale } from '@/domain/entities/Sale';
import type { IUserTicket } from '@/domain/entities/UserTicket';
import { toast } from 'sonner';
import type { IUserSale } from '@/domain/entities/UserSale';

const repo = new UserRepository();

export function useUserByUid() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async (userId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const data = await repo.getByUid(userId, storedToken);
      setUser(data);
    } catch (error) {
      toast.error("Erro ao buscar usuário:", { description: String(error) });
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, user, loading };
}

export function useTicketsBySaleId() {
  const [tickets, setTickets] = useState<IUserTicket[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async (saleId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const data = await repo.getTicketsBySaleId(saleId, storedToken);
      setTickets(data);
    } catch (error) {
      toast.error("Erro ao buscar ingressos da venda:", { description: String(error) });
      console.error("Erro ao buscar ingressos da venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchTickets, tickets, loading };
}

export function useSalesByUserId() {
  const [sales, setSales] = useState<IUserSale[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSales = async (userId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const data = await repo.getSalesByUserId(userId, storedToken);
      setSales(data);
    } catch (error) {
      toast.error("Erro ao buscar compras do usuário:", { description: String(error) });
      console.error("Erro ao buscar compras do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSales, sales, loading };
}