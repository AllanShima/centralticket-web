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
import { useAuth } from './hooks/AuthContext'
import { useAddSale } from './hooks/useSales'

interface PurchaseDetailsCardProps {
    ticket?: ITicket
}

const PurchaseDetailsCard = ({ticket} : PurchaseDetailsCardProps) => {
    const { user, loading: loadingUser } = useAuth();
    const { fetchSave, loading: loadingSale } = useAddSale()

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [purchaseOption, setPurchaseOption] = useState<ISale['paymentMethod']>("credit_card");

    const [totalPrice, setTotalPrice] = useState(ticket?.price)

    useEffect(() => {
        if (ticket) {
            // Garante que se ticket.price for undefined, ele calcula com 0
            setTotalPrice((ticket.price ?? 0) * quantity);            
        }
    }, [quantity, ticket]);

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loadingUser) {
            return toast.error("Usuário ainda não carregado!");
        }

        const newSale: ISale = {
            userId: user?.id,
            ticketId: ticket?.id,
            ticketSnapshot: ticket,
            total: totalPrice,
            amount: quantity,
            orderNumber: user?.id + "123",
            status: 'pending',
            paymentMethod: purchaseOption,
            createdAt: new Date()
        }

        try {
            await fetchSave(newSale);
            toast.success("Compra realizada com sucesso!")
            navigate('/profile');
        } catch (error) {
            toast.error("Não foi possível processar o pagamento..", {description: String(error)});
        }
    }

    if (!ticket) {
        return (
            <Card className='w-full h-full p-4'>
                Carregando ingresso...
            </Card>
        );
    }

    return (
        <Card className='w-full shadow-lg'>
            <form className='w-full h-full' onSubmit={onSubmit}>
                <CardHeader className='w-full'>
                    <CardTitle className='w-fit text-start text-xl'>
                        Informações do Evento
                    </CardTitle>

                    <div className='w-full h-fit'>
                        <Label>
                            Quantidade de Ingressos
                        </Label>
                        <Input 
                        type='number' 
                        name='ticket_amount' 
                        defaultValue="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required/>
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col gap-3 w-full h-full text-gray-600'>
                    <Label>
                        Método de Pagamento
                    </Label>
                    <RadioGroup 
                    defaultValue="credit_card" 
                    value={purchaseOption} 
                    onValueChange={(value) => setPurchaseOption(value as "credit_card" | "debit_card" | "pix")}
                    className="w-full">
                        <div className="flex w-full h-fit outline-1  items-center gap-3">
                            <RadioGroupItem value="credit_card" id="r1"/>
                            <FaRegCreditCard/>
                            <Label htmlFor="r1" className='w-full h-full bg-amber-400'>Cartão de Crédito</Label>  
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="debit_card" id="r2" />
                            <Label htmlFor="r2">Cartão de Débito</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="pix" id="r3" />
                            <Label htmlFor="r3">Pix</Label>
                        </div>
                    </RadioGroup>
                </CardContent>

                <CardFooter className='flex flex-col w-full h-fit gap-2 '>
                    <hr/>
                    <span className='flex flex-row w-full h-fit justify-between'>
                        <h4>
                            Subtotal ({quantity.toString()}x) 
                        </h4>
                        <h4>
                            R$ {((ticket?.price ?? 0) * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <hr className='outline-1 border-1'/>
                    <span className='flex flex-row w-full h-fit justify-between'>
                        <h4>
                            Total
                        </h4>
                        <h4>
                            R$ {((ticket?.price ?? 0) * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <Button type='submit' className='w-full' disabled={loadingSale}>
                        <FaRegCreditCard/>
                        {loadingSale ? "Carregando..." : "Finalizar Compra"}
                    </Button>
                    <h4 className='text-gray-800'>Pagamento segudo e protegido por nós :D</h4>
                </CardFooter>                
            </form>

        </Card>
    )
}

export default PurchaseDetailsCard
