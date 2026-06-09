import type { IEvent } from "@/domain/entities/Event";
import type IEventRepository from "../irepositories/IEventRepository";
import axios from "axios";
import type { UpdateEventDto } from "@/domain/Dtos/UpdateEventDto";
import type { EventStatusEnum } from "@/domain/enums/EventStatusEnum";

export class EventRepository implements IEventRepository{
    public async getAll(): Promise<IEvent[]> {
        const options = {
            method: 'GET',
            url: 'https://localhost:7190/api/events/GetAll',
            headers: {
                Accept: '*/*'
            }
        }

        try {
            const { data } = await axios.request(options)
            const events: IEvent[] = data.map((event: any) => ({
                id: event.id,
                title: event.title,
                description: event.description,
                status: event.status, 
                price: event.price, 
                location: event.location,
                imageUrl: event.imageUrl,
                amount_tickets: event.amountTickets,
                remaining_tickets: event.remainingTickets,
                start_date: new Date(event.startDate),
                end_date: new Date(event.endDate),
                createdAt: new Date(event.createdAt)
            }));

            return events;
        } catch (error) {
            throw error
        }
    }

    public async getById(eventId: string): Promise<IEvent> {
        const options = {
            method: 'GET',
            url: `https://localhost:7190/api/events/${eventId}/GetById`,
            headers: {
                Accept: '*/*'
            }
        }

        try {
            const { data } = await axios.request(options)
            const event: IEvent = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status, 
                price: data.price, 
                location: data.location,
                imageUrl: data.imageUrl,
                amount_tickets: data.amountTickets,
                remaining_tickets: data.remainingTickets,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                createdAt: new Date(data.createdAt)
            }
            return event;
        } catch (error) {
            throw error;
        }
    }

    public async save(event: IEvent, token: string): Promise<IEvent> {
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/events/Create',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                title: event.title,
                description: event.description,
                location: event.location,
                imageUrl: event.imageUrl,
                startDate: event.start_date instanceof Date ? event.start_date.toISOString() : event.start_date,
                endDate: event.end_date instanceof Date ? event.end_date.toISOString() : event.end_date,
                price: event.price,
                amountTickets: event.amount_tickets
            }
        }

        try {
            const { data } = await axios.request(options)
            
            const createdEvent: IEvent = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status, 
                price: data.price, 
                location: data.location,
                imageUrl: data.imageUrl,
                amount_tickets: data.amountTickets,
                remaining_tickets: data.remainingTickets,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                createdAt: new Date(data.createdAt)
            }

            return createdEvent
        } catch (error) {
            throw error;
        }
    }

    public async updateEvent(eventId: string, eventData: UpdateEventDto, token: string): Promise<IEvent> {
        const options = {
            method: 'PUT',
            url: `https://localhost:7190/api/events/${eventId}/UpdateEvent`,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                title: eventData.title,
                description: eventData.description,
                location: eventData.location,
                imageUrl: eventData.imageUrl
            }
        }

        try {
            const { data } = await axios.request(options)
            // retorna: IEvent
            const event: IEvent = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status, 
                price: data.price, 
                location: data.location,
                imageUrl: data.imageUrl,
                amount_tickets: data.amountTickets,
                remaining_tickets: data.remainingTickets,
                start_date: new Date(data.startDate),
                end_date: new Date(data.endDate),
                createdAt: new Date(data.createdAt)
            }
            return event;
        } catch (error) {
            throw error;
        }
    }
    public async updateStatus(eventId: string, newStatus: EventStatusEnum, token: string): Promise<string> {
        const options = {
            method: 'PATCH',
            url: `https://localhost:7190/api/events/${eventId}/UpdateStatus`,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                status: newStatus
            }
        }

        try {
            await axios.request(options)
            return 'Status atualizado com sucesso!'
        } catch (error) {
            throw error;
        }
    }
}