import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Watch from "../../features/videos/Watch/Watch";
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import HomePage from "../../features/home/HomePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: [
                    {path: '', element: <HomePage/>},
                    {path: 'videos', element: <VideoDashboard/>},
                    {path: 'watch/:id', element: <Watch/>},
                    {path: 'profiles/:username', element: <ProfilePage/>},
                    {path: 'errors', element: <TestErrors/>},
                ]
            },
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
]

export const router = createBrowserRouter(routes);