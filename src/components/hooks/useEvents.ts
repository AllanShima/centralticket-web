import { useEffect, useState } from 'react';
import { MockEventRepository } from '@/infrastructure/mocks/MockEventRepository';
import type { IEvent } from '@/domain/entities/Event';
import { toast } from 'sonner';

// Instanciamos fora para não recriar a cada renderização
const repo = new MockEventRepository();

export function useEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await repo.getAll();  // é uma promise, ent precisa do try catch e await
      setEvents(data);
    } catch (error) {
      toast.error("Erro ao buscar eventos:", {description: String(error)});
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchEvents, events, loading };
}

export function useEvent() {
  const [event, setEvent] = useState<IEvent>();
  const [loading, setLoading] = useState(false);

  const fetchEventById = async (eventId: string) => {
    try {
      setLoading(true);
      const data = await repo.getById(eventId);  // é uma promise, ent precisa do try catch e await
      setEvent(data);
    } catch (error) {
      toast.error("Erro ao buscar evento por ID:", {description: String(error)});
      console.error("Erro ao buscar evento por ID:", error);
    } finally {
      setLoading(false);
    }
  };

  return {fetchEventById, event, loading };
}

export function useSaveEvent() {
  const [loading, setLoading] = useState(false);

  const fetchSaveEvent = async (event: IEvent) => {
    try {
      setLoading(true);
      await repo.save(event);
    } catch (error) {
      toast.error("Erro ao salvar novo evento:", {description: String(error)});
      console.error("Erro ao salvar novo evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSaveEvent, loading };
}