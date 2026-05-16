import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router'
import { useEvent } from './hooks/useEvents';
import EventInfoCard from './EventInfoCard';
import PurchaseDetailsCard from './PurchaseDetailsCard';
import type { ITicket } from '@/domain/entities/Ticket';
import { toast } from 'sonner';

const Paymentpage = () => {
  const generateNumericId = (length: number = 10): string => {
    return Math.random().toString().slice(2, 2 + length);
  };

  const { eventId } = useParams();
  const { fetchEventById, event, loading } = useEvent();

  const [ticket, setTicket] = useState({} as ITicket);

  useEffect(() => {
    if (!eventId){
      toast.error("Evento não encontrado!");
    } else{
      fetchEventById(eventId);
    }
  }, [eventId])
  
  useEffect(() => {
    const ticketInfo : ITicket = {
      id: generateNumericId(7),
      eventId: eventId || "",
      title: "Ingresso de " + event?.title,
      price: event?.price ?? 0,
      description: "Ingresso comprado e pronto pra ser usado!",
    }
    setTicket(ticketInfo);
  }, [event])

  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full h-full p-8'>
      <button onClick={() => navigate('/home')} className='flex w-fit h-fit p-2 text-gray-600 hover:text-gray-800 transition gap-2 items-center'>
        <FaArrowLeft className='w-5 h-5'/>
        <p className='font-medium'>Voltar</p>
      </button>
      <div className='flex flex-row w-full h-full gap-2'>
        <div className='w-1/2 h-full'>
          <EventInfoCard event={event}/>
        </div>
        <div className='flex-1 w-1/2 h-full'>
          <PurchaseDetailsCard ticket={ticket}/>
        </div>        
      </div>

    </div>
  )
}

export default Paymentpage
