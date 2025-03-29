import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../api/index"
import { QUERY_KEY } from "../constants/queryKeys";
import { ResponseError } from "../utils/Errors/ResponseError";
import { queryClient } from "../react-query/client";
import { toast } from "react-toastify";
import * as userLocalStore from "./user.localstore"
import * as tokenStore from "./token.store"
import { useNavigate } from "react-router-dom";
import { useUser, getUser } from "./useUser";

type AuthResponse = {
    token: string;
}

async function signIn(data : {username: string, password: string}):Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(`/api/auth/login`, data);
    if(response.status === 401) {
        throw new ResponseError('Fail on sign in request', response);
    }
    return { token: response.data.token };
}

type IUseSignIn = UseMutateFunction<AuthResponse, unknown, {username: string, password: string}, unknown>


export function useSignIn():IUseSignIn {

    const navigate = useNavigate();

    const { mutate: signInMutation } = useMutation<AuthResponse, unknown, { username: string, password: string }, unknown>(
        {
            mutationFn: signIn,
            onSuccess: async (data) => {
                tokenStore.setToken(data.token);
                userLocalStore.removeUser();
                await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
                const user = await getUser();
                if (user) {
                    queryClient.setQueryData([QUERY_KEY.user], user);
                }
                navigate(user?.roles.some(role => role.name === "ADMIN") ? "/admin/products/list" : "/");
            },
            onError: () => {
                toast.error('Invalid username or password !');
            }
        },
    );

    return signInMutation;
     
}