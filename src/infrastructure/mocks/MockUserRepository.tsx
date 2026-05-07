// src/infrastructure/mocks/MockTaskRepository.ts
import { ITask } from "../../domain/entities/ITask";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MockTaskRepository implements ITaskRepository {
  private tasks: ITask[] = [
    { id: '1', title: 'Setup project structure', isCompleted: true },
    { id: '2', title: 'Define domain interfaces', isCompleted: false },
    { id: '3', title: 'Implement mockup data', isCompleted: false },
  ];

  async getTasks(): Promise<ITask[]> {
    await delay(800); // Simulate 0.8s loading time
    return [...this.tasks];
  }

  async addTask(task: Omit<ITask, 'id'>): Promise<ITask> {
    await delay(500);
    const newTask = { ...task, id: Math.random().toString(36).substr(2, 9) };
    this.tasks.push(newTask);
    return newTask;
  }
}