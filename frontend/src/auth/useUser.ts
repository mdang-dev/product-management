import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../api/index"
import { User } from "../models/index"
import { ResponseError } from "../utils/Errors/ResponseError";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "./token.store"
import * as userLocalStore from "./user.localstore"
import { useEffect } from "react";

export async function getUser(): Promise<User | null> {
    const response = await httpClient.get<User>('/api/users/my-info');
    if(response.status === 401){
        throw new ResponseError('Fail on get user request', response);
    }
    return response.data;
}

type IUseUser = {
    user: User | null;
}

export function useUser(): IUseUser {
   const {data: user} = useQuery<User | null>({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStore.getUser,
    enabled: !!tokenStore.getToken
})

useEffect(() => {
    if(!user) userLocalStore.removeUser();
    else userLocalStore.saveUser(user);
}, [user])

return {
    user: user ?? null
 }
}