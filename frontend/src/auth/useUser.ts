import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../models";
import { getUser } from "../api/user.api";
import { QUERY_KEY } from "../constants/queryKeys";
import * as tokenStore from "../auth/token.store"

export function useUser() {

    const queryClient = useQueryClient();
    const cachedUser = queryClient.getQueryData<User | undefined>([QUERY_KEY.user]);
    const token = tokenStore.getToken();
    const {data: user} = useQuery({
        queryKey: [QUERY_KEY.user], 
        queryFn: getUser,
        enabled: !!token,
        initialData: cachedUser
    })

    return { user };
}
