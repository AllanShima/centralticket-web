import React from 'react'
import { useAuth } from '../hooks/AuthContext';
import { toast } from 'sonner';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children} : ProtectedRouteProps) => {
    const { user, loading } = useAuth() // dados do contexto de autenticação do usuário
    if (loading) return <p>Carregando...</p>;

    if (!user) {
        toast.error("Você precisa estar logado para ver esta página!");
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
    }

export default ProtectedRoute
