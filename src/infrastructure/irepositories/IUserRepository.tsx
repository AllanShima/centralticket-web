import type { ISale } from "../../domain/entities/Sale";
import type { IUser } from "../../domain/entities/User";

export interface IUserRepository {
    getAll(): Promise<IUser[]>;
    getByUid(userId: string): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    updateSalesById(userId: string, newSale: ISale): Promise<IUser>;
}