import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, signIn } from "../api/user.api";
import * as tokenStore from "./token.store";
import { QUERY_KEY } from "../constants/queryKeys";

export function useAuth() {

    const queryClient = useQueryClient();


    const signInMutation = () => {
        return useMutation({
            mutationFn: signIn,
            onSuccess: (data) => {
                tokenStore.setToken(data.token);
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
            }
        })
    };

    const useUser = () => {
        return useQuery({
            queryKey: [QUERY_KEY.user],
            queryFn: getUser,
            enabled: !!tokenStore.getToken(),
        })
    };

    const signOutMutation = () => {
        

};