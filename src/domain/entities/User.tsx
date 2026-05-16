import type { ISale } from "./Sale";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string; // Opcional dependendo de onde for usada (ex: frontend)
    pfpUrl?: string;
    sales?: ISale[]; 
    createdAt: Date;
}