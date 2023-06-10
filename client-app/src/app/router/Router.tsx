import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Watch from "../../features/videos/Watch/Watch";
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";
import HomePage from "../../features/home/HomePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'videos', element: <VideoDashboard/>},
            {path: 'watch/:id', element: <Watch/>}
        ]
    }
]

export const router = createBrowserRouter(routes);