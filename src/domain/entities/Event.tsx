export interface IEvent {
    id: string;
    title: string;
    description: string;
    status: 'available' | 'shortly' | 'soldout';
    price: number;
    start_date: Date;
    end_date: Date;
    location: string;
    imageUrl: string;
    amount_tickets: number;
    remaining_tickets: number;
    createdAt: Date;
}