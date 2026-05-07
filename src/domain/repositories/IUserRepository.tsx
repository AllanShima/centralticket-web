import type { IUser } from "../entities/User";

export interface IUserRepository {
    getAll(): Promise<IUser[]>;
    save(task: IUser): Promise<void>;
}