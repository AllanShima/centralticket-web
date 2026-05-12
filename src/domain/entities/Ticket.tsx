import type { ISale } from "./Sale";

export interface ITicket {
    id: string;
    eventId: string;     // Relacionamento
    title: string;
    price: number;
    description: string;
    amount: number;      // Quantidade total
    type: 'VIP' | 'meia' | 'inteira'; 
    sales?: ISale[];     // Lista virtual
}