import { PaymentMethodEnum } from "../enums/PaymentMethodEnum";
import type { TicketItemDto } from "./TicketItemDto";

export interface CreateSaleDto {
    totalValue: number,
    paymentMethod: PaymentMethodEnum,
    userId: string,
    eventId: string,
    tickets: TicketItemDto[]
}