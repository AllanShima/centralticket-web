import type { IEvent } from "@/domain/entities/Event";
import type IEventRepository from "@/infrastructure/irepositories/IEventRepository";
import { BASE_EVENTS } from "./constants/mocks";

// Helper to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateNumericId = (length: number = 10): string => {
  return Math.random().toString().slice(2, 2 + length);
};

export class MockEventRepository implements IEventRepository {

  private events = BASE_EVENTS;

  async getAll(): Promise<IEvent[]> {
    await delay(800); // Simulate 0.8s loading time
    return [...this.events];
  }

  async save(event: IEvent): Promise<IEvent> {
    await delay(500);
    const newEvent = { ...event, id: generateNumericId(10) };
    this.events.push(newEvent);
    return newEvent;
  }

  async getById(eventId: string): Promise<IEvent> {
    await delay(500);

    const retrievedEvent = this.events.find(event => event.id === eventId);

    if (retrievedEvent) {
      return retrievedEvent;
    }
    
    throw new Error(`Event with ID ${eventId} not found!`);
  }
}