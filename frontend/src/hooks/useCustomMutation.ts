import {QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomMutation = <TArgs, TResult>(func: (args: TArgs) => Promise<TResult>, key: QueryKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: func,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: key, refetchType: "inactive"});
    },
  });
}