import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Watch from "../../features/videos/Watch/Watch";
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";
import HomePage from "../../features/home/HomePage";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/profiles/ProfilePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'videos', element: <VideoDashboard/>},
            {path: 'watch/:id', element: <Watch/>},
            {path: 'profiles/:username', element: <ProfilePage/>},
            {path: 'login', element: <LoginForm/>},
            {path: 'errors', element: <TestErrors/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
]

export const router = createBrowserRouter(routes);