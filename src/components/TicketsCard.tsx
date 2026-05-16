import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { ISale } from '@/domain/entities/Sale'
import { useEvent } from './hooks/useEvents'

interface TicketsCardProps {
    sale: ISale
}

const TicketsCard = ({sale} : TicketsCardProps) => {
    const { fetchEventById, event, loading: loadingEvent } = useEvent();

    useEffect(() => {
        if (sale.ticketSnapshot?.eventId) {
            fetchEventById(sale.ticketSnapshot?.eventId)
        }
    }, [sale])

    if (loadingEvent) {
        return (
            <div className='flex p-8 justify-center items-center'>
                Carregando ticket...
            </div>
        )
    }

    return (
        <Card className='flex flex-row hover:shadow-md transition'>
            <CardHeader>
                <img src={event?.imageUrl} alt={event?.title} className='w-full h-full'/>
            </CardHeader>
            <CardContent>
                <CardTitle>
                    {sale.ticketSnapshot?.title}
                </CardTitle>
            </CardContent>
        </Card>
    )
}

export default TicketsCard
