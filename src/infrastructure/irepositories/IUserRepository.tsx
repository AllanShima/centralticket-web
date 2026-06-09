import type { ISale } from "../../domain/entities/Sale";
import type { IUser } from "../../domain/entities/User";
import type { IUserTicket } from "@/domain/entities/UserTicket";

export interface IUserRepository {
    getByUid(userId: string, token: string): Promise<IUser>;
    getTicketsBySaleId(saleId: string, token: string): Promise<IUserTicket[]>;
    getSalesByUserId(userId: string, token: string): Promise<ISale[]>;
}