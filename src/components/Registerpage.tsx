import React, { useState, type SubmitEvent } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './ui/Logo'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { IoEnterOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useSaveUser } from './hooks/useUsers'
import type { IUser } from '@/domain/entities/User'

const Registerpage = () => {
  const { fetchSaveUser, loading: userLoading } = useSaveUser();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Lógica de registrar novo usuário
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Senhas não conferem!");
    }

    const newUser: IUser = {
      name: name,
      email: email,
      password: password, // Opcional dependendo de onde for usada (ex: frontend)
      sales: [],
      createdAt: new Date
    }

    try {
      await fetchSaveUser(newUser);

      // Autenticação do usuário

      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {   
      toast.error("Algum erro inexplicavel ocorreu...", {description: String(error)});
    } finally {
      navigate('/login'); 
    }
  }

  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
        <Card className='flex-col w-fit h-fit shadow-xl'>
                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                  <CardHeader className='flex flex-col w-full justify-center items-center gap-4'>
                    <Logo isSquared={false} withTitle={false}/>
                    <CardTitle className='text-2xl'>Seja bem-vindo!</CardTitle>
                    <CardDescription className='text-md'>Cadastre para comprar seus ingressos</CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col w-full gap-5'>
                    <div className='flex-col w-full h-fit'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="name" className='text-md w-fit text-gray-800'>
                              Nome
                            </Label>
                            <Input 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              id="name"
                              type="name"
                              placeholder="João Freire"
                              required
                            />
                        </div>
                    </div>
                    <div className='flex-col w-full h-fit'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="email" className='text-md w-fit text-gray-800'>
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
                            <Label htmlFor="password" className='text-md w-fit text-gray-800'>
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
                    <div className='flex flex-col w-full h-fit'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor="password" className='text-md w-fit text-gray-800'>
                                Confirmar Senha
                            </Label>
                            <Input 
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              id="password"
                              type="password"
                              placeholder="exemplo123"
                              required
                            />
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-col w-100 h-fit gap-5'>
                      <Button disabled={userLoading} type="submit" className="flex w-full h-fit">
                        <IoEnterOutline className='flex size-6'/>
                        <h2 className='font-medium text-lg'>
                          {userLoading ? 'Carregando...' : 'Cadastrar'}
                        </h2>
                      </Button>
                      <h3 className='flex gap-2 text-gray-600'>
                        Já possui uma conta?
                        <a href="/login" className='text-purple-600'>Entre</a>
                      </h3>
                  </CardFooter>
                </form>
        </Card>        
    </div>
  )
}

export default Registerpage
