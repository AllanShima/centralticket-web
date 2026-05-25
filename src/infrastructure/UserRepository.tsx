import type { IUser } from "@/domain/entities/User";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import axios from "axios";

// Configuração do axios
const api = axios.create({
    baseURL: "https://localhost:7231/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export class UserRepository {
    async test(): Promise<string> {
        try {
            const response = await api.get<string>("/auth/test");
            return response.data;
        } catch (error: any) {
            console.error("Erro na requisição protegida:", error.response?.data);
            throw error;
        }
    }
}

// export class UserRepository implements IUserRepository {
//   async getAll(): Promise<IUser[]> {
//     const usersList = this.users;
//     if (usersList){
//       return usersList;
//     } else {
//       throw new Error("Usuários não encontrados");
//     }
//   }

//   async getByUid(userId: string): Promise<IUser> {
//     const usersList = this.users;
//     const retrievedUser = usersList.find(u => u.id === userId);
//     if (retrievedUser) {
//       return retrievedUser
//     } else{
//       throw new Error("Usuário não foi encontrado");
//     }
//   }

//   async save(user: IUser): Promise<IUser> {
//     const newUser = { ...user, id: generateNumericId(10) };
//     this.users.push(newUser);
//     return newUser;
//   }

//   async updateSalesById(userId: string, newSale: ISale): Promise<IUser> {
//     const usersList = this.users;
//     const retrievedUser = usersList.find(u => u.id === userId);
//     if (retrievedUser) {
//       retrievedUser.sales?.push(newSale);
//       return retrievedUser
//     } else{
//       throw new Error("Erro ao realizar push de venda.");
//     }
//   }
// }

