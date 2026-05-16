import type { ISale } from "@/domain/entities/Sale";
import type ISaleRepository from "@/domain/repositories/ISaleRepository";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateNumericId = (length: number = 10): string => {
  return Math.random().toString().slice(2, 2 + length);
};

export class MockSaleRepository implements ISaleRepository {
  private sales: ISale[] = 
  [
    {
      "id": "ord_84719203",
      "userId": "5r432532",
      "ticketId": "tkt_01h8x9",
      "ticketSnapshot": {
        "id": "tkt_01h8x9",
        "eventId": "evt_rock_in_rio_2026",
        "title": "Ingresso Pista - Rock in Rio",
        "price": 450.00,
        "description": "Acesso total à pista comum para o dia 15 de setembro."
      },
      "amount": 2,
      "total": 900.00,
      "orderNumber": "REF-2026-99381",
      "status": "confirmed",
      "paymentMethod": "pix",
      "createdAt": new Date
    },
    {
      "id": "ord_51627384",
      "userId": "5r432532",
      "ticketId": "tkt_02j9y0",
      "ticketSnapshot": {
        "id": "tkt_02j9y0",
        "eventId": "evt_standup_comedy",
        "title": "Ingresso VIP - Show de Comédia",
        "price": 120.00,
        "description": "Lugar na primeira fileira com direito a uma bebida grátis."
      },
      "amount": 1,
      "total": 120.00,
      "orderNumber": "REF-2026-44129",
      "status": "pending",
      "paymentMethod": "credit_card",
      "createdAt": new Date
    }
  ]

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