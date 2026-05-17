import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { IUser } from '@/domain/entities/User'
import AvatarLogo from './ui/avatar-logo'
import { MdOutlineEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";

interface UserInfoCardProps {
  user?: IUser
}

const UserInfoCard = ({user} : UserInfoCardProps) => {

  const createdAt = user?.createdAt.toLocaleDateString('pt-BR')

  if (!user) {
    return (
      <Card className='w-full h-full justify-center items-center p-8'>
        Carregando usuário
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex flex-col items-center gap-3'>
          <div className='w-25 h-25'>
            <AvatarLogo pfpUrl={user.pfpUrl}/>
          </div>
          <h1 className='text-xl text-black'>
            {user.name}
          </h1>
        </CardTitle>        
      </CardHeader>
      <CardContent className='flex flex-col gap-4 text-gray-600'>
        <div className='flex justify-center items-center w-fit gap-4'>
          <span className='flex gap-2 justify-center items-center'>
            <MdOutlineEmail/>
            <h4>
              {user.email}
            </h4>
          </span>
        </div>
        <div className='flex justify-center items-center w-fit gap-4'>
          <span className='flex gap-2 justify-center items-center'>
            <FaRegCalendar/>
            <h4>
              {createdAt}
            </h4>
          </span>
        </div>
        <hr />
      </CardContent>
      <CardFooter>
        <span className='flex flex-row w-full justify-between'>
          <h4 className='text-gray-700'>
            Total de ingressos: 
          </h4>
          <h4 className='text-black'>
            {user.sales?.length}
          </h4>
        </span>
      </CardFooter>
    </Card>
  )
}

export default UserInfoCard
