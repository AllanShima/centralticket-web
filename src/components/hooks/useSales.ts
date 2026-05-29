import { useEffect, useState } from 'react';
import { MockEventRepository } from '@/infrastructure/mocks/MockEventRepository';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';
import { MockSaleRepository } from '@/infrastructure/mocks/MockSaleRepository';
import type { ISale } from '@/domain/entities/Sale';
import { SaleRepository } from '@/infrastructure/repositories/SaleRepository';

const repo = new SaleRepository()

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
      const data = await repo.getById(saleId, storedToken);  // é uma promise, ent precisa do try catch e await
      setSale(data);
    } catch (error) {
      toast.error("Erro ao buscar evento:", {description: String(error)});
      console.error("Erro ao buscar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSale, sale, loading };
}

export function useSaveSale() {
  const [loading, setLoading] = useState(false);

  const fetchSale = async (sale: ISale) => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }
      await repo.save(sale, storedToken);  // é uma promise, ent precisa do try catch e await
      //talvez retorna success
    } catch (error) {
      toast.error("Erro ao salvar novo evento:", {description: String(error)});
      console.error("Erro ao salvar novo evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSale, loading };
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
      await repo.confirm(saleId, storedToken);  // é uma promise, ent precisa do try catch e await
      //talvez retorna success
    } catch (error) {
      toast.error("Erro ao confirmar venda:", {description: String(error)});
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
      await repo.cancel(saleId, storedToken);  // é uma promise, ent precisa do try catch e await
      //talvez retorna success
    } catch (error) {
      toast.error("Erro ao cancelar venda:", {description: String(error)});
      console.error("Erro ao cancelar venda:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchStatus, loading };
}



// Instanciamos fora para não recriar a cada renderização
// const repo = new MockSaleRepository();

// export function useSalesByUid() {
//   const [sales, setSales] = useState<ISale[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSales = async (userId: string) => {
//     try {
//       setLoading(true);
//       const data = await repo.getAllByUserId(userId);  // é uma promise, ent precisa do try catch e await
//       setSales(data);
//     } catch (error) {
//       toast.error("Erro ao buscar eventos:", {description: String(error)});
//       console.error("Erro ao buscar eventos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchSales, sales, loading };
// }

// export function useAddSale() {
//   const [loading, setLoading] = useState(false);

//   const fetchSave = async (sale: ISale) => {
//     try {
//       setLoading(true);
//       await repo.save(sale);
//     } catch (error) {
//         toast.error("Erro ao salvar nova venda:", {description: String(error)});
//         console.error("Erro ao salvar nova venda:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchSave, loading };
// }

// export function useUpdateSale() {
//   const [loading, setLoading] = useState(false);

//   const fetchUpdateStatus = async (saleId: string, newStatus: ISale['status']) => {
//     try {
//       setLoading(true);
//       await repo.updateStatusById(saleId, newStatus);
//     } catch (error) {
//         toast.error("Erro ao salvar nova venda:", {description: String(error)});
//         console.error("Erro ao salvar nova venda:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchUpdateStatus, loading };
// }

