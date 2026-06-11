import { useEffect, useState } from 'react';
import { SaleRepository } from '@/infrastructure/repositories/SaleRepository';
import type { ISale } from '@/domain/entities/Sale';
import type { CreateSaleDto } from '@/domain/Dtos/CreateSaleDto';
import { toast } from 'sonner';

const repo = new SaleRepository();

export function useSales() {
  const [sales, setSales] = useState<ISale[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await repo.getAll();
      setSales(data);
    } catch (error) {
      toast.error("Erro ao buscar vendas:", { description: String(error) });
      console.error("Erro ao buscar vendas:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSales, sales, loading };
}

export function useSalesById() {
  const [sale, setSale] = useState<ISale>();
  const [loading, setLoading] = useState(false);

  const fetchSale = async (saleId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const data = await repo.getById(saleId, storedToken);
      setSale(data);
    } catch (error) {
      toast.error("Erro ao buscar venda:", { description: String(error) });
      console.error("Erro ao buscar venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSale, sale, loading };
}

export function useSaveSale() {
  const [sale, setSale] = useState<ISale>();
  const [loading, setLoading] = useState(false);

  const fetchSale = async (saleData: CreateSaleDto): Promise<ISale> => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const newSale = await repo.save(saleData, storedToken);
      setSale(newSale);
      
      return newSale; // Retorno crucial para o toast.promise receber o objeto com ID
    } catch (error) {
      console.error("Erro ao salvar nova venda:", error);
      throw error; // Repassa o erro para o toast.promise renderizar o bloco 'error'
    } finally {
      setLoading(false);
    }
  };

  return { fetchSale, loading, sale };
}

export function useConfirmSale() {
  const [loading, setLoading] = useState(false);

  const fetchStatus = async (saleId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const message = await repo.confirm(saleId, storedToken);
      toast.success(message);
      return message;
    } catch (error) {
      toast.error("Erro ao confirmar venda:", { description: String(error) });
      console.error("Erro ao confirmar venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStatus, loading };
}

export function useCancelSale() {
  const [loading, setLoading] = useState(false);

  const fetchStatus = async (saleId: string) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      const message = await repo.cancel(saleId, storedToken);
      toast.success(message);
      return message;
    } catch (error) {
      toast.error("Erro ao cancelar venda:", { description: String(error) });
      console.error("Erro ao cancelar venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStatus, loading };
}