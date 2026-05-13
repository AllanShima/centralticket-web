import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router'

const Paymentpage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full h-full p-8'>
      <button onClick={() => navigate('/home')} className='flex w-fit h-fit p-2 text-gray-600 hover:text-gray-800 transition gap-2 items-center'>
        <FaArrowLeft className='w-5 h-5'/>
        <p className='font-medium'>Voltar</p>
      </button>
    </div>
  )
}

export default Paymentpage
