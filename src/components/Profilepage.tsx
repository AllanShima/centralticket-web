import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import UserInfoCard from './UserInfoCard';
import PurchasedTicketsCard from './PurchasedTicketsCard';
import { useAuth } from './contexts/AuthContext';
import { useSalesByUid } from './hooks/useSales';
import { useUserByUid } from './hooks/useUsers';

const Profilepage = () => {
    const navigate = useNavigate();
  // const { user, loading: userLoading } = useAuth();
  const { fetchUser, user, loading: userLoading } = useUserByUid();

  useEffect(() => {
    fetchUser('5r432532');
  }, [])

  const sales = user?.sales ? user.sales : [];

  if (userLoading) {
    return <div className="p-8">Carregando perfil...</div>;
  }

  return (
    <div className='flex flex-col w-full h-full p-8 overflow-auto'>
      <button onClick={() => navigate('/home')} className='flex w-fit h-fit p-2 text-gray-600 hover:text-gray-800 transition gap-2 items-center'>
        <FaArrowLeft className='w-5 h-5'/>
        <p className='font-medium'>Voltar para Home</p>
      </button>
      <div className='flex flex-row w-full h-full gap-2'>
        <div className='w-1/3 h-full'>
          <UserInfoCard user={user ?? undefined}/>
        </div>
        <div className='flex-1 w-full h-full'>
          {userLoading ? (
            <div>Carregando ingressos...</div>
          ) : (
            <PurchasedTicketsCard sales={sales}/>
          )}
        </div>        
      </div>
    </div>
  )
}

export default Profilepage
