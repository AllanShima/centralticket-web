import type { ISale } from "@/domain/entities/Sale";
import type ISaleRepository from "@/domain/repositories/ISaleRepository";
import { BASE_SALES } from "./constants/mocks";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateNumericId = (length: number = 10): string => {
  return Math.random().toString().slice(2, 2 + length);
};

export class MockSaleRepository implements ISaleRepository {
  
  private sales = BASE_SALES;

  async getAllByUserId(userId : string): Promise<ISale[]> {
    await delay(800); // Simulate 0.8s loading time
    const salesList = this.sales;
    const retrievedSales = salesList.filter(s => s.userId === userId);
    if (retrievedSales){
      return retrievedSales
    } else{
      throw new Error("Vendas não foram encontradas...");
    }
  }

  async save(sale: ISale): Promise<ISale> {
    await delay(500);
    const newSale = { ...sale, id: generateNumericId(6) };
    this.sales.push(newSale);
    return newSale;
  }

  async updateStatusById(saleId: string, newStatus: ISale['status']): Promise<ISale> {
    await delay(500);
    const salesList = this.sales;
    const retrievedSale = salesList.find(s => s.id === saleId);
    if (retrievedSale) {
        retrievedSale.status = newStatus;
        return retrievedSale
    } else{
        throw new Error("Venda não encontrada...")
    }
  }
}