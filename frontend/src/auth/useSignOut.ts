import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../react-query/client";
import { QUERY_KEY } from "../constants/queryKeys";

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {

    const navigate = useNavigate();

    const onSignOut = useCallback(() => {
        queryClient.setQueryData([QUERY_KEY.user], null);
    }, [navigate, queryClient]);

    return onSignOut;
}