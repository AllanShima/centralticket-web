import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { IEvent } from '@/domain/entities/Event'
import { FaRegCalendar } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoTicketOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";

interface EventInfoCardProps {
    event : IEvent | undefined
}

const EventInfoCard = ({event} : EventInfoCardProps) => {

  const price = event?.price.toFixed(2) || "undefined";
  const start_date = event?.start_date.toLocaleDateString('pt-BR');
  const end_date = event?.end_date.toLocaleDateString('pt-BR');
    
  if (!event) {
    return (
        <Card className='w-full h-full p-4'>
            <CardTitle className='w-fit text-start'>
                Carregando evento...
            </CardTitle>
        </Card>
    )
  }
  return (
    <Card className='w-full h-full shadow-lg'>
        <CardHeader className='w-full'>
            <CardTitle className='w-fit text-start text-xl'>
                Informações do Evento
            </CardTitle>
            <div className='w-full h-48 overflow-hidden rounded-2xl'>
                <img 
                src={event.imageUrl} 
                className='w-full h-full object-cover'
                alt={event.title}/>                
            </div>
            <CardTitle className='text-start'>
                {event.title}
            </CardTitle>
            <CardDescription className='text-start'>
                {event.description}
            </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 w-full h-full text-gray-600'>
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
          <span className='flex justify-center items-center w-fit gap-2'>
            <HiOutlineLocationMarker/>
            <h4>{event.location}</h4>
          </span>
          <span className='flex justify-center items-center w-fit gap-2'>
            <IoTicketOutline/>
            <h4>Total: {event.amount_tickets} ingressos</h4>
          </span>
          <hr />
          <span className='flex justify-center items-center w-fit gap-2'>
            <IoTicketOutline/>
            <h4>Total restante: {event.remaining_tickets} ingressos</h4>
          </span>
          <div className='flex flex-row justify-between items-center w-full h-full p-4 outline-1 outline-purple-200 bg-purple-50 rounded-2xl'>
            <h4>Valor unitário</h4>
            <h4 className='text-gray-900 font-semibold'>R$ {price}</h4>
          </div>
        </CardContent>


    </Card>
  )
}

export default EventInfoCard
