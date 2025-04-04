import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "./token.store"
import { useQueryClient } from "@tanstack/react-query";

export function useSignOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const onSignOut = useCallback(() => {
        tokenStore.clearToken();
        queryClient.removeQueries({queryKey: [QUERY_KEY.user]});
    }, [navigate, queryClient]);

    return onSignOut;
}