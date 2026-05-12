import React from 'react'
import { LuTicket } from "react-icons/lu";
import { useNavigate } from 'react-router';
import { FaRegUser } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import Logo from './ui/Logo';

const HomeHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    }
    return (
        <div className='flex w-full h-fit shadow-md justify-between bg-white p-5'>
            {/* Logo */}
            <Logo isSquared={true} withTitle={true}/>
            <div className='flex w-fit h-fit gap-5'>
                <button onClick={() => navigate('/profile')} className='flex p-3 hover:bg-gray-100 font-medium gap-2 items-center rounded-xl transition'>
                    <FaRegUser className='w-6 h-6'/>
                    <h2>[Usuario]</h2>
                </button>
                <button onClick={() => handleLogout()} className='flex p-3 hover:bg-red-100 font-medium gap-2 text-red-700 items-center rounded-xl transition'>
                    <BiExit className='w-6 h-6'/>
                    <h2>Sair</h2>
                </button>
            </div>
        </div>
    )
}

export default HomeHeader
