import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "./token.store"
import {signIn } from "../api/user.api";

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