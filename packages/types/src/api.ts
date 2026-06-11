import type { User } from "./user";

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}