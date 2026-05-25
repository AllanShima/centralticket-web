import type { IEvent } from "@/domain/entities/Event";
import type { ISale } from "@/domain/entities/Sale";
import type { IUser } from "@/domain/entities/User";

export const BASE_EVENTS: IEvent[] = [
    {
        id: "evt_rock_in_rio_2026",
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
      id: "evt_standup_comedy",
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
    }
]

export const BASE_SALES: ISale[] = 
[
  {
    "id": "ord_84719203",
    "userId": "5r432532",
    "ticket": {
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
    "ticket": {
      "eventId": "evt_standup_comedy",
      "title": "Ingresso Comum - Show de Comédia",
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

export const BASE_USERS: IUser[] = [
  {
    id: "5r432532",
    name: "Allan Shinhama",
    email: "allanshinhamabelo@gmail.com",
    password: "shinhama",
    sales: [
      BASE_SALES[0]!,
      BASE_SALES[1]!
    ],
    createdAt: new Date()
  }
];