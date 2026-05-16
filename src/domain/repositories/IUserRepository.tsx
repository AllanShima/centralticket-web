import type { IUser } from "../entities/User";

export interface IUserRepository {
    getByUid(userId: string): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
}