import type { PaymentMethodEnum } from "../enums/PaymentMethodEnum";
import type { SaleStatusEnum } from "../enums/SaleStatusEnum";
import type { IUserTicket } from "./UserTicket";

export interface IUserSale {
    id?: string,
    userId: string,
    total: number,
    amount: number,
    orderNumber: string,
    status: SaleStatusEnum,
    paymentMethod: PaymentMethodEnum,
    purchasedTickets: IUserTicket[],
    createdAt?: Date
}