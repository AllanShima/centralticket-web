import type { IEvent } from "../entities/Event";

export default interface IUserRepository {
    getAll(): Promise<IEvent[]>;
    save(event: IEvent): Promise<IEvent>;
}