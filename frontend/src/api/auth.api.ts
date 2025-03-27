import { AxiosResponse } from "axios"
import {httpClient} from "./index"


export const login = async (data: {email: string, password: string}):Promise<AxiosResponse> => {
    return httpClient.post(`/api/auth/login`, data);
}

export const logout = async (): Promise<AxiosResponse> => {
    return httpClient.get("/users/logout");
}

export const signUp = async (data: {email: string, password: string}): Promise<AxiosResponse> => {
    return httpClient.post("/api/auth/register", data);
}