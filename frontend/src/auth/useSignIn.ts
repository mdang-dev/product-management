import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../api/index"
import { QUERY_KEY } from "../constants/queryKeys";
import { ResponseError } from "../utils/Errors/ResponseError";
import { queryClient } from "../react-query/client";
import { toast } from "react-toastify";
import * as tokenStore from "./token.store"

type AuthResponse = {
    token: string;
}

async function signIn(data : {email: string, password: string}):Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(`/api/auth/login`, data);
    if(response.status === 401) {
        throw new ResponseError('Fail on sign in request', response);
    }
    return { token: response.data.token };
}

type IUseSignIn = UseMutateFunction<AuthResponse, unknown, {email: string, password: string}, unknown>

export function useSignIn():IUseSignIn {
    
    const { mutate: signInMutation } = useMutation<AuthResponse, unknown, { email: string, password: string }, unknown>(
        {
            mutationFn: signIn,
            onSuccess: (data) => {
                tokenStore.setToken(data.token);
                queryClient.setQueriesData({queryKey: [QUERY_KEY.user]}, data);
            },
            onError: () => {
                toast.error('Invalid username or password !');
            }
        },
    );

    return signInMutation;
     
}