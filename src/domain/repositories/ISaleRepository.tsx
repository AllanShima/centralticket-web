import type { ISale } from "../entities/Sale";

export default interface ISaleRepository {
    getAllByUserId(userId: string): Promise<ISale[]>;
    save(sale: ISale): Promise<ISale>;
    updateStatusById(saleId: string, newStatus: ISale['status']): Promise<ISale>;
}