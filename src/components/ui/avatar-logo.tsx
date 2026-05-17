import React from 'react'
import { Avatar, AvatarImage } from './avatar'
import { FaRegUser } from "react-icons/fa";

interface AvatarLogoProps {
    pfpUrl?: string
}

const AvatarLogo = ({pfpUrl} : AvatarLogoProps) => {
    if (!pfpUrl) {
        return (
            <Avatar className='flex w-full h-full p-7 bg-linear-to-r from-blue-500 to-purple-500 justify-center items-center text-white'>
                <FaRegUser className='w-full h-full'/>
            </Avatar>
        )
    }
    return (
        <Avatar className='flex w-full h-full'>
            <AvatarImage
                src={pfpUrl}
                alt='Imagem de usuário'
            />
        </Avatar>
    )
}

export default AvatarLogo
