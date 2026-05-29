import type { MeDto } from "../../domain/Dtos/MeDto";
import type { RefreshTokenDto } from "../../domain/Dtos/RefreshTokenDto";
import type { IUser } from "../../domain/entities/User";
import type { LoginRequest } from "../../domain/requests/LoginRequest";
import type { RegisterRequest } from "../../domain/requests/RegisterRequest";

export interface IAuthRepository {
    login(credentials: LoginRequest): void;
    register(credentials: RegisterRequest): void;
    me(token: string): Promise<MeDto>;
    refreshToken(userId: string, refreshToken: string): Promise<RefreshTokenDto>;
}