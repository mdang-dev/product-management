import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../api"
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "./token.store"
import { getUser } from "../api/user.api";

type AuthResponse = {
    token: string;
}

async function signIn(data : {username: string, password: string}):Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(`/api/auth/login`, data);
    return { token: response.data.token };
}

export function useSignIn() {

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: signIn,
            onSuccess: async (data) => {
                tokenStore.setToken(data.token);
                const user = await getUser();
                if (user) {
                    queryClient.setQueryData([QUERY_KEY.user], user);
                   }
                },
        },
    );
     
}