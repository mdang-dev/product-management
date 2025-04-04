import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../api/user.api";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "../auth/token.store"

export function useUser() {

    const token = tokenStore.getToken();
    const {data: user} = useQuery({
        queryKey: [QUERY_KEY.user], 
        queryFn: getUser,
        enabled: !!token,
    })

    return { user };
}
