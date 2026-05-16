// src/infrastructure/mocks/MockTaskRepository.ts
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { IUser } from "@/domain/entities/User";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateNumericId = (length: number = 10): string => {
  return Math.random().toString().slice(2, 2 + length);
};

export class MockUserRepository implements IUserRepository {
  private users: IUser[] = []

  async getByUid(userId: string): Promise<IUser> {
    await delay(800); // Simulate 0.8s loading time
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
}