import type { ISale } from "./Sale";

export interface ITicket {
    eventId: string;     // Relacionamento
    title: string;
    price: number;
    description: string;
}