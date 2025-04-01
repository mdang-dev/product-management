import { Suspense } from "react";
import "./styles/Global.scss";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfirmModal } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={routes} />
        <ConfirmModal />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
