import React from 'react'
import HomeHeader from './HomeHeader'
import HomeEventCard from './HomeEventCard'

const Homepage = () => {
  return (
    <div className='flex flex-col w-full h-full'>
        <HomeHeader/>
        <div className='flex flex-col w-full h-full gap-4 my-5 p-4'>
            <div className='flex flex-col w-fit gap-4 text-gray-800'>
                <h2 className='font-semibold text-2xl w-fit'>
                    Eventos Disponíveis
                </h2>
                <p className='w-fit'>
                    Escolha seu próximo evento e garanta já os ingressos!
                </p>
            </div>
            {/* Cards de Eventos do Home */}
            <HomeEventCard/>
        </div>
    </div>
  )
}

export default Homepage
