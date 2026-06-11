import type { ISale } from '@/domain/entities/Sale'
import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import { toast } from 'sonner'
import { IoTicketOutline } from "react-icons/io5";
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import TicketsCard from './TicketsCard';
import type { IUserSale } from '@/domain/entities/UserSale';

interface PurchasedTicketsCardProps {
    sales: IUserSale[]
}

const PurchasedTicketsCard = ({sales} : PurchasedTicketsCardProps) => {
    const navigate = useNavigate();
    if (!sales) {
        toast.error("Erro ao carregar os ingressos...");
        return (
            <Card className="flex w-full h-full justify-center items-center p-8">
                Erro ao carregar os ingressos do usuário...
            </Card>
        )
    }

    return (
        <Card className='flex p-8 shadow-lg'>
            <CardTitle className='w-full text-start text-xl'>
                Meus Ingressos
            </CardTitle>
            {sales.length === 0 ? (
                <CardContent className='flex flex-col p-15 gap-7 w-full h-full justify-center items-center'>
                    <IoTicketOutline className='w-18 h-18 text-gray-300'/>
                    <h4>Você ainda não comprou nenhum ingresso</h4>
                    <Button onClick={() => navigate('/home')}>
                        Ver Eventos
                    </Button>
                </CardContent>
            ) : (
                sales.map(s => (
                    <TicketsCard key={s.id} sale={s}/>
                ))
            )}
        </Card>
    )
}

export default PurchasedTicketsCard
