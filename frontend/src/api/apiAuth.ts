import { AxiosResponse } from "axios"
import ApiService from "./apiService"


export const login = async (data: {email: string, password: string}):Promise<AxiosResponse> => {
    return ApiService.post(`/api/auth/login`, data);
}

export const logout = async (): Promise<AxiosResponse> => {
    return ApiService.get("/users/logout");
}

export const signUp = async (data: {email: string, password: string}): Promise<AxiosResponse> => {
    return ApiService.post("/api/auth/register", data);
}