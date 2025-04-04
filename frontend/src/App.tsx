import { Suspense } from "react";
import "./styles/Global.scss";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routers/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/client";
import { ConfirmModal } from "./components/modal/ConfirmModal";

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
