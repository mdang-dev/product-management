import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, signIn, signUp } from "../api/user.api";
import * as tokenStore from "./token.store"
import { QUERY_KEY } from "../constants/queryKeys";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useSignIn() {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: signIn,
            onSuccess: async (data) => {
                tokenStore.setToken(data.token);
                 queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
            },
        },
    );
}

export function useSignUp() {

    const navigate = useNavigate();
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success('Register successfully !');
            navigate('/auth/sign-in');
        },
        onError: () => {
            toast.error("Username or password already exists !");
        }
    });
}

export function useSignOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const onSignOut = useCallback(() => {
        tokenStore.clearToken();
        queryClient.removeQueries({queryKey: [QUERY_KEY.user]});
    }, [navigate, queryClient]);

    return onSignOut;
}

export function useUser() {
    const token = tokenStore.getToken();
    const {data: user, isLoading} = useQuery({
        queryKey: [QUERY_KEY.user], 
        queryFn: getUser,
        enabled: !!token,
    })

    return { user, isLoading };
}
