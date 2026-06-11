import type { ISale } from "@/domain/entities/Sale";
import type ISaleRepository from "../irepositories/ISaleRepository";
import axios from "axios";
import type { CreateSaleDto } from "@/domain/Dtos/CreateSaleDto";
import type { ITicket } from "@/domain/entities/Ticket";

export class SaleRepository implements ISaleRepository {
    public async getAll(): Promise<ISale[]> {
        const options = {
            method: 'GET',
            url: 'https://localhost:7190/api/Sales/GetAll',
            headers: {
                Accept: '*/*'
            }
        }
        try {
            const { data } = await axios.request(options)
            const sales: ISale[] = data.map((saleApi: any) => {
                const mappedTickets: ITicket[] = saleApi.purchasedTickets?.map((ticketApi: any) => ({
                    id: ticketApi.id,
                    value: ticketApi.value?.value,
                    category: ticketApi.category,
                    kind: ticketApi.kind,
                    eventId: ticketApi.eventId,
                    saleId: ticketApi.saleId,
                    status: ticketApi.status,
                    createdAt: new Date(ticketApi.createdAt)
                })) || [];
                return {
                    id: saleApi.id,
                    userId: saleApi.customerId,
                    total: saleApi.totalValue?.value,
                    amount: saleApi.purchasedTickets?.length || 0,
                    orderNumber: saleApi.orderCode?.value,
                    status: saleApi.status,
                    paymentMethod: saleApi.paymentMethod,
                    purchasedTickets: mappedTickets,
                    createdAt: new Date(saleApi.createdAt)
                };
            });
            return sales;
        } catch (error) {
            throw error;
        }
    }

    public async getById(saleId: string, token: string): Promise<ISale> {
        const options = {
            method: 'GET',
            url: 'https://localhost:7190/api/Sales/GetById',
            params: {
                id: saleId
            },
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.request(options)
            const mappedTickets: ITicket[] = data.purchasedTickets.map((ticketApi: any) => ({
                id: ticketApi.id,
                value: ticketApi.value?.value,
                category: ticketApi.category,
                kind: ticketApi.kind,
                eventId: ticketApi.eventId,
                saleId: ticketApi.saleId,
                status: ticketApi.status,
                createdAt: new Date(ticketApi.createdAt)
            }));
            const sale: ISale = {
                id: data.id,
                userId: data.customerId,
                total: data.totalValue?.value,
                amount: data.purchasedTickets?.length || 0,
                orderNumber: data.orderCode?.value,
                status: data.status,
                paymentMethod: data.paymentMethod,
                purchasedTickets: mappedTickets,
                createdAt: new Date(data.createdAt)
            };
            return sale
        } catch (error) {
            throw error;
        }
    }

    public async save(saleData: CreateSaleDto, token: string): Promise<ISale> {
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/Sales/Create',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                totalValue: {
                    value: saleData.totalValue
                },
                paymentMethod: saleData.paymentMethod,
                userId: saleData.userId,
                eventId: saleData.eventId,
                tickets: saleData.tickets
            }
        }

        try {
            const { data } = await axios.request(options)
            const mappedTickets: ITicket[] = data.purchasedTickets?.map((ticketApi: any) => ({
                id: ticketApi.id,
                value: ticketApi.value?.value,
                category: ticketApi.category,
                kind: ticketApi.kind,
                eventId: ticketApi.eventId,
                saleId: ticketApi.saleId,
                status: ticketApi.status,
                createdAt: new Date(ticketApi.createdAt)
            })) || [];

            const createdSale: ISale = {
                id: data.id,
                userId: data.customerId,
                total: data.totalValue?.value,
                amount: mappedTickets.length,
                orderNumber: data.orderCode?.value,
                status: data.status,
                paymentMethod: data.paymentMethod,
                purchasedTickets: mappedTickets,
                createdAt: new Date(data.createdAt)
            };

            return createdSale;
        } catch (error) {
            throw error;
        }
    }

    public async cancel(saleId: string, token: string): Promise<string> {
        const options = {
            method: 'PUT',
            url: 'https://localhost:7190/api/Sales/Cancel',
            params: {
                id: 'a5b604dc-3c3b-4121-9d3b-70fde8779ab9'
            },
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZkMmUxMzc1LWQzNDQtNDg5MC1hNDQ3LTdiMjFjOGVlYTA0ZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBbGxhbiIsImV4cCI6MTc4MTA1MjE4MCwiaXNzIjoiQ2VudHJhbFRpY2tldCIsImF1ZCI6IkNlbnRyYWxUaWNrZXRVc2VycyJ9.EsGGAfCyMZGOQljiOnxuQ6atWkwMmjGP-BDjk6V4Yy3yldZrptb9Gi6l5wqlX6XJ1EY1b45bGwK5fPAsBSlaMw'
            }
        }

        try {
            // se der certo ele prossegue com o return
            await axios.request(options)
            return `Venda cancelada!`;
        } catch (error) {
            throw error;
        }
    }

    public async confirm(saleId: string, token: string): Promise<string> {
        const options = {
            method: 'PUT',
            url: 'https://localhost:7190/api/Sales/Confirm',
            params: {
                id: saleId
            },
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.request(options)
            return "Venda Confirmada!"; 
        } catch (error) {
            throw error;   
        }
    }
}