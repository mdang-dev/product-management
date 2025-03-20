import { lazy } from "react";

const HomePage = lazy(() => import('./pages/HomePage'));

const routes = [
    {path: '/', element: HomePage}
]

export default routes;