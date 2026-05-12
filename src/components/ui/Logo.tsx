import React from 'react'
import { LuTicket } from 'react-icons/lu'

interface LogoProps {
    isSquared: boolean,
    withTitle: boolean
}

const Logo = ({isSquared, withTitle}: LogoProps) => {
  return (
    <div className='flex w-fit h-fit items-center gap-2'>
        <span className={`flex w-15 h-15 bg-linear-to-r p-3 from-blue-500 to-purple-500 ${isSquared ? 'rounded-lg' : 'rounded-full'}`}>
            <LuTicket className='w-full h-full text-white'/>
        </span>
        {withTitle && (
            <h1 className='font-semibold text-2xl'>CentralTicket</h1>            
        )}
    </div>
  )
}

export default Logo
