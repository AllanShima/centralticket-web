import type { PaymentMethodEnum } from "../enums/PaymentMethodEnum";
import type { SaleStatusEnum } from "../enums/SaleStatusEnum";
import type { ITicket } from "./Ticket";

export interface ISale {
    id?: string;
    userId?: string;      // Relacionamento
    ticket?: ITicket;    // Cópia dos dados no momento da compra
    total?: number;
    amount: number;
    orderNumber: string; // Para suporte e busca rápida
    status: SaleStatusEnum;
    paymentMethod?: PaymentMethodEnum;
    purchasedTickets : ITicket[];
    createdAt: Date;
}