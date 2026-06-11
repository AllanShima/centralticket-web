import type { CategoryEnum } from "../enums/CategoryEnum";
import type { KindEnum } from "../enums/KindEnum";
import type { TicketStatusEnum } from "../enums/TicketStatusEnum";

export interface ITicket {
    id?: string;
    value: number,
    category: CategoryEnum,
    kind: KindEnum,
    eventId: string,
    saleId: string,
    status: TicketStatusEnum
    createdAt?: Date
}