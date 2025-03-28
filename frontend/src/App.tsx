import { Suspense, lazy } from "react";
import "./styles/Global.scss";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import LayoutRoot from "./layout/user/Layout";
import LayoutAdmin from "./layout/admin/Layout";
import { routes } from "./routes";
import { routesAdmin } from "./routes";
import NotFound from "./pages/user/NotFound";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/client";

const LoginPage = lazy(() => import("./pages/user/LoginPage"));
const SignUp = lazy(() => import("./pages/user/SignUpPage"));


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={routes} />
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
