import { AxiosResponse } from "axios";
import { API_KEY } from "../constants/apiKeys"
import { User } from "../models";
import { httpClient } from "./httpClient"

export const getUser = async (): Promise<User | undefined> => {
    const response = await httpClient.get<User | undefined>(API_KEY.user);
    return response.data;
}

export const signIn = async (data: { username: string; password: string }): Promise<{ token: string }> => {
    const response = await httpClient.post<{ token: string }>(API_KEY.auth.signIn, data);
    return response.data;
}

export const signUp = async (data: { username: string; password: string }): Promise<AxiosResponse> => {
    const response = await httpClient.post<AxiosResponse>(API_KEY.auth.signUp, data);
    return response;
}

export const signOut = async (): Promise<AxiosResponse> => {
    const response = await httpClient.post<AxiosResponse>(API_KEY.auth.signOut);
    return response;
}