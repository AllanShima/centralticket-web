import React, { useEffect, useState, type SubmitEvent } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Button } from './ui/button'
import { FaRegCreditCard } from "react-icons/fa";
import { toast } from 'sonner'
import type { ITicket } from '@/domain/entities/Ticket'
import { useNavigate } from 'react-router'
import type { ISale } from '@/domain/entities/Sale'
import { useAuth } from './contexts/AuthContext'
import { useSalesByUserId, useUserByUid } from './hooks/useUsers'
import { useConfirmSale, useSaveSale } from './hooks/useSales'
import type { IEvent } from '@/domain/entities/Event'
import type { MeDto } from '@/domain/Dtos/MeDto'
import { PaymentMethodEnum } from '@/domain/enums/PaymentMethodEnum'
import type { CreateSaleDto } from '@/domain/Dtos/CreateSaleDto'
import type { TicketItemDto } from '@/domain/Dtos/TicketItemDto'
import { CategoryEnum } from '@/domain/enums/CategoryEnum'
import { KindEnum } from '@/domain/enums/KindEnum'

interface PurchaseDetailsCardProps {
    authData?: MeDto
    event?: IEvent
}

const PurchaseDetailsCard = ({authData, event} : PurchaseDetailsCardProps) => {

    const navigate = useNavigate();

    const { fetchSale, loading: loadingSale } = useSaveSale()
    const { fetchStatus, loading: loadingStatus} = useConfirmSale();

    if (!event) {
        return (
            <div>
                Erro ao carregar evento...
            </div>
        )
    }

    if (!authData) {
        return (
            <div>
                Erro ao carregar usuário...
            </div>
        )
    }

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(event.price);
    const [purchaseOption, setPurchaseOption] = useState<PaymentMethodEnum>(0);

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tickets: TicketItemDto[] = [];
        for (let i = 0; i < quantity; i++) {
            tickets.push({
                category: CategoryEnum.FullPrice,
                kind: KindEnum.Default
            })
        }

        const newSale: CreateSaleDto = {
            totalValue: totalPrice,
            paymentMethod: purchaseOption,
            userId: authData.id,
            eventId: event.id!,
            tickets: tickets
        }

        if (quantity > event.remaining_tickets!) {
            return toast.error("Quantidade maior do que o disponível...");
        }
        
        const salePromise = fetchSale(newSale) as unknown as Promise<ISale>;
        toast.promise(
            salePromise,
            {
                loading: 'Processando pagamento...',
                success: (sale: ISale) => {
                    <b>Compra realizada com sucesso!</b>
                    toast.promise(
                        fetchStatus(sale.id!),
                        {
                            loading: 'Confirmando venda realizada...',
                            success: (data) => {
                                navigate('/profile');
                                return <b>Compra confirmada com sucesso!</b>
                            },
                            error: (error) => {
                                // Você também pode customizar o erro baseado no que o backend retornou, se quiser
                                return <b>Não foi possível confimar a compra: {String(error)}</b>;
                            },                        
                        }
                    )
                    // Retorna a mensagem que vai aparecer no Toast
                    return <b>Compra realizada com sucesso!</b>
                },
                error: (error) => {
                    // Você também pode customizar o erro baseado no que o backend retornou, se quiser
                    return <b>Não foi possível realizar a compra: {String(error)}</b>;
                },
            }
        );
    }

    useEffect(() => {
        if (quantity > 0) {
            setTotalPrice((event?.price ?? 0) * quantity);  
        }
    }, [quantity]);

    return (
        <Card className='flex w-full shadow-lg'>
            <form className='flex flex-col gap-3 w-full h-full' onSubmit={onSubmit}>
                <CardHeader className='w-full'>
                    <CardTitle className='w-fit text-start text-xl'>
                        Informações do Evento
                    </CardTitle>

                    <div className='flex flex-col w-full h-fit gap-4'>
                        <Label>
                            Quantidade de Ingressos
                        </Label>
                        <Input 
                        type='number' 
                        name='ticket_amount' 
                        min="1"
                        defaultValue="1"
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuantity(val < 1 ? 1 : val); // garante o valor minimo
                        }}
                        required/>
                    </div>
                </CardHeader>

                <CardContent className='flex flex-col gap-2 w-full h-full text-slate-800'>
                    <Label className="text-base font-semibold text-slate-700">
                        Método de Pagamento
                    </Label>
                    
                    <RadioGroup 
                        defaultValue={String(PaymentMethodEnum.Credit)} 
                        value={String(purchaseOption)}
                        onValueChange={(value) => setPurchaseOption(Number(value) as PaymentMethodEnum)}
                        className="flex flex-col gap-2 w-full"
                    >
                        {/* Opção: Cartão de Crédito */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value={String(PaymentMethodEnum.Credit)} id="r1" className="text-teal-600" />
                            <FaRegCreditCard className="text-xl text-slate-600" />
                            <Label htmlFor="r1" className='w-full font-medium text-base cursor-pointer py-1'>
                                Cartão de Crédito
                            </Label>  
                        </div>

                        {/* Opção: Cartão de Débito */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value={String(PaymentMethodEnum.Debit)} id="r2" className="text-teal-600" />
                            <FaRegCreditCard className="text-xl text-slate-600" />
                            <Label htmlFor="r2" className='w-full font-medium text-base cursor-pointer py-1'>
                                Cartão de Débito
                            </Label>
                        </div>

                        {/* Opção: PIX */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value={String(PaymentMethodEnum.Pix)} id="r3" className="text-teal-600" />
                            <Label htmlFor="r3" className='w-full font-medium text-base cursor-pointer py-1'>
                                PIX
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
                <hr/>
                <CardFooter className='flex flex-col w-full h-fit gap-4 text-gray-700'>
                    <span className='flex flex-row w-full h-fit justify-between'>
                        <h4>
                            Subtotal ({quantity.toString()}x) 
                        </h4>
                        <h4>
                            R$ {(totalPrice * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <span className='flex flex-row w-full h-fit justify-between'>
                        <h4>
                            Total
                        </h4>
                        <h4>
                            R$ {(totalPrice * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <Button type='submit' className='w-full h-full my-2' disabled={loadingSale}>
                        <FaRegCreditCard/>
                        {loadingSale || loadingStatus ? "Carregando..." : "Finalizar Compra"}
                    </Button>
                    <h4 className='text-gray-800'>
                        Pagamento seguro e protegido por nós!
                    </h4>
                </CardFooter>                
            </form>

        </Card>
    )
}

export default PurchaseDetailsCard
