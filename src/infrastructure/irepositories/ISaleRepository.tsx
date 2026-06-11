import type { CreateSaleDto } from "@/domain/Dtos/CreateSaleDto";
import type { ISale } from "../../domain/entities/Sale";

export default interface ISaleRepository {
    getAll(): Promise<ISale[]>;
    getById(saleId: string, token: string): Promise<ISale>;
    save(saleData: CreateSaleDto, token: string): Promise<ISale>;
    cancel(saleId: string, token: string): Promise<string>;
    confirm(saleId: string, token: string): Promise<string>;
}