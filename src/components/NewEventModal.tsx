import React, { useState, type SubmitEvent } from 'react'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DatePickerSimple } from './ui/popovercalendar'
import { toast } from 'sonner'

const NewEventModal = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const [loading, setLoading] = useState(false);
    
    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Captura os dados do formulário
        const formData = new FormData(event.currentTarget);
        
        // Converte para um objeto simples
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            setLoading(true);

            // Função pra guardar o novo evento

            toast.success("Novo evento adicionado!");
            setOpen(false);

        } catch (error) {
            toast.error("Um erro ocorreu...", {description: String(error)})
        } finally {
            setLoading(false);
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
                <FieldGroup className='flex w-full my-5'>
                    <Field className='flex flex-row'>
                        <span>
                            <DatePickerSimple date={startDate} setDate={setStartDate} label='Início'/>
                        </span>
                        <span>
                            <DatePickerSimple date={endDate} setDate={setEndDate} label='Fim'/>
                        </span>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='destructive'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button variant='outline' disabled={loading} type="submit">
                        {loading ? "Salvando..." : "Criar Evento"}
                    </Button>         
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default NewEventModal
