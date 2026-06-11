import { useEffect, useState } from 'react';
import { EventRepository } from '@/infrastructure/repositories/EventRepository';
import type { IEvent } from '@/domain/entities/Event';
import type { UpdateEventDto } from '@/domain/Dtos/UpdateEventDto';
import type { EventStatusEnum } from '@/domain/enums/EventStatusEnum';
import { toast } from 'sonner';

const repo = new EventRepository();

export function useEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await repo.getAll();
      setEvents(data);
    } catch (error) {
      toast.error("Erro ao buscar eventos:", { description: String(error) });
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
      const data = await repo.getById(eventId);
      setEvent(data);
    } catch (error) {
      toast.error("Erro ao buscar evento por ID:", { description: String(error) });
      console.error("Erro ao buscar evento por ID:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchEventById, event, loading };
}

export function useSaveEvent() {
  const [loading, setLoading] = useState(false);

  const fetchSaveEvent = async (event: IEvent) => {
    try {
      setLoading(true);

      const storedToken = localStorage.getItem("@CentralTicket:accessToken");
      if (!storedToken) {
        throw new Error("Não há tokens guardados!");
      }

      const data = await repo.save(event, storedToken);
      toast.success("Evento criado com sucesso!");
      return data;
    } catch (error) {
      toast.error("Erro ao salvar novo evento:", { description: String(error) });
      console.error("Erro ao salvar novo evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSaveEvent, loading };
}

export function useUpdateEvent() {
  const [loading, setLoading] = useState(false);

  const fetchUpdateEvent = async (eventId: string, eventData: UpdateEventDto, token: string) => {
    try {
      setLoading(true);
      const data = await repo.updateEvent(eventId, eventData, token);
      toast.success("Evento atualizado com sucesso!");
      return data;
    } catch (error) {
      toast.error("Erro ao atualizar evento:", { description: String(error) });
      console.error("Erro ao atualizar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUpdateEvent, loading };
}

export function useUpdateEventStatus() {
  const [loading, setLoading] = useState(false);

  const fetchUpdateStatus = async (eventId: string, newStatus: EventStatusEnum, token: string) => {
    try {
      setLoading(true);
      const message = await repo.updateStatus(eventId, newStatus, token);
      toast.success(message);
      return message;
    } catch (error) {
      toast.error("Erro ao atualizar status do evento:", { description: String(error) });
      console.error("Erro ao atualizar status do evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUpdateStatus, loading };
}