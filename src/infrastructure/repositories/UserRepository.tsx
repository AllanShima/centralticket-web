import type { ISale } from "@/domain/entities/Sale";
import type { ITicket } from "@/domain/entities/Ticket";
import type { IUser } from "@/domain/entities/User";
import type { IUserTicket } from "@/domain/entities/UserTicket";
import type { IUserRepository } from "@/infrastructure/irepositories/IUserRepository";
import axios from "axios";

// Funções Request do Contexto de PROFILE da Api

// Configuração do axios
const api = axios.create({
    baseURL: "https://localhost:7231/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export class UserRepository implements IUserRepository {
    public async getByUid(userId: string, token: string): Promise<IUser> {
        const options = {
            method: 'GET',
            url: 'https://localhost:7190/api/Profile/GetUserById',
            params: {
                id: userId
            },
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.request(options)
            const user: IUser = {
                id: data.id,
                name: data.name?.value,
                email: data.email?.value,
                pfpUrl: data.profilePictureUrl,
                createdAt: new Date(data.createdAt)
            };

            return user;
        } catch (error) {
            throw error
        }
    }

    public async getTicketsBySaleId(saleId: string, token: string): Promise<IUserTicket[]> {
        const options = {
            method: 'GET',
            url: `https://localhost:7190/api/Profile/${saleId}/GetTicketsBySaleId`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.request(options)
            const userTickets: IUserTicket[] = data.map((ticket: any) => ({
                id: ticket.id,
                title: ticket.title,
                status: ticket.status,
                eventTitle: ticket.eventTitle,
                eventStartDate: new Date(ticket.eventStartDate),
                eventEndDate: new Date(ticket.eventEndDate)
            }));

            return userTickets;
        } catch (error) {
            throw error
        }
    }

    public async getSalesByUserId(userId: string, token: string): Promise<ISale[]> {
        const options = {
            method: 'GET',
            url: `https://localhost:7190/api/Profile/${userId}/GetSaleByUserId`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.request(options)
            const sales: ISale[] = data.map((sale: any) => {
                const mappedTickets = sale.purchasedTickets?.map((ticket: any) => ({
                    id: ticket.id,
                    title: ticket.title,
                    status: ticket.status,
                    eventTitle: ticket.eventTitle,
                    eventStartDate: new Date(ticket.eventStartDate),
                    eventEndDate: new Date(ticket.eventEndDate)
                })) || [];

                return {
                    id: sale.id,
                    userId: userId,
                    total: sale.totalValue,
                    amount: mappedTickets.length,
                    orderNumber: sale.orderCode,
                    status: sale.status,
                    paymentMethod: sale.paymentMethod,
                    purchasedTickets: mappedTickets,
                    createdAt: new Date()
                };
            });

            return sales;
        } catch (error) {
            throw error
        }
    }
}