export interface ISale {
    id: string;
    userId: string;      // Relacionamento
    ticketId: string;    // Relacionamento
    value: number;
    orderNumber: string; // Para suporte e busca rápida
    status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
    paymentMethod: 'pix' | 'credit_card' | 'debit_card';
    createdAt: Date;
}