import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCustomMutation<TData, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey: string
) {
  const queryClient = useQueryClient();
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables | undefined) => mutationFn(variables!), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
