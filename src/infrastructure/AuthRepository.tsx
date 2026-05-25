import type { IUser } from "@/domain/entities/User";
import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";
import type { LoginRequest } from "@/domain/requests/LoginRequest";
import type { RegisterRequest } from "@/domain/requests/RegisterRequest";
import axios from "axios";

// Configuração do axios
const api = axios.create({
    baseURL: "https://localhost:7190/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // Busca o token salvo no localStorage (use a mesma chave do login)
        const token = localStorage.getItem("@CentralTicket:token");
        if (token) {
            // Injeta o token dinamicamente no cabeçalho de autorização
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
        var token = '';
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
            token = data;
            // Salva o token no localStorage para manter o usuário logado
            localStorage.setItem("@CentralTicket:token", token);
        } catch (error) {
            throw error;
        }
    }

    async me(token: string): Promise<Object>{
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
}