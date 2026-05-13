import React, { useState } from 'react'
import HomeHeader from './HomeHeader'
import HomeEventCard from './HomeEventCard'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { IoMdAdd } from "react-icons/io";
import NewEventModal from './NewEventModal'

const Homepage = () => {
    const [openModal, setOpenModal] = useState(false);
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
                            <NewEventModal setOpen={setOpenModal}/>
                        </Dialog>                    
                    </div>

                </div>
                {/* Cards de Eventos do Home */}
                <div className='grid w-full h-full grid-cols-4 gap-4 p-5'>
                    <HomeEventCard/>                
                    <HomeEventCard/>                
                </div>

            </div>
        </div>
    )
}

export default Homepage
