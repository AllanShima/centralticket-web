import React from 'react'
import { type IEvent } from '../domain/entities/Event';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BsCart3 } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from 'react-router';

interface HomeEventCardProps {
  event: IEvent | undefined
}

const HomeEventCard = ({event} : HomeEventCardProps) => {

  const navigate = useNavigate();

  const price = event?.price.toFixed(2) || "undefined";
  const start_date = event?.start_date.toLocaleDateString('pt-BR');

  const statusTranslated = {
    "available": "disponível",
    "shortly": "em breve",
    "soldout": "esgotado"
  }

  if (!event) {
    return (
      <Card>
        <CardTitle>
          Evento não encontrado...
        </CardTitle>
      </Card>
    )
  }

  return (
    <Card className='relative mx-auto w-full h-full max-w-sm pt-0 rounded-2xl shadow-lg'>
          <div className='absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl'/>
          <img 
          className="relative z-20 aspect-video w-full object-cover dark:brightness-40 rounded-t-2xl"
          src={event.imageUrl} />
          <CardHeader className='w-full h-full'>
            <CardAction>
              <Badge variant="secondary">
                {statusTranslated[event.status]}
              </Badge>
            </CardAction>
            <CardTitle className='w-fit h-full'>
              {event.title}
            </CardTitle>
            <CardDescription className='w-fit h-full text-start'>
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col h-full gap-3 text-gray-600'>
            {/* Data de inicio do evento */}
            <span className='flex justify-center items-center w-fit gap-2'>
              <FaRegCalendar/>
              <h4>
                {start_date}
              </h4>
            </span>
            {/* Localização do evento */}
            <span className='flex justify-center items-center w-fit gap-2'>
              <HiOutlineLocationMarker/>
              <h4>{event.location}</h4>
            </span>
          </CardContent>
          <hr />
          <CardFooter className='flex justify-between'>
            <div className='flex flex-col'>
              <CardDescription className='w-fit'>
                A partir de
              </CardDescription>
              <h3 className='w-fit'>
                R$ {price}
              </h3>
            </div>
            {event.status === "available" ? (
              <Button onClick={() => navigate(`/payment/${event?.id}`)} className="w-fit h-fit px-5 py-3">
                <BsCart3/>
                Comprar
              </Button>
            ) : (
              <Button disabled variant="ghost" className="w-fit h-fit px-5 py-3">
                <BsCart3/>
                Esgotado
              </Button>
            )}

          </CardFooter>
      </Card>

  )
}

export default HomeEventCard
