import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router'
import { useEvent } from './hooks/useEvents';
import EventInfoCard from './EventInfoCard';
import PurchaseDetailsCard from './PurchaseDetailsCard';
import type { ITicket } from '@/domain/entities/Ticket';
import { toast } from 'sonner';
import type { IUserTicket } from '@/domain/entities/UserTicket';
import { useMe } from './hooks/useAuth';

const Paymentpage = () => {
  const navigate = useNavigate();
  const { fetchMe, data: authData, loading: loadingMe} = useMe();

  // pega o parametro do id na url
  const { eventId } = useParams();
  const { fetchEventById, event, loading: loadingEvent } = useEvent();

  useEffect(() => {
    if (eventId){
      fetchEventById(eventId);
      fetchMe();
    } else{
      toast.error("Evento não encontrado!");
    }
  }, [])

  if (loadingMe) {
    return (
      <div>
        Carregando Usuário...
      </div>
    )
  }

  if (loadingEvent) {
    return (
      <div>
        Carregando Evento...
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full h-full p-8'>
      <button onClick={() => navigate('/home')} className='flex w-fit h-fit p-2 text-gray-600 hover:text-gray-800 transition gap-2 items-center'>
        <FaArrowLeft className='w-5 h-5'/>
        <p className='font-medium'>Voltar</p>
      </button>
      <div className='flex w-full h-full gap-2'>
        <div className='flex-1 w-1/2 h-full'>
          <EventInfoCard event={event}/>
        </div>
        <div className='flex-1 w-1/2 h-full'>
          <PurchaseDetailsCard authData={authData} event={event}/>
        </div>        
      </div>

    </div>
  )
}

export default Paymentpage
