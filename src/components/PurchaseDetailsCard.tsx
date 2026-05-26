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
import { useAddSale } from './hooks/useSales'
import { useUserByUid } from './hooks/useUsers'

interface PurchaseDetailsCardProps {
    ticket?: ITicket
}

const PurchaseDetailsCard = ({ticket} : PurchaseDetailsCardProps) => {
    const navigate = useNavigate();
    // const { user, loading: loadingUser } = useAuth();
    const { fetchUser, user, loading: loadingUser } = useUserByUid();
    const { fetchSave, loading: loadingSale } = useAddSale()

    useEffect(() => {
        fetchUser('5r432532');
    }, [])

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
            ticket: ticket,
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
                        defaultValue="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required/>
                    </div>
                </CardHeader>

                <CardContent className='flex flex-col gap-2 w-full h-full text-slate-800'>
                    <Label className="text-base font-semibold text-slate-700">
                        Método de Pagamento
                    </Label>
                    
                    <RadioGroup 
                        defaultValue="credit_card" 
                        value={purchaseOption} 
                        onValueChange={(value) => setPurchaseOption(value as "credit_card" | "debit_card" | "pix")}
                        className="flex flex-col gap-2 w-full"
                    >
                        {/* Opção: Cartão de Crédito */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value="credit_card" id="r1" className="text-teal-600" />
                            <FaRegCreditCard className="text-xl text-slate-600" />
                            <Label htmlFor="r1" className='w-full font-medium text-base cursor-pointer py-1'>
                                Cartão de Crédito
                            </Label>  
                        </div>

                        {/* Opção: Cartão de Débito */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value="debit_card" id="r2" className="text-teal-600" />
                            <FaRegCreditCard className="text-xl text-slate-600" />
                            <Label htmlFor="r2" className='w-full font-medium text-base cursor-pointer py-1'>
                                Cartão de Débito
                            </Label>
                        </div>

                        {/* Opção: PIX */}
                        <div className="flex items-center gap-2 w-full p-4 outline outline-slate-200 rounded-xl transition-all">
                            <RadioGroupItem value="pix" id="r3" className="text-teal-600" />
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
                            R$ {((ticket?.price ?? 0) * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <span className='flex flex-row w-full h-fit justify-between'>
                        <h4>
                            Total
                        </h4>
                        <h4>
                            R$ {((ticket?.price ?? 0) * quantity).toFixed(2)}
                        </h4>
                    </span>
                    <Button type='submit' className='w-full h-full my-2' disabled={loadingSale}>
                        <FaRegCreditCard/>
                        {loadingSale ? "Carregando..." : "Finalizar Compra"}
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
