import type { ISale } from "./Sale";

export interface ITicket {
    id?: string;
    eventId: string;     // Relacionamento
    title: string;
    price: number;
    description: string;
}