import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "./token.store"
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "./user.store";

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearUser = useUserStore((state) => state.clearUser);
    const onSignOut = useCallback(() => {
        tokenStore.clearToken();
        clearUser();
        queryClient.setQueryData([QUERY_KEY.user], null);
    }, [navigate, queryClient]);

    return onSignOut;
}