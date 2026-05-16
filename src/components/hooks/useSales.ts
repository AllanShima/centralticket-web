import { useEffect, useState } from 'react';
import { MockEventRepository } from '@/infrastructure/mocks/MockEventRepository';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockSaleRepository } from '@/infrastructure/mocks/MockSaleRepository';
import type { ISale } from '@/domain/entities/Sale';

// Instanciamos fora para não recriar a cada renderização
const repo = new MockSaleRepository();

export function useSalesByUid() {
  const [sales, setSales] = useState<ISale[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSales = async (userId: string) => {
    try {
      setLoading(true);
      const data = await repo.getAllByUserId(userId);  // é uma promise, ent precisa do try catch e await
      setSales(data);
    } catch (error) {
      toast.error("Erro ao buscar eventos:", {description: String(error)});
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSales, sales, loading };
}

export function useAddSale() {
  const [loading, setLoading] = useState(false);

  const fetchSave = async (sale: ISale) => {
    try {
      setLoading(true);
      await repo.save(sale);
    } catch (error) {
        toast.error("Erro ao salvar nova venda:", {description: String(error)});
        console.error("Erro ao salvar nova venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSave, loading };
}

export function useUpdateSale() {
  const [loading, setLoading] = useState(false);

  const fetchUpdateStatus = async (saleId: string, newStatus: ISale['status']) => {
    try {
      setLoading(true);
      await repo.updateStatusById(saleId, newStatus);
    } catch (error) {
        toast.error("Erro ao salvar nova venda:", {description: String(error)});
        console.error("Erro ao salvar nova venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUpdateStatus, loading };
}