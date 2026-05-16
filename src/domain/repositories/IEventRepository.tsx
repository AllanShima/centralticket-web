import type { IEvent } from "../entities/Event";

export default interface IEventRepository {
    getAll(): Promise<IEvent[]>;
    save(event: IEvent): Promise<IEvent>;
    getById(eventId : string): Promise<IEvent>;
}