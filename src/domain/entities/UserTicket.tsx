import type { TicketStatusEnum } from "../enums/TicketStatusEnum";

export interface IUserTicket {
    id?: string,
    title: string,
    status: TicketStatusEnum,
    eventTitle: string,
    eventLocation: string,
    eventImageUrl: string,
    eventStartDate: Date,
    eventEndDate: Date,
}