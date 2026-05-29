import type { ISale } from "../../domain/entities/Sale";

export default interface ISaleRepository {
    getById(saleId: string, token: string): Promise<ISale>;
    save(sale: ISale, token: string): Promise<void>;
    cancel(saleId: string, token: string): void;
    confirm(saleId: string, token: string): void;
}