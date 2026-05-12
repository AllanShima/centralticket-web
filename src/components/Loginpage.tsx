import React, { useState, type ReactEventHandler, type SubmitEvent } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Logo from './ui/Logo'
import { IoEnterOutline } from "react-icons/io5";
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router'

const Loginpage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    // Lógica de autenticar novo usuário
    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
        } catch (error) {   
            toast.error("Algum erro inexplicavel ocorreu...", {description: String(error)});
        } finally {
            setLoading(false);
            navigate('/home');
        }
    }

    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <Card className='flex-col w-fit h-fit shadow-xl'>
                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                    <CardHeader className='flex flex-col w-full justify-center items-center gap-4'>
                        <Logo isSquared={false} withTitle={false}/>
                        <CardTitle className='text-2xl'>Bem-vindo de volta!</CardTitle>
                        <CardDescription className='text-md'>Entre para comprar seus ingressos</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col w-full gap-5'>
                        <div className='flex-col w-full h-fit'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="email" className='text-md text-gray-800'>
                                    Email
                                </Label>
                                <Input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@exemplo.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col w-full h-fit'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="password" className='text-md text-gray-800'>
                                    Senha
                                </Label>
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type="password"
                                    placeholder="exemplo123"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col w-100 h-fit gap-5'>
                        <Button disabled={loading} type="submit" className="flex w-full h-fit">
                            <IoEnterOutline className='flex size-6'/>
                            <h2 className='font-medium text-lg'>
                                {loading ? 'Carregando...' : 'Entrar'}
                            </h2>
                        </Button>
                        <h3 className='flex gap-2 text-gray-600'>
                            Não tem uma conta? 
                            <a href="/register" className='text-purple-600'>Cadastre-se</a>
                        </h3>
                    </CardFooter>                        
                </form>
            </Card>       
        </div>
    )
}

export default Loginpage
