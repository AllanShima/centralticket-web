import React, { useState, type Dispatch, type SetStateAction, type SubmitEvent } from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DatePickerSimple } from './ui/popovercalendar'
import { toast } from 'sonner'
import type { IEvent } from '@/domain/entities/Event'
import { useSaveEvent } from './hooks/useEvents'

    // id: string;
    // title: string;
    // description: string;
    // status: 'available' | 'shortly' | 'soldout';
    // price: number;
    // start_date: Date;
    // end_date: Date;
    // location: string;
    // imageUrl: string;
    // amount_tickets: number;
    // remaining_tickets: number;
    // createdAt: Date;

interface NewEventModalProps {
    setOpen: (open: boolean) => void,
    setEvents: Dispatch<SetStateAction<IEvent[]>>;
}

const NewEventModal = ({ setOpen, setEvents }: NewEventModalProps) => {
    const { fetchSaveEvent, loading: loadingEvent } = useSaveEvent();
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    
    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Captura os dados do formulário
        const formData = new FormData(event.currentTarget);
        
        // Converte para um objeto simples
        const data = Object.fromEntries(formData.entries());

        const newEvent: IEvent = {
            title: String(data.name || ""), // Matches <Input name='name' ... />
            description: String(data.description || ""),
            location: String(data.location || ""),
            imageUrl: String(data.imageUrl || ""),
            price: Number(data.price || 0),
            start_date: startDate,
            end_date: endDate,
            amount_tickets: Number(data.amount_tickets || 0)
        }

        const isPeriodValid = endDate > startDate;

        const isStartDateValid = startDate > new Date();

        try {

            if (!isPeriodValid) {
                throw new Error("A data de término deve ser posterior à data de início!");
            }
            if (!isStartDateValid) {
                throw new Error("A data de início deve ser posterior à hoje!");
            }
            
            const savedEvent = await fetchSaveEvent(newEvent); // salva no 'banco'

            if (!savedEvent) {
                throw new Error("Falha do retorno do novo evento salvo.");
            }

            setEvents((prev) => [...prev, savedEvent]); // salva na lista

            toast.success("Novo evento adicionado!");
            setOpen(false);

        } catch (error) {
            toast.error("Um erro ocorreu...", {description: String(error)})
        }
    }
    return (
        <DialogContent>
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>
                        Adicionar novo evento
                    </DialogTitle>
                    <DialogDescription>
                        Preencha as informações do evento
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                    <Field>
                        <Label>Título</Label>
                        <Input name='name' defaultValue='Festival de Música...' required/>
                    </Field>
                    <Field>
                        <Label>Descrição</Label>
                        <Input name='description' defaultValue='O maior festival de rock do ano...' required/>
                    </Field>
                    <Field>
                        <Label>Localização</Label>
                        <Input name='location' defaultValue='Zona Sul de SP...' required/>
                    </Field>
                    <Field>
                        <Label>Url da Imagem</Label>
                        <Input name='imageUrl' required/>
                    </Field>
                </FieldGroup>

                {/* Quantidade e Preco por ticket */}
                <FieldGroup className='flex flex-row w-full justify-between my-5'>
                    <Field className='flex flex-col w-1/2'>
                        <Label>Ingressos disponíveis</Label>
                        <Input type='number' name='amount_tickets' required/>
                    </Field>
                    <Field className='flex flex-col w-1/2'>
                        <Label>Preço por ticket</Label>
                        <Input 
                            placeholder="0.00"
                            step="0.01"
                            type="number"
                            name='price' 
                            required
                        />
                    </Field>
                </FieldGroup>
                <FieldGroup className='flex flex-row w-full justify-between my-5'>
                    <Field className='flex flex-col w-1/2'>
                        <Label className="flex mx-auto px-0 w-full h-fit text-start">Data inicio</Label>
                        <DatePickerSimple date={startDate} setDate={setStartDate} label='Início'/>
                    </Field>
                    <Field className='flex flex-col w-1/2'>
                        <Label>Data fim</Label>
                        <DatePickerSimple date={endDate} setDate={setEndDate} label='Fim'/>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='destructive'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button variant='outline' disabled={loadingEvent} type="submit">
                        {loadingEvent ? "Salvando..." : "Criar Evento"}
                    </Button>         
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default NewEventModal
