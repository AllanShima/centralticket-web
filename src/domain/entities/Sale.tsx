import type { ITicket } from "./Ticket";

export interface ISale {
    id?: string;
    userId?: string;      // Relacionamento
    ticket?: ITicket;    // Cópia dos dados no momento da compra
    total?: number;
    amount: number;
    orderNumber: string; // Para suporte e busca rápida
    status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
    paymentMethod?: 'pix' | 'credit_card' | 'debit_card';
    createdAt: Date;
}