import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import UserInfoCard from './UserInfoCard';
import PurchasedTicketsCard from './PurchasedTicketsCard';
import { useAuth } from './hooks/AuthContext';
import { useSalesByUid } from './hooks/useSales';

const Profilepage = () => {
  const { user, loading: userLoading } = useAuth();
  const { fetchSales, sales, loading: salesLoading } = useSalesByUid();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Criamos uma função interna assíncrona
    const loadSales = async () => {
      if (user?.id) {
        await fetchSales(user.id);
      }
    };

    loadSales();
  }, [user]); // Adicionada a dependência boa prática

  if (userLoading) {
    return <div className="p-8">Carregando perfil...</div>;
  }

  return (
    <div className='flex flex-col w-full h-full p-8'>
      <button onClick={() => navigate('/home')} className='flex w-fit h-fit p-2 text-gray-600 hover:text-gray-800 transition gap-2 items-center'>
        <FaArrowLeft className='w-5 h-5'/>
        <p className='font-medium'>Voltar para Home</p>
      </button>
      <div className='flex flex-row w-full h-full gap-2'>
        <div className='w-1/2 h-full'>
          <UserInfoCard user={user ?? undefined}/>
        </div>
        <div className='flex-1 w-1/2 h-full'>
          {salesLoading ? (
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
