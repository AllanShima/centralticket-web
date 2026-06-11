import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import UserInfoCard from './UserInfoCard';
import PurchasedTicketsCard from './PurchasedTicketsCard';
import { useSalesByUserId, useUserByUid } from './hooks/useUsers';
import { useMe } from './hooks/useAuth';

const Profilepage = () => {
  const navigate = useNavigate();
  const { fetchMe, data: authData, loading: loadingAuth } = useMe();
  const { fetchUser, user: fetchedUser, loading: loadingUser } = useUserByUid();
  const { fetchSales, sales: fetchedSales, loading: loadingSales } = useSalesByUserId();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (authData?.id) {
      fetchUser(authData.id);
    }
  }, [authData]);

  useEffect(() => {
    if (fetchedUser?.id) {
      fetchSales(fetchedUser.id);
    }
  }, [fetchedUser]);

  // Se o login ou o usuário básico ainda estão carregando, bloqueia a tela inteira (normal)
  if (loadingAuth || loadingUser) {
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
          {/* Só renderiza se o usuário realmente existir, sem usar o "!" */}
          {fetchedUser ? (
            <UserInfoCard sales={fetchedSales} user={fetchedUser} />
          ) : (
            <div className="p-4 border rounded">Usuário não encontrado</div>
          )}
        </div>
        
        <div className='flex-1 w-full h-full'>
          {loadingSales ? (
            <div className="p-8 text-center">Carregando suas compras...</div>
          ) : fetchedSales ? (
            <PurchasedTicketsCard sales={fetchedSales} />
          ) : (
            <div className="p-4 border rounded">Nenhuma compra encontrada</div>
          )}
        </div>        
      </div>
    </div>
  )
}

export default Profilepage;