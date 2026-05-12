import React from 'react'
import { type IEvent } from '../domain/entities/Event';

interface HomeEventCardProps {
  event?: IEvent
}

const HomeEventCard = ({event} : HomeEventCardProps) => {

  const title = event?.title || "undefined";
  const description = event?.description || "undefined";
  const status = event?.status || "undefined";
  const price = event?.price || "undefined";
  const start_date = event?.start_date || "undefined";
  const location = event?.location || "undefined";
  const imageUrl = event?.imageUrl || "undefined";

  return (
    <div>
      
    </div>
  )
}

export default HomeEventCard
