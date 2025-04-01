import { API_KEY } from "../constants/apiKeys"
import { User } from "../models";
import { httpClient } from "./httpClient"

export const getUser = async (): Promise<User | undefined> => {
    const response = await httpClient.get<User | undefined>(API_KEY.user);
    return response.data;
}