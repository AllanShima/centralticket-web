import React, { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import HomeEventCard from './HomeEventCard'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { IoMdAdd } from "react-icons/io";
import NewEventModal from './NewEventModal'
import { useEvents } from './hooks/useEvents'
import type { IEvent } from '@/domain/entities/Event'
import * as motion from "motion/react-client"
import { useMe } from './hooks/useAuth'

const Homepage = () => {
    const { fetchEvents, events : fetchedEvents, loading: loadingEvents } = useEvents();
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (fetchedEvents) {
            setEvents(fetchedEvents);
        }
    }, [fetchedEvents]);

    const [openModal, setOpenModal] = useState(false);

    // animação para os cards de eventos
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
            staggerChildren: 0.1
            }
        }
    }
    const item = {
        hidden: { opacity: 0, scale: 0.95, y: 50 },
        show: { opacity: 1, scale: 1,  y: 0 }
    }

    if (loadingEvents) {
        return (
            <div className='text-black'>
                Carregando Eventos...
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full h-full overflow-auto'>
            <HomeHeader/>
            <div className='flex flex-col w-full h-full gap-4 my-10 scroll-auto'>
                <div className='flex w-full justify-between text-gray-800 px-4'>
                    <div className='flex flex-col w-fit gap-4 '>
                        <h2 className='font-semibold text-2xl w-fit'>
                            Eventos Disponíveis
                        </h2>
                        <p className='w-fit'>
                            Escolha seu próximo evento e garanta já os ingressos!
                        </p>                    
                    </div>
                    {/* Adicionar Evento */}
                    <div className='flex'>
                        <Dialog open={openModal} onOpenChange={setOpenModal}>
                            <DialogTrigger asChild>
                                <Button>
                                    <IoMdAdd/>
                                </Button>
                            </DialogTrigger>
                            <NewEventModal setOpen={setOpenModal} setEvents={setEvents}/>
                        </Dialog>                    
                    </div>

                </div>
                {/* Cards de Eventos do Home */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className='grid w-full h-full grid-cols-4 gap-4 p-5'>

                    {events.map(event => (
                        <motion.div variants={item} key={event.id}>
                            <HomeEventCard event={event}/>                                
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}

export default Homepage
