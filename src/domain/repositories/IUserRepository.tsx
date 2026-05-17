import type { ISale } from "../entities/Sale";
import type { IUser } from "../entities/User";

export interface IUserRepository {
    getByUid(userId: string): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    updateSalesById(userId: string, newSale: ISale): Promise<IUser>;
}