import type { IEvent } from "@/domain/entities/Event";
import type IEventRepository from "@/domain/repositories/IEventRepository";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MockEventRepository implements IEventRepository {
  private events: IEvent[] = [
    {
        id: "232323222323233",
        title: "Rock in Marília",
        description: "O maior encontro de bandas de rock da região com praça de alimentação completa.",
        status: 'available',
        price: 25.00,
        start_date: new Date(),
        end_date: new Date(),
        location: "Praça do Coreto",
        imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee",
        amount_tickets: 2000,
        remaining_tickets: 1200,
        createdAt: new Date()
    },
    {
        id: "343434333434344",
        title: "Samba & Pagode Premium",
        description: "Tardezinha exclusiva com os melhores grupos de pagode do interior paulista.",
        status: 'available',
        price: 45.90,
        start_date: new Date(),
        end_date: new Date(),
        location: "Clube dos Bancários",
        imageUrl: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
        amount_tickets: 800,
        remaining_tickets: 150,
        createdAt: new Date()
    },
    {
        id: "454545444545455",
        title: "Workshop de Gastronomia",
        description: "Aprenda técnicas de culinária italiana com chefs renomados da cidade.",
        status: 'available',
        price: 120.00,
        start_date: new Date(),
        end_date: new Date(),
        location: "Espaço Gourmet Marília",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        amount_tickets: 50,
        remaining_tickets: 12,
        createdAt: new Date()
    },
    {
        id: "565656555656566",
        title: "Marília Comedy Show",
        description: "Uma noite de gargalhadas com os principais nomes do Stand-up nacional.",
        status: 'available',
        price: 35.00,
        start_date: new Date(),
        end_date: new Date(),
        location: "Teatro Municipal",
        imageUrl: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2",
        amount_tickets: 400,
        remaining_tickets: 400,
        createdAt: new Date()
    }]

  async getAll(): Promise<IEvent[]> {
    await delay(800); // Simulate 0.8s loading time
    return [...this.events];
  }

  async save(event: Omit<IEvent, 'id'>): Promise<IEvent> {
    await delay(500);
    const newEvent = { ...event, id: "12121212" };
    this.events.push(newEvent);
    return newEvent;
  }
}