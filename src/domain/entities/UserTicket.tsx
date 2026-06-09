import type { TicketStatusEnum } from "../enums/TicketStatusEnum";

export interface IUserTicket {
    id: string,
    title: string,
    status: TicketStatusEnum,
    eventTitle: string,
    eventStartDate: Date,
    eventEndDate: Date
}