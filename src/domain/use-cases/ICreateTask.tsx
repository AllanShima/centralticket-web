import type { IUser } from "../entities/User";

export interface ICreateTask {
  execute(data: { title: string }): Promise<IUser>;
}