import type { MeDto } from "@/domain/Dtos/MeDto";
import type { RefreshTokenDto } from "@/domain/Dtos/RefreshTokenDto";
import type { IUser } from "@/domain/entities/User";
import type { IAuthRepository } from "@/infrastructure/irepositories/IAuthRepository";
import type { LoginRequest } from "@/domain/requests/LoginRequest";
import type { RegisterRequest } from "@/domain/requests/RegisterRequest";
import axios from "axios";

// Funções Request do Contexto de AUTH da Api

export class AuthRepository implements IAuthRepository {
    
    async register(credentials: RegisterRequest) {
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/Auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: {
                    value: credentials.name
                },
                email: {
                    value: credentials.email
                },
                password: {
                    value: credentials.password
                }
            }
        }
        try {
            await axios.request(options)
        } catch (error) {
            throw error;
        }
    }

    async login(credentials: LoginRequest) {
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/Auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email: {
                    value: credentials.email
                },
                password: {
                    value: credentials.password
                }
            }
        }
        
        try {
            const { data } = await axios.request(options)
            // data retorna um objeto com dois tokens
            // data = {
            //     "accessToken": "...",
            //     "refreshToken": "..."
            // }
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;
            // Salva o token no localStorage para manter o usuário logado
            localStorage.setItem("@CentralTicket:accessToken", accessToken);
            localStorage.setItem("@CentralTicket:refreshToken", refreshToken);
        } catch (error) {
            throw error;
        }
    }

    async me(token: string): Promise<MeDto>{
        // retorna
        // {
        //     id: string,
        //     name: string
        // }
        const options = {
            method: 'GET',
            url: 'https://localhost:7190/api/Auth/me',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.request(options)
            return data;
        } catch (error) {
            throw error
        }
    }

    async refreshToken(userId: string, refreshToken: string): Promise<RefreshTokenDto> {
        const options = {
            method: 'POST',
            url: 'https://localhost:7190/api/Auth/refresh-token',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        }

        try {
            const { data } = await axios.request(options)
            const newTokens: RefreshTokenDto = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }
            return newTokens;
        } catch (error) {
            throw error
        }
    }
}