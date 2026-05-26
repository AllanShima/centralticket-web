import type { MeDto } from "../Dtos/MeDto";
import type { RefreshTokenDto } from "../Dtos/RefreshTokenDto";
import type { IUser } from "../entities/User";
import type { LoginRequest } from "../requests/LoginRequest";
import type { RegisterRequest } from "../requests/RegisterRequest";

export interface IAuthRepository {
    login(credentials: LoginRequest): void;
    register(credentials: RegisterRequest): void;
    me(token: string): Promise<MeDto>;
    refreshToken(userId: string, refreshToken: string): Promise<RefreshTokenDto>;
}