import React from 'react'
import { Card, CardTitle } from './ui/card'
import type { IUser } from '@/domain/entities/User'

interface UserInfoCardProps {
  user?: IUser
}

const UserInfoCard = ({user} : UserInfoCardProps) => {
  if (!user) {
    return (
      <Card className='w-full h-full justify-center items-center p-8'>
        Carregando usuário
      </Card>
    )
  }

  return (
    <Card>
        <CardTitle>
            Informações do Usuário
        </CardTitle>
    </Card>
  )
}

export default UserInfoCard
