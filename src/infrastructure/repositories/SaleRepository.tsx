import type { ISale } from "@/domain/entities/Sale";
import type ISaleRepository from "../irepositories/ISaleRepository";
import axios from "axios";

export class SaleRepository implements ISaleRepository {
    public async getById(saleId: string, token: string): Promise<ISale> {
        throw new Error("Method not implemented.");
    }
    public async save(sale: ISale, token: string): Promise<void> {
        const paymentMethod = sale.paymentMethod == "pix" ? 1 : sale.paymentMethod == "credit_card" ? 2 : 3
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/Sales/create',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                totalValue: {
                    value: sale.total
                },
                paymentMethod: paymentMethod,
                userId: sale.userId,
                ticketIds: ['123']
            }
        }
        try {
            const { data } = await axios.request(options)
            console.log(data)
        } catch (error) {
            throw error;
        }
    }

    public async cancel(saleId: string, token: string): Promise<void> {
        const options = {
            method: 'PUT',
            url: 'https://localhost:7190/api/Sales/cancel',
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
            console.log(data)
        } catch (error) {
            throw error;
        }
    }
    
    public async confirm(saleId: string, token: string): Promise<void> {
        const options = {
            method: 'PUT',
            url: 'https://localhost:7190/api/Sales/confirm',
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
            console.log(data)
        } catch (error) {
            throw error;
        }
    }
}