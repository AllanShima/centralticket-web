// src/infrastructure/mocks/MockTaskRepository.ts
import type { IUserRepository } from "@/infrastructure/irepositories/IUserRepository";
import type { IUser } from "@/domain/entities/User";
import type { ISale } from "@/domain/entities/Sale";
import { BASE_USERS } from "./constants/mocks";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateNumericId = (length: number = 10): string => {
  return Math.random().toString().slice(2, 2 + length);
};

export class MockUserRepository implements IUserRepository {

  private users = BASE_USERS;

  async getAll(): Promise<IUser[]> {
    await delay(500);
    const usersList = this.users;
    if (usersList){
      return usersList;
    } else {
      throw new Error("Usuários não encontrados");
    }
  }

  async getByUid(userId: string): Promise<IUser> {
    await delay(800);
    const usersList = this.users;
    const retrievedUser = usersList.find(u => u.id === userId);
    if (retrievedUser) {
      return retrievedUser
    } else{
      throw new Error("Usuário não foi encontrado");
    }
  }

  async save(user: IUser): Promise<IUser> {
    await delay(500);
    const newUser = { ...user, id: generateNumericId(10) };
    this.users.push(newUser);
    return newUser;
  }

  async updateSalesById(userId: string, newSale: ISale): Promise<IUser> {
    await delay(500);
    const usersList = this.users;
    const retrievedUser = usersList.find(u => u.id === userId);
    if (retrievedUser) {
      retrievedUser.sales?.push(newSale);
      return retrievedUser
    } else{
      throw new Error("Erro ao realizar push de venda.");
    }
  }
}