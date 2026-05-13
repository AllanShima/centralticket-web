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
  event?: IEvent
}

const HomeEventCard = ({event} : HomeEventCardProps) => {

  const navigate = useNavigate();

  const title = event?.title || "undefined";
  const description = event?.description || "undefined";
  const status = event?.status || "undefined";
  const price = event?.price || "undefined";
  const start_date = event?.start_date || "undefined";
  const location = event?.location || "undefined";
  const imageUrl = event?.imageUrl || "undefined";

  return (
    <Card className='relative mx-auto w-full max-w-sm pt-0 rounded-2xl shadow-lg'>
      <div className='absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl'/>
      {imageUrl !== 'undefined' ? (
      <img 
      className="relative z-20 aspect-video w-full object-cover dark:brightness-40 rounded-t-2xl"
      src={imageUrl} />
      ) : (
        <div className='relative flex z-20 aspect-video w-full object-cover h-full justify-center items-center'>
          [Imagem não encontrada]
        </div>
      )}
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{status}</Badge>
        </CardAction>
        <CardTitle className='w-fit'>
          {title}
        </CardTitle>
        <CardDescription className='w-fit'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3 text-gray-600'>
        {/* Data de inicio do evento */}
        <span className='flex justify-center items-center w-fit gap-2'>
          <FaRegCalendar/>
          <h4>{start_date.toString()}</h4>
        </span>
        {/* Localização do evento */}
        <span className='flex justify-center items-center w-fit gap-2'>
          <HiOutlineLocationMarker/>
          <h4>{location}</h4>
        </span>
      </CardContent>
      <hr />
      <CardFooter className='flex justify-between'>
        <div className='flex flex-col'>
          <CardDescription className='w-fit'>A partir de</CardDescription>
          <h3 className='w-fit'>{price}</h3>
        </div>
        <Button onClick={() => navigate('/payment', { state: { event } })} className="w-fit h-fit px-5 py-3">
          <BsCart3/>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeEventCard
