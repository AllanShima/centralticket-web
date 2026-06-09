import type { UpdateEventDto } from "@/domain/Dtos/UpdateEventDto";
import type { IEvent } from "../../domain/entities/Event";
import type { EventStatusEnum } from "@/domain/enums/EventStatusEnum";

export default interface IEventRepository {
    getAll(): Promise<IEvent[]>;
    getById(eventId: string): Promise<IEvent>;
    save(event: IEvent, token: string): Promise<IEvent>;
    updateEvent(eventId: string, eventData: UpdateEventDto, token: string): Promise<IEvent>;
    updateStatus(eventId: string, newStatus: EventStatusEnum, token: string): Promise<string>;
}