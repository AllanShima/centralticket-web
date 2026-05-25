import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { ISale } from '@/domain/entities/Sale'
import { useEvent } from './hooks/useEvents'
import { FaRegCalendar } from 'react-icons/fa'
import { MdOutlineLocationOn } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { FaRegCreditCard } from "react-icons/fa6";

interface TicketsCardProps {
    sale: ISale
}

const TicketsCard = ({sale} : TicketsCardProps) => {
    const { fetchEventById, event, loading: loadingEvent } = useEvent();

    const dateOfPayment = sale.createdAt.toLocaleDateString('pt-BR');
    const price = sale.total?.toFixed(2) || "undefined";
    const start_date = event?.start_date.toLocaleDateString('pt-BR');
    const end_date = event?.end_date.toLocaleDateString('pt-BR');

    const payment_option = {
        'pix' : 'Pix',
        'credit_card': 'Cartão de Crédito',
        'debit_card': 'Cartão de Débito'
    }

    const payment = sale.paymentMethod ? payment_option[sale.paymentMethod] : "undefined";

    useEffect(() => {
        if (sale.ticket?.eventId) {
            fetchEventById(sale.ticket?.eventId)
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
        <Card className='flex flex-col w-full hover:shadow-md transition'>
            <div className='flex flex-row'> 
                <CardHeader className='flex w-80 h-fit'>
                    <div className='w-full h-35 overflow-hidden rounded-2xl'>
                        <img 
                        src={event?.imageUrl} 
                        className='w-full h-full object-cover'
                        alt={event?.title}/>                
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col w-full gap-3 text-gray-600'>
                    <CardTitle className='text-start text-xl text-black'>
                        {sale.ticket?.title}
                    </CardTitle>
                    {/* Datas */}
                    <div className='flex justify-center items-center w-fit gap-4'>
                        <span className='flex gap-2 justify-center items-center'>
                            <FaRegCalendar/>
                            <h4>
                                Começo: {start_date}
                            </h4>
                        </span>
                        <span className='flex gap-2 justify-center items-center'>
                            <FaRegCalendar/>
                            <h4>
                                Término: {end_date}
                            </h4>
                        </span>
                    </div>
                    <div className='flex justify-center items-center w-fit gap-4'>
                        <span className='flex gap-2 justify-center items-center'>
                            <MdOutlineLocationOn/>
                            <h4>
                                {event?.location}
                            </h4>
                        </span>
                    </div>
                    <div className='flex justify-center items-center w-fit gap-4'>
                        <span className='flex gap-2 justify-center items-center'>
                            <LuTicket/>
                            <h4>
                                {sale.amount} ingresso(s)
                            </h4>
                        </span>
                    </div>
                    <div className='flex justify-center items-center w-fit gap-4'>
                        <span className='flex gap-2 justify-center items-center'>
                            <FaRegCreditCard/>
                            <h4>
                                {payment}
                            </h4>
                        </span>
                    </div>
                    <hr />
                    <div className='flex w-full justify-between'>
                        <h4>
                            Total pago:
                        </h4>
                        <h4>
                            R$ {price}
                        </h4>
                    </div>
                </CardContent>
            </div>

            <CardFooter>
                <hr />
                <div className='w-full'>
                    <h4 className='w-full text-start text-gray-800'>
                        Comprado em: {dateOfPayment} 
                    </h4>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TicketsCard
